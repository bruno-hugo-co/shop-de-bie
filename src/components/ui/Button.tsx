import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  ink: "bg-ink text-white px-6 py-4 hover:bg-turquoise hover:text-ink hover:focus-visible:outline-ink",
  outline: "border border-ink px-[23px] py-[15px] text-ink hover:bg-ink hover:text-white",
  turquoise: "on-turquoise bg-turquoise text-ink px-6 py-4 hover:bg-white",
  outlineLight: "border border-white px-[23px] py-[15px] text-white hover:bg-white hover:text-ink",
  navCta: "bg-ink text-white px-5 py-[13px] hover:bg-turquoise hover:text-ink hover:focus-visible:outline-ink",
  storyCta: "bg-ink text-white px-6 py-4 hover:bg-white hover:text-ink",
} as const;

type SharedProps = { variant?: keyof typeof variants; arrow?: boolean };
type ButtonProps = SharedProps & (
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
);

export function Button({ variant = "ink", arrow = false, className = "", children, ...props }: ButtonProps) {
  const classes = `button-base ${variants[variant]} ${className}`;
  const content = <>{children}{arrow && <span aria-hidden="true">→</span>}</>;
  if (typeof props.href === "string") {
    return <a {...props as AnchorHTMLAttributes<HTMLAnchorElement>} className={classes}>{content}</a>;
  }
  return <button type="button" {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={classes}>{content}</button>;
}
