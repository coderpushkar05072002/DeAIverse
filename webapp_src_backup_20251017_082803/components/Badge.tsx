type BadgeProps = { color?: "success"|"warn"|"danger"|"muted"; children: React.ReactNode; };
export function StatusBadge({ color="muted", children }: BadgeProps){
  const map:any = { success:"bg-green-500/15 text-green-300 border-green-500/30",
                    warn:"bg-amber-500/15 text-amber-300 border-amber-500/30",
                    danger:"bg-red-500/15 text-red-300 border-red-500/30",
                    muted:"bg-neutral-800 text-neutral-300 border-neutral-700" };
  return <span className={`badge ${map[color]}`}>{children}</span>;
}
