import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(client): add /privacy once approved and indexable.
  return ["/", "/ons-verhaal"].map((path) => ({ url: new URL(path, getSiteUrl()).href }));
}
