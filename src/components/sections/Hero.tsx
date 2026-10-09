import Image from "next/image";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OpenStatus } from "@/components/ui/OpenStatus";

export function Hero() {
  const photo = home.images[home.hero.image];
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[clamp(720px,100svh,980px)] flex-col overflow-hidden bg-ink">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" quality={75} className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/[0.18]" />
      <div className="relative flex flex-1 flex-col gap-12 px-[clamp(16px,4.4vw,64px)] pt-[clamp(16px,2.2vw,32px)] pb-[clamp(24px,4.4vw,64px)]">
        <div aria-hidden="true" className="min-h-[68px]" />
        <div className="flex flex-1 items-end">
          <div className="glass-panel flex w-full max-w-[720px] flex-col gap-6 p-[clamp(28px,3.6vw,52px)]">
            <div className="flex flex-wrap justify-between gap-x-5 gap-y-2">
              <Eyebrow>{home.hero.eyebrow}</Eyebrow>
              <OpenStatus />
            </div>
            <h1 id="hero-title" className="display-h1">{home.hero.titleLines.map((line) => <span key={line} className="block whitespace-nowrap">{line}</span>)}</h1>
            <p className="max-w-[30em] text-lg leading-[1.55] text-pretty">{home.hero.lead}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button href={home.hero.primary.href}>{home.hero.primary.label}</Button>
              <Button variant="outline" href={home.hero.secondary.href}>{home.hero.secondary.label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
