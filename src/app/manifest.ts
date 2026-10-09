import type { MetadataRoute } from "next";
import { home } from "@/content/home";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: home.business.name,
    short_name: home.business.name,
    description: home.seo.description,
    lang: "nl-BE",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0B2730",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
