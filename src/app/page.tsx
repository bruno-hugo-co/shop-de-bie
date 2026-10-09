import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Services } from "@/components/sections/Services";
import { Story } from "@/components/sections/Story";
import { Process } from "@/components/sections/Process";
import { LoyaltyCard } from "@/components/sections/LoyaltyCard";
import { Visit } from "@/components/sections/Visit";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        {/* The header visually overlays the hero while retaining a top-level landmark. */}
        <div className="absolute inset-x-0 top-[clamp(16px,2.2vw,32px)] z-20 px-[clamp(16px,4.4vw,64px)]">
          <SiteHeader />
        </div>
        <main id="inhoud" tabIndex={-1}>
          <Hero />
          <Pillars />
          <Services />
          <Story />
          <Process />
          <LoyaltyCard />
          <Visit />
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
