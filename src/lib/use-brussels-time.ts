"use client";

import { useEffect, useState } from "react";
import { getNowInBrussels, type BrusselsTime } from "./hours";

export function useBrusselsTime() {
  const [now, setNow] = useState<BrusselsTime | null>(null);
  useEffect(() => {
    const refresh = () => setNow(getNowInBrussels());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return now;
}
