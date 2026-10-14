import { home } from "@/content/home";
import type { Metadata } from "next";
import { formatTime, isoDays, schedule } from "./hours";
import { getSiteUrl } from "./site-url";

const schemaDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function buildSocialMetadata(title: string, description: string, path: string): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: new URL("/opengraph-image?v=brand-20261014", getSiteUrl()).href,
    width: 1200, height: 630, type: "image/png", alt: home.seo.ogTitle,
  };
  return {
    openGraph: {
      type: "website", locale: home.seo.locale, siteName: home.business.name,
      url: path, title, description, images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function buildLocalBusinessJsonLd() {
  const { business, seo } = home;
  const siteUrl = getSiteUrl().origin;
  return {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    description: seo.description,
    telephone: business.phone.e164,
    image: `${siteUrl}${home.images[home.hero.image].src}`,
    address: {
      "@type": "PostalAddress", streetAddress: business.address.street,
      postalCode: business.address.postalCode, addressLocality: business.address.city,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: isoDays.flatMap((day) => schedule[day].map(([open, close]) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${schemaDays[day - 1]}`,
      opens: formatTime(open), closes: formatTime(close),
    }))),
    vatID: business.vat,
    sameAs: [business.facebook],
    foundingDate: String(business.foundingYear),
    // TODO(client): verified email and coordinates; never publish placeholder data.
  };
}
