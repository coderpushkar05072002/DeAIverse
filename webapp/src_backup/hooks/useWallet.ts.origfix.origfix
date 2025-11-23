import { useEffect, useState, useCallback } from "react";
// import everything so we can feature-detect across ethers versions
import * as E from "ethers";
declare global { interface Window { ethereum?: any } }

/**
 * Version-tolerant useWallet hook that supports ethers v5 + v6.
 * - Works with ethers.providers.Web3Provider (v5)
 * - Works with ethers.BrowserProvider (v6)
 */
export default function useWallet() {
  // provider is typed as any to accept both provider flavors
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!window.ethereum) throw new Error("No Ethereum provider found (install MetaMask)");

      // Feature-detect ethers version API
      const ethersAny: any = E;
      let web3Provider: any = null;

      if (ethersAny.providers && ethersAny.providers.Web3Provider) {
        // ethers v5 style
        web3Provider = new ethersAny.providers.Web3Provider(window.ethereum, "any");
        setProvider(web3Provider);
        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (!Array.isArray(accounts) || accounts.length === 0) throw new Error("No accounts returned by wallet");
        setAccount(ethersAny.utils.getAddress(accounts[0]));
        const net = await web3Provider.getNetwork();
        setChainId(net.chainId);
      } else if (ethersAny.BrowserProvider) {
        // ethers v6 style
        web3Provider = new ethersAny.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        // BrowserProvider.getSigner() is async in v6 and returns a signer with getAddress()
        // We attempt to request accounts explicitly for better UX & compatibility
        try {
          const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
          if (Array.isArray(accounts) && accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            // fallback to signer if eth_requestAccounts didn't return (rare)
            const signer = await web3Provider.getSigner();
            const addr = await signer.getAddress();
            setAccount(addr);
          }
        } catch {
          const signer = await web3Provider.getSigner();
          const addr = await signer.getAddress();
          setAccount(addr);
        }
        // network info (BrowserProvider has getNetwork)
        try {
          const net = await web3Provider.getNetwork();
          setChainId(net?.chainId ?? null);
        } catch {}
      } else {
        throw new Error("Unsupported ethers version (no Web3Provider or BrowserProvider found)");
      }

      // listeners
      window.ethereum.on?.("accountsChanged", (accs: string[]) => {
        if (!Array.isArray(accs) || accs.length === 0) setAccount(null);
        else setAccount(accs[0]);
      });

      window.ethereum.on?.("chainChanged", (hex: string) => {
        try { setChainId(parseInt(hex, 16)); } catch { setChainId(null); }
      });

    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setError(null);
  }, []);

  useEffect(() => {
    (async () => {
      if (!window.ethereum) return;
      try {
        const ethersAny: any = E;
        // Try to hydrate account if user already connected
        const accs: string[] = await window.ethereum.request({ method: "eth_accounts" });
        if (Array.isArray(accs) && accs.length > 0) {
          setAccount(accs[0]);
          // create provider instance to populate network
          if (ethersAny.providers && ethersAny.providers.Web3Provider) {
            const p = new ethersAny.providers.Web3Provider(window.ethereum, "any");
            setProvider(p);
            const net = await p.getNetwork();
            setChainId(net.chainId);
          } else if (ethersAny.BrowserProvider) {
            const p = new ethersAny.BrowserProvider(window.ethereum);
            setProvider(p);
            try { const net = await p.getNetwork(); setChainId(net?.chainId ?? null); } catch {}
          }
        }
      } catch {}
    })();

    return () => {
      try {
        window.ethereum?.removeListener?.("accountsChanged", () => {});
        window.ethereum?.removeListener?.("chainChanged", () => {});
      } catch {}
    };
  }, []);

  return { provider, account, chainId, loading, error, connect, disconnect };
}
