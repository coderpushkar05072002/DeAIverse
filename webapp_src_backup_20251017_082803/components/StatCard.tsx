import React from "react";

export function StatCard(props: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
      <div className="text-neutral-400 text-xs">{props.label}</div>
      <div className="mt-1 text-2xl font-semibold">{props.value}</div>
      {!!props.hint && <div className="mt-1 text-xs text-neutral-500">{props.hint}</div>}
    </div>
  );
}
