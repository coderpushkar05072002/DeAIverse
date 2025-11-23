import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
  const [health, setHealth] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/health");
        const txt = await res.text();
        try {
          setHealth(JSON.parse(txt));
        } catch {
          // If /health served HTML (vite index), show informative error
          setErr("/health did not return JSON. Is backend running on :5001 and VITE proxy configured?");
        }
      } catch (e: any) {
        setErr(String(e));
      }
    })();
  }, []);

  return (
    <div style={{minHeight:"100vh",background:"#0b0b0b",color:"#fff",padding:20}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{height:40,width:40,borderRadius:8,background:"#6d28d9",display:"grid",placeItems:"center"}}>Δ</div>
          <div style={{fontWeight:600}}>DeAI Verse</div>
        </div>
        <ConnectButton />
      </header>

      <main style={{marginTop:24}}>
        <h2>Backend status</h2>
        {err && <div style={{color:"salmon"}}>Error: {err}</div>}
        {!err && !health && <div>Loading /health…</div>}
        {health && <pre style={{background:"#111",padding:12,borderRadius:8}}>{JSON.stringify(health,null,2)}</pre>}
      </main>
    </div>
  );
}
