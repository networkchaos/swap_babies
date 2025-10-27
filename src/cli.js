import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as readline from "readline";
import { startServer, triggerStkPushCLI } from "../src/server";
// Interactive CLI interface
async function interactiveCLI() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = (query) => {
        return new Promise((resolve) => {
            rl.question(query, resolve);
        });
    };
    console.log("🚀 Welcome to Swap Babies CLI - M-Pesa to Crypto Bridge\n");
    try {
        // Get phone number
        const phone = await question("📱 Enter your M-Pesa phone number (e.g., 254712345678): ");
        if (!phone.startsWith('254') || phone.length !== 12) {
            console.log("❌ Invalid phone number format. Please use format: 254XXXXXXXXX");
            rl.close();
            return;
        }
        // Get amount
        const amountStr = await question("💰 Enter amount in KES (minimum 150): ");
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount < 150) {
            console.log("❌ Invalid amount. Minimum is 150 KES");
            rl.close();
            return;
        }
        // Get chain selection
        console.log("\n🌐 Select blockchain network:");
        console.log("1. Celo (Recommended for low fees)");
        console.log("2. Ethereum");
        console.log("3. Base");
        const chainChoice = await question("Enter choice (1-3): ");
        let chain;
        switch (chainChoice) {
            case "1":
                chain = "celo";
                break;
            case "2":
                chain = "ethereum";
                break;
            case "3":
                chain = "base";
                break;
            default:
                console.log("❌ Invalid choice");
                rl.close();
                return;
        }
        // Get token selection
        console.log("\n🪙 Select token to receive:");
        console.log("1. ETH (Ethereum)");
        console.log("2. USDC (Stablecoin)");
        console.log("3. Custom token address");
        const tokenChoice = await question("Enter choice (1-3): ");
        let token;
        switch (tokenChoice) {
            case "1":
                token = chain === "celo" ? "0x471EcE3750Da237f93B8E339c536989b8978a438" : // cETH on Celo
                    chain === "base" ? "0x4200000000000000000000000000000000000006" : // ETH on Base
                        "0x0000000000000000000000000000000000000000"; // ETH on Ethereum
                break;
            case "2":
                token = chain === "celo" ? "0xceba9300f2b6497106d6e3aab4e23def42a814d0" : // USDC on Celo
                    chain === "base" ? "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" : // USDC on Base
                        "0xA0b86a33E6441b8C4C8C0d4B0c62e3e8B5b8e8e8"; // USDC on Ethereum
                break;
            case "3":
                token = await question("Enter custom token address: ");
                if (!token.startsWith('0x') || token.length !== 42) {
                    console.log("❌ Invalid token address format");
                    rl.close();
                    return;
                }
                break;
            default:
                console.log("❌ Invalid choice");
                rl.close();
                return;
        }
        // Get recipient address
        const recipient = await question("📍 Enter recipient wallet address: ");
        if (!recipient.startsWith('0x') || recipient.length !== 42) {
            console.log("❌ Invalid wallet address format");
            rl.close();
            return;
        }
        // Confirm transaction
        console.log("\n📋 Transaction Summary:");
        console.log(`Phone: ${phone}`);
        console.log(`Amount: ${amount} KES`);
        console.log(`Chain: ${chain.toUpperCase()}`);
        console.log(`Token: ${token}`);
        console.log(`Recipient: ${recipient}`);
        const confirm = await question("\n✅ Confirm transaction? (y/n): ");
        if (confirm.toLowerCase() !== 'y') {
            console.log("❌ Transaction cancelled");
            rl.close();
            return;
        }
        console.log("\n🔄 Initiating STK Push...");
        await triggerStkPushCLI(phone, amount, chain, token, recipient);
    }
    catch (error) {
        console.error("❌ Error:", error);
    }
    finally {
        rl.close();
    }
}
yargs(hideBin(process.argv))
    .command("start", "Start server", () => { }, async () => {
    await startServer();
})
    .command("push", "Trigger STK push (interactive)", () => { }, async () => {
    await interactiveCLI();
})
    .command("push-quick", "Trigger STK push (command line)", (y) => {
    return y
        .option("phone", { type: "string", demandOption: true })
        .option("amount", { type: "number", demandOption: true })
        .option("chain", { type: "string", choices: ["celo", "ethereum", "base"], default: "celo" })
        .option("token", { type: "string", demandOption: true })
        .option("recipient", { type: "string", demandOption: true });
}, async (argv) => {
    await triggerStkPushCLI(argv.phone, argv.amount, argv.chain, argv.token, argv.recipient);
})
    .demandCommand(1)
    .help()
    .parse();
//# sourceMappingURL=cli.js.map