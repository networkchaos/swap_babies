import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from "dotenv";
import * as ethers from "ethers";
dotenv.config({ path: '.env.example' });

const app = express();
app.use(bodyParser.json());

const MPESA_ENV = process.env.MPESA_ENV || "sandbox";
const MPESA_BASE = MPESA_ENV === "sandbox" ? "https://sandbox.safaricom.co.ke" : "https://api.safaricom.co.ke";
const OAUTH_URL = `${MPESA_BASE}/oauth/v1/generate?grant_type=client_credentials`;
const STK_URL = `${MPESA_BASE}/mpesa/stkpush/v1/processrequest`;

const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const PLATFORM_ADDRESS = process.env.PLATFORM_ADDRESS!;
const PROJECT_WALLET = process.env.PROJECT_WALLET || "0x33741cA127Df8256bDB24cD0f7B7aE91cdB6536a";
const MIN_AMOUNT_KES = Number(process.env.MIN_AMOUNT_KES || 150);
const FEE_PERCENT = Number(process.env.FEE_PERCENT || 1);
const PROJECT_FEE_PERCENT = Number(process.env.PROJECT_FEE_PERCENT || 0.5);
const SLIPPAGE_PERCENT = Number(process.env.SLIPPAGE_PERCENT || 2);
const KES_PER_USD = Number(process.env.KES_PER_USD || 150);

// RPC providers
const providers: Record<string, ethers.JsonRpcProvider> = {
  celo: new ethers.JsonRpcProvider(process.env.CELO_RPC || "https://alfajores-forno.celo-testnet.org"),
  ethereum: new ethers.JsonRpcProvider(process.env.ETH_RPC || "https://sepolia.infura.io/v3/your_key"),
  base: new ethers.JsonRpcProvider(process.env.BASE_RPC || "https://sepolia.base.org"),
};

const wallet = new ethers.Wallet(PRIVATE_KEY);

// Simple in-memory pending map: checkoutId -> {phone, amountKES, chain, token, recipient}
const pending = new Map<string, any>();

/** MPESA helpers **/
async function getMpesaToken() {
  const b = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`);
  const auth = `Basic ${b.toString("base64")}`;
  const res = await axios.get(OAUTH_URL, { headers: { Authorization: auth } });
  return res.data.access_token;
}

function timestamp() {
  const d = new Date();
  const YYYY = d.getUTCFullYear().toString();
  const MM = String(d.getUTCMonth()+1).padStart(2,'0');
  const DD = String(d.getUTCDate()).padStart(2,'0');
  const hh = String(d.getUTCHours()).padStart(2,'0');
  const mm = String(d.getUTCMinutes()).padStart(2,'0');
  const ss = String(d.getUTCSeconds()).padStart(2,'0');
  return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
}

async function stkPush(phone: string, amountKES: number, accountRef: string, callbackUrl: string) {
  const token = await getMpesaToken();
  const ts = timestamp();
  const passString = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${ts}`;
  const pw = Buffer.from(passString).toString('base64');

  const body = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: pw,
    Timestamp: ts,
    TransactionType: "CustomerPayBillOnline",
    Amount: amountKES,
    PartyA: phone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: accountRef,
    TransactionDesc: "mpesa swap"
  };

  const resp = await axios.post(STK_URL, body, { headers: { Authorization: `Bearer ${token}` } });
  return resp.data; // includes CheckoutRequestID
}

/** Express endpoints **/
export async function startServer(port = 3000) {
  // Public endpoint to request STK push (client will call)
  app.post('/stk/push', async (req: any, res: any) => {
    const { phone, amountKES, chain, tokenAddress, recipient } = req.body;
    if (!phone || !amountKES || !chain || !tokenAddress || !recipient) return res.status(400).send("missing");
    if (amountKES < MIN_AMOUNT_KES) return res.status(400).send({ error: `Min amount is ${MIN_AMOUNT_KES} KES` });

    const accountRef = `swap-${Date.now()}`;
    const callbackUrl = `${process.env.MPESA_CALLBACK_BASE}/mpesa/callback`;
    try {
      const data = await stkPush(phone, amountKES, accountRef, callbackUrl);
      // store pending with CheckoutRequestID or MerchantRequestID (sandbox returns CheckoutRequestID)
      const checkout = data.CheckoutRequestID || data.MerchantRequestID || null;
      pending.set(checkout, { phone, amountKES, chain, tokenAddress, recipient, accountRef });
      return res.send({ ok: true, data });
    } catch (err: any) {
      console.error(err?.response?.data || err.message);
      return res.status(500).send({ error: 'stk push failed', details: err?.response?.data || err.message });
    }
  });

  // Daraja will POST here with payment result
  app.post('/mpesa/callback', async (req: any, res: any) => {
    // respond quickly to Daraja
    res.status(200).send({ ResultCode: 0, ResultDesc: 'Accepted' });

    try {
      const body = req.body;
      // extract checkout / amount from callback payload format (daraja wraps in Body.stkCallback)
      const callback = body.Body?.stkCallback || body.Body?.stkcallback || body;
      const checkoutId = callback.CheckoutRequestID || callback.MerchantRequestID;
      const resultCode = callback.ResultCode;
      // find our pending
      const pendingObj = pending.get(checkoutId);
      if (!pendingObj) {
        console.warn("unknown checkoutId", checkoutId);
        return;
      }
      // success only if resultCode == 0
      if (resultCode === 0) {
        // extract Amount from CallbackMetadata.Items (daraja format)
        const items = callback.CallbackMetadata?.Item || callback.CallbackMetadata?.Items || [];
        const amountItem = items.find((i:any) => i.Name === "Amount");
        const paidAmount = amountItem ? Number(amountItem.Value) : pendingObj.amountKES;
        console.log("Payment confirmed:", paidAmount, "KES for", checkoutId);

        // now process swap+send
        await processSwapAndSend(pendingObj.chain, paidAmount, pendingObj.tokenAddress, pendingObj.recipient);
        pending.delete(checkoutId);
      } else {
        console.warn("payment failed resultCode:", resultCode, callback.ResultDesc);
        pending.delete(checkoutId);
      }
    } catch (e) {
      console.error("callback processing error", e);
    }
  });

  app.listen(port, () => console.log(`Server started on ${port}`));
}

/** CLI helper */
export async function triggerStkPushCLI(phone: string, amount: number, chain: string, token: string, recipient: string) {
  const callbackUrl = `${process.env.MPESA_CALLBACK_BASE}/mpesa/callback`;
  const result = await stkPush(phone, amount, `swap-cli-${Date.now()}`, callbackUrl);
  console.log("STK triggered:", result);
}

/** Swap+send core function */
async function processSwapAndSend(chain: string, paidKES: number, targetToken: string, recipient: string) {
  // convert KES -> USD -> USDC units (USDC has 6 decimals)
  const usd = paidKES / KES_PER_USD;
  const usdcDecimals = 6;
  const usdcAmountUnits = Math.floor(usd * (10 ** usdcDecimals));

  // Calculate fees
  const platformFeeUnits = Math.floor(usdcAmountUnits * (FEE_PERCENT / 100));
  const projectFeeUnits = Math.floor(usdcAmountUnits * (PROJECT_FEE_PERCENT / 100));
  const totalFees = platformFeeUnits + projectFeeUnits;
  const amountForSwap = usdcAmountUnits - totalFees;
  
  if (amountForSwap <= 0) throw new Error("amount too small after fees");

  // Choose provider and tokens per chain
  const provider = providers[chain];
  if (!provider) throw new Error("unsupported chain");
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Get addresses based on chain
  const usdcAddress = getUSDCAddress(chain);
  const routerAddr = getRouterAddress(chain);
  const wethAddress = getWETHAddress(chain);

  const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)"
  ];
  const ROUTER_ABI = [
    "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
    "function swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)",
    "function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)"
  ];

  const usdc = new ethers.Contract(usdcAddress, ERC20_ABI, signer);
  const router = new ethers.Contract(routerAddr, ROUTER_ABI, signer);

  // check server USDC balance
  const balance = await usdc.balanceOf(signer.address);
  if (balance < BigInt(amountForSwap)) {
    throw new Error(`insufficient USDC in server wallet. need ${amountForSwap} units`);
  }

  // Send fees to respective wallets
  if (platformFeeUnits > 0) {
    await usdc.transfer(PLATFORM_ADDRESS, platformFeeUnits);
  }
  if (projectFeeUnits > 0) {
    await usdc.transfer(PROJECT_WALLET, projectFeeUnits);
  }

  // approve router
  const allowance = await usdc.allowance(signer.address, routerAddr);
  if (allowance < BigInt(amountForSwap)) {
    const tx = await usdc.approve(routerAddr, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    await tx.wait();
  }

  // Check if target is ETH (0x0000000000000000000000000000000000000000)
  const isETH = targetToken === "0x0000000000000000000000000000000000000000";
  
  let swapTx;
  const deadline = Math.floor(Date.now()/1000) + 60*10;

  if (isETH) {
    // Swap USDC -> ETH
    const path = [usdcAddress, wethAddress];
    const amountsOut = await router.getAmountsOut(amountForSwap, path);
    const expectedOut = amountsOut[amountsOut.length - 1];
    const slippageFactor = Math.max(0, 1 - (SLIPPAGE_PERCENT/100));
    const minOut = BigInt(expectedOut) * BigInt(Math.floor(slippageFactor * 100)) / BigInt(100);

    swapTx = await router.swapExactTokensForETH(
      amountForSwap,
      minOut,
      path,
      recipient,
      deadline,
      { gasLimit: 800000 }
    );
  } else {
    // Swap USDC -> target token
    const path = [usdcAddress, targetToken];
    const amountsOut = await router.getAmountsOut(amountForSwap, path);
    const expectedOut = amountsOut[amountsOut.length - 1];
    const slippageFactor = Math.max(0, 1 - (SLIPPAGE_PERCENT/100));
    const minOut = BigInt(expectedOut) * BigInt(Math.floor(slippageFactor * 100)) / BigInt(100);

    swapTx = await router.swapExactTokensForTokens(
      amountForSwap,
      minOut,
      path,
      recipient,
      deadline,
      { gasLimit: 800000 }
    );
  }

  const receipt = await swapTx.wait();
  console.log("Swap tx done:", receipt.transactionHash);
}

// Helper functions to get addresses based on chain
function getUSDCAddress(chain: string): string {
  switch (chain) {
    case 'celo': return process.env.USDC_CELO!;
    case 'ethereum': return process.env.USDC_ETH!;
    case 'base': return process.env.USDC_BASE!;
    default: throw new Error(`Unsupported chain: ${chain}`);
  }
}

function getRouterAddress(chain: string): string {
  switch (chain) {
    case 'celo': return process.env.ROUTER_CELO!;
    case 'ethereum': return process.env.ROUTER_ETH!;
    case 'base': return process.env.ROUTER_BASE!;
    default: throw new Error(`Unsupported chain: ${chain}`);
  }
}

function getWETHAddress(chain: string): string {
  switch (chain) {
    case 'celo': return process.env.WETH_CELO!;
    case 'ethereum': return process.env.WETH_ETH!;
    case 'base': return process.env.WETH_BASE!;
    default: throw new Error(`Unsupported chain: ${chain}`);
  }
}
