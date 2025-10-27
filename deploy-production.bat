@echo off
echo 🚀 Swap Babies CLI - Production Deployment Script
echo ==================================================

REM Check if .env.example file exists
if not exist .env.example (
    echo ❌ .env.example file not found!
    echo Please create a .env.example file with your production configuration.
    echo See PRODUCTION_SETUP.md for details.
    pause
    exit /b 1
)

echo ✅ .env.example file found

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build TypeScript
echo 🔨 Building TypeScript...
npm run build

REM Deploy to CELO Mainnet
echo 🌐 Deploying to CELO Mainnet...
npm run deploy:celo

REM Deploy to Ethereum Mainnet
echo 🌐 Deploying to Ethereum Mainnet...
npm run deploy:eth

REM Deploy to Base Mainnet
echo 🌐 Deploying to Base Mainnet...
npm run deploy:base

echo ✅ All deployments completed!
echo.
echo 🎯 Next steps:
echo 1. Fund your deployer wallet with USDC on each network
echo 2. Start the server: npm run server
echo 3. Test with: npm run cli
echo.
echo 💰 Project fees will be sent to: 0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a
echo 🎉 Ready for production!
pause
