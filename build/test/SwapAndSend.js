"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe("SwapAndSend (Celo Testnet)", function () {
    let swapContract;
    let owner;
    const routerAddr = process.env.ROUTER_CELO || "";
    const usdcAddr = process.env.USDC_CELO || "";
    const tokenAddr = process.env.TOKEN_CELO || "";
    const testRecipient = "0x1111111111111111111111111111111111111111";
    before(async () => {
        [owner] = await hardhat_1.ethers.getSigners();
        console.log("Testing with account:", owner.address);
    });
    it("Should deploy the SwapAndSend contract successfully", async () => {
        const SwapAndSend = await hardhat_1.ethers.getContractFactory("SwapAndSend");
        swapContract = await SwapAndSend.deploy(routerAddr);
        await swapContract.deployed();
        console.log("SwapAndSend deployed at:", swapContract.address);
        const currentOwner = await swapContract.owner();
        (0, chai_1.expect)(currentOwner).to.equal(owner.address);
    });
    it("Should approve router and simulate swapUSDCForTokenAndSend()", async () => {
        const fakeAmountIn = hardhat_1.ethers.utils.parseUnits("1", 6); // 1 USDC
        const fakeMinOut = 0;
        const fakeDeadline = Math.floor(Date.now() / 1000) + 60 * 10;
        const tx = await swapContract.swapUSDCForTokenAndSend(usdcAddr, fakeAmountIn, [usdcAddr, tokenAddr], testRecipient, fakeMinOut, fakeDeadline);
        await tx.wait();
        console.log("Swap simulated successfully (no revert)");
    });
    it("Should allow owner to rescue stuck ERC20 tokens", async () => {
        const tx = await swapContract.rescueERC20(usdcAddr, owner.address);
        await tx.wait();
        console.log("Rescue function executed successfully");
    });
});
//# sourceMappingURL=SwapAndSend.js.map