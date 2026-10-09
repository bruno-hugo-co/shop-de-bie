import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  const { feature, items, pickup } = home.services;
  return (
    <section id="diensten" aria-labelledby="services-title" className="section-y">
      <Container>
        <SectionHeader {...home.services} id="services-title" />
        <div className="services-grid grid border-t border-l border-ink">
          <article className="service-feature on-turquoise flex min-h-[300px] flex-col gap-[14px] border-r border-b border-ink bg-turquoise p-8">
            <div className="eyebrow flex justify-between gap-3"><span>{feature.nr}</span><span>{feature.tag}</span></div>
            <h3 className="display-feature mt-auto pt-8">{feature.title}</h3>
            <p className="max-w-[26em] text-[17px] leading-[1.5]">{feature.text}</p>
          </article>
          {items.map((item) => (
            <article key={item.nr} className="flex min-h-60 flex-col gap-[14px] border-r border-b border-ink p-8">
              <span className="num-label">{item.nr}</span>
              <h3 className="title-service mt-auto">{item.title}</h3>
              <p className="text-base leading-[1.5] text-muted">{item.text}</p>
            </article>
          ))}
          <a href={pickup.cta.href} className="group col-span-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-end gap-x-12 gap-y-5 border-r border-b border-ink bg-ink px-8 py-[clamp(28px,3vw,40px)] text-white transition-colors hover:bg-ink-hover">
            <div>
              <div className="eyebrow mb-5 flex gap-5 text-turquoise"><span>{pickup.nr}</span><span>{pickup.tag}</span></div>
              <h3 id="pickup-title" className="display-banner">{pickup.title}</h3>
            </div>
            <p className="max-w-[30em] text-[17px] leading-[1.5] text-muted-dark">{pickup.text}</p>
            <span id="pickup-cta" className="button-base justify-self-start bg-turquoise px-6 py-4 text-ink group-hover:bg-white">{pickup.cta.label}<span aria-hidden="true">→</span></span>
          </a>
        </div>
      </Container>
    </section>
  );
}
