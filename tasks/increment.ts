import {task} from "hardhat/config";

task("increment", "Increments the counter")
    .addParam("contract", "The address of the Incrementer contract")
    .setAction(async (taskArgs, hre) => {
        // Get the contract
        const Incrementer = await hre.ethers.getContractFactory("Incrementer");
        const incrementer = Incrementer.attach(taskArgs.contract);

        // Call the increment function
        console.log("Incrementing value...");
        const incrementTx = await incrementer.increment();
        await incrementTx.wait(0);

        // Fetch the new value
        const currentValue = await incrementer.getValue();
        console.log(`Current Value 2: ${currentValue}`);

        // Call the increment function
        console.log("Incrementing value...");
        const incrementTx2 = await incrementer.increment();
        await incrementTx2.wait(0);

        // Fetch the new value
        const currentValue2 = await incrementer.getValue();
        console.log(`Current Value 2: ${currentValue2}`);
    });
