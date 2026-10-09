import { home } from "@/content/home";
import { formatTime, isoDays, schedule } from "./hours";

const schemaDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function buildLocalBusinessJsonLd() {
  const { business, seo } = home;
  return {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": `${seo.siteUrl}/#business`,
    name: business.name,
    url: seo.siteUrl,
    description: seo.description,
    telephone: business.phone.e164,
    image: `${seo.siteUrl}${home.images[home.hero.image].src}`,
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
