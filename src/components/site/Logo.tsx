import Image from "next/image";
import { home } from "@/content/home";

/** The approved 1a Zacht symbol and outlined lettering form one graphic. */
export function Logo({ variant = "color", className = "h-[50px] w-[183px]" }: { variant?: "color" | "ink"; className?: string }) {
  return <Image src={variant === "ink" ? "/wordmark-ink.svg" : "/wordmark.svg"} alt={home.business.name} width={366} height={100} className={className} />;
}
