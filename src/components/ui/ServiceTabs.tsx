"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { home } from "@/content/home";

export function ServiceTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % home.services.items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + home.services.items.length - 1) % home.services.items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = home.services.items.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(250px,30.4878%)_1fr]">
      <div role="tablist" aria-label="Diensten" aria-orientation="vertical" className="flex flex-col gap-1 rounded-3xl bg-surface p-2">
        {home.services.items.map((service, index) => <button
          key={service.nr} ref={element => { tabs.current[index] = element; }}
          id={`service-tab-${service.nr}`} role="tab" type="button" aria-selected={selected === index}
          aria-controls={`service-panel-${service.nr}`} tabIndex={selected === index ? 0 : -1}
          onClick={() => setSelected(index)} onKeyDown={event => onKeyDown(event, index)}
          className={`flex items-center gap-4 rounded-2xl px-[22px] py-5 text-left ${selected === index ? "bg-white shadow-tab" : "hover:bg-white/60"}`}
        >
          <span className="text-sm leading-[normal] font-semibold tracking-[0.06em] text-muted">{service.nr}</span>
          <span className={`flex-1 text-xl leading-[normal] ${selected === index ? "font-semibold" : "font-normal"}`}>{service.title}</span>
          <span aria-hidden="true" className={`size-[10px] shrink-0 rounded-full ${selected === index ? "bg-green" : "bg-inactive"}`} />
        </button>)}
      </div>
      <div>
        {home.services.items.map((service, index) => {
          const photo = home.images[service.image];
          return <div key={service.nr} id={`service-panel-${service.nr}`} role="tabpanel" aria-labelledby={`service-tab-${service.nr}`} tabIndex={0} hidden={selected !== index}>
            <article className="grid min-h-[480px] overflow-hidden rounded-[28px] border border-border bg-white min-[600px]:grid-cols-2">
              <div className="flex flex-col items-start gap-[22px] p-[clamp(24px,3.0556vw,44px)]">
                <span className="text-[15px] leading-[normal] font-semibold tracking-[0.06em] text-muted">{service.nr}</span>
                <h3 className="text-[clamp(32px,3.0556vw,44px)] leading-none font-semibold tracking-[-0.035em]">{service.title}</h3>
                <p className="text-lg leading-[1.6] text-body">{service.text}</p>
                <ul className="flex flex-wrap gap-2">
                  {service.items.map(item => <li key={item} className="rounded-full bg-tint px-[15px] py-[9px] text-[15px] leading-[normal] font-medium">{item}</li>)}
                </ul>
                <a href={service.href} className="mt-auto text-[17px] leading-[normal] font-semibold hover:underline">{home.services.moreLabel.replace("{service}", service.title)} <span aria-hidden="true">→</span></a>
              </div>
              <div className="relative min-h-[300px] bg-rule">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1440px) 440px, (min-width: 1024px) 32vw, (min-width: 600px) 46vw, 100vw" className="object-cover" />
              </div>
            </article>
          </div>;
        })}
      </div>
    </div>
  );
}
