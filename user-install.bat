@echo off
echo 🚀 Swap Babies CLI - User Installer
echo ===================================
echo.
echo This installs Swap Babies CLI for buying crypto with M-Pesa
echo You will connect to pre-deployed smart contracts
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this installer again.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo Please install Git from https://git-scm.com/
    echo Then run this installer again.
    pause
    exit /b 1
)

echo ✅ Git found
echo.

REM Clone the repository
echo 📦 Downloading Swap Babies CLI...
if exist swap_babies_cli (
    echo Folder already exists. Updating...
    cd swap_babies_cli
    git pull
) else (
    git clone https://github.com/networkchaos/swap_babies.git swap_babies_cli
    cd swap_babies_cli
)

echo.
echo 📦 Installing dependencies...
npm install

echo.
echo 🔧 Setting up environment...
if not exist .env.example (
    echo ❌ .env.example not found!
    pause
    exit /b 1
)

copy .env.example .env >nul 2>&1

echo.
echo ✅ Installation complete!
echo.
echo 🎯 You can now buy crypto with M-Pesa!
echo.
echo 📖 How to use:
echo 1. Run: npm run cli
echo 2. Follow the prompts
echo 3. Pay with M-Pesa
echo 4. Receive tokens in your wallet!
echo.
echo 💰 Note: This connects to pre-deployed contracts
echo You cannot deploy your own contracts - you only use the system
echo.
echo Press any key to start buying crypto...
pause >nul

npm run cli
