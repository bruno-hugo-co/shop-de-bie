import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle legacy trailing slashes in the same 301 hop, including /privacy/.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/thuispagina{/}?", destination: "/", statusCode: 301 },
      { source: "/geschiedenis{/}?", destination: "/ons-verhaal", statusCode: 301 },
      { source: "/gallerij{/}?", destination: "/ons-verhaal", statusCode: 301 },
      { source: "/info{/}?", destination: "/#werkwijze", statusCode: 301 },
      { source: "/contactformulier{/}?", destination: "/#bezoek", statusCode: 301 },
      { source: "/privacy/", destination: "/privacy", statusCode: 301 },
      { source: "/winkelmandje{/}?", destination: "/", statusCode: 301 },
      { source: "/cart{/}?", destination: "/", statusCode: 301 },
    ];
  },
};
export default nextConfig;
