import { home } from "@/content/home";

export function Process() {
  return (
    <section id="werkwijze" aria-labelledby="process-title" className="mx-auto max-w-site px-[clamp(12px,2.2222vw,32px)]">
      <div className="process-background flex flex-col gap-12 rounded-[40px] px-[clamp(20px,2.2222vw,32px)] py-[clamp(48px,6.6667vw,96px)]">
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-20 min-[1200px]:px-8">
          <h2 id="process-title" className="display-h2">{home.process.titleLines.map(line => <span key={line} className="block">{line}</span>)}</h2>
          <p className="text-xl leading-[1.6] text-body">{home.process.lead}</p>
        </div>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.process.steps.map(step => <li key={step.nr} className="flex items-start gap-[18px] rounded-[20px] bg-white p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green text-[15px] font-bold">{step.nr}</span>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="text-xl leading-[normal] font-bold tracking-[-0.01em] hyphens-auto">{step.title}</h3>
              <p className="text-base leading-[1.5] text-muted">{step.text}</p>
            </div>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
