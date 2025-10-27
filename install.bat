@echo off
echo 🚀 Swap Babies CLI - Easy Installer
echo ===================================
echo.
echo This will install Swap Babies CLI for buying crypto with M-Pesa
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
echo 🎯 Next steps:
echo 1. Edit .env file with your M-Pesa credentials
echo 2. Run: npm run cli
echo.
echo 📖 For help, see README.md
echo.
echo Press any key to start the CLI...
pause >nul

npm run cli
