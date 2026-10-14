import { home } from "@/content/home";
import { Logo } from "@/components/site/Logo";

export function LoyaltyCard() {
  return (
    <section id="klantenkaart" aria-labelledby="loyalty-title" className="grid items-center gap-6 rounded-[32px] bg-surface p-[clamp(24px,3.3333vw,48px)] min-[600px]:max-lg:grid-cols-[1fr_220px] min-[1280px]:grid-cols-[1fr_220px]">
      <div className="flex flex-col gap-[18px]">
        <p className="eyebrow text-muted">{home.loyalty.eyebrow}</p>
        <h2 id="loyalty-title" className="display-card">{home.loyalty.title}</h2>
        <p className="text-[17px] leading-[1.55] text-body">{home.loyalty.lead}</p>
      </div>
      <div aria-hidden="true" className="my-3 flex aspect-[1.586] w-[220px] max-w-full -rotate-6 flex-col justify-between justify-self-center rounded-2xl bg-green p-4 shadow-card">
        <Logo variant="ink" className="h-auto w-40" />
        <span className="text-[11px] leading-[normal] font-semibold tracking-[0.08em]">{home.loyalty.card.label}</span>
      </div>
    </section>
  );
}
