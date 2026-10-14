import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Pillars() {
  return (
    <section aria-labelledby="pillars-title">
      <h2 id="pillars-title" className="sr-only">{home.accessibility.pillarsHeading}</h2>
      <Container className="grid gap-4 pb-[clamp(48px,6.1111vw,88px)] min-[540px]:grid-cols-2 lg:grid-cols-4">
        {home.pillars.map(pillar => <article key={pillar.title} className="flex flex-col gap-2 rounded-[20px] bg-white/85 p-6">
          <h3 className="flex items-center gap-[10px] text-[19px] leading-[normal] font-bold"><span aria-hidden="true" className="size-[10px] shrink-0 rounded-full bg-green" />{pillar.title}</h3>
          <p className="text-base leading-[1.5] text-muted">{pillar.text}</p>
        </article>)}
      </Container>
    </section>
  );
}
