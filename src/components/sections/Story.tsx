import Image from "next/image";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Story({ standalone = false }: { standalone?: boolean }) {
  const photo = home.images[home.story.image];
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="verhaal" aria-labelledby="story-title" className="on-turquoise border-y border-ink bg-turquoise">
      <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))]">
        <div className="flex flex-col justify-between gap-8 px-[clamp(20px,4.4vw,64px)] py-[clamp(56px,7vw,104px)]">
          <div>
            <Eyebrow className="mb-[18px]">{home.story.eyebrow}</Eyebrow>
            <Heading id="story-title" className="display-h2">{home.story.title}</Heading>
          </div>
          <p className="max-w-[32em] text-lg leading-[1.6]">{home.story.text}</p>
          <dl className="grid grid-cols-3 border-t border-ink">
            {home.story.stats.map((stat) => <div key={stat.value} className="flex flex-col py-5 pr-2 not-first:border-l not-first:border-ink not-first:pl-4"><dt className="stat-label mt-2">{stat.label}</dt><dd className="stat-number -order-1">{stat.value}</dd></div>)}
          </dl>
          {!standalone && <Button variant="storyCta" href={home.story.cta.href} arrow className="self-start">{home.story.cta.label}</Button>}
        </div>
        <figure className="relative min-h-[520px] border-t border-ink min-[960px]:border-t-0 min-[960px]:border-l">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1440px) 720px, (min-width: 960px) 50vw, 100vw" className="object-cover" />
          <figcaption className="eyebrow absolute bottom-0 left-0 border-t border-r border-ink bg-white px-[18px] py-3">{home.story.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
