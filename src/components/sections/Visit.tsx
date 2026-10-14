import { home } from "@/content/home";
import { HoursTable } from "@/components/ui/HoursTable";

export function Visit() {
  return (
    <section id="bezoek" aria-labelledby="visit-title" className="flex min-w-0 flex-col gap-5 rounded-[32px] border border-border bg-white p-[clamp(24px,3.3333vw,48px)]">
      <p className="eyebrow text-muted">{home.visit.eyebrow}</p>
      <h2 id="visit-title" className="display-card">{home.visit.title}</h2>
      <HoursTable />
      <div className="flex flex-wrap gap-[10px]">
        {home.visit.buttons.map(button => <a key={button.href} href={button.href} className={`inline-flex min-h-12 items-center justify-center rounded-full text-base leading-[normal] font-semibold ${button.variant === "green" ? "bg-green px-6 py-[15px] hover:bg-tint" : "border border-rule px-[23px] py-[14px] hover:bg-surface"}`} {...("external" in button ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{button.label}</a>)}
      </div>
    </section>
  );
}
