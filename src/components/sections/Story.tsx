import Image from "next/image";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Story({ standalone = false }: { standalone?: boolean }) {
  const photo = home.images[home.story.image];
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="verhaal" aria-labelledby="story-title" className="section-y">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-[clamp(40px,5.5556vw,80px)]">
        <div className="flex flex-col items-start gap-7">
          <span className="rounded-full border border-rule px-4 py-2 text-[15px] leading-[normal] font-semibold">{home.story.eyebrow}</span>
          <Heading id="story-title" className="display-h2">{home.story.titleLines.map(line => <span key={line} className="block">{line}</span>)}</Heading>
          <p className="max-w-[30em] text-[19px] leading-[1.6] text-body">{home.story.text}</p>
          <dl className="flex gap-[clamp(24px,3.3333vw,48px)]">
            {home.story.stats.map(stat => <div key={stat.value} className="flex flex-col gap-1">
              <dt className="text-[15px] leading-[normal] text-muted">{stat.label}</dt>
              <dd className="-order-1 text-[clamp(36px,3.3333vw,48px)] leading-none font-semibold tracking-[-0.04em]">{stat.value}</dd>
            </div>)}
          </dl>
          {!standalone && <Button variant="outline" href={home.story.cta.href} arrow>{home.story.cta.label}</Button>}
        </div>
        <figure className="relative h-[clamp(400px,40.2778vw,580px)] overflow-hidden rounded-[32px] bg-rule">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1440px) 616px, (min-width: 768px) 46vw, 100vw" className="object-cover" />
          <span className="absolute top-6 left-6 rounded-full bg-orange px-[18px] py-[10px] text-[15px] leading-[normal] font-bold">{home.story.since}</span>
          <figcaption className="absolute bottom-6 left-6 rounded-full bg-white px-[18px] py-[10px] text-[15px] leading-[normal] font-semibold">{home.story.caption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
