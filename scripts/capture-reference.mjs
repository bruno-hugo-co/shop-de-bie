import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const manifest = JSON.parse(await readFile("design/assets.json", "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, timezoneId: "Europe/Brussels" });
await page.clock.install({ time: new Date("2026-10-14T08:00:00Z") });
await page.route("https://shopdebie.be/wp-content/uploads/**", async route => {
  const asset = manifest.images.find(image => manifest.baseUrl + image.src === route.request().url());
  if (asset) await route.fulfill({ path: resolve(asset.out), contentType: "image/jpeg" });
  else await route.abort();
});
await mkdir("qa-artifacts/fris-reference", { recursive: true });
await page.goto(pathToFileURL(resolve("design/reference/shop-de-bie-home-new.dc.html")).href);
const artboard = page.locator('[data-screen-label="1b Fris"]');
await artboard.locator("button").first().waitFor();
await page.evaluate(() => document.fonts.ready);
await artboard.screenshot({ path: "qa-artifacts/fris-reference/full.png" });
console.log(await artboard.evaluate(element => [...element.children].map(child => {
  const rect = child.getBoundingClientRect();
  const root = element.getBoundingClientRect();
  return { title: child.querySelector("h3")?.textContent, top: rect.top - root.top, width: rect.width, height: rect.height };
})));
console.log("Contact", await artboard.evaluate(element => [...element.children[4].children[1].children].map(child => ({ text: child.textContent?.slice(0,40), height: child.getBoundingClientRect().height, style: getComputedStyle(child).lineHeight }))));
console.log("Captured artboard 1b Fris at its native 1440px width.");
await mkdir("qa-artifacts/zacht-header", { recursive: true });
const zacht = page.locator('[data-screen-label="1a Zacht"]');
await zacht.locator("header").screenshot({ path: "qa-artifacts/zacht-header/reference-navigation.png" });
await zacht.locator(":scope > div").first().screenshot({ path: "qa-artifacts/zacht-header/reference-contact.png" });
console.log("Captured the client-requested 1a Zacht header and contact strip.");
await mkdir("qa-artifacts/zacht-logo", { recursive: true });
await page.locator('[id="1a"] > div').nth(1).locator(":scope > div > span").first().screenshot({ path: "qa-artifacts/zacht-logo/reference.png" });
console.log("Captured the approved 1a Zacht logo specimen.");
await browser.close();
