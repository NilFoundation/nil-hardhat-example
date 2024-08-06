const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("IncrementerModule", (m: any) => {
  const incrementer = m.contract("Incrementer");

  return { incrementer };
});
