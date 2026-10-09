import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "./Logo";

export function SiteFooter({ homePage = true }: { homePage?: boolean }) {
  const { business, footer } = home;
  return (
    <footer className="bg-ink pt-[clamp(56px,6vw,80px)] pb-7 text-white">
      <Container className="flex flex-col gap-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10">
          <div>
            <a href={homePage ? "#top" : "/#top"} className="inline-flex no-underline">
              <Logo variant="onDark" size={36} />
            </a>
            <p className="mt-5 max-w-[22em] text-[15px] leading-[1.55] text-muted-dark">{footer.tagline}</p>
          </div>
          <div><Eyebrow className="mb-5 text-turquoise">{footer.columns.visit}</Eyebrow><address className="text-[15px] leading-[1.6] not-italic">{business.address.street}<br />{business.address.postalCode} {business.address.city}</address><p className="mt-4 text-[15px] leading-[1.6] text-muted-dark">{home.hours.footerSummary.map((line) => <span key={line} className="block">{line}</span>)}</p></div>
          <div><Eyebrow className="mb-5 text-turquoise">{footer.columns.contact}</Eyebrow><div className="flex flex-col items-start text-[15px]"><a className="py-1 hover:underline" href={business.phone.href}>{business.phone.display}</a><a className="py-1 hover:underline" href={business.mobile.href}>{business.mobile.display}</a><a className="py-1 underline" href={business.facebook} target="_blank" rel="noopener noreferrer">{home.brand.facebookLabel}</a></div></div>
          <nav aria-label="Footermenu"><Eyebrow className="mb-5 text-turquoise">{footer.columns.menu}</Eyebrow><ul>{home.nav.links.map((link) => <li key={link.href}><a href={homePage ? link.href : `/${link.href}`} className="inline-block py-1 text-[15px] hover:underline">{link.label}</a></li>)}</ul></nav>
        </div>
        <div className="flex flex-wrap justify-between gap-5 border-t border-rule-dark pt-6 font-mono text-xs text-muted-dark"><p>{footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p><a className="underline" href={footer.privacy.href}>{footer.privacy.label}</a></div>
      </Container>
    </footer>
  );
}
