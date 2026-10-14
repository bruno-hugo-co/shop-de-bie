import { home } from "@/content/home";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ homePage = true }: { homePage?: boolean }) {
  const href = (anchor: string) => homePage ? anchor : `/${anchor}`;
  return (
    <header className="relative z-20 bg-white shadow-header">
      <div className="border-b border-header-rule">
        <div className="container-header flex min-h-[43px] flex-wrap items-center justify-end gap-x-3 gap-y-2 py-2 text-sm font-medium md:gap-x-5">
          <a href={href("#bezoek")} className="hidden hover:underline md:inline">{home.business.address.street}, {home.business.address.postalCode} {home.business.address.city}</a>
          <span aria-hidden="true" className="hidden h-[18px] w-px bg-green md:block" />
          <a href={home.business.phone.href} className="shrink-0 hover:underline">{home.business.phone.display}</a>
          <span aria-hidden="true" className="h-[18px] w-px bg-green" />
          <OpenStatus variant="inline" />
        </div>
      </div>
      <div className="container-header relative flex h-[100px] items-center justify-between gap-3 min-[640px]:gap-6">
        <a href={homePage ? "#top" : "/#top"} className="inline-flex shrink-0 no-underline"><Logo /></a>
        <nav data-desktop-nav aria-label="Hoofdmenu" className="hidden items-center gap-10 text-lg leading-[normal] min-[1280px]:flex">
          {home.nav.links.map(link => <a className="py-3 hover:underline" key={link.href} href={href(link.href)}>{link.label}</a>)}
          <a href={href(home.nav.cta.href)} className="nav-cta hover:bg-tint">{home.nav.cta.label}</a>
        </nav>
        <MobileMenu homePage={homePage} />
      </div>
    </header>
  );
}
