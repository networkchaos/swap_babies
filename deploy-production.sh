#!/bin/bash

echo "🚀 Swap Babies CLI - Production Deployment Script"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file with your production configuration."
    echo "See PRODUCTION_SETUP.md for details."
    exit 1
fi

echo "✅ .env file found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Deploy to CELO Mainnet
echo "🌐 Deploying to CELO Mainnet..."
npm run deploy:celo

# Deploy to Ethereum Mainnet
echo "🌐 Deploying to Ethereum Mainnet..."
npm run deploy:eth

# Deploy to Base Mainnet
echo "🌐 Deploying to Base Mainnet..."
npm run deploy:base

echo "✅ All deployments completed!"
echo ""
echo "🎯 Next steps:"
echo "1. Fund your deployer wallet with USDC on each network"
echo "2. Start the server: npm run server"
echo "3. Test with: npm run cli"
echo ""
echo "💰 Project fees will be sent to: 0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a"
echo "🎉 Ready for production!"
