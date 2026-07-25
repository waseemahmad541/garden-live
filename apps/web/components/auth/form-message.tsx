export function FormMessage({ type, children }: { type: "success" | "error" | "info"; children: React.ReactNode }) {
  const classes = {
    success: "border-[#BEE3C8] bg-[#F0FAF2] text-[#1D6B3A]",
    error: "border-[#F2C6C2] bg-[#FFF4F2] text-status-error",
    info: "border-[#DDE5DC] bg-neutral-cloud text-neutral-slate"
  };

  return <div className={`rounded-gl border px-3 py-2 text-sm ${classes[type]}`}>{children}</div>;
}
