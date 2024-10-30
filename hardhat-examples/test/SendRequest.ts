import { expect } from "chai";
import hre from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import { deployNilContract } from "../src/deployUtil";

describe("Requester and Increment contract interaction", () => {
    let callerAddress: string;
    let incrementerAddress: string;

    it("Should Deploy Requester with shardId 2, deploy Incrementer with shardId 1, and call incrementer from caller using sendRequest", async function () {
        this.timeout(1200000);
        // Set shardId to 2
        hre.config.shardId = 2;
        // Deploy Caller contract
        const { deployedContract: sendRequester, contractAddress: callerAddr } =
            await deployNilContract("SendRequest");
        callerAddress = callerAddr;
        console.log("Caller deployed at:", callerAddress);

        // Set shardId back to 1
        hre.config.shardId = 1;

        // Deploy Incrementer contract
        const { deployedContract: incrementer, contractAddress: incrementerAddr } =
            await deployNilContract("Incrementer");
        incrementerAddress = incrementerAddr;
        console.log("Incrementer deployed at:", incrementerAddress);
        // Increment the value
        await incrementer.increment();
        // Check the value of Incrementer
        expect(await incrementer.getValue()).to.equal(1);

        // Call the Caller contract's call method with the Incrementer address
        await sendRequester.call(incrementerAddress);

        let value = await sendRequester.values("RANDOM_STORAGE");
        console.log("returned value: ", value);
        // New value should be 1
        expect(value).to.equal(1);
    });
});