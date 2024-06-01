const { expect } = require("chai");
const hre = require("hardhat");

describe("SimpleStorage contract", function () {
	it("Should increment value", async function () {
		// Deploy the SimpleStorage contract
		const simpleStorage = await hre.ethers.deployContract("SimpleStorage");

		// Wait for the contract to be deployed
		await simpleStorage.waitForDeployment();

		// Call the increment function
		await simpleStorage.increment();

		// Get the value after increment
		const value = await simpleStorage.getValue();
		expect(value).to.equal(1);
	});
});
