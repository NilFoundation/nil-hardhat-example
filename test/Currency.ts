import { expect } from "chai";
import "@nomicfoundation/hardhat-ethers";
import { deployNilContract } from "../src/deployUtil";
import { PublicClient, HttpTransport } from "@nilfoundation/niljs";

describe("Currency contract", () => {
	let currencyAddress: string;
	let client: any;

	before(async () => {
		if (!process.env.NIL_RPC_ENDPOINT) {
			throw new Error('NIL_RPC_ENDPOINT is not defined');
		}

		client = new PublicClient({
			transport: new HttpTransport({
				endpoint: process.env.NIL_RPC_ENDPOINT,
			}),
			shardId: 1,
		});
	});

	it("Should create a currency and fetch balance", async () => {
		// Deploy Currency contract
		const { deployedContract: currency, contractAddress: currencyAddr } = await deployNilContract("Currency", ["TestCurrency"]);
		currencyAddress = currencyAddr;
		console.log("Currency deployed at:", currencyAddress);

		// Call the create method on the Currency contract
		const amount = 1000;
		await currency.create(amount);

		// Fetch and print the currency balance using nil.js
		const tokens = await client.getCurrencies(currencyAddress, "latest");
		console.log("Tokens:", tokens);
		let found = false;
		for (const [tokenId, balance] of Object.entries(tokens)) {
			console.log(`Token ID: ${tokenId}, Balance: ${balance}`);
			if (balance === 1000n) {
				found = true;
				break;
			}
		}
		expect(found).to.be.true;

	});
});