import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";

// Load environment variables from .env.example
dotenv.config({ path: '.env.example' });

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
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
      type: "http",
      url: process.env.CELO_RPC,
      chainId: 44787,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    sepolia: {
      type: "http",
      url: process.env.ETH_RPC,
      chainId: 11155111,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    baseSepolia: {
      type: "http",
      url: process.env.BASE_RPC,
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    // Mainnets
    celo: {
      type: "http",
      url: process.env.CELO_MAINNET_RPC,
      chainId: 42220,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    ethereum: {
      type: "http",
      url: process.env.ETH_MAINNET_RPC,
      chainId: 1,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    base: {
      type: "http",
      url: process.env.BASE_MAINNET_RPC,
      chainId: 8453,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
  },
};

export default config;
