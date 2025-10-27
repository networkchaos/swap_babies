@echo off
echo 🚀 Swap Babies CLI - Live Contract Deployment
echo ============================================
echo.
echo This will deploy contracts to LIVE MAINNETS
echo Make sure you have:
echo - Sufficient ETH/CELO for gas fees
echo - USDC in your deployer wallet
echo - Correct .env.example configuration
echo.
set /p confirm="Are you sure you want to deploy to MAINNET? (yes/no): "
if not "%confirm%"=="yes" (
    echo Deployment cancelled.
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying to CELO Mainnet...
npx hardhat run scripts/deploy.ts --network celo
if %errorlevel% neq 0 (
    echo ❌ CELO deployment failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying to Ethereum Mainnet...
npx hardhat run scripts/deploy.ts --network ethereum
if %errorlevel% neq 0 (
    echo ❌ Ethereum deployment failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying to Base Mainnet...
npx hardhat run scripts/deploy.ts --network base
if %errorlevel% neq 0 (
    echo ❌ Base deployment failed!
    pause
    exit /b 1
)

echo.
echo ✅ All contracts deployed successfully!
echo.
echo 📋 Contract Addresses:
echo - Check the output above for deployed addresses
echo - Save these addresses for your .env.example file
echo.
echo 🎯 Next steps:
echo 1. Update .env.example with contract addresses
echo 2. Fund contracts with USDC for swaps
echo 3. Test with small amounts first
echo 4. Start accepting payments!
echo.
echo 💰 Project fees will go to: 0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a
echo.
pause
