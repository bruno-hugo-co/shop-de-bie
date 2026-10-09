import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { loadBrandFont } from "@/lib/brand-image";

export const alt = home.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#0B2730", color: "#FFFFFF", fontFamily: "Instrument Sans" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 88, height: 88, background: "#1BB0CE", color: "#0B2730", fontSize: 58, fontWeight: 700, letterSpacing: "-0.04em" }}>{home.brand.mark}</div>
        <span style={{ fontSize: 42, fontWeight: 700 }}>{home.business.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.92, fontWeight: 600, letterSpacing: "-0.035em", transform: "scaleX(1.04)", transformOrigin: "left" }}>
        {home.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
      </div>
      <span style={{ fontSize: 26, color: "#C5D3D7" }}>{home.hero.eyebrow}</span>
    </div>,
    { ...size, fonts: [
      { name: "Instrument Sans", data: await loadBrandFont(600), weight: 600, style: "normal" },
      { name: "Instrument Sans", data: await loadBrandFont(700), weight: 700, style: "normal" },
    ] },
  );
}
