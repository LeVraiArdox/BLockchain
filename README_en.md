# 🧱 Student Project – Local Network Blockchain Demonstration

This project aims to demonstrate the core principles of a private blockchain by deploying two blockchain nodes across a simulated local network using two PCs, one router, and two switches. A **smart contract** was also developed and deployed to showcase interaction between the nodes.

---

## 📐 Network Diagram

![image](https://github.com/user-attachments/assets/cf46e266-7d53-4f2c-a9aa-f2546b0cea2f)

Two local networks are connected via a single router. Each PC hosts a full blockchain node and communicates peer-to-peer through the network interfaces.

---

## ⚙️ Tech Stack

- **Blockchain**: Ethereum (Ganache or Geth)
- **Smart Contract Language**: Solidity
- **Tools**: Hardhat / Truffle, Node.js
- **Infrastructure**: 2 PCs, 1 router, 2 switches

---

## 🧪 Demonstration Steps

1. Start both blockchain nodes.
2. Establish the network connection between them.
3. Deploy the smart contract from PC1.
4. Interact with the contract from PC2 (read/write operations).

![Demo Contract](./images/demo_contract.png)

---

## 📄 Smart Contract Example

```solidity
// SPDX-License-Identifier: MIT
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

## 🧠 Conclusion
This project demonstrates that even with a basic local network setup, it is possible to simulate a fully functional and secure private blockchain. The smart contract showcases blockchain’s strengths in transparency and trust.

---

## 📚 Authors
- Adrian ARJOCA (CPI-1-27-A Sup de Vinci Paris)
    - aka Ardox
