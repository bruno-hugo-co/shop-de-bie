import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { home } from "@/content/home";
import { buildLocalBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

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
    <html lang="nl-BE" className={`${instrumentSans.variable} ${plexMono.variable}`}>
      <body>
        <a href="#inhoud" className="sr-only z-50 bg-ink px-6 py-4 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4">{home.nav.skipLink}</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
