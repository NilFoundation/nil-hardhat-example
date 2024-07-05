const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("ContractInteraction", (m: any) => {
    const valueStorage = m.contract("ValueStorage");

    return { valueStorage };
});
