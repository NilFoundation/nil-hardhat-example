import hre from "hardhat";
import {expect} from "chai";
import * as assert from "node:assert";

describe("Incrementer contract", () => {
    it("Should increment the value", async () => {
        const factory = await hre.ethers.getContractFactory("Incrementer");
        console.log("factory", JSON.stringify(factory));

        const deployTx = await factory.getDeployTransaction();
        console.log("deployTx", JSON.stringify(deployTx));

        assert.ok(factory.runner);
        assert.ok(factory.runner.sendTransaction);

        const sentTx = await factory.runner.sendTransaction(deployTx);
        console.log("sentTx", JSON.stringify(sentTx));

        const txResponse = await sentTx.wait();
        console.log("txResponse", JSON.stringify(txResponse));

        assert.ok(txResponse);
        assert.ok(txResponse.contractAddress);

        const incrementer = factory.attach(txResponse.contractAddress);
        console.log("incrementer", JSON.stringify(incrementer));

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
