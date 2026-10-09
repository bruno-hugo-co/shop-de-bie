import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const manifest = JSON.parse(await readFile("design/assets.json", "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route("https://shopdebie.be/wp-content/uploads/**", async (route) => {
  const asset = manifest.images.find((image) => manifest.baseUrl + image.src === route.request().url());
  if (asset) await route.fulfill({ path: resolve(asset.out), contentType: "image/jpeg" });
  else await route.abort();
});
await page.route(/maps\.google\.com/, (route) => route.abort());
await mkdir("qa-artifacts/reference", { recursive: true });
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(pathToFileURL(resolve("design/reference/home-v2.dc.html")).href);
  await page.waitForSelector("h1");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `qa-artifacts/reference/home-${width}.png`, fullPage: true });
  console.log(`Reference captured at ${width}px`);
}
await browser.close();
