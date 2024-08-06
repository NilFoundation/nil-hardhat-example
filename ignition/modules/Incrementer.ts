const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("IncrementerModule", (m: any) => {
  //const valueToSend = 100n;
  //const incrementer = m.contract("Incrementer",[], { value: valueToSend });
  const incrementer = m.contract("Incrementer");

  return { incrementer };
});
