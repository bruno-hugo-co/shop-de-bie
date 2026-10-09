import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home } from "@/content/home";

export async function loadBrandFont(weight: 600 | 700) {
  return readFile(join(process.cwd(), `src/assets/fonts/instrument-sans-condensed-${weight}.ttf`));
}

export async function createBrandIcon(size: number) {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#1BB0CE", color: "#0B2730", fontFamily: "Instrument Sans", fontSize: size * 0.65, fontWeight: 700, letterSpacing: "-0.04em" }}>
      <span style={{ transform: "scaleX(1.04)" }}>{home.brand.mark}</span>
    </div>,
    { width: size, height: size, fonts: [{ name: "Instrument Sans", data: await loadBrandFont(700), weight: 700, style: "normal" }] },
  );
}
