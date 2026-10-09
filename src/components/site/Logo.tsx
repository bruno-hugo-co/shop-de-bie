import { home } from "@/content/home";

type LogoProps = { tone?: "light" | "dark"; size?: "header" | "footer"; href?: string };

export function Logo({ tone = "light", size = "header", href = "/#top" }: LogoProps) {
  return (
    <a href={href} className={`flex shrink-0 items-center gap-3 no-underline ${tone === "dark" ? "text-white" : "text-ink"}`}>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center bg-turquoise text-[22px] font-bold tracking-[-0.04em] text-ink [font-stretch:78%]">{home.brand.mark}</span>
      <span className={`wordmark ${size === "footer" ? "text-[28px]" : "text-[26px]"}`}>{home.business.name}</span>
    </a>
  );
}
