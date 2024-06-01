import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    nil_cluster: {
      url: process.env.NIL_RPC_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;
