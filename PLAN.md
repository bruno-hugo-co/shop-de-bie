# PLAN.md — Shop De Bie, 1b Fris

The client replaced the previous brand direction on 2026-10-14. Rebuild the homepage from **artboard 1b Fris** in `design/reference/shop-de-bie-home-new.dc.html`, with the subsequently requested **1a Zacht header/navigation and logo**. The old turquoise/square design, “Stip” logo and their completed implementation plan are superseded. Keep all design files read-only.

## Logo update — 1a Zacht (2026-10-14)

- [x] Match the client screenshot to the large 1a logo specimen: orange db symbol, green “Shop de bie” in Barlow Bold, orange uppercase tagline in Barlow Semi Condensed 600.
- [x] Generate outlined colour and ink SVGs with the specimen's exact symbol geometry, spacing and typography; preserve the original screenshot and all design files.
- [x] Apply the colour logo in header/footer and the Open Graph image, and the ink variant on the green loyalty card.
- [x] Replace SDB browser/Apple/manifest icons with the orange symbol on white from the 1a icon specimen; remove the unused logo webfont.
- [x] Validate lint/typecheck/build, responsive layouts, keyboard/axe and regenerated logo/icon/social assets.

The full logo uses a 366×100 viewBox and displays at 183×50px in the header/footer. The symbol is 60×100 with a 14px stem and 12px circular strokes. Barlow fonts and their OFL license remain bundled for reproducible vector generation. The screenshot is used as a reference, not cropped into a raster website asset.

Validation: lint, typecheck and production build pass without warnings; all 40 Playwright tests pass across Chromium, WebKit and Firefox. Zero axe violations, console errors, hydration warnings or overflow at 375 / 768 / 1024 / 1440 / 1920px. Compared the vector with the rendered 1a logo specimen and inspected desktop/mobile placement, icon and Open Graph image. Reference and logo previews are in `qa-artifacts/zacht-logo/`; site screenshots are in `qa-artifacts/fris-site/`. Physical-device and live screen-reader release checks remain open.

## Header update — 1a Zacht (2026-10-14)

- [x] Inspect the 1a header in a browser and replace the floating navigation with its white contact/navigation bars and green outlined CTA.
- [x] Keep Figtree typography and existing contact data/Brussels logic; the initial 1b wordmark was subsequently replaced by the approved 1a logo above.
- [x] Adapt mobile navigation and its focus/scroll behaviour, moving the disclosure breakpoint to 1280px to accommodate the wider links and 1a gutters.
- [x] Validate the final build, five viewport widths, keyboard/menu/anchors, live opening status and accessibility.

The header has 44px and 100px rows at desktop, with 120px gutters at 1440px. It sits above the hero in normal flow. The top-bar status mirrors the hero badge without duplicate live announcements; both keep neutral server placeholders. The address is omitted from the narrow mobile contact strip. Header reference captures are in `qa-artifacts/zacht-header/`.

Validation: lint, typecheck and production build passed; all 40 Playwright tests passed in Chromium, WebKit and Firefox, with zero axe violations or browser errors. Inspected the header at 375 / 768 / 1024 / 1440 / 1920px; its desktop height is exactly 144px. Existing physical-device and live screen-reader release checks remain open. The Lighthouse numbers below describe the original 1b baseline, before this header update.

## Brand rebuild — 2026-10-14

- [x] Inspect the actual rendered 1b artboard, its styles, service states and local photo mappings.
- [x] Confirm service-link destinations: client chose the existing contact block; detail pages come later.
- [x] Replace theme, fonts and primitives with Figtree, Barlow, green/orange, rounded cards and reference gradients/shadows.
- [x] Copy exact new text and service data into typed `src/content/home.ts`; retain established business data.
- [x] Rebuild header/disclosure, hero, pillars, service tabs, process, story, loyalty/contact cards and footer in the reference order.
- [x] Implement accessible service tabs with arrow/Home/End navigation and correct image/content states.
- [x] Retain Brussels opening status, holiday support, 60-second refresh, hydration-safe placeholders and mobile-menu focus handling.
- [x] Replace logo, favicon, Apple/manifest icons and social image; remove old fonts, logo mark, glass styles and unused map/section components.
- [x] Apply the brand to story/privacy/404 pages; preserve metadata, JSON-LD, sitemap, robots and legacy redirects.
- [x] Update repository instructions, documentation, reference capture and regression tests.
- [x] Validate lint, typecheck and production build after the final changes.
- [x] Check all five viewport widths and browser engines, tabs, keyboard/menu/anchors, images, console/hydration and axe.
- [x] Inspect reference comparison screenshots, icon/social assets and Lighthouse mobile results.

## Deviations and implementation decisions

- The explicit client redesign overrides the old design README, tokens, logo handoff, typography, square-corner/no-gradient rules and original copy. `/design` is unmodified. Current tokens are extracted from 1b into `globals.css`.
- The reference is a fixed 1440px desktop artboard. Smaller screens use fluid type/gutters, stacked cards, a disclosure below 1280px and 3/2/1 process columns. Wider screens retain a 1440px content maximum.
- Preserve the exact desktop typography and colours of the logo as outlined Barlow vector paths; font licenses and an icon-generation script are included. Ordinary text uses accessible ink/body/muted colours; focus uses ink on the new light/green surfaces.
- The new reference includes interactive service tabs, so `ServiceTabs` is an additional small client component beyond the old allowed list. Hidden panels preserve semantic associations; only active content is available to assistive technology.
- The reference's decorative button spans are real links/buttons. Client-approved service and pickup links target `#bezoek`; no unsupported detail page or form is invented.
- The new contact card has a route link and no map iframe. The obsolete map component and its click-to-load UI have been removed; no Google requests occur on page load.
- Reference heading levels are corrected to one h1, h2 sections and h3 cards. Hours use a semantic table and Brussels time rather than the prototype's machine-local date.
- The logo specimen strip and the 1c artboard are not website sections. The explicitly requested header layout and logo/icon geometry come from 1a; the rest follows 1b.

## Validation — original 1b baseline, 2026-10-14

- `pnpm lint`, `pnpm typecheck`, `pnpm build`: passed on the final implementation.
- `pnpm test:e2e`: **40 passed**, no skipped tests. Chromium, WebKit and Firefox cover 375 / 768 / 1024 / 1440 / 1920px, all six service states, keyboard tab navigation, mobile-menu focus/Escape, reduced motion, anchors, local images, metadata and redirects.
- Axe: zero violations on the homepage and supporting pages. No console errors, hydration warnings or horizontal overflow at the five viewport widths.
- The rendered accessibility tree was inspected for landmarks, heading order, tab/panel associations, contact links and opening-hours semantics. Physical-device and live screen-reader checks remain separate release checks below.
- Visual review: compared the rendered native 1440px artboard with the implementation, then inspected mobile/tablet/wide desktop screenshots. Intro is 1066px tall and process is 700px tall, matching the artboard; full-page height rounds to 4483px in both. Reviewed the new logo, favicon/Apple icon and Open Graph image.
- Local production Lighthouse mobile: **Performance 99, Accessibility 100, Best Practices 100, SEO 100**. LCP 2.3s, CLS 0, total blocking time 10ms. Reports: `qa-artifacts/fris-lighthouse.report.html` and `.json`.
- Browser artifacts: `qa-artifacts/fris-reference/`, `qa-artifacts/fris-site/`, `test-results/` and `playwright-report/` (all ignored). Local production preview runs at `http://localhost:3101`.
- `git diff --check` passes. No supplied file in `/design` was edited. No production deployment was performed.

## Deployment and client dependencies

- [ ] Configure the Vercel project, main production branch and PR previews in the client's account.
- [ ] Connect shopdebie.be and the www redirect once DNS access is provided.
- [ ] After launch, submit the sitemap and update the Google Business Profile website URL.
- [ ] Physical Safari/iOS, real phone `tel:` actions and live screen-reader walkthrough.

Carry-forward from `design/open-questions.md` and the original implementation:

- TODO(client): approved privacy policy and email address. `/privacy` retains its supplied placeholders and remains noindex.
- TODO(client): pickup towns, days, price/minimum order and eligibility. No new business facts are inferred from the design.
- TODO(client): final publication approval for supplied descriptions and photo usage/portrait identities.
- TODO(client): exact Google Business Profile and verified coordinates; unknown data stays out of JSON-LD.
- TODO(client): holiday periods for the currently empty closures array.
- TODO(client): Vercel account/project and domain/DNS access. No deployment or domain change is part of this local redesign.

Later work: service detail pages, expanded company history/gallery, a contact/collection form and optional price/review content. The current redesign remains the homepage with existing supporting pages.
