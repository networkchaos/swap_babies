# Swap Babies CLI - Deployment Guide

## 🚀 New Features Added

### 1. Interactive CLI
- **Simple Command**: `npm run cli` (interactive mode)
- **Quick Command**: `npm run cli -- push-quick --phone=254712345678 --amount=200 --chain=celo --token=0x... --recipient=0x...`

### 2. ETH Support
- Minimum amount reduced to **150 KES**
- Support for buying **ETH** directly
- Automatic WETH wrapping/unwrapping

### 3. Project Sustainability Fee
- **0.5%** fee goes to project wallet for sustainability
- Configurable via `PROJECT_FEE_PERCENT` environment variable
- Separate from platform fees

### 4. Multi-Chain Support
- **Celo** (Alfajores testnet + Mainnet)
- **Ethereum** (Sepolia testnet + Mainnet)  
- **Base** (Sepolia testnet + Mainnet)

## 📋 Environment Variables Required

Create a `.env` file with the following variables:

```bash
# M-Pesa Configuration
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_BASE=https://your-domain.com

# Wallet Configuration
PRIVATE_KEY=your_private_key
PLATFORM_ADDRESS=your_platform_wallet
PROJECT_WALLET=your_project_sustainability_wallet

# Fee Configuration
MIN_AMOUNT_KES=150
FEE_PERCENT=1
PROJECT_FEE_PERCENT=0.5
SLIPPAGE_PERCENT=2
KES_PER_USD=150

# RPC URLs - Testnets
CELO_RPC=https://alfajores-forno.celo-testnet.org
ETH_RPC=https://sepolia.infura.io/v3/your_key
BASE_RPC=https://sepolia.base.org

# RPC URLs - Mainnets
CELO_MAINNET_RPC=https://forno.celo.org
ETH_MAINNET_RPC=https://mainnet.infura.io/v3/your_key
BASE_MAINNET_RPC=https://mainnet.base.org

# Token Addresses - Celo
USDC_CELO=0xceba9300f2b6497106d6e3aab4e23def42a814d0
WETH_CELO=0x471EcE3750Da237f93B8E339c536989b8978a438
ROUTER_CELO=0x7D28570135f56C0843a36897fAC63F2550a32c24

# Token Addresses - Celo Mainnet
USDC_CELO_MAINNET=0xceba9300f2b6497106d6e3aab4e23def42a814d0
WETH_CELO_MAINNET=0x471EcE3750Da237f93B8E339c536989b8978a438
ROUTER_CELO_MAINNET=0x7D28570135f56C0843a36897fAC63F2550a32c24

# Token Addresses - Ethereum
USDC_ETH=0xA0b86a33E6441b8C4C8C0d4B0c62e3e8B5b8e8e8
WETH_ETH=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
ROUTER_ETH=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D

# Token Addresses - Ethereum Mainnet
USDC_ETH_MAINNET=0xA0b86a33E6441b8C4C8C0d4B0c62e3e8B5b8e8e8
WETH_ETH_MAINNET=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
ROUTER_ETH_MAINNET=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D

# Token Addresses - Base
USDC_BASE=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
WETH_BASE=0x4200000000000000000000000000000000000006
ROUTER_BASE=0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24

# Token Addresses - Base Mainnet
USDC_BASE_MAINNET=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
WETH_BASE_MAINNET=0x4200000000000000000000000000000000000006
ROUTER_BASE_MAINNET=0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24
```

## 🚀 Deployment Commands

### Deploy to Testnets
```bash
# Celo Alfajores
npx hardhat run scripts/deploy.ts --network alfajores

# Ethereum Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Base Sepolia
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### Deploy to Mainnets
```bash
# Celo Mainnet
npx hardhat run scripts/deploy.ts --network celo

# Ethereum Mainnet
npx hardhat run scripts/deploy.ts --network ethereum

# Base Mainnet
npx hardhat run scripts/deploy.ts --network base
```

## 🎯 Usage Examples

### Interactive Mode (Recommended)
```bash
npm run cli
# Follow the prompts to enter phone, amount, chain, token, and recipient
```

### Quick Mode
```bash
# Buy ETH on Celo
npm run cli -- push-quick --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...

# Buy USDC on Base
npm run cli -- push-quick --phone=254712345678 --amount=500 --chain=base --token=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 --recipient=0x1234...
```

### Start Server
```bash
npm run dev
# Server runs on port 3000
```

## 🔧 Smart Contract Features

### New Functions
- `swapUSDCForTokenAndSend()` - Swap USDC to any ERC-20 token
- `swapUSDCForETHAndSend()` - Swap USDC to ETH
- `swapETHForTokenAndSend()` - Swap ETH to any ERC-20 token
- `setProjectFeePercent()` - Update project fee (owner only)
- `setProjectWallet()` - Update project wallet (owner only)
- `rescueETH()` - Rescue stuck ETH (owner only)

### Fee Structure
- **Platform Fee**: 1% (configurable)
- **Project Fee**: 0.5% (configurable)
- **Total Fees**: 1.5% maximum

## 🛡️ Security Features

- Only owner can execute swaps
- Project fee goes to dedicated project wallet
- Emergency rescue functions for stuck tokens/ETH
- Slippage protection
- Deadline protection

## 📱 M-Pesa Integration

- STK Push for easy mobile payments
- Callback handling for payment confirmation
- Minimum amount: 150 KES
- Real-time KES to USD conversion

## 🌐 Supported Networks

| Network | Chain ID | Status | Explorer |
|---------|----------|--------|----------|
| Celo Alfajores | 44787 | Testnet | [Alfajores CeloScan](https://alfajores.celoscan.io) |
| Celo Mainnet | 42220 | Mainnet | [CeloScan](https://celoscan.io) |
| Ethereum Sepolia | 11155111 | Testnet | [Sepolia Etherscan](https://sepolia.etherscan.io) |
| Ethereum Mainnet | 1 | Mainnet | [Etherscan](https://etherscan.io) |
| Base Sepolia | 84532 | Testnet | [Sepolia BaseScan](https://sepolia.basescan.org) |
| Base Mainnet | 8453 | Mainnet | [BaseScan](https://basescan.org) |

## 🎉 Ready to Deploy!

Your Swap Babies CLI is now ready with:
- ✅ Interactive CLI interface
- ✅ ETH support with 150 KES minimum
- ✅ Project sustainability fees
- ✅ CELO and BASE mainnet support
- ✅ Enhanced security features
- ✅ Multi-chain token support
