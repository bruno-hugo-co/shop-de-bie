# PLAN.md — Shop De Bie homepage (Next.js)

Goal: rebuild `design/reference/home-v2.dc.html` as a production Next.js site that is fast, accessible and easy to extend with sub-pages later.
Read `AGENTS.md` first. Tick each task when it is done. Log any deviation from the design at the bottom.

---

## Phase 0 — Setup
- [x] `pnpm create next-app@latest . --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm`
- [x] Confirm Tailwind v4 (`@import "tailwindcss";` in `globals.css`, no `tailwind.config.js` needed)
- [x] Add scripts: `typecheck` (`tsc --noEmit`), `test:e2e` (`playwright test`)
- [x] Set `tsconfig` `strict: true`
- [x] Run `node design/scripts/download-assets.mjs` → `public/images/*` exist
- [x] Add `.nvmrc` (Node 20 LTS or newer)

## Phase 1 — Foundations
- [x] `layout.tsx`: `<html lang="nl-BE">`, fonts via `next/font/google`
  - `Instrument_Sans({ subsets:['latin'], axes:['wdth'], variable:'--font-instrument-sans', display:'swap' })`
  - `IBM_Plex_Mono({ subsets:['latin'], weight:['400','500'], variable:'--font-plex-mono', display:'swap' })`
- [x] `globals.css`: paste `design/tailwind-theme.css` (the `@theme` block and `@utility` recipes). Add base styles: body ink on white, `::selection` turquoise/ink, `a` colours, `scroll-behavior:smooth` inside `@media (prefers-reduced-motion: no-preference)`
- [x] Global focus-visible style (see AGENTS.md)
- [x] `src/content/home.ts`: typed export of `design/content/home.json`
- [x] UI primitives:
  - [x] `Container`: max-w 1440, px `clamp(20px,4.4vw,64px)`
  - [x] `Eyebrow`: mono 12px, uppercase, 0.14em tracking
  - [x] `SectionHeader`: eyebrow + h2 left, lead paragraph right (2-col grid, wraps)
  - [x] `Button` variants: `ink`, `outline`, `turquoise`, `outlineLight`, `navCta` (spec §Buttons). Renders `<a>` when `href` is given
  - [x] `Logo`: lowercase “Stip” wordmark; props `variant="onLight"|"onDark"|"onTurquoise"`, `size`; separate vector `LogoMark` (supersedes the original db design)

## Phase 2 — Sections (Server Components unless noted)
Follow `design/README.md` for exact sizes. Build mobile-first, then check at every width.
- [x] **SiteHeader** (inside the hero): glass bar, Logo, nav links, CTA "Ophaling aanvragen"
- [x] **MobileMenu** (client): below 900px, show a "Menu" button in place of the nav links. Opens a glass panel under the bar with the links stacked (48px rows) and the CTA full width
- [x] **Hero**: full-bleed photo, 18% ink overlay, glass panel bottom-left with eyebrow row + OpenStatus, h1, lead, 2 buttons
- [x] **OpenStatus** (client): dot + text from `lib/hours.ts`
- [x] **Pillars**: 4 cells with hairlines; 4 across from ~860px, 2×2 below, 1 column under 420px
- [x] **Services** (`#diensten`): 3-col grid. Droogkuis is a turquoise feature cell spanning 2 rows; 4 white cells; Ophaaldienst is a full-width ink banner. No empty cells at any width
- [x] **Story** (`#verhaal`): turquoise band, text column + 3 stats + button; photo column with caption tag
- [x] **Process** (`#werkwijze`): 9 steps, **max 3 columns** (3×3), 2 columns on tablet, 1 on mobile. Long words hyphenate (`hyphens:auto`, `lang="nl"`)
- [x] **LoyaltyCard**: ink band, copy + ruled list of 5 items; card visual rotated −4°
- [x] **Visit** (`#bezoek`): h2 address, HoursTable, 3 contact buttons; MapEmbed on the right
- [x] **HoursTable** (client highlight): today's row gets the tint background and weight 600
- [x] **MapEmbed** (client): click-to-load (see AGENTS.md); placeholder uses the tint background, a mono label and a button
- [x] **SiteFooter**: 4 columns (brand, bezoek, contact, menu), bottom bar with © year + VAT number + privacy link

## Phase 3 — Behaviour & logic
- [x] `lib/hours.ts`
  - `schedule`: ISO weekday → array of `[open, close]` in minutes
  - `closures`: `{ from: 'YYYY-MM-DD', to: 'YYYY-MM-DD', label }[]` (empty for now)
  - `getNowInBrussels()` using `Intl.DateTimeFormat('nl-BE', { timeZone:'Europe/Brussels', ... })`
  - `getOpenStatus(now)` → `{ open:boolean, label:string }`. Labels exactly as in `home.json.status`
  - Unit-test the edge cases: 08:59, 09:00, 11:59, 12:00 (lunch), 13:00, 17:59, 18:00, Saturday 12:00, Sunday, a closure day
- [x] Hydration-safe client rendering (placeholder until mounted)
- [x] Anchor offsets: `scroll-margin-top: 24px` on sections
- [x] Every "Ophaling aanvragen" CTA links to `#bezoek` for now (`TODO(client)`: replace with `/contact?onderwerp=ophaling` in phase 2)
- [x] "Lees ons verhaal" links to `/ons-verhaal`. Create a minimal stub page with the Story section and a footer until the design is ready

## Phase 4 — SEO, metadata, extras
- [x] `metadata` in layout: title "Shop De Bie — Wasserij & droogkuis in Ninove", description from `home.json.seo`, `metadataBase` `https://shopdebie.be`, canonical, `openGraph`, `twitter`
- [x] JSON-LD `DryCleaningOrLaundry` (schema.org): name, address, telephone, `openingHoursSpecification`, `vatID`, `sameAs` (Facebook), `foundingDate: "1950"`, image. Geo coordinates: `TODO(client)`, do not guess
- [x] `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`: supplied “Stip” icons; `public/icon-512.png` referenced by `app/manifest.ts` (supersedes generated db icons)
- [x] `app/opengraph-image.tsx` (1200×630): ink background, logo mark, "Met de ijver van een bij." in condensed 600, white
- [x] `sitemap.ts`, `robots.ts`
- [x] 301 redirects from old WordPress URLs in `next.config.ts`:
  - `/thuispagina` → `/`
  - `/geschiedenis/` → `/ons-verhaal`
  - `/gallerij/` → `/ons-verhaal`
  - `/info/` → `/#werkwijze`
  - `/contactformulier/` → `/#bezoek`
  - `/privacy/` → `/privacy`
  - `/winkelmandje/`, `/cart/` → `/`
- [x] `/privacy` page: simple text page in the site style. Copy is `TODO(client)`; use the placeholder structure in `home.json.privacy`
- [x] Custom `not-found.tsx` in the site style ("Deze pagina is zoek. Wij vinden normaal alles terug." + button home)

## Logo update — 1c “Stip” (2026-10-09)
- [x] Apply design/logo/README.md as the new branding source of truth; keep all design files read-only.
- [x] Use the supplied wordmark geometry: Instrument Sans 700, 80% width, −0.035em tracking, dotless i with the square at the exact provided offsets.
- [x] Header: onLight / 30px; footer: onDark / 36px; loyalty card: onTurquoise / 40px and a 48px LogoMark. Preserve home links, accessible names and logo clear space.
- [x] Copy the SVG, multi-size ICO, 180px Apple icon and 512px manifest icon byte-for-byte; remove the old generated icon routes.
- [x] Reuse LogoMark in the Open Graph image; update metadata-route checks and browser capture tooling.
- [x] Validation: lint, typecheck and production build pass; Playwright reports 38 passed and 2 intentionally skipped, with zero axe violations or browser errors. Check the layout at 375 / 768 / 1024 / 1440 / 1920px in Chromium, WebKit and Firefox and inspect the updated screenshots and Open Graph image.

## Phase 5 — QA
- [x] Visual check against the reference at 375 / 768 / 1024 / 1440 / 1920
- [ ] Safari and iOS: glass (`-webkit-backdrop-filter`), `font-stretch` condensed rendering, `100svh` hero — WebKit with iPhone emulation passes; physical Safari/iOS verification remains
- [x] Firefox: fallback when backdrop-filter is disabled
- [x] Keyboard-only walkthrough (skip link → nav → CTAs → map button → footer)
- [x] Playwright: homepage loads, no console errors, all anchors scroll, mobile menu opens/closes with Escape, axe has zero serious/critical violations
- [x] Lighthouse mobile meets the targets in AGENTS.md
- [ ] Check all `tel:` links on a phone

## Phase 6 — Deploy
- [ ] Vercel project, production branch `main`, preview deploys on PRs
- [ ] Domain `shopdebie.be` + `www` redirect (`TODO(client)`: DNS access)
- [ ] After DNS switch: submit sitemap in Google Search Console; update the Google Business Profile website URL

---

## Later (not in phase 1, design still to be made)
- `/diensten`: one detail block per service + "Voor bedrijven & horeca" quote CTA
- `/werkwijze`: 9 steps in full + a wash-symbol guide (wasgids)
- `/ons-verhaal`: timeline 1950 / 1991 / 2017 / today, the meaning of the name, gallery (12 photos in `assets.json`)
- `/contact`: form with subject chips (Vraag / Ophaling aanvragen / Klantenkaart / Offerte bedrijf). Server Action + Resend. Needs `TODO(client)` email
- Optional: a notice bar for holiday closures, fed by `closures` in `lib/hours.ts`

## Deviations from design
- The explicitly requested design/logo handoff overrides the original db block in the reference HTML, old spec and completed foundation tasks. The logo is a non-interactive graphic; header/footer supply its navigation links, while the loyalty card remains decorative. No extra logo is added to the Story band, which had no logo placement.
- The supplied scaffold used Next.js 16.4.0. Restored the required Next.js 15 stack (15.5.27), the PostCSS integration for Tailwind v4 and compatible ESLint configuration. Existing setup and all 15 local photos were verified rather than rerunning create-next-app over the repository.
- The README/spec takes precedence over the HTML reference: the mobile disclosure replaces the wrapping desktop links below 900px; pillars use 2×2 at 768px (the reference shows 3+1); h2 headings use balanced wrapping; Maps starts with a click-to-load placeholder; the hero uses `100svh`. The 64px minimum hero title fits at 375px and was retained.
- The site header visually sits inside the hero but is a sibling of `main` in the DOM, preserving a top-level banner landmark. The hero reserves the header's 68px row. A visually hidden h2 names the pillar group so card h3 headings do not skip a level.
- Reserved opening-status width and non-wrapping hero title lines prevent a hydration/font-loading layout shift while retaining the neutral initial status.
- Image descriptions were absent from home.json; copied the exact Dutch alt text from design/assets.json into the typed content export. Design files remain unchanged.
- Added `storyCta` (specified in the README) alongside the PLAN's button variants. The whole pickup banner is one link, with a styled non-interactive CTA to avoid nested links.
- The Open Graph title uses a locally bundled, OFL-licensed static condensed Instrument Sans font. A 1.04 horizontal adjustment brings its 75% condensed outline width to 78%; the website itself uses the true variable width axis through next/font/google. Browser icons now use the supplied “Stip” assets.
- The supplied privacy structure remains a TODO(client) placeholder, with noindex and omission from the sitemap until approved. Unknown email and coordinates are omitted from JSON-LD.

## Validation — 2026-10-09

- `pnpm lint`, `pnpm typecheck`, `pnpm build`: passed on Next.js 15.5.27 / React 19.3.0.
- `pnpm test:e2e`: 38 passed; 2 intentionally skipped because the Firefox-only fallback check does not apply to Chromium/WebKit. Nine opening-hours tests cover all requested boundaries, holidays, Brussels midnight and both daylight-saving transitions.
- Chromium, Firefox and WebKit: tested 375, 768, 1024, 1440 and 1920px; no horizontal overflow, unintended hero wrapping, console errors or hydration warnings. All axe rules pass on the homepage, including best-practice rules. Supporting pages also pass the WCAG axe checks.
- Keyboard checks include the skip link, visible focus, menu wrapping/Escape/focus return, anchor offsets, map loading and footer. The generated accessibility tree was inspected; a live VoiceOver/physical-device walkthrough remains a release check.
- Firefox with `layout.css.backdrop-filter.enabled=false`: both glass backgrounds resolve to rgba(255,255,255,0.94).
- Local production Lighthouse mobile (final run): Performance 98, Accessibility 100, Best Practices 100, SEO 100; CLS 0. Reports: `qa-artifacts/lighthouse.report.html` and `.json` (ignored local artifacts).
- Reference/site screenshots: `qa-artifacts/reference/`, `qa-artifacts/site/`; Playwright evidence: `test-results/`, `playwright-report/` (ignored local artifacts).
- Physical phone calls via tel links have not been tested; all href values are validated as E.164.

## Deployment and client dependencies

`vercel.json` and README deployment instructions are ready. No Vercel CLI login/project linkage or DNS access is available in this workspace. No deployment, domain switch, Search Console submission or Google Business Profile update has been performed. Phase 6 remains open.

Carry-forward from the read-only design/open-questions.md:

- TODO(client): Vercel team/project and domain/DNS access; production branch main and preview deployments must be configured in that account.
- TODO(client): approved privacy policy and email address.
- TODO(client): pickup towns, days, price/minimum order, customer eligibility and approval of the supplied pickup text. Pickup CTAs continue to link to #bezoek; replace with /contact?onderwerp=ophaling when the future contact flow is designed.
- TODO(client): approval of designer-written service and process descriptions.
- TODO(client): photo usage rights and confirmation of the people in the portrait.
- TODO(client): exact Google Business Profile and verified coordinates.
- TODO(client): holiday periods for the currently empty closures array.

The optional prices, reviews, new photography, Facebook confirmation and business/horeca flow from the handoff remain future work.
