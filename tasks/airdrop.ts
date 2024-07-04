import {task} from "hardhat/config";
import {
    generateRandomPrivateKey,
    HttpTransport,
    LocalECDSAKeySigner,
    PublicClient,
    WalletV1
} from "@nilfoundation/niljs";

task("check-airdrop", "Checks the status of an airdrop")
    .addParam("contract", "The address of the Airdrop contract")
    .addParam("token", "The address of the ERC20 token contract")
    .setAction(async (taskArgs, hre) => {
        const contractAddress = taskArgs.contract;
        const tokenAddress = taskArgs.token;

        const signer = new LocalECDSAKeySigner({
            privateKey: generateRandomPrivateKey(),
        });
        const pubkey = await signer.getPublicKey();
        const guestWallet = new WalletV1({
            pubkey: pubkey,
            salt: 100n,
            shardId: 1,
            // mock client
            client: new PublicClient({
                transport: new HttpTransport({
                    endpoint: "http://127.0.0.1:8529",
                }),
                shardId: 1,
            }),
            signer,
        });
        const guestAddress = guestWallet.getAddressHex();

        const Airdrop = await hre.ethers.getContractFactory("Airdrop");
        const airdrop = Airdrop.attach(contractAddress);

        const Token = await hre.ethers.getContractFactory("AirdropErc20");
        const token = Token.attach(tokenAddress);

        const t1 = await token.mint(1000);
        await t1.wait(0);
        const t2 = await token.approve(contractAddress, 100);
        await t2.wait(0);

        const tx = await airdrop.multiTransferToken(tokenAddress, [guestAddress], [10]);
        await tx.wait(0);

        const balance = await token.balanceOf(guestAddress);
        console.log(`Address: ${guestAddress}, Balance: ${balance} Tokens`);
    });
