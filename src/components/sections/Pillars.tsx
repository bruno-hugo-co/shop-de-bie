import { home } from "@/content/home";

export function Pillars() {
  return (
    <section aria-label="Onze troeven" className="border-b border-ink">
      <h2 className="sr-only">{home.accessibility.pillarsHeading}</h2>
      <div className="pillars-grid mx-auto grid max-w-site">
        {home.pillars.map((pillar) => (
          <div key={pillar.nr} className="flex flex-col gap-3 px-[clamp(20px,3.4vw,48px)] py-[clamp(28px,3vw,40px)]">
            <span className="num-label">{pillar.nr}</span>
            <h3 className="title-pillar">{pillar.title}</h3>
            <p className="text-[15px] leading-[1.55] text-muted">{pillar.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
