const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleStorageModule", (m) => {
	const simpleStorage = m.contract("SimpleStorage");

	return { simpleStorage };
});
