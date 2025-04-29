// AUTHOR: Ardox

const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "ADRESSE_DU_CONTRAT_DEPLOYÉ";
  const abi = [
    "function set(uint _data)",
    "function get() view returns (uint)"
  ];

  const provider = new ethers.JsonRpcProvider("http://192.168.1.2:8545");
  
  const privatekey = "LOCAL_PRIVATEKEY";
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
