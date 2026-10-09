import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ homePage = true }: { homePage?: boolean }) {
  return (
    <header className="glass-nav relative z-20 flex min-h-[68px] flex-wrap items-center justify-between gap-x-6 gap-y-3 p-[10px] pl-[14px]">
      <Logo href={homePage ? "#top" : "/#top"} />
      <nav data-desktop-nav aria-label="Hoofdmenu" className="hidden flex-wrap items-center gap-x-8 gap-y-2 text-[15px] font-medium min-[900px]:flex">
        {home.nav.links.map((link) => <a className="py-2 hover:underline" key={link.href} href={homePage ? link.href : `/${link.href}`}>{link.label}</a>)}
        <Button variant="navCta" href={homePage ? home.nav.cta.href : `/${home.nav.cta.href}`}>{home.nav.cta.label}</Button>
      </nav>
      <MobileMenu homePage={homePage} />
    </header>
  );
}
