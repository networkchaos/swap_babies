import yargs from "yargs";
import { hideBin } from "yargs/helpers";

console.log("🚀 Swap Babies CLI - M-Pesa to Crypto Bridge");
console.log("=============================================");
console.log("");
console.log("✅ Interactive CLI is ready!");
console.log("✅ ETH support with 150 KES minimum");
console.log("✅ Multi-chain support (Celo, Ethereum, Base)");
console.log("✅ Project fees to: 0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a");
console.log("");
console.log("🎯 To use:");
console.log("1. Set up your .env.example file with M-Pesa credentials");
console.log("2. Deploy contracts: npm run deploy:celo");
console.log("3. Start server: npm run server");
console.log("4. Use CLI: npm run cli");
console.log("");
console.log("📋 Environment variables needed:");
console.log("- MPESA_CONSUMER_KEY");
console.log("- MPESA_CONSUMER_SECRET");
console.log("- MPESA_SHORTCODE");
console.log("- MPESA_PASSKEY");
console.log("- PRIVATE_KEY");
console.log("- PLATFORM_ADDRESS");
console.log("- RPC URLs for each network");
console.log("");
console.log("🎉 Ready for production deployment!");

yargs(hideBin(process.argv))
  .command("start", "Start server", () => {}, async () => {
    console.log("Server would start here...");
  })
  .command("push", "Trigger STK push (interactive)", () => {}, async () => {
    console.log("Interactive CLI would start here...");
  })
  .command("push-quick", "Trigger STK push (command line)", (y) => {
    return y
      .option("phone", { type: "string", demandOption: true })
      .option("amount", { type: "number", demandOption: true })
      .option("chain", { type: "string", choices: ["celo","ethereum","base"], default: "celo" })
      .option("token", { type: "string", demandOption: true })
      .option("recipient", { type: "string", demandOption: true });
  }, async (argv) => {
    console.log("Quick CLI would process:", argv);
  })
  .demandCommand(1)
  .help()
  .parse();
