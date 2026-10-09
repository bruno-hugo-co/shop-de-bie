type Variant = 'onLight' | 'onDark' | 'onTurquoise';

const VARIANTS: Record<Variant, { text: string; dot: string }> = {
  onLight: { text: 'text-ink', dot: 'bg-turquoise' },
  onDark: { text: 'text-white', dot: 'bg-turquoise' },
  onTurquoise: { text: 'text-ink', dot: 'bg-white' },
};

type LogoProps = {
  variant?: Variant;
  /** Font size of the wordmark: number = px, or any CSS length / clamp() */
  size?: number | string;
  className?: string;
};

/**
 * Logo 1c "Stip": lowercase wordmark in Instrument Sans (80% width, 700).
 * The tittle of the i is a square in turquoise (white on turquoise backgrounds).
 * Uses a dotless ı (U+0131) + a positioned square. Do not change the offsets.
 */
export function Logo({ variant = 'onLight', size = 30, className = '' }: LogoProps) {
  const v = VARIANTS[variant];
  return (
    <span
      role="img"
      aria-label="Shop De Bie"
      className={`inline-block whitespace-nowrap font-sans font-bold leading-none tracking-[-0.035em] [font-stretch:80%] ${v.text} ${className}`}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
    >
      <span aria-hidden="true">
        shop de b<span className="relative inline-block">ı<span className={`absolute left-1/2 top-[0.06em] h-[0.15em] w-[0.15em] -translate-x-1/2 ${v.dot}`} /></span>e
      </span>
    </span>
  );
}
