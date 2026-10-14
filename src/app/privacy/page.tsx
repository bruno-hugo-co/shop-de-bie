import type { Metadata } from "next";
import { home } from "@/content/home";
import { buildSocialMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `${home.privacy.title} — ${home.business.name}`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true }, // TODO(client): approve the policy before indexing.
  ...buildSocialMetadata(home.privacy.title, home.seo.description, "/privacy"),
};

export default function PrivacyPage() {
  return <><div id="top" className="bg-hero"><SiteHeader homePage={false} /></div><main id="inhoud" tabIndex={-1} className="section-y"><Container><h1 className="display-h2 mb-12">{home.privacy.title}</h1><div className="max-w-3xl space-y-10">{home.privacy.sections.map((title) => <section key={title} className="border-t border-rule pt-6"><h2 className="title-pillar mb-4">{title}</h2><p className="text-muted">{home.privacy.body}</p></section>)}</div></Container></main><SiteFooter homePage={false} /></>;
}
