import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { loadBrandFont, loadBrandLogo } from "@/lib/brand-image";

export const alt = home.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await loadBrandLogo();
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "linear-gradient(135deg, #DFF2D1, #F3FAEE 55%, #FDEFE4)", color: "#15302B", fontFamily: "Figtree" }}>
      {/* ImageResponse embeds the vector directly instead of using next/image. */}
      <img src={logo} alt={home.business.name} width={293} height={80} />
      <div style={{ display: "flex", flexDirection: "column", fontSize: 110, lineHeight: 0.96, fontWeight: 600, letterSpacing: "-0.045em" }}>
        {home.hero.titleLines.map(line => <span key={line}>{line}</span>)}
      </div>
      <span style={{ fontSize: 26, color: "#3F534D" }}>{home.hero.eyebrow}</span>
    </div>,
    { ...size, fonts: [
      { name: "Figtree", data: await loadBrandFont(), weight: 600, style: "normal" },
    ] },
  );
}
