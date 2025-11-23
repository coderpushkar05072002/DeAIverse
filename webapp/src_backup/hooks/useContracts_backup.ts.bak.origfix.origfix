import { useMemo } from "react";
import * as E from "ethers";
import TokenAbi from "../abis/Token.json";
import MarketAbi from "../abis/ComputeMarket.json";
import SbtAbi from "../abis/ReputationSBT.json";

const TOKEN_ADDR = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const MARKET_ADDR = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const SBT_ADDR = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function ensureAbi(abi:any){ return abi?.abi ? abi.abi : abi; }

export default function useContracts(provider?: any) {
  const signer = provider && provider.getSigner ? provider.getSigner() : null;

  const make = (addr:string, abi:any, s?:any) => {
    const ABI = ensureAbi(abi);
    try {
      const ctor: any = (E as any).Contract || E.Contract;
      return new ctor(addr, ABI, s || provider);
    } catch (e) {
      console.warn("make contract fallback", e);
      return null;
    }
  };

  const token = useMemo(()=> make(TOKEN_ADDR, TokenAbi, signer), [provider]);
  const market = useMemo(()=> {
    const m = make(MARKET_ADDR, MarketAbi, signer);
    try {
      // expose for debugging in browser console
      (window as any).__market = m;
      console.log("?? Available market keys:", m ? Object.keys(m).slice(0,200) : "market null");
    } catch(e){ console.warn("expose failed", e) }
    return m;
  }, [provider]);
  const sbt = useMemo(()=> make(SBT_ADDR, SbtAbi, signer), [provider]);

  function ensureMethod(obj:any, name:string) {
    if (!obj) throw new Error("Contract instance missing for method: "+name);
    if (typeof obj[name] !== "function") {
      console.error(`Method missing on contract: ${name}. Available keys:`, Object.keys(obj).slice(0,200));
      throw new Error(`Contract method not found: ${name}`);
    }
  }

  async function createTask(consumerAddr:string, priceEth:string, datasetCid:string) {
    if (!market) throw new Error("Market contract missing");
    ensureMethod(market, "createTask");
    const utils:any = (E as any).utils || E.utils;
    const price = utils ? utils.parseEther(priceEth) : priceEth;
    const tx = await market.createTask(consumerAddr, price, datasetCid);
    return tx.wait ? await tx.wait() : tx;
  }

  async function acceptTask(taskId:number) {
    if (!market) throw new Error("Market contract missing");
    ensureMethod(market, "acceptTask");
    const tx = await market.acceptTask(taskId);
    return tx.wait ? await tx.wait() : tx;
  }

  async function submitResult(taskId:number, resultCid:string) {
    if (!market) throw new Error("Market contract missing");
    ensureMethod(market, "submitResult");
    const tx = await market.submitResult(taskId, resultCid);
    return tx.wait ? await tx.wait() : tx;
  }

  async function verifyAndRelease(taskId:number, ok:boolean) {
    if (!market) throw new Error("Market contract missing");
    ensureMethod(market, "verifyAndRelease");
    const tx = await market.verifyAndRelease(taskId, ok);
    return tx.wait ? await tx.wait() : tx;
  }

  async function getTask(taskId:number) {
    if (!market) throw new Error("Market contract missing");
    for (const fn of ["tasks","getTask","tasksById"]) {
      try {
        if (typeof market[fn] === "function") {
          const r = await market[fn](taskId);
          return r;
        }
      } catch {}
    }
    throw new Error("No compatible view found on Market contract");
  }

  return { token, market, sbt, createTask, acceptTask, submitResult, verifyAndRelease, getTask };
}
