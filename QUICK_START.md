# 🚀 Quick Start - Swap Babies CLI

## ✅ **What You're Getting**

**Users can buy ANY token with M-Pesa:**
- 💰 **Minimum**: 150 KES
- 🌐 **Networks**: Celo, Ethereum, Base
- 🪙 **Tokens**: ETH, USDC, or any ERC-20 token
- 📱 **Payment**: M-Pesa STK Push

**Fees automatically sent to:**
- 🏦 **Platform**: 1% to your platform wallet
- 💎 **Project**: 0.5% to `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`

## 🚀 **Deploy in 3 Steps**

### 1. **Setup Environment**
Create `.env.example` file with your M-Pesa credentials and wallet addresses.

### 2. **Deploy Contracts**
```bash
# Windows
deploy-production.bat

# Or manually
npm run deploy:celo
npm run deploy:eth  
npm run deploy:base
```

### 3. **Start Server**
```bash
npm run server
```

## 🎯 **How Users Use It**

```bash
npm run cli
```

**Example flow:**
1. 📱 Phone: `254712345678`
2. 💰 Amount: `200` KES
3. 🌐 Chain: `Celo` (1)
4. 🪙 Token: `ETH` (1)
5. 📍 Wallet: `0x1234...`
6. ✅ Confirm: `y`

**Result:** User gets ETH in their wallet! 🎉

## 💡 **Key Features**

- ✅ **Interactive CLI** - No complex commands
- ✅ **150 KES minimum** - Very accessible
- ✅ **ETH support** - Direct ETH purchases
- ✅ **Multi-chain** - Celo, Ethereum, Base
- ✅ **Project fees** - Automatic sustainability
- ✅ **Production ready** - M-Pesa integration

## 🔧 **For Developers**

**Test locally:**
```bash
npm run cli:quick -- --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

**Monitor transactions:**
- Check console logs
- Monitor USDC balance
- Track project fees in `0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a`

## 🎉 **You're Ready!**

Your Swap Babies CLI is now a complete M-Pesa to crypto bridge that:
- Accepts mobile payments
- Converts to any token
- Works on 3 mainnets
- Collects project fees automatically
- Provides great user experience

**Start accepting payments today!** 🚀
