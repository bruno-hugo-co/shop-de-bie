import type { Metadata } from "next";
import { home } from "@/content/home";
import { Story } from "@/components/sections/Story";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `${home.story.title} — ${home.business.name}`, description: home.story.text,
  alternates: { canonical: "/ons-verhaal" },
  openGraph: { title: home.story.title, description: home.story.text, url: "/ons-verhaal" },
};

export default function StoryPage() {
  return <><Container className="py-6"><SiteHeader homePage={false} /></Container><main id="inhoud" tabIndex={-1}><Story standalone /></main><SiteFooter homePage={false} /></>;
}
