import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import type { NilHardhatUserConfig } from "@nilfoundation/hardhat-plugin";
import "@nilfoundation/hardhat-plugin";

// Import tasks
import "./tasks/increment";
import "./tasks/erc20transfer";
import "./tasks/wallet";
import "./tasks/contractInteraction";
import "./tasks/airdrop";

dotenv.config();

const config: NilHardhatUserConfig = {
  solidity: "0.8.24",
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    nil: {
      url: process.env.NIL_RPC_ENDPOINT,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  walletAddress: process.env.WALLET_ADDR?.toLowerCase(),
  debug: true,
};
export default config;
