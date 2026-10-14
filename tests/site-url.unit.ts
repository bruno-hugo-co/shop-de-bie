import { test, expect } from "@playwright/test";
import { getSiteUrl } from "../src/lib/site-url";

test("production uses the public Vercel alias until a custom domain is connected", () => {
  expect(getSiteUrl({
    VERCEL_ENV: "production",
    VERCEL_PROJECT_PRODUCTION_URL: "shop-de-bie.vercel.app",
    VERCEL_URL: "shop-de-bie-build-123.vercel.app",
  }).origin).toBe("https://shop-de-bie.vercel.app");
  expect(getSiteUrl({
    VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "shopdebie.be",
  }).origin).toBe("https://shopdebie.be");
});

test("preview uses its own branch or deployment instead of the production domain", () => {
  const env = {
    VERCEL_ENV: "preview", VERCEL_PROJECT_PRODUCTION_URL: "shopdebie.be",
    VERCEL_URL: "shop-de-bie-build-123.vercel.app",
  };
  expect(getSiteUrl(env).origin).toBe("https://shop-de-bie-build-123.vercel.app");
  expect(getSiteUrl({ ...env, VERCEL_BRANCH_URL: "shop-de-bie-git-brand.vercel.app" }).origin)
    .toBe("https://shop-de-bie-git-brand.vercel.app");
});

test("explicit origin supports other hosts and takes precedence over Vercel", () => {
  expect(getSiteUrl({ SITE_URL: "https://shopdebie.be/", VERCEL_PROJECT_PRODUCTION_URL: "shop-de-bie.vercel.app" }).href)
    .toBe("https://shopdebie.be/");
  expect(getSiteUrl({ SITE_URL: "http://127.0.0.1:3101" }).origin).toBe("http://127.0.0.1:3101");
});

test("local and legacy deployments have working origin fallbacks", () => {
  expect(getSiteUrl({ VERCEL_URL: "shop-de-bie.vercel.app" }).origin).toBe("https://shop-de-bie.vercel.app");
  expect(getSiteUrl({}).origin).toBe("http://localhost:3000");
  expect(getSiteUrl({ PORT: "3101" }).origin).toBe("http://localhost:3101");
});
