
<div align="center">
  <h1>nil-hardhat-example</h1>
</div>

## 🚀 Overview
This repository demonstrates how to deploy and interact with smart contracts on the =nil; blockchain using Hardhat and our custom plugin. The =nil; blockchain is an Ethereum Layer 2 solution based on zk-sharding, enhancing transaction efficiency and scalability

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
1. Create a `.env` file in the root directory based on the given `.env.example` file
2. Update the `.env` file with the RPC URL. The default value corresponds to a locally running =nil; node
3. If you don't have `nil_cli` installed, you can download it from the official repository here
Once you have `nil_cli,` run the following commands to generate a new key and wallet:
    ```
    nil_cli keygen new
    nil_cli wallet new
    ```
4. Update the `.env` file with the private key and wallet address

## 🎯 Usage
To deploy and interact with the Incrementer contract, use the following commands:
```
# Deploy the contract
npx hardhat ignition deploy ./ignition/modules/Incrementer.ts --network nil

# Interact with the contract
npx hardhat increment --network nil --contract <Contract Address>
```

## 🎯 Testing
To run all tests, use the following command:
```bash
npm run tests
```
Make sure to configure `.env` with the RPC URL and PRIVATE_KEY

## 💪 Contributing
 Contributions are always welcome! Please feel free to submit pull requests or open issues to discuss potential changes or improvements

## 🚧 Work in Progress
**Please Note:** This project is currently under active development. Not all features are fully implemented, and you may encounter issues. If something isn't working as expected, don't hesitate to open an issue on our GitHub repository. We prioritize addressing these concerns and will get back to you promptly. Your feedback helps us improve!

Thank you for supporting our development efforts!