import Image from "next/image";
import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";

export function Hero() {
  const photo = home.images[home.hero.image];
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-10 pt-8 pb-[clamp(48px,5vw,72px)] md:grid-cols-2 md:gap-[clamp(32px,5vw,72px)] md:pt-12 min-[1440px]:grid-cols-[1fr_620px]">
        <div className="flex min-w-0 flex-col items-start gap-[30px]">
          <OpenStatus />
          <h1 id="hero-title" className="display-h1">{home.hero.titleLines.map(line => <span key={line} className="block whitespace-nowrap">{line}</span>)}</h1>
          <p className="max-w-[28em] text-[clamp(18px,1.4583vw,21px)] leading-[1.55] text-body">{home.hero.lead}</p>
          <div className="flex flex-wrap gap-3 pt-[6px]">
            <Button href={home.hero.primary.href}>{home.hero.primary.label}</Button>
            <Button variant="outline" href={home.hero.secondary.href}>{home.hero.secondary.label}</Button>
          </div>
        </div>
        <div className="relative aspect-square w-full">
          <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-rule">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1440px) 620px, (min-width: 768px) 46vw, 100vw" quality={75} className="object-cover" />
          </div>
          <div className="absolute right-4 bottom-5 left-4 flex items-center gap-4 rounded-[20px] bg-white px-5 py-5 shadow-badge min-[1100px]:right-auto min-[1100px]:bottom-10 min-[1100px]:-left-12 min-[1100px]:px-6">
            <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-tint"><span className="size-3 rounded-full bg-green" /></span>
            <span className="flex flex-col gap-[3px]">
              <span className="text-[clamp(14px,1.1806vw,17px)] leading-[normal] font-bold">{home.hero.badge.title}</span>
              <span className="text-[15px] leading-[normal] text-muted">{home.hero.badge.text}</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
