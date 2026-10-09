import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Process() {
  return (
    <section id="werkwijze" aria-labelledby="process-title" className="section-y">
      <Container>
        <SectionHeader {...home.process} id="process-title" />
        <ol className="grid grid-cols-[repeat(auto-fill,minmax(max(min(100%,260px),calc(33.34%_-_1px)),1fr))] border-t border-l border-rule">
          {home.process.steps.map((step) => <li key={step.nr} className="grid grid-cols-[40px_minmax(0,1fr)] content-start items-baseline gap-x-3 gap-y-1 border-r border-b border-rule px-7 py-6"><span className="num-label row-span-2">{step.nr}</span><h3 className="title-step" lang="nl">{step.title}</h3><p className="text-[15px] leading-[1.55] text-muted">{step.text}</p></li>)}
        </ol>
      </Container>
    </section>
  );
}
