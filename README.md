
<div align="center">
  <h1>nil-hardhat-example</h1>
</div>

## 🚀 Overview
This repository demonstrates how to deploy and interact with smart contracts on the =nil; blockchain using Hardhat and our custom plugin. The =nil; blockchain is an Ethereum Layer 2 solution based on zk-sharding, enhancing transaction efficiency and scalability.

## 📄 Features
✨ **Custom Hardhat Plugin:** Simplifies interactions between Hardhat and the nil blockchain by modifying RPC methods, handling asynchronous communications, and more.

🔧 **Smart Contract Deployment and Interaction:** Easily deploy and manage your smart contracts using Hardhat's familiar workflow.

🛠️ **Support for =nil; Wallets:** Extend your Hardhat configuration to support nil-specific wallet addresses.

## 📚 Prerequisites
- Node.js and npm/yarn installed
- An understanding of Ethereum and smart contract development

## 🔧 Installation
1. **Clone the Repository:**
   ```
   git clone https://github.com/NilFoundation/nil-hardhat-example.git
   cd nil-hardhat-example
   ```
2. **Install Dependencies:**
   ```
   npm install
   ```

## ⚙️ Configuration
1. Create a `.env` file in the root directory based on the given `.env.example` file.
2. Update the `.env` file with the RPC URL. The default value corresponds to a locally running =nil; node.
3. Create private key and wallet using `nil_cli`:
    ```
    nil_cli keygen new
    nil_cli wallet new
    ```
4. Update the `.env` file with the private key and wallet address.

You can run `npm test` to check if the configuration is correct.

## 🎯 Usage
To deploy and interact with the Incrementer contract, use the following commands:
```
# Deploy the contract
npx hardhat ignition deploy ./ignition/modules/Incrementer.ts --network nil

# Interact with the contract
npx hardhat increment --network nil --contract <Contract Address>
```

## 💪 Contributing
 Contributions are always welcome! Please feel free to submit pull requests or open issues to discuss potential changes or improvements.

## 🚧 Work in Progress
**Please Note:** This project is currently under active development. Not all features are fully implemented, and you may encounter issues. If something isn't working as expected, don't hesitate to open an issue on our GitHub repository. We prioritize addressing these concerns and will get back to you promptly. Your feedback helps us improve!

Thank you for supporting our development efforts!