import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import useContracts from "../hooks/useContracts";

export default function ConsumerDashboard() {
  const { provider, account } = useWallet();
  const { createTask } = useContracts(provider);
  const [price, setPrice] = useState("0.01");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  const onCreate = async () => {
    if (!account) { setStatus("Connect wallet first"); return; }
    try {
      setStatus("Sending tx...");
      const receipt = await createTask(account, price, cid);
      setStatus("Task created. Tx: " + (receipt.transactionHash || JSON.stringify(receipt)));
      console.log("createTask receipt:", receipt);
    } catch (e:any) {
      setStatus("Error: " + (e?.message||String(e)));
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Consumer — Create Task</h2>
      <label>Price (ETH): <input value={price} onChange={e=>setPrice(e.target.value)} /></label><br/>
      <label>Dataset CID: <input value={cid} onChange={e=>setCid(e.target.value)} style={{width:"60%"}} /></label><br/>
      <button onClick={onCreate} style={{marginTop:10}}>Create Task</button>
      <div style={{marginTop:12}}>{status}</div>
    </div>
  );
}
