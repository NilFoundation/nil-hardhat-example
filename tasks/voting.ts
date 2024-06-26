// tasks/giveRightToVote.ts
import { task } from "hardhat/config";

task("giveRightToVote", "Give the right to vote to an address")
  .addParam("contract", "The address of the Voting contract")
  .addParam("voter", "The address of the voter")
  .setAction(async (taskArgs, hre) => {
    const Voter = await hre.ethers.getContractFactory("Voting");
    const voter = Voter.attach(taskArgs.contract);

    console.log(`Giving the right to vote to ${taskArgs.voter}`);
    const voteRighTx = await voter.giveRightToVote(taskArgs.voter);
    await voteRighTx.wait(0);
    console.log(voteRighTx);
  });

task("owner", "Get the owner of the contract")
  .addParam("contract", "The address of the Voting contract")
  .setAction(async (taskArgs, hre) => {
    const Voter = await hre.ethers.getContractFactory("Voting");
    const voter = Voter.attach(taskArgs.contract);

    console.log("Getting the owner of the contract...")
    const contractOwner = await voter.owner();
    console.log(contractOwner);
  });
