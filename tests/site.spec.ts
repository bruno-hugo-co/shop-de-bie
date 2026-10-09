import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

 test("anchors, keyboard skip link, metadata and contact links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Naar inhoud" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  for (const [label, id] of [["Diensten", "diensten"], ["Werkwijze", "werkwijze"], ["Ons verhaal", "verhaal"], ["Contact", "bezoek"]]) {
    await page.locator("[data-desktop-nav]").getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(() => page.locator(`#${id}`).evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBe(24);
  }
  for (const href of await page.locator('a[href^="tel:"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")))) expect(href).toMatch(/^tel:\+32\d+$/);
  await expect(page).toHaveTitle("Shop De Bie — Wasserij & droogkuis in Ninove");
  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(jsonLd["@type"]).toBe("DryCleaningOrLaundry");
  expect(JSON.stringify(jsonLd)).not.toContain("TODO");
  expect(jsonLd.openingHoursSpecification).toHaveLength(11);
});

test("client clock refreshes opening status and today's row in Brussels", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-05T09:59:30Z") });
  await page.goto("/");
  await expect(page.getByRole("status")).toHaveText("Nu open tot 12:00");
  await expect(page.locator('tr[aria-current="date"]')).toContainText("Maandag");
  await page.clock.fastForward(60_000);
  await expect(page.getByRole("status")).toHaveText("Open om 13:00");
});

for (const path of ["/ons-verhaal", "/privacy", "/bestaat-niet"]) {
  test(`supporting page ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(path === "/bestaat-niet" ? 404 : 200);
    await expect(page.locator("h1")).toHaveCount(1);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(axe.violations).toEqual([]);
  });
}

test("legacy URLs redirect once with 301, and privacy never loops", async ({ request }) => {
  for (const [source, destination] of [["/thuispagina", "/"], ["/geschiedenis/", "/ons-verhaal"], ["/gallerij/", "/ons-verhaal"], ["/info/", "/#werkwijze"], ["/contactformulier/", "/#bezoek"], ["/privacy/", "/privacy"], ["/winkelmandje/", "/"], ["/cart/", "/"]]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(destination);
  }
  expect((await request.get("/privacy")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  for (const route of ["/icon", "/apple-icon", "/opengraph-image"]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
});

test("keyboard reaches every main control with visible focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("banner")).toHaveCount(1);
  const labels: string[] = [];
  for (let index = 0; index < 35; index++) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => {
      const element = document.activeElement as HTMLElement;
      return { text: element.innerText, outline: getComputedStyle(element).outlineStyle };
    });
    labels.push(focused.text.trim());
    expect(focused.outline).toBe("solid");
    if (focused.text === "Privacy & cookies") break;
  }
  expect(labels).toEqual(expect.arrayContaining(["Naar inhoud", "Ontdek onze diensten", "Kaart laden", "Privacy & cookies"]));
});
