import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 768, 1024, 1440, 1920]) {
  test(`homepage at ${width}px: layout, images, axe and no browser errors`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "nl-BE");
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(requests.filter((url) => /maps\.google|google\.com\/maps/.test(url))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const steps = await page.locator("#werkwijze ol").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(steps).toBe(width >= 1024 ? 3 : width >= 768 ? 2 : 1);
    // The required two-line hero must not silently wrap to three lines.
    const lineHeights = await page.locator("h1 span").evaluateAll((elements) => elements.map((element) => ({ actual: element.getBoundingClientRect().height, expected: parseFloat(getComputedStyle(element).lineHeight) })));
    for (const line of lineHeights) expect(line.actual).toBeLessThanOrEqual(line.expected + 1);
    await page.locator("#verhaal").scrollIntoViewIfNeeded();
    await expect(page.locator("#verhaal img")).toHaveJSProperty("complete", true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: testInfo.outputPath(`homepage-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("mobile menu traps focus, closes with Escape and navigation, and restores scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const navigation = page.locator("#mobile-navigation");
  await expect(navigation.getByRole("link").first()).toBeFocused();
  await navigation.getByRole("link").last().focus();
  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(navigation.getByRole("link").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await navigation.getByRole("link", { name: "Diensten", exact: true }).click();
  await expect(navigation).toBeHidden();
  await expect(page).toHaveURL(/#diensten$/);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("map loads only after consent and reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://maps.google.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<html lang='nl'><title>Kaart</title></html>" }));
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Kaart laden" }).click();
  await expect(page.locator("iframe")).toHaveAttribute("src", /maps\.google\.com/);
  await expect(page.locator("iframe")).toHaveAttribute("title", "Kaart Shop De Bie");
});

test("Firefox uses opaque glass when backdrop-filter is disabled", async ({ browserName, playwright }) => {
  test.skip(browserName !== "firefox", "Firefox exposes the feature switch used by this test.");
  const browser = await playwright.firefox.launch({ firefoxUserPrefs: { "layout.css.backdrop-filter.enabled": false } });
  try {
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:3100/");
    expect(await page.evaluate(() => CSS.supports("backdrop-filter", "blur(1px)"))).toBe(false);
    await expect(page.locator(".glass-panel")).toHaveCSS("background-color", "rgba(255, 255, 255, 0.94)");
    await expect(page.locator("header.glass-nav")).toHaveCSS("background-color", "rgba(255, 255, 255, 0.94)");
  } finally {
    await browser.close();
  }
});
