import { home } from "@/content/home";

type Variant = "onLight" | "onDark" | "onTurquoise";

const variants: Record<Variant, { text: string; dot: string }> = {
  onLight: { text: "text-ink", dot: "bg-turquoise" },
  onDark: { text: "text-white", dot: "bg-turquoise" },
  onTurquoise: { text: "text-ink", dot: "bg-white" },
};

type LogoProps = {
  variant?: Variant;
  /** Wordmark size must be at least 18px; use LogoMark for smaller placements. */
  size?: number | string;
  className?: string;
};

/** Logo 1c "Stip". Preserve the dotless i and the supplied square offsets. */
export function Logo({ variant = "onLight", size = 30, className = "" }: LogoProps) {
  const colors = variants[variant];
  const [beforeI, afterI] = home.brand.wordmark.split("i");

  return (
    <span
      role="img"
      aria-label={home.business.name}
      className={`inline-block whitespace-nowrap font-sans font-bold leading-none tracking-[-0.035em] [font-stretch:80%] ${colors.text} ${className}`}
      style={{ fontSize: typeof size === "number" ? `${size}px` : size }}
    >
      <span aria-hidden="true">
        {beforeI}<span className="relative inline-block">ı<span className={`absolute left-1/2 top-[0.06em] h-[0.15em] w-[0.15em] -translate-x-1/2 ${colors.dot}`} /></span>{afterI}
      </span>
    </span>
  );
}
