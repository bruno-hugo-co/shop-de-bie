"use client";

import { useState } from "react";
import { home } from "@/content/home";
import { Button } from "./Button";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative flex min-h-[460px] items-center justify-center border border-ink bg-tint">
      {loaded ? <iframe autoFocus title={home.visit.map.iframeTitle} src={home.business.mapsEmbed} className="absolute inset-0 size-full border-0 grayscale-[0.4]" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> :
        <div className="flex max-w-sm flex-col items-center gap-6 p-8 text-center">
          <p className="eyebrow">{home.visit.map.placeholderLabel}</p>
          <p className="title-pillar">{home.business.name}</p>
          <p>{home.business.address.street}<br />{home.business.address.postalCode} {home.business.address.city}</p>
          <p className="text-[15px] leading-[1.55] text-muted">{home.visit.map.placeholderText}</p>
          <Button onClick={() => setLoaded(true)}>{home.visit.map.loadButton}</Button>
          <a className="py-2 underline" href={home.business.mapsDirections} target="_blank" rel="noopener noreferrer">{home.visit.buttons[2].label}</a>
        </div>}
    </div>
  );
}
