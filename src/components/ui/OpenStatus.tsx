"use client";

import { getOpenStatus } from "@/lib/hours";
import { useBrusselsTime } from "@/lib/use-brussels-time";

export function OpenStatus() {
  const now = useBrusselsTime();
  const status = now ? getOpenStatus(now) : null;
  return (
    <span role="status" className="eyebrow flex min-h-[18px] min-w-[22ch] items-center gap-2">
      <span aria-hidden="true" className={`size-2 shrink-0 ${status ? status.open ? "bg-turquoise" : "bg-closed" : "bg-rule"}`} />
      <span>{status?.label ?? "—"}</span>
    </span>
  );
}
