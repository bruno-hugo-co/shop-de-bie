import type { MetadataRoute } from "next";
import { home } from "@/content/home";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(client): add /privacy once approved and indexable.
  return ["/", "/ons-verhaal"].map((path) => ({ url: `${home.seo.siteUrl}${path}` }));
}
