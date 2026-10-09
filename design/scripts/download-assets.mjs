#!/usr/bin/env node
// Downloads the photos listed in design/assets.json into public/.
// Usage: node design/scripts/download-assets.mjs [--force]
// Optional: if `sharp` is installed, images wider than 2560px are resized (keeps the repo small).
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = JSON.parse(await readFile(resolve(root, 'design/assets.json'), 'utf8'));
const force = process.argv.includes('--force');

let sharp = null;
try { sharp = (await import('sharp')).default; } catch { /* optional */ }

const exists = async (p) => access(p).then(() => true, () => false);
let ok = 0, skipped = 0, failed = 0;

for (const img of manifest.images) {
  const out = resolve(root, img.out);
  if (!force && await exists(out)) { skipped++; continue; }
  const url = manifest.baseUrl + img.src;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'shopdebie-build/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let buf = Buffer.from(await res.arrayBuffer());
    if (sharp) {
      const meta = await sharp(buf).metadata();
      if ((meta.width ?? 0) > 2560) buf = await sharp(buf).rotate().resize({ width: 2560 }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    console.log(`✓ ${img.id} → ${img.out} (${Math.round(buf.length / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${img.id} (${url}): ${e.message}`);
    failed++;
  }
}
console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed.`);
if (failed) process.exitCode = 1;
