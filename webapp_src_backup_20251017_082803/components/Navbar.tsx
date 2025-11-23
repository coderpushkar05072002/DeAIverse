import React from "react";

export default function Navbar({ backendOnline }: { backendOnline: boolean }) {
  return (
    <header style={{position:"sticky",top:0,zIndex:30,backdropFilter:"blur(6px)",background:"rgba(0,0,0,0.6)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{height:36,width:36,borderRadius:8,background:"#6d28d9",display:"grid",placeItems:"center",color:"#fff",fontWeight:700}}>Δ</div>
          <div style={{fontWeight:600}}>DeAI Verse</div>
          <div style={{marginLeft:12,fontSize:12,display:"inline-flex",alignItems:"center",gap:8,padding:"4px 8px",borderRadius:8,border:"1px solid rgba(255,255,255,0.04)"}}>
            <div style={{height:8,width:8,borderRadius:8,background: backendOnline ? "#22c55e" : "#f59e0b"}} />
            <span>{backendOnline ? "Backend: Online" : "Backend: Offline"}</span>
          </div>
        </div>
        <div style={{fontSize:12,opacity:0.85}}>Chain: 1337</div>
      </div>
    </header>
  );
}
