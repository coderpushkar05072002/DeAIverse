import React from "react";
import useWallet from "../hooks/useWallet";
import { Wallet, LogOut } from "lucide-react";

export default function Header() {
  const { account, connect, disconnect } = useWallet();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg bg-[rgba(15,23,42,0.6)] border-b border-[rgba(255,255,255,0.1)] shadow-glow px-10 py-4 flex items-center justify-between"
    >
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#a855f7] tracking-tight">
        DeAI<span className="opacity-80">verse</span>
      </h1>

      <div className="flex items-center gap-4">
        {account ? (
          <>
            <span className="px-3 py-1 text-sm rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] text-white/80">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <button
              onClick={disconnect}
              className="flex items-center gap-2 bg-[rgba(255,255,255,0.08)] hover:bg-red-500/80 hover:shadow-[0_0_12px_#f87171] transition-all duration-300"
            >
              <LogOut size={16} /> Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={connect}
            className="flex items-center gap-2 from-[#6366f1] to-[#60a5fa] bg-gradient-to-r hover:shadow-[0_0_12px_#6366f1]"
          >
            <Wallet size={16} /> Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
