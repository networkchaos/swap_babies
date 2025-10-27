#!/bin/bash

echo "🚀 Swap Babies CLI - Easy Installer"
echo "==================================="
echo ""
echo "This will install Swap Babies CLI for buying crypto with M-Pesa"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this installer again."
    exit 1
fi

echo "✅ Node.js found"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "Please install Git from https://git-scm.com/"
    echo "Then run this installer again."
    exit 1
fi

echo "✅ Git found"
echo ""

# Clone the repository
echo "📦 Downloading Swap Babies CLI..."
if [ -d "swap_babies_cli" ]; then
    echo "Folder already exists. Updating..."
    cd swap_babies_cli
    git pull
else
    git clone https://github.com/networkchaos/swap_babies.git swap_babies_cli
    cd swap_babies_cli
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example not found!"
    exit 1
fi

cp .env.example .env

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env file with your M-Pesa credentials"
echo "2. Run: npm run cli"
echo ""
echo "📖 For help, see README.md"
echo ""
echo "Press any key to start the CLI..."
read -n 1 -s

npm run cli
