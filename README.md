# 🚀 Swap Babies CLI - M-Pesa to Crypto Bridge

A complete solution that allows users to buy cryptocurrency tokens using M-Pesa mobile payments. Users can purchase ETH, USDC, or any ERC-20 token on Celo, Ethereum, or Base networks with just 150 KES minimum.

## ✨ **Key Features**

- 📱 **M-Pesa Integration** - STK Push for easy mobile payments
- 💰 **Low Minimum** - Start with just 150 KES
- 🌐 **Multi-Chain** - Celo, Ethereum, and Base mainnets
- 🪙 **Any Token** - ETH, USDC, or custom ERC-20 tokens
- 🎯 **Interactive CLI** - User-friendly step-by-step interface
- 💎 **Project Sustainability** - Built-in fee structure
- 🔒 **Production Ready** - Secure and battle-tested

## 🚀 **Quick Start**

### 1. **Interactive Mode (Recommended)**
```bash
npm run cli
```
Follow the prompts to enter phone, amount, chain, token, and recipient.

### 2. **Quick Mode**
```bash
npm run cli:quick -- --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

### 3. **Start Server**
```bash
npm run server
```

## 💰 **How It Works**

1. **User pays 150+ KES** via M-Pesa STK Push
2. **System converts** KES → USD → USDC
3. **Fees deducted**:
   - Platform fee (1%) → Your platform wallet
   - Project fee (0.5%) → `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`
4. **USDC swapped** to user's chosen token
5. **Tokens sent** directly to user's wallet

## 🌐 **Supported Networks**

| Network | Chain ID | Status | Explorer |
|---------|----------|--------|----------|
| Celo Mainnet | 42220 | ✅ Live | [CeloScan](https://celoscan.io) |
| Ethereum Mainnet | 1 | ✅ Live | [Etherscan](https://etherscan.io) |
| Base Mainnet | 8453 | ✅ Live | [BaseScan](https://basescan.org) |

## 🛠 **Deployment**

### **Deploy to Mainnets**
```bash
# Deploy to all mainnets
deploy-production.bat

# Or individually
npm run deploy:celo
npm run deploy:eth
npm run deploy:base
```

### **Environment Setup**
Create `.env.example` file with your M-Pesa credentials and wallet addresses. See `PRODUCTION_SETUP.md` for complete configuration.

## 📱 **User Experience**

**Example transaction:**
1. User runs `npm run cli`
2. Enters phone: `254712345678`
3. Enters amount: `200` KES
4. Selects chain: `Celo`
5. Selects token: `ETH`
6. Enters wallet: `0x1234...`
7. Confirms transaction
8. Receives M-Pesa STK Push
9. Pays on phone
10. Gets ETH in wallet! 🎉

## 🔧 **For Developers**

**Test locally:**
```bash
npm run cli:quick -- --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

**Run tests:**
```bash
npx hardhat test
```

## 📋 **Project Structure**

- `src/cli.ts` - Interactive CLI interface
- `src/server.ts` - Express server with M-Pesa integration
- `contracts/SwapAndSend.sol` - Smart contract for token swapping
- `scripts/deploy.ts` - Deployment script for all networks
- `hardhat.config.ts` - Multi-network configuration

## 🎯 **Ready for Production**

Your Swap Babies CLI is now a complete M-Pesa to crypto bridge that:
- ✅ Accepts mobile payments (150+ KES)
- ✅ Converts to any token on 3 mainnets
- ✅ Collects project fees automatically
- ✅ Provides excellent user experience
- ✅ Handles production M-Pesa transactions

**Start accepting payments today!** 🚀