import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { home } from "@/content/home";
import { buildLocalBusinessJsonLd, buildSocialMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: getSiteUrl(), title: home.seo.title, description: home.seo.description,
  alternates: { canonical: "/" },
  ...buildSocialMetadata(home.seo.ogTitle, home.seo.description, "/"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl-BE" className={figtree.variable}>
      <body>
        <a href="#inhoud" className="sr-only z-50 rounded-full bg-white px-6 py-4 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4">{home.nav.skipLink}</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
