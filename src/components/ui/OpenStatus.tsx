"use client";

import { getOpenStatus } from "@/lib/hours";
import { useBrusselsTime } from "@/lib/use-brussels-time";

export function OpenStatus({ variant = "badge" }: { variant?: "badge" | "inline" }) {
  const now = useBrusselsTime();
  const status = now ? getOpenStatus(now) : null;
  return (
    <span role="status" aria-live={variant === "inline" ? "off" : "polite"} className={variant === "inline" ? "flex min-w-[150px] items-center gap-2 text-sm leading-[normal] font-medium" : "flex min-h-9 min-w-[175px] items-center gap-[10px] rounded-full bg-white px-4 py-[9px] text-[15px] leading-[normal] font-semibold shadow-status"}>
      <span aria-hidden="true" className={`${variant === "inline" ? "size-2" : "size-[9px]"} shrink-0 rounded-full ${status ? status.open ? "bg-green" : "bg-orange" : "bg-rule"}`} />
      <span>{status?.label ?? "—"}</span>
    </span>
  );
}
