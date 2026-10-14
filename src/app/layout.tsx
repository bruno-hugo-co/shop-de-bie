import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { home } from "@/content/home";
import { buildLocalBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(home.seo.siteUrl), title: home.seo.title, description: home.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: home.seo.locale, url: "/", siteName: home.business.name,
    title: home.seo.ogTitle, description: home.seo.description,
  },
  twitter: { card: "summary_large_image", title: home.seo.ogTitle, description: home.seo.description },
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
