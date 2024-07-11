import {Signer} from "ethers";

const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

// biome-ignore lint: type is not exported
module.exports = buildModule("VestedWallet", (m: any) => {
    const RELEASE_TIME = 60;
    const VALUE = hre.ethers.parseEther('1');
    const walletContract = m.contract("VestedWallet", [hre.userConfig.walletAddress, RELEASE_TIME], {value: VALUE});

    return {walletContract};
});
