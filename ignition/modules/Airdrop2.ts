const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("Airdrop", (m: any) => {
    const airdrop = m.contract("Airdrop");

    return { airdrop };
});
