# Shop De Bie

Dutch (nl-BE) homepage for Shop De Bie in Ninove, implemented from the read-only design artboard **1b Fris** in `design/reference/shop-de-bie-home-new.dc.html`. Next.js 15, React 19, TypeScript strict and Tailwind CSS v4.

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

Playwright starts the production server on port 3101. Tests cover opening-hour boundaries, Brussels daylight-saving changes, all five responsive checkpoints, keyboard navigation, menu focus, six keyboard-accessible service tabs, external Maps routing, axe, metadata and redirects. `pnpm test:unit` runs the opening-hours cases; `pnpm test:browsers` runs the WebKit and Firefox checks. The production build is required before these commands.

The browser report and screenshots are in `playwright-report/` and `test-results/` (ignored by Git). To compare with the reference:

```sh
node scripts/capture-reference.mjs
# In another terminal: pnpm start --port 3101
node scripts/inspect-browser.mjs
```

These scripts write ignored screenshots to `qa-artifacts/` and leave `design/` untouched.

## Content and behaviour

- `src/content/home.ts` preserves the supplied Dutch copy and imports image descriptions from the asset manifest as local data.
- `src/lib/hours.ts` owns the weekly schedule and inclusive holiday closure ranges. Client widgets initialise after mount and refresh every minute.
- The contact card links to external Google Maps; no map iframe or Google request is loaded on the page. No analytics or cookie banner is included.
- Service detail links and pickup CTAs go to `#bezoek`, as confirmed by the client. Dedicated service pages and the pickup form are future work.
- `/ons-verhaal` reuses the approved story section. `/privacy` retains `TODO(client)` placeholders and is excluded from indexing until approved.
- The page follows artboard 1b: Figtree body/headings, green/orange accents, rounded cards and soft gradients. The client-approved logo comes from 1a Zacht: an orange db symbol, green Barlow “Shop de bie” and an orange Barlow Semi Condensed tagline. Older design specs/tokens/logo assets are superseded and remain read-only.
- The header uses the client-requested 1a Zacht layout: a slim contact strip, white navigation bar, plain links and an outlined pickup button, with the 1a logo and Figtree navigation text. The mobile disclosure appears below 1280px.
- `node scripts/generate-brand-icons.mjs` recreates the colour/ink vector logos and SVG/ICO/PNG icons using bundled OFL-licensed Barlow fonts. The Open Graph image embeds the same colour SVG with bundled Figtree text; the green loyalty card uses the ink logo.

## Deployment

Social images, canonical URLs, JSON-LD, robots and sitemap use the build's deployment origin. Production uses `VERCEL_PROJECT_PRODUCTION_URL` (currently `shop-de-bie.vercel.app`); previews use `VERCEL_BRANCH_URL` or `VERCEL_URL`. These are [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables). Keep system environment variables enabled. Local builds use `http://localhost:${PORT || 3000}`. For other hosting, set `SITE_URL` to the full public origin **before building**. Only set `SITE_URL=https://shopdebie.be` after that domain serves this site, then rebuild. The future domain in the content module does not determine live asset URLs.

Social sharing uses the existing 1200×630 PNG at `/opengraph-image`, with the approved orange/green logo and Dutch headline. After deploying, check the actual `og:image` URL in the public HTML: it must return 200 and `image/png` without authentication. Previously sent WhatsApp previews can remain cached; test a newly shared URL such as `/?v=brand-20261014`. Preview deployments with Vercel authentication enabled cannot be fetched by social crawlers.

`vercel.json` sets the framework and reproducible install/build commands. Import this repository in the client's Vercel team, use `main` as the production branch and enable pull-request previews. No Vercel project, credentials, production deployment or DNS changes are configured by this checkout.

Before publishing, resolve the client items in `PLAN.md`, particularly the privacy policy, copy/photo approval and domain access. After approval, add both domains, configure the `www` redirect in Vercel and verify the final production URLs before submitting the sitemap or changing the Google Business Profile.

See `PLAN.md` for completed work, validation results, deviations and outstanding device checks.
