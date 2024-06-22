// Import ethers from Hardhat package
import { task } from "hardhat/config";

// Task to increment the value
task("increment", "Increments the counter")
.addParam("contract", "The address of the SimpleStorage contract")
.setAction(async (taskArgs, hre) => {
	// Get the contract
	const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
	const simpleStorage = SimpleStorage.attach(taskArgs.contract);

	// Call the increment function
	console.log("Incrementing value...");
	const incrementTx = await simpleStorage.increment();
	await incrementTx.wait(0);

	// Fetch the new value
	const currentValue = await simpleStorage.getValue();
	console.log(`Current Value: ${currentValue}`);
});
