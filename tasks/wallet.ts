import {task} from "hardhat/config";
import {ethers} from "ethers";
import {
    generateRandomPrivateKey,
    HttpTransport,
    LocalECDSAKeySigner,
    PublicClient,
    WalletV1
} from "@nilfoundation/niljs";

task("wallet", "Wallet deposit and withdrawal")
    .addParam("contract", "The address of the wallet contract")
    .setAction(async (taskArgs, hre) => {
        // Get the contract
        const Wallet = await hre.ethers.getContractFactory("Wallet");
        const wallet = Wallet.attach(taskArgs.contract);

        // @ts-ignore
        const address = hre.userConfig.walletAddress;

        // Call the increment function
        console.log("Deposit...");
        const deposit = await wallet.deposit({value: 1000});
        await deposit.wait(0);
        const balance = await wallet.getBalance();
        console.log(`Balance of ${address}: ${balance}`);

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
        const guestAddress = await guestWallet.getAddressHex();

        console.log(`Transfering to ${guestAddress}...`);
        const transfer = await wallet.transfer(guestAddress, 100);
        await transfer.wait(0);

        const newBalance = await wallet.getBalance();
        console.log(`Balance of ${address}: ${newBalance}`);
    });
