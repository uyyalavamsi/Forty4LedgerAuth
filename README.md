# Forty4LedgerAuth

A Hyperledger Fabric-based secure registration and authentication system with a modern React frontend and Web3-inspired theme.

This project allows users to register, login, and fetch ledger information stored on a Hyperledger Fabric blockchain, ensuring data integrity, security, and transparency.  

The frontend uses React.js with Tailwind CSS for a clean, professional Web3-style interface.

---

## Project Overview

Forty4LedgerAuth demonstrates a simple authentication system using Hyperledger Fabric. It covers:

1. Setting up the Hyperledger Fabric environment  
2. Working with Fabric CA for user enrollment  
3. Storing user credentials in wallets  
4. Implementing a Node.js backend for registration, login, and ledger queries  
5. Fetching ledger information on the React dashboard  

---

## Step-by-Step Setup

### 1. Set up the Environment

- Install Hyperledger Fabric binaries and Docker images.  
- Ensure cryptogen, configtxgen, peer, and fabric-ca-client are available.  
- Start a basic test network using fabric-samples/test-network:

```bash
cd fabric-samples/test-network
./network.sh up createChannel -ca

2. Work with Fabric CA
Enroll the CA admin:
fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca.example.com -M ~/fabric-ca/admin/msp


3. Store User Credentials

Save the generated certificates and keys in a wallet (file system or database).

In this project, a file-based wallet is used to store user identities.

The wallet is critical for authentication and signing transactions on the blockchain.

4. Implement Authentication (Node.js Backend)

Backend handles registration, login, and fetching ledger info.

Steps:

Load user credentials from the wallet.

Connect to Fabric gateway using the loaded identity.

Verify authentication by querying the ledger.

| Endpoint     | Method | Description                             |
| ------------ | ------ | --------------------------------------- |
| /register    | POST   | Register a new user and store in wallet |
| /login       | POST   | Login with username, fetch ledger info  |
| /ledger-info | GET    | Query the ledger for user transactions  |


5. Frontend Setup (React + Tailwind)
    1.Navigate to frontend:
        cd frontend
        npm install
        npm run dev

    2.Open browser at http://localhost:5173.
        Pages:
            Registration: register a new user

            Login: login using registered username

            Dashboard: fetch and display ledger info (ledger query)

6. Usage
    Register a user → /register
    Login with the user → /login
    Dashboard displays ledger info → /dashboard
    Screenshots:
        1.er Registration: screenshots/registration.pn
       2.ser Login / Enrollment: screenshots/login.png
       3.edger Query (Dashboard): screenshots/dashboard.png

Notes

Ensure Hyperledger Fabric network is running before starting backend.
Ledger data is read-only; updates are automatically recorded on blockchain.
Tailwind CSS provides Web3-inspired styling for a modern interface.

Folder Structure:


Forty4LedgerAuth/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Registration.jsx
│   │   └── Dashboard.jsx
│   ├── index.css
│   └── package.json
├── screenshots/
│   ├── registration.png
│   ├── login.png
│   └── dashboard.png
├── .gitignore
└── README.md

Tech Stack

    Frontend: React.js, Tailwind CSS, Vite
    Backend: Node.js, Express
    Blockchain: Hyperledger Fabric
    Storage: Ledger & Wallet (certificates and keys)

    User Registration Flow

        The following diagram shows how a user registers through the UI and how the backend interacts with Hyperledger Fabric:

+-----------------+                          +------------------+
|                 |                          |                  |
|  Registration   |        HTTP POST         |   Backend API    |
|      UI         |  ----------------------> |  (Node.js /      |
|  (React.js)     |                          |   Express)       |
+-----------------+                          +------------------+
        |                                             |
        |                                             |
        |                                             |
        |                                             v
        |                                  +------------------+
        |                                  |                  |
        |                                  | Fabric CA Server |
        |                                  |  (Enroll /       |
        |                                  |   Register User) |
        |                                  +------------------+
        |                                             |
        |                                             |
        |                                             v
        |                                  +------------------+
        |                                  |                  |
        |                                  |  Wallet Storage  |
        |                                  | (Certs & Keys)   |
        |                                  +------------------+
        |                                             |
        |                                             |
        +<--------------------------------------------+
                       Success Response


