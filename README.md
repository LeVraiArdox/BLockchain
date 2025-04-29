# 🧱 Projet Étudiant – Démonstration de la Blockchain en Réseau Local

Ce projet vise à illustrer concrètement le fonctionnement d'une blockchain privée à travers le déploiement de nœuds sur un réseau local simulé avec deux PC, deux routeurs et deux switches. Un **smart contract** a également été développé et déployé pour montrer l'interaction possible entre les nœuds.

---

## 📐 Schéma du Réseau


![image](https://github.com/user-attachments/assets/cf46e266-7d53-4f2c-a9aa-f2546b0cea2f)


Deux réseaux locaux connectés via un routeur. Chaque PC héberge un nœud complet, et communiquent en peer-to-peer via les interfaces réseau.

---

## ⚙️ Stack Technique

- **Blockchain utilisée** : Ethereum (Ganache ou Geth)
- **Langage du smart contract** : Solidity
- **Outils** : Hardhat / Truffle, Node.js
- **Infrastructure** : 2 PC, 1 routeur, 2 switches

---

## 🧪 Démonstration

1. Démarrage des deux nœuds.
2. Connexion réseau entre les nœuds via l'architecture.
3. Déploiement du smart contract depuis PC1.
4. Interaction depuis PC2 (lecture/écriture).

![Demo Contract](./images/demo_contract.png)

---

## 📄 Exemple de Smart Contract

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
Ce projet montre que même avec une infrastructure réseau simple, il est possible de simuler un réseau blockchain privé fonctionnel et sécurisé. Le smart contract permet de démontrer la confiance et la transparence offertes par cette technologie.

## 📚 Auteurs

- Adrian ARJOCA (CPI-1-27-A Sup de Vinci Paris)
  - aka Ardox
