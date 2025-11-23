import React from "react";

type HeaderProps = { account?: string | null; onConnect?: () => void; onDisconnect?: () => void };

export default function Header({ account, onConnect }: HeaderProps) {
  return (
    <header className="aur-header" role="banner">
      <div className="aur-header-inner">
        <div className="aur-brand" aria-label="brand">
          <div className="aur-logo-wrap" aria-hidden>
            {/* improved vector logo: gold ring + stylized A */}
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="aur-logo-svg">
              <defs>
                <radialGradient id="gA" cx="30%" cy="25%" r="85%">
                  <stop offset="0%" stopColor="#fff2d6" />
                  <stop offset="50%" stopColor="#f6d365" />
                  <stop offset="100%" stopColor="#b88700" />
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="rgba(255,210,120,0.03)" stroke="url(#gA)" strokeWidth="2.6"/>
              <path d="M22 44 L30 20 L42 44 L35 44 L32 34 L29 44 Z" fill="url(#gA)"/>
            </svg>
          </div>

          <div className="aur-brand-text">
            <div className="aur-title">AUREON Protocol</div>
            <div className="aur-sub">Decentralized Compute Economy</div>
          </div>
        </div>

        <div className="aur-actions">
          <button
            className="aur-btn aur-btn-gold"
            id="connect-wallet"
            onClick={() => (onConnect ? onConnect() : (window as any).ethereum?.request?.({ method: "eth_requestAccounts" }))}
            aria-label="Connect Wallet"
            title="Connect Wallet"
          >
            {account ? `${String(account).slice(0,6)}...${String(account).slice(-4)}` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
