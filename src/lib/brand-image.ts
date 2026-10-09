import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadBrandFont(weight: 600 | 700) {
  return readFile(join(process.cwd(), `src/assets/fonts/instrument-sans-condensed-${weight}.ttf`));
}
