import { Logo } from "@/components/site/Logo";
import { LogoMark } from "@/components/site/LogoMark";
import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function LoyaltyCard() {
  return (
    <section aria-labelledby="loyalty-title" className="overflow-hidden bg-ink py-[clamp(72px,9vw,120px)] text-white">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-20 gap-y-14">
        <div className="flex flex-col gap-6">
          <Eyebrow className="text-turquoise">{home.loyalty.eyebrow}</Eyebrow>
          <h2 id="loyalty-title" className="display-h2">{home.loyalty.title}</h2>
          <p className="text-lg leading-[1.55] text-pretty text-muted-dark">{home.loyalty.lead}</p>
          <ul className="border-t border-rule-dark">{home.loyalty.items.map((item, index) => <li key={item} className="flex justify-between gap-6 border-b border-rule-dark py-[14px] text-base"><span>{item}</span><span aria-hidden="true" className="num-label text-muted-dark">{String(index + 1).padStart(2, "0")}</span></li>)}</ul>
        </div>
        <div aria-hidden="true" className="mx-auto flex aspect-[1.586] w-[94%] max-w-[440px] rotate-[-4deg] flex-col justify-between rounded-card bg-turquoise p-[clamp(20px,3vw,28px)] text-ink shadow-card">
          <div className="flex items-center justify-between gap-4"><LogoMark size={48} className="shrink-0" /><span className="eyebrow">{home.loyalty.card.label}</span></div>
          <div><Logo variant="onTurquoise" size={40} /><p className="eyebrow mt-3">{home.loyalty.card.sub}</p></div>
        </div>
      </Container>
    </section>
  );
}
