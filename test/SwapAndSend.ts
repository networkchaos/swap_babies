import hre from "hardhat";
const { ethers } = hre;
import { expect } from "chai";
import * as dotenv from "dotenv";
dotenv.config({ path: '.env.example' });

describe("SwapAndSend (Celo Testnet)", function () {
  let swapContract: any;
  let owner: any;
  const routerAddr = process.env.ROUTER_CELO || "";
  const usdcAddr = process.env.USDC_CELO || "";
  const tokenAddr = process.env.TOKEN_CELO || "";
  const testRecipient = "0x1111111111111111111111111111111111111111";

  before(async () => {
    [owner] = await ethers.getSigners();
    console.log("Testing with account:", owner.address);
  });

  it("Should deploy the SwapAndSend contract successfully", async () => {
    const SwapAndSend = await ethers.getContractFactory("SwapAndSend");
    swapContract = await SwapAndSend.deploy(routerAddr);
    await swapContract.deployed();

    console.log("SwapAndSend deployed at:", swapContract.address);
    const currentOwner = await swapContract.owner();
    expect(currentOwner).to.equal(owner.address);
  });

  it("Should approve router and simulate swapUSDCForTokenAndSend()", async () => {
    const fakeAmountIn = ethers.utils.parseUnits("1", 6); // 1 USDC
    const fakeMinOut = 0;
    const fakeDeadline = Math.floor(Date.now() / 1000) + 60 * 10;

    const tx = await swapContract.swapUSDCForTokenAndSend(
      usdcAddr,
      fakeAmountIn,
      [usdcAddr, tokenAddr],
      testRecipient,
      fakeMinOut,
      fakeDeadline
    );
    await tx.wait();
    console.log("Swap simulated successfully (no revert)");
  });

  it("Should allow owner to rescue stuck ERC20 tokens", async () => {
    const tx = await swapContract.rescueERC20(usdcAddr, owner.address);
    await tx.wait();
    console.log("Rescue function executed successfully");
  });
});
