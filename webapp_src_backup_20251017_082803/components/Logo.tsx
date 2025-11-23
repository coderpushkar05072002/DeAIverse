export function Logo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-brand/40 grid place-items-center">
        <span className="text-xl">⚡</span>
      </div>
      <div className="leading-tight">
        <div className="font-semibold">DeAI Verse</div>
        <div className="text-xs text-mute">Decentralized Compute Marketplace</div>
      </div>
    </div>
  );
}
