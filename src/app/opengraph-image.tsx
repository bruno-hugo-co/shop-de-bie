import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/site/LogoMark";
import { home } from "@/content/home";
import { loadBrandFont } from "@/lib/brand-image";

export const alt = home.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#0B2730", color: "#FFFFFF", fontFamily: "Instrument Sans" }}>
      <LogoMark size={88} />
      <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.92, fontWeight: 600, letterSpacing: "-0.035em", transform: "scaleX(1.04)", transformOrigin: "left" }}>
        {home.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
      </div>
      <span style={{ fontSize: 26, color: "#C5D3D7" }}>{home.hero.eyebrow}</span>
    </div>,
    { ...size, fonts: [
      { name: "Instrument Sans", data: await loadBrandFont(600), weight: 600, style: "normal" },
    ] },
  );
}
