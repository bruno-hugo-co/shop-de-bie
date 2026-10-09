# PLAN.md — Shop De Bie homepage (Next.js)

Goal: rebuild `design/reference/home-v2.dc.html` as a production Next.js site that is fast, accessible and easy to extend with sub-pages later.
Read `AGENTS.md` first. Tick each task when it is done. Log any deviation from the design at the bottom.

---

## Phase 0 — Setup
- [ ] `pnpm create next-app@latest . --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm`
- [ ] Confirm Tailwind v4 (`@import "tailwindcss";` in `globals.css`, no `tailwind.config.js` needed)
- [ ] Add scripts: `typecheck` (`tsc --noEmit`), `test:e2e` (`playwright test`)
- [ ] Set `tsconfig` `strict: true`
- [ ] Run `node design/scripts/download-assets.mjs` → `public/images/*` exist
- [ ] Add `.nvmrc` (Node 20 LTS or newer)

## Phase 1 — Foundations
- [ ] `layout.tsx`: `<html lang="nl-BE">`, fonts via `next/font/google`
  - `Instrument_Sans({ subsets:['latin'], axes:['wdth'], variable:'--font-instrument-sans', display:'swap' })`
  - `IBM_Plex_Mono({ subsets:['latin'], weight:['400','500'], variable:'--font-plex-mono', display:'swap' })`
- [ ] `globals.css`: paste `design/tailwind-theme.css` (the `@theme` block and `@utility` recipes). Add base styles: body ink on white, `::selection` turquoise/ink, `a` colours, `scroll-behavior:smooth` inside `@media (prefers-reduced-motion: no-preference)`
- [ ] Global focus-visible style (see AGENTS.md)
- [ ] `src/content/home.ts`: typed export of `design/content/home.json`
- [ ] UI primitives:
  - [ ] `Container`: max-w 1440, px `clamp(20px,4.4vw,64px)`
  - [ ] `Eyebrow`: mono 12px, uppercase, 0.14em tracking
  - [ ] `SectionHeader`: eyebrow + h2 left, lead paragraph right (2-col grid, wraps)
  - [ ] `Button` variants: `ink`, `outline`, `turquoise`, `outlineLight`, `navCta` (spec §Buttons). Renders `<a>` when `href` is given
  - [ ] `Logo`: mark (44px turquoise square with "db") + wordmark; props `tone="light"|"dark"`, `size`

## Phase 2 — Sections (Server Components unless noted)
Follow `design/README.md` for exact sizes. Build mobile-first, then check at every width.
- [ ] **SiteHeader** (inside the hero): glass bar, Logo, nav links, CTA "Ophaling aanvragen"
- [ ] **MobileMenu** (client): below 900px, show a "Menu" button in place of the nav links. Opens a glass panel under the bar with the links stacked (48px rows) and the CTA full width
- [ ] **Hero**: full-bleed photo, 18% ink overlay, glass panel bottom-left with eyebrow row + OpenStatus, h1, lead, 2 buttons
- [ ] **OpenStatus** (client): dot + text from `lib/hours.ts`
- [ ] **Pillars**: 4 cells with hairlines; 4 across from ~860px, 2×2 below, 1 column under 420px
- [ ] **Services** (`#diensten`): 3-col grid. Droogkuis is a turquoise feature cell spanning 2 rows; 4 white cells; Ophaaldienst is a full-width ink banner. No empty cells at any width
- [ ] **Story** (`#verhaal`): turquoise band, text column + 3 stats + button; photo column with caption tag
- [ ] **Process** (`#werkwijze`): 9 steps, **max 3 columns** (3×3), 2 columns on tablet, 1 on mobile. Long words hyphenate (`hyphens:auto`, `lang="nl"`)
- [ ] **LoyaltyCard**: ink band, copy + ruled list of 5 items; card visual rotated −4°
- [ ] **Visit** (`#bezoek`): h2 address, HoursTable, 3 contact buttons; MapEmbed on the right
- [ ] **HoursTable** (client highlight): today's row gets the tint background and weight 600
- [ ] **MapEmbed** (client): click-to-load (see AGENTS.md); placeholder uses the tint background, a mono label and a button
- [ ] **SiteFooter**: 4 columns (brand, bezoek, contact, menu), bottom bar with © year + VAT number + privacy link

## Phase 3 — Behaviour & logic
- [ ] `lib/hours.ts`
  - `schedule`: ISO weekday → array of `[open, close]` in minutes
  - `closures`: `{ from: 'YYYY-MM-DD', to: 'YYYY-MM-DD', label }[]` (empty for now)
  - `getNowInBrussels()` using `Intl.DateTimeFormat('nl-BE', { timeZone:'Europe/Brussels', ... })`
  - `getOpenStatus(now)` → `{ open:boolean, label:string }`. Labels exactly as in `home.json.status`
  - Unit-test the edge cases: 08:59, 09:00, 11:59, 12:00 (lunch), 13:00, 17:59, 18:00, Saturday 12:00, Sunday, a closure day
- [ ] Hydration-safe client rendering (placeholder until mounted)
- [ ] Anchor offsets: `scroll-margin-top: 24px` on sections
- [ ] Every "Ophaling aanvragen" CTA links to `#bezoek` for now (`TODO(client)`: replace with `/contact?onderwerp=ophaling` in phase 2)
- [ ] "Lees ons verhaal" links to `/ons-verhaal`. Create a minimal stub page with the Story section and a footer until the design is ready

## Phase 4 — SEO, metadata, extras
- [ ] `metadata` in layout: title "Shop De Bie — Wasserij & droogkuis in Ninove", description from `home.json.seo`, `metadataBase` `https://shopdebie.be`, canonical, `openGraph`, `twitter`
- [ ] JSON-LD `DryCleaningOrLaundry` (schema.org): name, address, telephone, `openingHoursSpecification`, `vatID`, `sameAs` (Facebook), `foundingDate: "1950"`, image. Geo coordinates: `TODO(client)`, do not guess
- [ ] `app/icon.tsx` (32×32 and 180×180 apple-icon): turquoise square, "db" in Instrument Sans 700 condensed, ink colour
- [ ] `app/opengraph-image.tsx` (1200×630): ink background, logo mark, "Met de ijver van een bij." in condensed 600, white
- [ ] `sitemap.ts`, `robots.ts`
- [ ] 301 redirects from old WordPress URLs in `next.config.ts`:
  - `/thuispagina` → `/`
  - `/geschiedenis/` → `/ons-verhaal`
  - `/gallerij/` → `/ons-verhaal`
  - `/info/` → `/#werkwijze`
  - `/contactformulier/` → `/#bezoek`
  - `/privacy/` → `/privacy`
  - `/winkelmandje/`, `/cart/` → `/`
- [ ] `/privacy` page: simple text page in the site style. Copy is `TODO(client)`; use the placeholder structure in `home.json.privacy`
- [ ] Custom `not-found.tsx` in the site style ("Deze pagina is zoek. Wij vinden normaal alles terug." + button home)

## Phase 5 — QA
- [ ] Visual check against the reference at 375 / 768 / 1024 / 1440 / 1920
- [ ] Safari and iOS: glass (`-webkit-backdrop-filter`), `font-stretch` condensed rendering, `100svh` hero
- [ ] Firefox: fallback when backdrop-filter is disabled
- [ ] Keyboard-only walkthrough (skip link → nav → CTAs → map button → footer)
- [ ] Playwright: homepage loads, no console errors, all anchors scroll, mobile menu opens/closes with Escape, axe has zero serious/critical violations
- [ ] Lighthouse mobile meets the targets in AGENTS.md
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
_(log here: what, why, where)_
