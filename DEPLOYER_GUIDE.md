# 🔧 Deployer Guide - For Platform Owner Only

**This guide is ONLY for you (the platform owner) to deploy and manage the Swap Babies CLI system.**

## 🚀 **Your Responsibilities**

### **1. Deploy Smart Contracts (One-time)**
```bash
# Deploy to all mainnets
deploy-live.bat

# This creates contracts with:
# - You as the owner
# - Project fees to: 0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a
# - Platform fees to: Your platform wallet
```

### **2. Fund Contracts with USDC**
- **CELO**: Get USDC from Ubeswap, send to contract
- **Ethereum**: Get USDC from Uniswap, send to contract  
- **Base**: Get USDC from BaseSwap, send to contract

### **3. Deploy Server**
- Set up production server
- Configure M-Pesa credentials
- Set up domain for callbacks
- Start the server: `npm run server`

### **4. Monitor & Maintain**
- Monitor USDC balances in contracts
- Collect project fees from `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`
- Monitor server health
- Refill USDC when needed

## 💰 **Your Revenue**

### **From Every Transaction:**
- **Platform Fee**: 1% → Your platform wallet
- **Project Fee**: 0.5% → `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`

### **Revenue Example:**
- 100 transactions/day × 200 KES = 20,000 KES
- Your platform fee: 200 KES/day
- Your project fee: 100 KES/day
- **Total daily revenue: 300 KES**
- **Monthly revenue: ~9,000 KES**

## 🔒 **Security Features**

### **Only You Can:**
- ✅ Deploy contracts (requires your private key)
- ✅ Execute swaps (onlyOwner modifier)
- ✅ Change fee structure (onlyOwner functions)
- ✅ Access project funds (your wallet address)
- ✅ Update contracts (onlyOwner functions)

### **Users Cannot:**
- ❌ Deploy their own contracts
- ❌ Change fee structure
- ❌ Access your funds
- ❌ Execute swaps directly
- ❌ Bypass the fee system

## 🎯 **Deployment Checklist**

- [ ] Deploy contracts to CELO mainnet
- [ ] Deploy contracts to Ethereum mainnet
- [ ] Deploy contracts to Base mainnet
- [ ] Fund contracts with USDC
- [ ] Set up production server
- [ ] Configure M-Pesa credentials
- [ ] Test with small amounts
- [ ] Go live and start collecting fees!

## 🚀 **Ready to Deploy?**

```bash
# 1. Deploy contracts
deploy-live.bat

# 2. Fund with USDC (manual process)

# 3. Deploy server
npm run server

# 4. Start collecting fees! 💰
```

**You're the only one who can deploy and manage this system. Users just download and use it!**
