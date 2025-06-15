# Electronic Health Record Blockchain Based Platfrom - Project

## Tech stack

    - Hyperledger Fabric blockchain (Node SDK JavaScript)
    - Node.js
    - Next.js
    - IPFS

<!-- ADD github access 

$ eval "$(ssh-agent -s)"
$ ssh-add ~/ssh/github -->

# Steps to setup project

## Download fabric binarys and fabric sample repo

    $ ./install-fabric.sh 

## To test network 

    $ cd /fabric-samples/test-network
    $ ./network.sh up

    $ docker ps    // to check running container or check in docker desktop
    
    $ ./network.sh down     // to down network

## to run network with ca and create mychannel 

    $ cd fabric-samples/test-network
    
    Create network with ca cert: 
    
    $ ./network.sh up createChannel -ca -s couchdb
    
## Chain code deployment command

    Deploy chain code
	    
    $ ./network.sh deployCC -ccn ehrChainCode -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript

    Down Network 
	
    $ ./network.sh down





## chaincode logic

    - lets first understand the actors in our chaincode

    1. Goverment - network owner
    2. Hospital - Network orgination 
    3. Practicing physician / Doctor - member of hospital
    4. Diagnostics center - org OR peer of hospital
    5. Pharmacies - Org OR peer of hospital
    6. Researchers / R&D - org
    7. Insurance companies - org
    8. Patient - end user


   ## now lets see there read write access

        1. Goverment - network owner - admin access
        2. Hospital - Network orgination - Read/Write (doctor data)
        3. Practicing physician/Doctor - Read/Write (Patient data w.r.t to hospital)
        4. Diagnostics center - Read/Write (Patient records w.r.t to diagnostics center)
        5. Pharmacies - Read/Write (Patient prescriptions w.r.t to pharma center)
        6. Researchers / R&D - Read data of hospital conect, pateint based on consent. 
        7. Insurance companies - Read/Write (Patient claims)
        8. Patient - Read/Write (All generated patient data)

  ## object strucutre in db.

  [ "recordType"="hospital", "createdBy"="hospitalId", data={ name="ABC Hosptial", address="acb location"  } ]

  [ "recordType"="physician", "createdBy"="physicianID", data={ name="ABC Hosptial", address="acb location"  } ]
