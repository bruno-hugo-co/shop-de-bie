import type { MetadataRoute } from "next";
import { home } from "@/content/home";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${home.seo.siteUrl}/sitemap.xml` };
}
