const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

// biome-ignore lint: type is not exported
module.exports = buildModule("WalletCaller", (m: any) => {
    const walletContract = m.contract("WalletCaller");

    return { walletContract };
});
