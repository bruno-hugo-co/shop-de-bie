import { chromium, firefox } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("qa-artifacts/site", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:3100");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `qa-artifacts/site/hero-${width}.png` });
  await page.screenshot({ path: `qa-artifacts/site/home-${width}.png`, fullPage: true });
  console.log(width, await page.locator("h1").evaluate((el) => ({ font: getComputedStyle(el).fontFamily, stretch: getComputedStyle(el).fontStretch, size: getComputedStyle(el).fontSize })));
}
await writeFile("qa-artifacts/site/accessibility-tree.txt", await page.locator("body").ariaSnapshot());
for (const route of ["icon", "apple-icon", "opengraph-image"]) {
  const response = await page.request.get(`http://127.0.0.1:3100/${route}`);
  await writeFile(`qa-artifacts/site/${route}.png`, await response.body());
}
await browser.close();
const fallbackBrowser = await firefox.launch({ firefoxUserPrefs: { "layout.css.backdrop-filter.enabled": false } });
const fallbackPage = await fallbackBrowser.newPage();
await fallbackPage.goto("http://127.0.0.1:3100");
console.log("Firefox fallback", await fallbackPage.locator(".glass-panel").evaluate((el) => ({ supported: CSS.supports("backdrop-filter", "blur(1px)"), background: getComputedStyle(el).backgroundColor })));
await fallbackBrowser.close();
