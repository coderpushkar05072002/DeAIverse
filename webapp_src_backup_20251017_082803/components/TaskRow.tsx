import React, { useState } from "react";
import { acceptTask, startTask, submitTask, verifyTask, Task } from "../lib/api";

export default function TaskRow({ t, onChanged }: { t: Task; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [cid, setCid] = useState("");

  const run = async (fn: () => Promise<any>) => {
    try { setBusy(true); await fn(); onChanged(); }
    catch (e) { console.error(e); alert(String(e)); }
    finally { setBusy(false); }
  };

  return (
    <tr className="border-b border-neutral-800">
      <td className="py-3 px-2">{t.id}</td>
      <td className="py-3 px-2 text-xs">{t.consumer}</td>
      <td className="py-3 px-2 text-xs">{t.provider}</td>
      <td className="py-3 px-2">{t.price}</td>
      <td className="py-3 px-2">
        <span className="inline-flex items-center rounded-md border border-neutral-700 px-2 py-0.5 text-xs">
          {t.statusName ?? t.status}
        </span>
      </td>
      <td className="py-3 px-2 text-xs">{t.datasetCID}</td>
      <td className="py-3 px-2 text-xs">{t.resultCID}</td>
      <td className="py-3 px-2">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm disabled:opacity-50"
                  disabled={busy} onClick={() => run(() => acceptTask(t.id))}>Accept</button>
          <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm disabled:opacity-50"
                  disabled={busy} onClick={() => run(() => startTask(t.id))}>Start</button>
          <div className="flex items-center gap-2">
            <input className="px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm w-36"
                   placeholder="result CID…" value={cid} onChange={(e) => setCid(e.target.value)} />
            <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm disabled:opacity-50"
                    disabled={busy || !cid} onClick={() => run(() => submitTask(t.id, cid))}>Submit</button>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm disabled:opacity-50"
                  disabled={busy} onClick={() => run(() => verifyTask(t.id, true))}>Verify ✓</button>
        </div>
      </td>
    </tr>
  );
}
