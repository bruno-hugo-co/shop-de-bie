import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "pnpm start --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI },
  projects: [
    { name: "unit", testMatch: "**/*.unit.ts" },
    { name: "chromium", use: { ...devices["Desktop Chrome"] }, testMatch: "**/*.spec.ts" },
    { name: "webkit", use: { ...devices["iPhone 13"] }, testMatch: "**/browser.spec.ts" },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: "**/browser.spec.ts" },
  ],
});
