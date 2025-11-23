import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import useContracts from "../hooks/useContracts";

export default function ProviderDashboard() {
  const { provider } = useWallet();
  const { acceptTask, submitResult } = useContracts(provider);
  const [taskId, setTaskId] = useState("0");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  const onAccept = async () => {
    try {
      setStatus("Sending accept tx...");
      const receipt = await acceptTask(Number(taskId));
      setStatus("Accepted. Tx: " + (receipt.transactionHash || JSON.stringify(receipt)));
    } catch (e:any) {
      setStatus("Error: " + (e?.message || String(e)));
    }
  };

  const onSubmit = async () => {
    try {
      setStatus("Submitting result...");
      const receipt = await submitResult(Number(taskId), cid);
      setStatus("Submitted. Tx: " + (receipt.transactionHash || JSON.stringify(receipt)));
    } catch (e:any) {
      setStatus("Error: " + (e?.message || String(e)));
    }
  };

  return (
    <div>
      <h2 className="text-3xl">Provider — Accept & Submit</h2>
      <div style={{marginTop:12}}>
        <label>Task ID: <input value={taskId} onChange={e=>setTaskId(e.target.value)} /></label><br/><br/>
        <button onClick={onAccept}>Accept Task</button>
        <hr style={{margin:"12px 0"}}/>
        <label>Result CID: <input value={cid} onChange={e=>setCid(e.target.value)} style={{width:"60%"}} /></label><br/>
        <button onClick={onSubmit} style={{marginTop:8}}>Submit Result</button>
      </div>
      <div style={{marginTop:12,color:"#9ca3af"}}>{status}</div>
    </div>
  );
}
