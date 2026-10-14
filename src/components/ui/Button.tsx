import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  green: "bg-green px-[30px] py-[18px] text-ink hover:bg-tint",
  outline: "border border-rule bg-white px-[29px] py-[17px] text-ink hover:bg-surface",
} as const;

type SharedProps = { variant?: keyof typeof variants; arrow?: boolean };
type ButtonProps = SharedProps & (
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
);

export function Button({ variant = "green", arrow = false, className = "", children, ...props }: ButtonProps) {
  const classes = `button-base ${variants[variant]} ${className}`;
  const content = <>{children}{arrow && <span aria-hidden="true">→</span>}</>;
  if (typeof props.href === "string") {
    return <a {...props as AnchorHTMLAttributes<HTMLAnchorElement>} className={classes}>{content}</a>;
  }
  return <button type="button" {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={classes}>{content}</button>;
}
