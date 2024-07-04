import {task} from "hardhat/config";

task("contractInteraction", "Contract interaction")
    .addParam("contract", "The address of the caller contract")
    .addParam("storage", "The storage contract")
    .setAction(async (taskArgs, hre) => {
        // Get the contract
        const Caller = await hre.ethers.getContractFactory("Caller");
        const caller = Caller.attach(taskArgs.contract);

        const Storage = await hre.ethers.getContractFactory("ValueStorage");
        const storage = Storage.attach(taskArgs.storage);

        console.log("callSetValue...");
        const callSetValue = await caller.callSetValue(5);
        await callSetValue.wait(0);

        const getValue = await storage.getAmount();
        console.log(`getValue ${getValue}`);
    });
