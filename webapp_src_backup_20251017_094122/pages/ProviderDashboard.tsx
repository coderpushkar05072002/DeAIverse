import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import useContracts from "../hooks/useContracts";

export default function ProviderDashboard() {
  const { provider, account } = useWallet();
  const { acceptTask, submitResult } = useContracts(provider);
  const [taskId, setTaskId] = useState("");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  const onAccept = async () => {
    try {
      setStatus("Sending accept tx...");
      const receipt = await acceptTask(Number(taskId));
      setStatus("Accepted. Tx: " + (receipt.transactionHash || JSON.stringify(receipt)));
    } catch (e:any) {
      setStatus("Error: " + (e?.message||String(e)));
    }
  };

  const onSubmit = async () => {
    try {
      setStatus("Submitting result...");
      const receipt = await submitResult(Number(taskId), cid);
      setStatus("Submitted. Tx: " + (receipt.transactionHash || JSON.stringify(receipt)));
    } catch (e:any) {
      setStatus("Error: " + (e?.message||String(e)));
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Provider — Accept & Submit</h2>
      <label>Task ID: <input value={taskId} onChange={e=>setTaskId(e.target.value)} /></label><br/>
      <button onClick={onAccept} style={{marginTop:6}}>Accept Task</button>
      <hr/>
      <label>Result CID: <input value={cid} onChange={e=>setCid(e.target.value)} style={{width:"60%"}} /></label><br/>
      <button onClick={onSubmit} style={{marginTop:6}}>Submit Result</button>
      <div style={{marginTop:12}}>{status}</div>
    </div>
  );
}
