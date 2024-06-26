const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m: any) => {
  const proposals = ["Proposal 1", "Proposal 2", "Proposal 3"]; // Replace with your proposals

  const proposalNames = m.getParameter("proposalNames", proposals);

  const votingContract = m.contract("Voting", [proposalNames]);

  console.log(`Voting contract deployed at ${votingContract.address}`);
  return { votingContract };
});
