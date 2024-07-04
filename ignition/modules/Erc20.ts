const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

// biome-ignore lint: type is not exported
module.exports = buildModule("Erc20Module", (m: any) => {
    const owner = hre.userConfig.walletAddress;
    const name = "Test token";
    const symbol = "TST";
    const decimals = 18;
    const initialSupply = 1000000;


    const erc20 = m.contract("Erc20", [owner, name, symbol, decimals, initialSupply]);

    return { erc20 };
});
