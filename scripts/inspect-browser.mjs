import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.QA_BASE_URL ?? "http://127.0.0.1:3101";
await mkdir("qa-artifacts/fris-site", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
await page.clock.install({ time: new Date("2026-10-14T08:00:00Z") });
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("img:visible").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(element => element.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `qa-artifacts/fris-site/hero-${width}.png` });
  await page.screenshot({ path: `qa-artifacts/fris-site/home-${width}.png`, fullPage: true });
  console.log(width, await page.locator("h1").evaluate(el => ({ font: getComputedStyle(el).fontFamily, size: getComputedStyle(el).fontSize, overflow: document.documentElement.scrollWidth > innerWidth })));
}
await page.setViewportSize({ width: 1440, height: 1000 });
console.log("Layout", await page.locator("header, h1, #diensten, #werkwijze, #verhaal, #klantenkaart, #bezoek, footer").evaluateAll(elements => elements.map(element => {
  const rect = element.getBoundingClientRect();
  return { tag: element.tagName, id: element.id, top: rect.top + scrollY, width: rect.width, height: rect.height };
})));
console.log("Contact", await page.locator("#bezoek").evaluate(element => [...element.children].map(child => ({ text: child.textContent?.slice(0,40), height: child.getBoundingClientRect().height, style: getComputedStyle(child).lineHeight }))));

await writeFile("qa-artifacts/fris-site/accessibility-tree.txt", await page.locator("body").ariaSnapshot());
for (const [route, filename] of [["icon.svg", "icon.svg"], ["apple-icon.png", "apple-icon.png"], ["opengraph-image", "opengraph-image.png"]]) {
  const response = await page.request.get(`${baseURL}/${route}`);
  await writeFile(`qa-artifacts/fris-site/${filename}`, await response.body());
}
await browser.close();
