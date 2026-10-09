type LogoMarkProps = {
  size?: number;
  /** Pass a title when the mark stands alone (it becomes an accessible image) */
  title?: string;
  className?: string;
};

/** Logo 1c mark: the "i" with a square turquoise tittle on an ink square. Pure vector, no font needed. */
export function LogoMark({ size = 32, title, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" fill="#0B2730" />
      <rect x="27.5" y="12" width="9" height="9" fill="#1BB0CE" />
      <rect x="27.5" y="26" width="9" height="26" fill="#FFFFFF" />
    </svg>
  );
}
