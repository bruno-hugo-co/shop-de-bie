import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import sharp from "sharp";

// Outline the exact fonts from the client-approved 1a Zacht logo specimen.
const require = createRequire(import.meta.url);
const createFont = require("next/dist/compiled/@next/font/dist/fontkit").default;
const wordmarkFont = createFont(await readFile("src/assets/fonts/barlow-700.ttf"));
const taglineFont = createFont(await readFile("src/assets/fonts/barlow-semi-condensed-600.ttf"));
const source = await readFile("src/content/home.ts", "utf8");
const { brand } = JSON.parse(source.split("export const home = ")[1].split(" as const;")[0]);

function outline(text, face, size, spacing, left, baseline) {
  const run = face.layout(text);
  const factor = size / face.unitsPerEm;
  let cursor = left;
  return run.glyphs.map((glyph, index) => {
    const position = run.positions[index];
    const path = `<path transform="translate(${cursor + position.xOffset * factor} ${baseline - position.yOffset * factor}) scale(${factor} ${-factor})" d="${glyph.path.toSVG()}"/>`;
    cursor += position.xAdvance * factor + spacing;
    return path;
  }).join("");
}

// The specimen's 60x100 symbol: a shared stem and two 12px circular strokes.
const mark = '<rect x="23" width="14" height="100"/><circle cx="19" cy="31" r="13" fill="none" stroke="currentColor" stroke-width="12"/><circle cx="41" cy="69" r="13" fill="none" stroke="currentColor" stroke-width="12"/>';
// 20px symbol gap; vertically centred 58px/0.9 name, 8px gap, 20px/1 tagline.
const lettering = outline(brand.wordmark, wordmarkFont, 58, -1.16, 80, 59.2);
const tagline = outline(brand.tagline, taglineFont, 20, 3.6, 80, 88.1);
for (const [filename, nameColor, accentColor] of [
  ["wordmark.svg", "#6DBE45", "#EE7D3A"],
  ["wordmark-ink.svg", "#15302B", "#15302B"],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366 100"><g fill="${accentColor}" color="${accentColor}">${mark}</g><g fill="${nameColor}">${lettering}</g><g fill="${accentColor}">${tagline}</g></svg>\n`;
  await writeFile(`public/${filename}`, svg);
}

// The 1a icon specimen places the orange symbol on a rounded white square.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" rx="22" fill="#FFFFFF"/><g transform="translate(29 19) scale(.5)" fill="#EE7D3A" color="#EE7D3A">${mark}</g></svg>\n`;
await writeFile("src/app/icon.svg", icon);
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile("src/app/apple-icon.png");
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile("public/icon-512.png");
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index]; header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));
console.log("Generated the 1a Zacht colour/ink logos and SVG, Apple, manifest and ICO icons.");
