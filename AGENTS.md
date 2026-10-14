# AGENTS.md — Shop De Bie website

## Project and source of truth

Dutch (nl-BE) marketing website for Shop De Bie, a family-run laundry and dry-cleaning business in Ninove (est. 1950). Code, comments and commits are English.

The client replaced the entire brand direction on 2026-10-14. **Artboard `1b Fris` in `design/reference/shop-de-bie-home-new.dc.html` is the visual and copy reference, with the explicitly requested header/navigation and logo from `1a Zacht`.** The client also supplied a screenshot confirming the orange db symbol, green “Shop de bie” wordmark and orange tagline. Open the reference in a browser; other artboard elements are not alternatives to mix in. The original `design/README.md`, tokens, `home-v2.dc.html` and `design/logo/` describe the superseded design.

- `/design` remains read-only. Rebuild the reference as idiomatic React/Tailwind; do not copy its inline-style runtime.
- `src/content/home.ts` contains the exact new Dutch copy and service data. Original business details and image descriptions are retained from `design/content/home.json` and `design/assets.json`.
- `src/app/globals.css` contains the new tokens and repeated utility recipes.
- `PLAN.md` tracks current work, deviations, validation and client dependencies.
- Do not invent prices, email addresses, collection areas or coordinates. Record missing facts as `TODO(client)` in `PLAN.md`, never edit `design/open-questions.md`.

## Stack and commands

Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4 with CSS-first `@theme`, pnpm. Use `next/font/google` and `next/image`. No UI, icon or animation libraries. Existing additional development dependencies: `@axe-core/playwright`, `@playwright/test`, `sharp`.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
node scripts/capture-reference.mjs
node scripts/inspect-browser.mjs
node scripts/generate-brand-icons.mjs
```

Run `pnpm lint && pnpm typecheck && pnpm build` before calling a task done. Browser tests use a production server on port 3101. Capture scripts write ignored artifacts to `qa-artifacts/`; `QA_BASE_URL` can override the inspection URL.

## Current design — 1b Fris

- Figtree for text/headings. The logo uses outlined Barlow Bold for “Shop de bie” and Barlow Semi Condensed 600 for the uppercase tagline. No Instrument Sans or mono labels; no extra logo webfont is needed.
- Core colours: green `#6DBE45`, orange `#EE7D3A`, ink `#15302B`, body `#3F534D`, muted `#556660`, white. Use only the reference-derived theme tokens.
- Rounded pill buttons, rounded cards, soft green/peach gradients and the reference's subtle shadows replace the old square/turquoise/glass direction.
- At 1440px, use 64px page gutters, a 620px square hero photo, 96px hero title, 64px section headings, 120px section spacing. Maintain the reference's proportions; use fluid sizing for smaller screens.
- Cap content at 1440px and extend section backgrounds on wider screens. No mobile artboard was supplied: adapt to stacked cards, a disclosure menu below 1280px, and a three/two/one-column process grid.
- Header exception requested by the client: 1a Zacht's 44px contact strip, white 100px navigation row, 120px desktop gutters, plain links spaced 40px apart and green outlined pickup CTA, with the approved 1a logo and Figtree navigation text. On mobile, omit the address in the contact strip and show the disclosure. The header occupies normal document flow above the 1b hero gradient.
- Header/footer and the Open Graph image use the same outlined 1a logo SVG. The loyalty card uses an ink version of the same geometry on green. Favicon, Apple and manifest icons use the orange db symbol on white, matching the 1a icon specimen. These are brand graphics; ordinary copy must meet AA contrast. Regenerate assets with `scripts/generate-brand-icons.mjs`; do not substitute the old uppercase 1b logo or SDB icon.
- Section order: hero, four pillars, services with six tabs, process, story, side-by-side loyalty/contact cards, footer.
- All photos are local under `public/images`; do not hotlink.

## Behaviour and accessibility

- Only interactive components are client components: `OpenStatus`, `HoursTable`, `MobileMenu`, `ServiceTabs`. Everything else stays on the server.
- Opening hours and closures live in `src/lib/hours.ts`. Calculate current status and today's row in **Europe/Brussels** only after mount, with a neutral server placeholder. Refresh every 60 seconds and on visibility changes.
- The new reference has no embedded map. “Route plannen” opens external Google Maps; do not load Maps on page load or add analytics/cookie banners.
- The client confirmed that **all service detail links and “Ophaling aanvragen” link to `#bezoek` for now**. Detail pages and collection forms are future work.
- Service tabs require tab/tabpanel roles, selected state, roving tab focus, arrow/Home/End navigation and matching local images.
- Mobile menu uses `aria-expanded`/`aria-controls`, closes on Escape/navigation, traps focus and returns focus to its button. Restore scrolling when closed or resized to desktop.
- Preserve skip link “Naar inhoud”, header/nav/main/footer landmarks, one h1, h2 section titles, h3 card titles, Dutch image descriptions and visible ink focus outlines.
- Smooth anchors have a 24px scroll margin; respect reduced motion.
- Phone links use E.164 (`tel:+3254331112`).
- WCAG 2.2 AA; axe must report zero serious/critical violations.

## Code and completion

Use named function components, one per file. Tailwind classes in JSX; repeated recipes in `@utility`. Copy comes from the typed content module (except aria labels). Conventional commits, one PLAN task per commit where possible.

A task is complete when it matches the reference at 1440px, works at 375/768/1024/1920px, passes lint/typecheck/build and applicable browser/keyboard/axe checks, has no console or hydration errors, and is recorded in PLAN. Keep physical-device/screen-reader limitations explicit. Lighthouse mobile targets: Performance ≥90, Accessibility 100, Best Practices ≥95, SEO 100.
