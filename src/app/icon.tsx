import { createBrandIcon } from "@/lib/brand-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() { return createBrandIcon(size.width); }
