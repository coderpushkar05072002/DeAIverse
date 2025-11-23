import { useMemo } from "react";
import * as E from "ethers";
// ABIs should exist in src/abis (we created placeholders earlier)
import TokenAbi from "../abis/Token.json";
import MarketAbi from "../abis/ComputeMarket.json";
import SbtAbi from "../abis/ReputationSBT.json";

const TOKEN_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MARKET_ADDR = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const SBT_ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

/**
 * useContracts(provider)
 * - provider: ethers provider (ethers v5 Web3Provider or ethers v6 BrowserProvider)
 * Returns: { token, market, sbt, createTask, acceptTask, submitResult, verifyAndRelease }
 */
export default function useContracts(provider?: any) {
  const signer = provider?.getSigner ? (async () => { try { return await provider.getSigner(); } catch { return null; } })() : null;

  // helpers to create contract depending on ethers version
  const makeContract = (addr: string, abi: any, s?: any) => {
    const ethersAny: any = E;
    if (ethersAny.Contract) {
      // ethers v5 or v6 both export Contract; v6 signature same as v5 for basic use
      try {
        return new ethersAny.Contract(addr, abi.abi || abi, s || provider);
      } catch (e) {
        // fallback to v5-style if weird
        return new ethersAny.Contract(addr, abi.abi || abi, s || provider);
      }
    }
    return null;
  };

  const token = useMemo(() => makeContract(TOKEN_ADDR, TokenAbi, provider?.getSigner ? provider.getSigner() : provider), [provider]);
  const market = useMemo(() => makeContract(MARKET_ADDR, MarketAbi, provider?.getSigner ? provider.getSigner() : provider), [provider]);
  const sbt = useMemo(() => makeContract(SBT_ADDR, SbtAbi, provider?.getSigner ? provider.getSigner() : provider), [provider]);

  async function createTask(consumerAddr: string, priceEth: string, datasetCid: string) {
    if (!market) throw new Error("Market contract not available");
    // priceEth is string like "0.01"
    const ethersAny: any = E;
    const price = ethersAny.utils ? ethersAny.utils.parseEther(priceEth) : (ethersAny.parseEther ? ethersAny.parseEther(priceEth) : priceEth);
    const tx = await market.createTask(consumerAddr, price, datasetCid);
    return tx.wait ? await tx.wait() : tx;
  }

  async function acceptTask(taskId: number) {
    if (!market) throw new Error("Market contract not available");
    const tx = await market.acceptTask(taskId);
    return tx.wait ? await tx.wait() : tx;
  }

  async function submitResult(taskId: number, resultCid: string) {
    if (!market) throw new Error("Market contract not available");
    const tx = await market.submitResult(taskId, resultCid);
    return tx.wait ? await tx.wait() : tx;
  }

  async function verifyAndRelease(taskId: number, ok: boolean) {
    if (!market) throw new Error("Market contract not available");
    const tx = await market.verifyAndRelease(taskId, ok);
    return tx.wait ? await tx.wait() : tx;
  }

  return { token, market, sbt, createTask, acceptTask, submitResult, verifyAndRelease };
}
