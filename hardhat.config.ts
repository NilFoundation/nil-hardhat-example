import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@nilfoundation/hardhat-plugin";
import {getValue, NilHardhatUserConfig} from "@nilfoundation/hardhat-plugin";

dotenv.config();

const walletAddress = getValue("address");
const privateKey = getValue("private_key");

const config: NilHardhatUserConfig = {
  solidity: "0.8.26",
  defaultNetwork: "nil",
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    nil: {
      url: process.env.NIL_RPC_ENDPOINT,
      accounts: privateKey ? [privateKey] : [],
    },
  },
  walletAddress: walletAddress,
  debug: true,
};
export default config;
