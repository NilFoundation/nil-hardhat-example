import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "nil-hardhat-plugin"
// Import tasks
import "./tasks/increment";

dotenv.config();

interface MyHardhatUserConfig extends HardhatUserConfig {
  walletAddress?: string;
}
const config: MyHardhatUserConfig = {
  solidity: "0.8.24",
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    nil_cluster: {
      url: process.env.NIL_RPC_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  walletAddress: process.env.WALLET_ADDR
};

export default config;
