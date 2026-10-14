import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function SiteFooter({ homePage = true }: { homePage?: boolean }) {
  const { business, footer } = home;
  return (
    <footer className="footer-background pt-[clamp(48px,5vw,72px)] pb-8">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 text-base leading-[1.5] min-[600px]:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div><a href={homePage ? "#top" : "/#top"} className="inline-flex no-underline"><Logo /></a></div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{footer.columns.visit}</h2>
            <address className="not-italic">{business.address.street}, {business.address.postalCode} {business.address.city}</address>
            <p className="text-muted">{home.hours.footerSummary.map(line => <span key={line} className="block">{line}</span>)}</p>
          </div>
          <div className="flex flex-col items-start gap-2 leading-[normal]">
            <h2 className="font-bold">{footer.columns.contact}</h2>
            <a className="hover:underline" href={business.phone.href}>{business.phone.display}</a>
            <a className="hover:underline" href={business.mobile.href}>{business.mobile.display}</a>
            <a className="hover:underline" href={business.facebook} target="_blank" rel="noopener noreferrer">{home.brand.facebookLabel}</a>
          </div>
          <nav aria-label="Footermenu" className="flex flex-col gap-2 leading-[normal]">
            <h2 className="font-bold">{footer.columns.menu}</h2>
            <ul className="flex flex-col items-start gap-2">{footer.links.map(link => <li key={link.href}><a href={homePage ? link.href : `/${link.href}`} className="hover:underline">{link.label}</a></li>)}</ul>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-5 border-t border-rule pt-5 text-sm leading-[normal] text-muted">
          <p>{footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <a className="hover:underline" href={footer.privacy.href}>{footer.privacy.label}</a>
        </div>
      </Container>
    </footer>
  );
}
