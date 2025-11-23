import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import useContracts from "../hooks/useContracts";

export default function ConsumerDashboard() {
  const { provider, account } = useWallet();
  const { createTask, getTask } = useContracts(provider);
  const [price, setPrice] = useState("0.01");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");
  const [lastTaskInfo, setLastTaskInfo] = useState<any>(null);

  const onCreate = async () => {
    if (!account) { setStatus("Connect wallet first"); return; }
    try {
      setStatus("Approving & sending tx...");
      const receipt = await createTask(account, price, cid);
      setStatus("Task created. Tx: " + (receipt.transactionHash || "no-tx-hash"));
      console.log("createTask receipt:", receipt);
      // try to read task 0 or emitted id if available (we try 0 as fallback)
      try {
        const maybe = await getTask(0);
        setLastTaskInfo(maybe);
        console.log("read task 0:", maybe);
      } catch (err) {
        console.log("getTask read failed:", err);
      }
    } catch (e:any) {
      setStatus("Error: " + (e?.message||String(e)));
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="text-3xl">Consumer — Create Task</h2>
      <div style={{marginTop:12}}>
        <label>Price (ETH): <input value={price} onChange={e=>setPrice(e.target.value)} /></label><br/><br/>
        <label>Dataset CID: <input value={cid} onChange={e=>setCid(e.target.value)} style={{width:"60%"}} /></label><br/>
        <button onClick={onCreate} style={{marginTop:12}}>Create Task</button>
      </div>
      <div style={{marginTop:16,color:"#9ca3af"}}>{status}</div>
      {lastTaskInfo && (
        <pre style={{marginTop:12,background:"#0b1220",padding:12,borderRadius:8}}>{JSON.stringify(lastTaskInfo,null,2)}</pre>
      )}
    </div>
  );
}
