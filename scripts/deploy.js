import { ethers } from "hardhat";
async function main() {
    const network = await ethers.provider.getNetwork();
    console.log("Deploying to network:", network.name, "Chain ID:", network.chainId);
    // Get addresses based on network
    const router = getRouterAddress(network.chainId);
    const weth = getWETHAddress(network.chainId);
    const projectWallet = process.env.PROJECT_WALLET || "0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a";
    if (!router || !weth || !projectWallet) {
        throw new Error("Missing required environment variables for deployment");
    }
    console.log("Deployment parameters:");
    console.log("- Router:", router);
    console.log("- WETH:", weth);
    console.log("- Project Wallet:", projectWallet);
    const Swap = await ethers.getContractFactory("SwapAndSend");
    const deployed = await Swap.deploy(router, weth, projectWallet);
    await deployed.deployed();
    console.log("✅ SwapAndSend deployed to:", deployed.address);
    console.log("🔗 View on explorer:", getExplorerUrl(network.chainId, deployed.address));
}
function getRouterAddress(chainId) {
    switch (chainId) {
        case 42220: return process.env.ROUTER_CELO_MAINNET || ""; // Celo mainnet
        case 1: return process.env.ROUTER_ETH_MAINNET || ""; // Ethereum mainnet
        case 8453: return process.env.ROUTER_BASE_MAINNET || ""; // Base mainnet
        case 44787: return process.env.ROUTER_CELO || ""; // Celo testnet
        case 11155111: return process.env.ROUTER_ETH || ""; // Ethereum testnet
        case 84532: return process.env.ROUTER_BASE || ""; // Base testnet
        default: return "";
    }
}
function getWETHAddress(chainId) {
    switch (chainId) {
        case 42220: return process.env.WETH_CELO_MAINNET || ""; // Celo mainnet
        case 1: return process.env.WETH_ETH_MAINNET || ""; // Ethereum mainnet
        case 8453: return process.env.WETH_BASE_MAINNET || ""; // Base mainnet
        case 44787: return process.env.WETH_CELO || ""; // Celo testnet
        case 11155111: return process.env.WETH_ETH || ""; // Ethereum testnet
        case 84532: return process.env.WETH_BASE || ""; // Base testnet
        default: return "";
    }
}
function getExplorerUrl(chainId, address) {
    switch (chainId) {
        case 42220: return `https://celoscan.io/address/${address}`;
        case 1: return `https://etherscan.io/address/${address}`;
        case 8453: return `https://basescan.org/address/${address}`;
        case 44787: return `https://alfajores.celoscan.io/address/${address}`;
        case 11155111: return `https://sepolia.etherscan.io/address/${address}`;
        case 84532: return `https://sepolia.basescan.org/address/${address}`;
        default: return "";
    }
}
main().catch(e => { console.error(e); process.exit(1); });
//# sourceMappingURL=deploy.js.map