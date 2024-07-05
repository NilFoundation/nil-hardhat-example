const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

// biome-ignore lint: type is not exported
module.exports = buildModule("WalletModule", (m: any) => {
    const walletContract = m.contract("Wallet");

    return { erc20: walletContract };
});
