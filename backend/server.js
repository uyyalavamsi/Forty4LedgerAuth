// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(__dirname, 'wallet');

// Helper to get CA client
async function getCA() {
  const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
  return new FabricCAServices(caInfo.url, { trustedRoots: caInfo.tlsCACerts.pem, verify: false }, caInfo.caName);
}

// ---------------- REGISTER & ENROLL ----------------
app.post('/register', async (req, res) => {
  const { username } = req.body;
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    if (await wallet.get(username)) return res.status(400).send('User already exists');

    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) return res.status(400).send('Admin identity not found in wallet');

    const ca = await getCA();
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    const secret = await ca.register({ enrollmentID: username, role: 'client' }, adminUser);
    const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });

    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: 'Org1MSP',
      type: 'X.509',
    };
    await wallet.put(username, x509Identity);

    res.send(`User ${username} registered and enrolled successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
});

// ---------------- LOGIN ----------------
app.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get(username);
    if (!identity) return res.status(400).send('User not found');

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('qscc');
    const result = await contract.evaluateTransaction('GetChainInfo', 'mychannel');

    await gateway.disconnect();

    res.send({ message: 'Login successful', chainInfo: result.toString('hex') });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed: ' + err.message);
  }
});

// ---------------- SERVER ----------------
app.listen(8080, () => console.log('Server running on port 8080'));
