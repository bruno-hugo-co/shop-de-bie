import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function NotFound() {
  return <><Container className="py-6"><SiteHeader homePage={false} /></Container><main id="inhoud" tabIndex={-1} className="section-y"><Container><h1 className="display-h2 max-w-3xl">{home.notFound.title}</h1><p className="my-8 text-lg text-muted">{home.notFound.text}</p><Button href={home.notFound.cta.href} arrow>{home.notFound.cta.label}</Button></Container></main><SiteFooter homePage={false} /></>;
}
