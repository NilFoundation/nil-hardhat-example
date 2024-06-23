const { expect } = require("chai");
const hre = require("hardhat");

describe("Incrementer contract", function () {
	let incrementer:any;
	let accounts;

	beforeEach(async function () {
		// Deploy the contract before each test
		 incrementer = await hre.ethers.deployContract("Incrementer");

		accounts = await hre.ethers.getSigners();
	});

	it("Should increment the value", async function () {
		// Initial value should be 0
		expect(await incrementer.getValue()).to.equal(0);

		// Increment the value
		await incrementer.increment();

		// New value should be 1
		expect(await incrementer.getValue()).to.equal(1);

		// Increment the value again
		await incrementer.increment();

		// New value should be 2
		expect(await incrementer.getValue()).to.equal(2);
	});
});
