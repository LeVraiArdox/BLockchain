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

## Step 2
Configure the router

Connect to the serial console of the router:

Enable configuration mode
```
en
conf t
```

Create the gateways on each ports of the router
```
int gig0/0
ip add 192.168.1.1 255.255.255.0
no sh
exit

int gig0/1
ip add 192.168.2.1 255.255.255.0
no sh
exit
do wr
```

## Step 3
Attribute a static IP on each PCs 

The process depends on the computer. Here is my configuration:
- PC1: 192.168.1.2
- PC2: 192.168.2.2

Done for the hardware part

--- 

# Software

## Requirements
On each PCs
- Node.js (>=16) installed
- Ganache (CLI or GUI)

## Step 1
Install Ganache

On AxOS (because i use AxOS)
```shell
epsi i ganache-cli
```

You can also install it with npm (may require root permissions)
```
npm install -g ganache
```

## Step 2
Start ganache server on PC1
```shell
ganache --host 0.0.0.0 --port 8545
```
- `--host 0.0.0.0` : allows external connexions (from PC2)
- `--port 8545` : Default etherum port (change it if you're a thug)

**Don't forget to authorize 8545 port on firewall (if needed)**

## Step 3
Get the IP of PC1 (should be 192.168.1.2 tho)
```
ip a
```

## Step 4
We have to configure PC2 **with Hardhat** (install it) to connect to PC1 (ex: http://192.168.1.2:8545)

In `hardhat.config.js`:
```js
module.exports = {
  networks: {
    local: {
      url: "http://192.168.1.42:8545",
      accounts: [/* private key */]
    }
  },
  solidity: "0.8.20",
};
```

# Deploy
(use the files of the repo, in `hardhat` directory)
```
npx hardhat run scripts/deploy.js --network local
```

The contract is now on the local blockchain ! you can access it from PC2 with the contract address and ABI
