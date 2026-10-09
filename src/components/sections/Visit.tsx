import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HoursTable } from "@/components/ui/HoursTable";
import { MapEmbed } from "@/components/ui/MapEmbed";

export function Visit() {
  return (
    <section id="bezoek" aria-labelledby="visit-title" className="section-y">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-16 gap-y-12">
        <div className="flex min-w-0 flex-col gap-7">
          <div><Eyebrow className="mb-[18px]">{home.visit.eyebrow}</Eyebrow><h2 id="visit-title" className="display-h2">{home.visit.title}</h2></div>
          <HoursTable />
          <div className="flex flex-wrap gap-3">{home.visit.buttons.map((button) => <Button key={button.href} href={button.href} variant={button.variant} {...("external" in button ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{button.label}</Button>)}</div>
        </div>
        <MapEmbed />
      </Container>
    </section>
  );
}
