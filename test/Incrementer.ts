const { expect } = require("chai");
const hre = require("hardhat");

describe("Incrementer contract", () => {
  it("Should increment the value", async () => {
    // Deploy the contract before each test
    const incrementer = await hre.ethers.deployContract("Incrementer");

    const accounts = await hre.ethers.getSigners();
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
