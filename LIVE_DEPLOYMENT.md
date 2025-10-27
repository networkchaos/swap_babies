# 🌐 Live Deployment Guide - Swap Babies CLI

This guide will help you deploy Swap Babies CLI to live mainnets and make it available for public use.

## 🚀 **Pre-Deployment Checklist**

### **1. Environment Setup**
- [ ] M-Pesa API credentials (production)
- [ ] Deployer wallet with ETH/CELO for gas
- [ ] USDC tokens for initial liquidity
- [ ] Domain name for callback URL
- [ ] Server/hosting setup

### **2. Required Credentials**
```bash
# M-Pesa Production
MPESA_ENV=production
MPESA_CONSUMER_KEY=your_production_key
MPESA_CONSUMER_SECRET=your_production_secret
MPESA_SHORTCODE=your_production_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_BASE=https://your-domain.com

# Deployer Wallet
PRIVATE_KEY=your_deployer_private_key
PLATFORM_ADDRESS=your_platform_wallet
PROJECT_WALLET=0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a

# RPC URLs
CELO_MAINNET_RPC=https://forno.celo.org
ETH_MAINNET_RPC=https://mainnet.infura.io/v3/your_key
BASE_MAINNET_RPC=https://mainnet.base.org
```

## 🚀 **Step 1: Deploy Smart Contracts**

### **Deploy to All Mainnets**
```bash
# Windows
deploy-live.bat

# Manual deployment
npm run deploy:celo
npm run deploy:eth
npm run deploy:base
```

### **Save Contract Addresses**
After deployment, save the contract addresses:
- **CELO**: `0x...` (SwapAndSend contract)
- **Ethereum**: `0x...` (SwapAndSend contract)
- **Base**: `0x...` (SwapAndSend contract)

## 🚀 **Step 2: Fund Contracts**

### **Add USDC Liquidity**
Each contract needs USDC for swaps:

**CELO Mainnet:**
- Get USDC from [Ubeswap](https://app.ubeswap.org)
- Send to your deployer wallet
- Transfer to contract address

**Ethereum Mainnet:**
- Get USDC from [Uniswap](https://app.uniswap.org)
- Send to your deployer wallet
- Transfer to contract address

**Base Mainnet:**
- Get USDC from [BaseSwap](https://baseswap.fi)
- Send to your deployer wallet
- Transfer to contract address

## 🚀 **Step 3: Update Configuration**

### **Update .env.example with Contract Addresses**
```bash
# Add these to your .env.example
SWAP_CONTRACT_CELO=0x... # Your deployed CELO contract
SWAP_CONTRACT_ETH=0x...  # Your deployed Ethereum contract
SWAP_CONTRACT_BASE=0x... # Your deployed Base contract
```

## 🚀 **Step 4: Deploy Server**

### **Option A: VPS/Cloud Server**
```bash
# On your server
git clone https://github.com/networkchaos/swap_babies.git
cd swap_babies
npm install
cp .env.example .env
# Edit .env with your credentials
npm run server
```

### **Option B: Docker (Recommended)**
```dockerfile
# Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "server"]
```

```bash
# Build and run
docker build -t swap-babies .
docker run -p 3000:3000 --env-file .env swap-babies
```

### **Option C: Railway/Heroku**
```bash
# Deploy to Railway
railway login
railway init
railway up
```

## 🚀 **Step 5: Test Live System**

### **Test M-Pesa Integration**
```bash
# Test with small amount
npm run cli:quick -- --phone=254712345678 --amount=150 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

### **Monitor Transactions**
- Check server logs
- Monitor USDC balances
- Track project fees in `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`

## 🚀 **Step 6: Public Release**

### **Create GitHub Release**
1. Go to [GitHub Releases](https://github.com/networkchaos/swap_babies/releases)
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Title: "Swap Babies CLI v1.0.0 - Live Release"
5. Upload installers and documentation

### **Update Documentation**
- Update README.md with live contract addresses
- Add installation instructions
- Include troubleshooting guide

### **Announce Public Availability**
- Share on social media
- Post in crypto communities
- Create demo videos

## 🔧 **Maintenance**

### **Daily Tasks**
- Monitor USDC balances
- Check server health
- Review transaction logs
- Collect project fees

### **Weekly Tasks**
- Update USDC liquidity
- Check for failed transactions
- Review user feedback
- Update documentation

### **Monthly Tasks**
- Analyze usage patterns
- Optimize gas costs
- Add new features
- Security audits

## 💰 **Revenue Model**

**Project Sustainability:**
- 0.5% of every transaction goes to `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`
- Platform fees: 1% to your platform wallet
- Volume-based revenue growth

**Example Revenue:**
- 100 transactions/day × 200 KES = 20,000 KES
- Project fee: 20,000 × 0.5% = 100 KES/day
- Monthly revenue: ~3,000 KES

## 🎯 **Success Metrics**

- **Transactions per day**
- **Total volume processed**
- **User retention rate**
- **Average transaction size**
- **Network distribution**

## 🚀 **Ready to Go Live?**

```bash
# 1. Deploy contracts
deploy-live.bat

# 2. Fund with USDC
# (Manual process)

# 3. Start server
npm run server

# 4. Test system
npm run cli

# 5. Go public! 🎉
```

**Your M-Pesa to crypto bridge is now live and ready for users!** 🚀
