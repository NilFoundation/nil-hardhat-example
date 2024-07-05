import {task} from "hardhat/config";
import {ethers} from "ethers";

task("erc20transfer", "Erc20 with transfers")
    .addParam("contract", "The address of the erc20 contract")
    .setAction(async (taskArgs, hre) => {
        // Get the contract
        const Erc20 = await hre.ethers.getContractFactory("Erc20");
        const erc20 = Erc20.attach(taskArgs.contract);

        // @ts-ignore
        const address = hre.userConfig.walletAddress;

        // Call the increment function
        console.log("Getting balance...");
        const balance = await erc20.balanceOf(address);
        console.log(`Balance of ${address}: ${balance}`);

        const guestAddress = ethers.Wallet.createRandom().address;

        console.log(`Transfering to ${guestAddress}...`);
        const transfer = await erc20.transfer(guestAddress, 10000);
        await transfer.wait(0);

        const guestBalance = await erc20.balanceOf(guestAddress);
        console.log(`Balance of ${guestAddress}: ${guestBalance}`);

    });
