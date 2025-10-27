"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_toolbox_mocha_ethers_1 = __importDefault(require("@nomicfoundation/hardhat-toolbox-mocha-ethers"));
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const config = {
    plugins: [hardhat_toolbox_mocha_ethers_1.default],
    solidity: {
        profiles: {
            default: {
                version: "0.8.28",
            },
            production: {
                version: "0.8.28",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        },
    },
    networks: {
        hardhatMainnet: {
            type: "edr-simulated",
            chainType: "l1",
        },
        hardhatOp: {
            type: "edr-simulated",
            chainType: "op",
        },
        // Testnets
        alfajores: {
            url: process.env.CELO_RPC,
            chainId: 44787,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
        sepolia: {
            url: process.env.ETH_RPC,
            chainId: 11155111,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
        baseSepolia: {
            url: process.env.BASE_RPC,
            chainId: 84532,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
        // Mainnets
        celo: {
            url: process.env.CELO_MAINNET_RPC,
            chainId: 42220,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
        ethereum: {
            url: process.env.ETH_MAINNET_RPC,
            chainId: 1,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
        base: {
            url: process.env.BASE_MAINNET_RPC,
            chainId: 8453,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
        },
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map