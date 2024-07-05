const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("ContractInteraction", (m: any) => {
    const caller = m.contract("Caller", [m.contract("ValueStorage")]);

    return { caller };
});

