import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("IncrementerModule", (m) => {
  const incrementer = m.contract("Incrementer");

  return { incrementer };
});
