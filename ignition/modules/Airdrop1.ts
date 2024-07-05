const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("Airdrop", (m: any) => {
    const airdropErc20 = m.contract("AirdropErc20", ["AirdropErc20", "AIR"]);

    return { airdropErc20 };
});
