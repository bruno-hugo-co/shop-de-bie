# Shop De Bie

Dutch (nl-BE) homepage for Shop De Bie in Ninove, implemented from the read-only design handoff in `design/`. Next.js 15, React 19, TypeScript strict and Tailwind CSS v4.

## Development

Use Node 22 (`.nvmrc`) and the pnpm version pinned in `package.json`.

```sh
pnpm install
pnpm dev
```

Google Fonts must be reachable during the first build. Next.js then serves the fonts locally. Photos are stored in `public/images`; run `node design/scripts/download-assets.mjs` if any are missing.

## Validation

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

Playwright starts the production server on port 3100. Tests cover opening-hour boundaries, Brussels daylight-saving changes, all five responsive checkpoints, keyboard navigation, menu focus, deferred Maps loading, axe, metadata and redirects. `pnpm test:unit` runs the opening-hours cases; `pnpm test:browsers` runs the WebKit and Firefox checks. The production build is required before these commands.

The browser report and screenshots are in `playwright-report/` and `test-results/` (ignored by Git). To compare with the reference:

```sh
node scripts/capture-reference.mjs
# In another terminal: pnpm start --port 3100
node scripts/inspect-browser.mjs
```

These scripts write ignored screenshots to `qa-artifacts/` and leave `design/` untouched.

## Content and behaviour

- `src/content/home.ts` preserves the supplied Dutch copy and imports image descriptions from the asset manifest as local data.
- `src/lib/hours.ts` owns the weekly schedule and inclusive holiday closure ranges. Client widgets initialise after mount and refresh every minute.
- Google Maps loads only after selecting “Kaart laden”. No analytics or cookie banner is included.
- `/ons-verhaal` reuses the approved story section. `/privacy` retains `TODO(client)` placeholders and is excluded from indexing until approved.
- Icons and the sharing image are generated with local, OFL-licensed Instrument Sans fonts; the website uses `next/font/google` with the width axis.

## Deployment

`vercel.json` sets the framework and reproducible install/build commands. Import this repository in the client's Vercel team, use `main` as the production branch and enable pull-request previews. No Vercel project, credentials, production deployment or DNS changes are configured by this checkout.

Before publishing, resolve the client items in `PLAN.md`, particularly the privacy policy, copy/photo approval and domain access. After approval, add both domains, configure the `www` redirect in Vercel and verify the final production URLs before submitting the sitemap or changing the Google Business Profile.

See `PLAN.md` for completed work, validation results, deviations and outstanding device checks.
