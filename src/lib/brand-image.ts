import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadBrandFont() {
  return readFile(join(process.cwd(), "src/assets/fonts/figtree-600.ttf"));
}

export async function loadBrandLogo() {
  const svg = await readFile(join(process.cwd(), "public/wordmark.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}
