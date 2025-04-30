Here are the instructions for the deployement

# Hardware part

## Requirement:
- 2 PCs
- 2 Switches
- 1 Router (here we use a cisco 1941)
- 3 Ethernet cables
- 1 Console cable

## Step 1
Connect the infrastrucuture

![image](https://github.com/user-attachments/assets/7fda182d-09de-44ea-8533-85e3016a3814)

The two PCs are connected to one switch each. The switches are connected to the router. I configured the equipment with a console cable, but you can also use SSH if you can access the equipement via SSH.

## Step 2
Configure the router

Connect to the serial console of the router (or SSH if you can)

Enable configuration mode
```shell
en
conf t
```

Create the gateways on each ports of the router. gig are the Gigabit ethernet ports of the router. You can also use fast ethernet ports (fa) if your router doesn't have gigabit ports.
```shell
int gig0/0
ip add 192.168.0.1 255.255.255.0 # The gateway of the first network
no sh

int gig0/1
ip add 192.168.1.1 255.255.255.0 # The gateway of the second network
no sh
exit
do wr
```

## Step 3
Attribute a static IP on each PCs 

The process depends on the computer. Here is my configuration:
- PC1:
  - IP: 192.168.0.2
  - Gateway: 192.168.0.1
  - MASK: 255.255.255.0
- PC2:
  - IP: 192.168.1.2
  - Gateway: 192.168.1.1
  - MASK: 255.255.255.0

Done for the hardware part

--- 

# Software

## Requirements
On each PCs
- Node.js (>=16) installed
- Ganache (install it with npm)

## Step 1

Start ganache server on both PCs
```shell
ganache --host 0.0.0.0
```
- `--host 0.0.0.0` : allows external connexions (from PC2)

the server will start on port 8545 by default. We will keep this port for the deployement.

> ![IMPORTANT]
> **Don't forget to authorize 8545 port on firewall (if needed)**

## Step 2

Install Hardhat on PC1
```shell
npm install --save-dev hardhat
```
We then have to configure PC2 **with Hardhat** (install it) to connect to PC1 (ex: http://192.168.1.2:8545)

In `hardhat.config.js`:
```js
module.exports = {
  networks: {
    local: {
      url: "http://192.168.0.2:8545",
      accounts: [/* private key of the PC1 */]
    }
  },
  solidity: "0.8.20",
};
```

The private is necessary to deploy the contract on the local network. It is the private key of the account that will deploy the contract. You can find it in Ganache (on PC1).

## Step 3
We now need to make scripts to deploy and interact with the contract.

### PC 1
In the root of your hardhat project, create a new file `scripts/deploy.js` and add the following code:

```js
const hre = require("hardhat");

async function main() {
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const contract = await SimpleStorage.deploy();

  await contract.waitForDeployment();

  console.log(`✅ Contract deployed at: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

This script will deploy the contract on the local network.

Then, make a new contract in `contracts/SimpleStorage.sol`:

```js
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint public data;

    function set(uint _data) public {
        data = _data;
    }

    function get() public view returns (uint) {
        return data;
    }
}
```

When this is done, you can compile the contract with:
```shell
npx hardhat compile
```
This will create the ABI and the bytecode of the contract in `artifacts` directory.

Now, you can deploy the contract on the local network with the script we created before.
```shell
npx hardhat run scripts/deploy.js --network local
```
This will deploy the contract on the local network (PC1) and give you the address of the contract.

### PC 2

On PC2, we will create a script to interact with the contract. In the root of your hardhat project, create a new file `scripts/interact.js` and add the following code:

```js
// AUTHOR: Ardox

const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "CONTRACT_ADDRESS"; // Address of the contract deployed on PC1
  const abi = [
    "function set(uint _data)",
    "function get() view returns (uint)"
  ];

  const provider = new ethers.JsonRpcProvider("http://192.168.0.2:8545");
  
  const privatekey = "LOCAL_PRIVATEKEY"; // Key of the account that deployed the contract
  const wallet = new ethers.Wallet(privatekey, provider)
  
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  console.log("Setting value to 42...");
  const tx = await contract.set(42);
  await tx.wait();

  const value = await contract.get();
  console.log("📦 Stored value:", value.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

This script will interact with the contract deployed on PC1. It will set the value to 42 and then get the value from the contract.
You need to replace `CONTRACT_ADDRESS` with the address of the contract deployed on PC1 and `LOCAL_PRIVATEKEY` with the private key of the account that deployed the contract.

Then, you can run the script with:
```shell
npx hardhat run scripts/interact.js --network local
```

Congratulations! You have successfully deployed a contract on a local network and interacted with it from another PC.