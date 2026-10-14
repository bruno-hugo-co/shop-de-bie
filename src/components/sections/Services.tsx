import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { ServiceTabs } from "@/components/ui/ServiceTabs";

export function Services() {
  return (
    <section id="diensten" aria-labelledby="services-title" className="section-y">
      <Container className="flex flex-col gap-[clamp(32px,3.8889vw,56px)]">
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-20">
          <h2 id="services-title" className="display-h2">{home.services.titleLines.map(line => <span key={line} className="block">{line}</span>)}</h2>
          <p className="text-[20px] leading-[1.6] text-body">{home.services.lead}</p>
        </div>
        <ServiceTabs />
      </Container>
    </section>
  );
}
