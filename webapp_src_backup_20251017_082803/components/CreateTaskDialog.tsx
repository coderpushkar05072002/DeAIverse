import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";

export type CreateTaskData = { priceWei: string; datasetCID: string; deadline: number; };

export function CreateTaskDialog({ open, onClose, onSubmit }:{
  open:boolean; onClose:()=>void; onSubmit:(d:CreateTaskData)=>Promise<void>;
}){
  const [priceWei,setPriceWei]=useState("1000000000000000000");
  const [datasetCID,setDatasetCID]=useState("ipfs://dataset-abc");
  const [deadline,setDeadline]=useState(0);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState<string|null>(null);

  const submit=async()=>{
    try{
      setErr(null); setLoading(true);
      await onSubmit({priceWei,datasetCID,deadline:Number(deadline)});
      onClose();
    }catch(e:any){ setErr(e?.message ?? String(e)); }
    finally{ setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Task">
      <div className="space-y-3">
        <Input label="Price (wei)" value={priceWei} onChange={e=>setPriceWei(e.target.value)} />
        <Input label="Dataset CID" value={datasetCID} onChange={e=>setDatasetCID(e.target.value)} />
        <Input label="Deadline (unix, 0 = none)" type="number" value={deadline} onChange={e=>setDeadline(Number(e.target.value))}/>
        {err && <div className="text-danger text-sm">{err}</div>}
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={submit} disabled={loading}>{loading? "Creating..." : "Create"}</Button>
      </div>
    </Modal>
  );
}
