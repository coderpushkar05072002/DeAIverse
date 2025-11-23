import { Task } from "../types";
import { StatusBadge } from "./Badge";

const NAMES = ["Created","Accepted","Running","Submitted","Verified","Cancelled"];

export function TaskCard({ t }: { t: Task }) {
  const color = t.status===4 ? "success" : t.status===3 ? "warn" : "muted";
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-400">Task #{t.id}</div>
        <StatusBadge color={color as any}>{t.statusName ?? NAMES[t.status]}</StatusBadge>
      </div>
      <div className="text-sm space-y-1">
        <div className="truncate"><span className="text-neutral-500">Consumer:</span> {t.consumer}</div>
        <div className="truncate"><span className="text-neutral-500">Provider:</span> {t.provider || "-"}</div>
        <div><span className="text-neutral-500">Price (wei):</span> {t.price}</div>
        <div className="truncate"><span className="text-neutral-500">Dataset:</span> {t.datasetCID}</div>
        {t.resultCID && <div className="truncate"><span className="text-neutral-500">Result:</span> {t.resultCID}</div>}
      </div>
    </div>
  );
}
