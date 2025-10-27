# 🚀 Swap Babies CLI - User Guide

**Buy crypto with M-Pesa!** The easiest way to convert your mobile money to Ethereum, USDC, and other tokens.

## ✨ **What You Can Do**

- 💰 **Buy ETH** with just 150 KES minimum
- 🪙 **Buy USDC** and other tokens
- 🌐 **Choose your network**: Celo, Ethereum, or Base
- 📱 **Pay with M-Pesa** - No complex setup needed
- ⚡ **Instant delivery** - Tokens sent directly to your wallet

## 🚀 **Quick Start (2 Steps)**

**Note:** This software connects to pre-deployed smart contracts. You cannot deploy your own contracts - you only use the existing system.

### **Step 1: Download & Install**

**Windows:**
```bash
# Download and run the installer
curl -o install.bat https://raw.githubusercontent.com/networkchaos/swap_babies/main/install.bat
install.bat
```

**Mac/Linux:**
```bash
# Download and run the installer
curl -o install.sh https://raw.githubusercontent.com/networkchaos/swap_babies/main/install.sh
chmod +x install.sh
./install.sh
```

**Manual Installation:**
```bash
git clone https://github.com/networkchaos/swap_babies.git
cd swap_babies
npm install
```

### **Step 2: Start Buying Crypto!**

**No M-Pesa setup needed!** The system uses the platform's M-Pesa integration. Just start using it:

```bash
npm run cli
```

## 📱 **How to Use**

### **Interactive Mode (Recommended)**
```bash
npm run cli
```

**Example flow:**
1. 📱 Enter phone: `254712345678`
2. 💰 Enter amount: `200` KES
3. 🌐 Select network: `Celo` (1)
4. 🪙 Select token: `ETH` (1)
5. 📍 Enter wallet: `0x1234...`
6. ✅ Confirm: `y`
7. 📱 Pay via M-Pesa STK Push
8. 🎉 Receive tokens in your wallet!

### **Quick Mode**
```bash
npm run cli:quick -- --phone=254712345678 --amount=200 --chain=celo --token=0x0000000000000000000000000000000000000000 --recipient=0x1234...
```

## 🌐 **Supported Networks**

| Network | Chain ID | Best For | Gas Fees |
|---------|----------|----------|----------|
| **Celo** | 42220 | Low fees, fast | ~$0.01 |
| **Ethereum** | 1 | Most tokens | ~$5-20 |
| **Base** | 8453 | Fast, cheap | ~$0.10 |

## 🪙 **Supported Tokens**

- **ETH** (Ethereum) - `0x0000000000000000000000000000000000000000`
- **USDC** (Stablecoin) - `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Any ERC-20 token** - Just paste the contract address

## 💰 **Fees & Costs**

- **Platform Fee**: 1% (goes to platform)
- **Project Fee**: 0.5% (goes to project sustainability)
- **M-Pesa Fee**: ~1% (Safaricom charges)
- **Network Gas**: Varies by network
- **You receive**: ~97.5% of your KES value in tokens

## 🔧 **Troubleshooting**

### **"M-Pesa STK Push failed"**
- Check your M-Pesa credentials in `.env`
- Ensure your shortcode is active
- Verify callback URL is accessible

### **"Insufficient USDC balance"**
- The platform needs USDC to swap
- Contact support or wait for refill

### **"Transaction failed"**
- Check your wallet address
- Ensure you have enough KES
- Try a smaller amount first

## 📞 **Support**

- **GitHub Issues**: [Report problems](https://github.com/networkchaos/swap_babies/issues)
- **Documentation**: See `README.md` for technical details
- **Community**: Join our discussions

## 🔒 **Security**

- ✅ **Open Source** - All code is public and auditable
- ✅ **Non-custodial** - We never hold your tokens
- ✅ **Direct delivery** - Tokens sent straight to your wallet
- ✅ **M-Pesa secure** - Uses official Safaricom APIs

## 🎯 **Pro Tips**

1. **Start small** - Try 150 KES first
2. **Use Celo** - Lowest fees for beginners
3. **Keep your private key safe** - Never share it
4. **Check gas prices** - Ethereum can be expensive
5. **Test with testnet** - Use `npm run deploy:testnet:celo` first

## 🚀 **Ready to Start?**

```bash
# Download and install
curl -o install.bat https://raw.githubusercontent.com/networkchaos/swap_babies/main/install.bat
install.bat

# Start buying crypto!
npm run cli
```

**Welcome to the future of mobile money!** 🎉
