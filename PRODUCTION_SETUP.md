# 🚀 Swap Babies CLI - Production Deployment Guide

## 📋 **What Users Can Buy**

✅ **ETH** (Ethereum) - minimum 150 KES  
✅ **USDC** (Stablecoin) - minimum 150 KES  
✅ **Any ERC-20 token** - minimum 150 KES  
✅ **CELO tokens** - minimum 150 KES  

**Supported Networks:**
- 🌐 **Celo Mainnet** (Chain ID: 42220)
- 🌐 **Ethereum Mainnet** (Chain ID: 1)  
- 🌐 **Base Mainnet** (Chain ID: 8453)

## 💰 **Fee Structure**

From every 150 KES transaction:
- **Platform Fee**: 1% → Your platform wallet
- **Project Fee**: 0.5% → `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`
- **User Receives**: 98.5% of the value in their chosen token

## 🔧 **Production Environment Setup**

### 1. Create `.env.example` file with these variables:

```bash
# M-Pesa Configuration (Production)
MPESA_ENV=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_SHORTCODE=your_production_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_BASE=https://your-production-domain.com

# Wallet Configuration
PRIVATE_KEY=your_deployer_private_key
PLATFORM_ADDRESS=your_platform_wallet_address
PROJECT_WALLET=0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a

# Fee Configuration
MIN_AMOUNT_KES=150
FEE_PERCENT=1
PROJECT_FEE_PERCENT=0.5
SLIPPAGE_PERCENT=2
KES_PER_USD=150

# RPC URLs - Mainnets (Production)
CELO_MAINNET_RPC=https://forno.celo.org
ETH_MAINNET_RPC=https://mainnet.infura.io/v3/your_infura_key
BASE_MAINNET_RPC=https://mainnet.base.org

# Token Addresses - Celo Mainnet
USDC_CELO_MAINNET=0xceba9300f2b6497106d6e3aab4e23def42a814d0
WETH_CELO_MAINNET=0x471EcE3750Da237f93B8E339c536989b8978a438
ROUTER_CELO_MAINNET=0x7D28570135f56C0843a36897fAC63F2550a32c24

# Token Addresses - Ethereum Mainnet
USDC_ETH_MAINNET=0xA0b86a33E6441b8C4C8C0d4B0c62e3e8B5b8e8e8
WETH_ETH_MAINNET=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
ROUTER_ETH_MAINNET=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D

# Token Addresses - Base Mainnet
USDC_BASE_MAINNET=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
WETH_BASE_MAINNET=0x4200000000000000000000000000000000000006
ROUTER_BASE_MAINNET=0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Deploy Smart Contracts to Mainnets

```bash
# Deploy to CELO Mainnet
npm run deploy:celo

# Deploy to Ethereum Mainnet
npm run deploy:eth

# Deploy to Base Mainnet
npm run deploy:base
```

### 4. Fund Your Deployer Wallet

You need USDC in your deployer wallet for each network:
- **CELO**: Get USDC from [Ubeswap](https://app.ubeswap.org)
- **Ethereum**: Get USDC from [Uniswap](https://app.uniswap.org)
- **Base**: Get USDC from [BaseSwap](https://baseswap.fi)

## 🚀 **Running in Production**

### Start the Server
```bash
npm run server
# Server runs on port 3000
```

### Use the CLI
```bash
# Interactive mode (recommended for users)
npm run cli

# Quick mode (for testing)
npm run cli:quick -- --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

## 📱 **User Experience**

1. **User runs**: `npm run cli`
2. **Enters phone**: 254712345678
3. **Enters amount**: 200 KES
4. **Selects chain**: Celo/Ethereum/Base
5. **Selects token**: ETH/USDC/Custom
6. **Enters wallet**: 0x1234...
7. **Confirms**: Transaction summary
8. **M-Pesa STK Push**: Sent to their phone
9. **Payment confirmed**: Tokens sent to their wallet

## 🔒 **Security Checklist**

- ✅ Private keys stored securely
- ✅ M-Pesa credentials are production
- ✅ Callback URL is HTTPS
- ✅ Smart contracts deployed and verified
- ✅ USDC balance sufficient for swaps
- ✅ Project wallet address: `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`

## 📊 **Monitoring**

- Check transaction logs in console
- Monitor USDC balance in deployer wallet
- Track project fees in `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`
- Monitor M-Pesa callback success rate

## 🎯 **Ready for Production!**

Your Swap Babies CLI is now ready to:
- ✅ Accept M-Pesa payments (150+ KES)
- ✅ Convert to ETH/tokens on 3 mainnets
- ✅ Collect project fees to your wallet
- ✅ Serve users with interactive CLI
- ✅ Handle production M-Pesa transactions

**Next Steps:**
1. Set up your `.env.example` file
2. Deploy contracts to mainnets
3. Fund your wallets with USDC
4. Start the server
5. Begin accepting payments! 🎉
