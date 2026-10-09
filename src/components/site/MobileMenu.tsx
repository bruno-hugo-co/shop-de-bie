"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ homePage = true }: { homePage?: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const href = (anchor: string) => homePage ? anchor : `/${anchor}`;

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = rootRef.current;
    root?.querySelector<HTMLAnchorElement>("nav a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "Tab") {
        const elements = root?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    }
    const breakpoint = window.matchMedia("(min-width: 900px)");
    const onResize = () => {
      if (breakpoint.matches) {
        setOpen(false);
        document.querySelector<HTMLElement>("[data-desktop-nav] a")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    breakpoint.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      breakpoint.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="min-[900px]:hidden">
      <button ref={buttonRef} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => open ? close() : setOpen(true)} className="button-base border border-ink px-4 py-3 hover:bg-ink hover:text-white">
        {open ? home.nav.menuClose : home.nav.menuButton}
      </button>
      <nav id="mobile-navigation" hidden={!open} aria-label="Hoofdmenu" className="glass-nav absolute inset-x-0 top-[calc(100%+12px)] max-h-[calc(100svh-120px)] overflow-y-auto p-5">
        {home.nav.links.map((link) => <a key={link.href} href={href(link.href)} onClick={close} className="flex min-h-12 items-center border-b border-rule font-medium hover:underline">{link.label}</a>)}
        <Button href={href(home.nav.cta.href)} variant="navCta" onClick={close} className="mt-5 w-full">{home.nav.cta.label}</Button>
      </nav>
    </div>
  );
}
