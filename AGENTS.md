# AGENTS.md — Shop De Bie website

Instructions for coding agents (Codex, Claude Code, Copilot) working in this repository.

## Project
Marketing website for **Shop De Bie**, a family-run laundry and dry-cleaning business in Ninove, Belgium (est. 1950).
Phase 1 delivers **one page: the homepage**, built from the design in `/design`.
Site language: **Dutch (nl-BE)**. All visible copy is Dutch; code, comments and commits are English.

## Source of truth
| What | Where |
|---|---|
| Visual design (open in a browser) | `design/reference/home-v2.dc.html` |
| Written spec: sections, sizes, states | `design/README.md` |
| Design tokens | `design/tokens.json`, `design/tailwind-theme.css` |
| All copy and business data | `design/content/home.json` |
| Image manifest + download script | `design/assets.json`, `design/scripts/download-assets.mjs` |
| Open questions for the client | `design/open-questions.md` |
| Build plan and task list | `PLAN.md` |

- `/design` is **read-only**. Never edit files in it. If the design and the spec disagree, follow `design/README.md` and add a note in `PLAN.md` under "Deviations".
- The reference HTML uses inline styles and a small runtime (`support.js`). It is a **visual reference, not code to copy**. Rebuild it as idiomatic React/Tailwind.
- Copy content from `home.json` into `src/content/` (typed). Do not rewrite, shorten or "improve" copy.

## Stack
- Next.js 15 (App Router) with React 19 and TypeScript `strict`
- Tailwind CSS v4 (CSS-first config through `@theme`)
- `next/font/google` for fonts; `next/image` for images
- pnpm
- No UI component libraries (no shadcn, MUI, Chakra), no icon libraries, no animation libraries. Arrows are the text glyph `→`.
- Allowed extra dev dependencies: `@axe-core/playwright` and `@playwright/test` for QA, `sharp` (used by Next).

## Commands
```bash
pnpm install
pnpm dev                       # http://localhost:3000
pnpm lint
pnpm typecheck                 # tsc --noEmit
pnpm build
node design/scripts/download-assets.mjs   # downloads photos into public/images
pnpm test:e2e                  # Playwright smoke + axe
```
Run `pnpm lint && pnpm typecheck && pnpm build` before you call a task done.

## Directory layout (target)
```
src/
  app/
    layout.tsx            fonts, <html lang="nl-BE">, metadata, JSON-LD
    page.tsx              composes the homepage sections
    globals.css           @import "tailwindcss"; theme from design/tailwind-theme.css
    icon.tsx              generated favicon (logo mark)
    opengraph-image.tsx   generated OG image
    sitemap.ts, robots.ts
  components/
    sections/             Hero, Pillars, Services, Story, Process, LoyaltyCard, Visit
    site/                 SiteHeader, MobileMenu, SiteFooter, Logo
    ui/                   Button, Eyebrow, SectionHeader, Container, OpenStatus, HoursTable, MapEmbed
  content/home.ts         typed copy and data (from design/content/home.json)
  lib/hours.ts            opening-hours logic (Europe/Brussels)
  lib/seo.ts              JSON-LD builder
public/images/            photos (downloaded by the script)
design/                   read-only handoff
```

## Design rules (do not break)
1. **Colours**: use only the tokens in `design/tokens.json`. Do not add new colours or Tailwind default palette colours (`blue-500` etc.).
2. **Turquoise `#1BB0CE` is a fill colour.** Never use it as text colour on white or light backgrounds (contrast 2.4:1). On turquoise fills, text is always ink `#0B2730`. Turquoise text is allowed only on ink `#0B2730` backgrounds (≈6:1), for small labels.
3. **Square corners everywhere.** `border-radius: 0`. The only exception is the loyalty card visual (12px).
4. **Hairlines** are 1px: `ink` on light sections, `rule` (#CFDDE1) for inner dividers, `rule-dark` (#2A4852) on ink.
5. **Typography**: one family, Instrument Sans.
   - Display/headings use the condensed width: `font-stretch: 78%`, weight 600, negative tracking (see the spec).
   - Body copy uses normal width (100%).
   - Labels and numbers use IBM Plex Mono, uppercase, wide tracking.
   - Load Instrument Sans with the `wdth` axis: `Instrument_Sans({ subsets:['latin'], axes:['wdth'], variable:'--font-instrument-sans' })`. Without the axis, `font-stretch` does nothing.
6. **Glass** (hero nav + hero panel) uses `backdrop-filter`. Always add an `@supports not (backdrop-filter: blur(1px))` fallback: an opaque `rgba(255,255,255,0.94)` background.
7. Use `clamp()` values from the spec for fluid type and spacing. Do not swap them for fixed breakpoint jumps.
8. No shadows except the loyalty card. No gradients. No emoji.

## Behaviour rules
- **Opening status and today's row** depend on the current time in **Europe/Brussels**, not server or UTC time. Compute on the client after mount (`useEffect`) so server and client HTML match. Render a neutral placeholder until mounted. Refresh every 60s.
- All hours live in `src/lib/hours.ts` as data, including a `closures` array for holidays.
- **Google Maps**: do not load the iframe on page load (GDPR, performance). Show a static placeholder with a "Kaart laden" button and a "Route plannen" link. Load the iframe only after a click.
- Smooth anchor scrolling. Add `scroll-margin-top` to anchored sections. Respect `prefers-reduced-motion` (disable smooth scroll).
- Phone numbers are `tel:` links in E.164 format (`tel:+3254331112`).

## Accessibility (required)
- WCAG 2.2 AA. Run axe in Playwright with zero serious or critical violations.
- Add a skip link "Naar inhoud" and use landmark elements (`header`, `nav aria-label="Hoofdmenu"`, `main`, `footer`).
- One `h1` (hero). Section titles are `h2`, cards are `h3`.
- Visible focus on every interactive element: `outline: 2px solid #1BB0CE; outline-offset: 2px`. On turquoise backgrounds, use an ink outline instead.
- The mobile menu is a real disclosure: `aria-expanded`, `aria-controls`, closes on Escape, keeps focus inside while open, and returns focus to the button.
- Every image has Dutch alt text from `home.json`. Decorative overlays get `aria-hidden`.

## Performance targets
- Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.
- Hero image: `next/image` with `fill`, `priority`, `sizes="100vw"`, quality 75. Other images are lazy and have correct `sizes`.
- No client JavaScript except: OpenStatus, HoursTable highlight, MobileMenu, MapEmbed. Everything else is a Server Component.

## Code style
- Function components, named exports, one component per file.
- Tailwind classes in JSX. Use arbitrary values (`text-[clamp(64px,8vw,112px)]`) only where the spec needs them. Put repeated recipes in `@utility` blocks in `globals.css` (e.g. `display-xl`, `eyebrow`, `glass`).
- Content comes from `src/content/home.ts`, never hard-coded in components (except aria labels).
- Conventional commits (`feat:`, `fix:`, `chore:`), one PLAN.md task per commit where possible.

## Don'ts
- Don't edit `/design`.
- Don't hotlink images from `shopdebie.be`. Use `public/images` (run the download script).
- Don't add a cookie banner. Without the map iframe and without analytics, none is needed. If analytics is added later, use a cookieless tool (Plausible or Vercel Analytics).
- Don't invent business facts (prices, emails, pick-up areas, coordinates). Use `TODO(client)` and list them in `design/open-questions.md` → `PLAN.md`.

## Definition of done (per task)
- [ ] Matches the reference at 375, 768, 1024, 1440 and 1920 px wide
- [ ] `pnpm lint && pnpm typecheck && pnpm build` pass
- [ ] No console errors or hydration warnings
- [ ] Keyboard and screen-reader pass on the changed parts
- [ ] Task ticked in `PLAN.md`
