import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Services } from "@/components/sections/Services";
import { Story } from "@/components/sections/Story";
import { Process } from "@/components/sections/Process";
import { LoyaltyCard } from "@/components/sections/LoyaltyCard";
import { Visit } from "@/components/sections/Visit";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { home } from "@/content/home";
import { buildSocialMetadata } from "@/lib/seo";

export const metadata = buildSocialMetadata(home.seo.ogTitle, home.seo.description, "/");

export default function HomePage() {
  return (
    <div id="top" className="relative">
      <SiteHeader />
      <main id="inhoud" tabIndex={-1}>
        <div className="intro-background">
          <Hero />
          <Pillars />
        </div>
        <div className="bg-white">
          <Services />
          <Process />
          <Story />
          <Container className="grid gap-6 pb-[clamp(64px,8.3333vw,120px)] lg:grid-cols-2">
            <LoyaltyCard />
            <Visit />
          </Container>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
