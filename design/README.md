# Design spec — Shop De Bie homepage (v2)

**Fidelity: high.** Colours, type, spacing and copy are final. Recreate them exactly.
Visual reference: open `reference/home-v2.dc.html` in a browser. It needs an internet connection for fonts and photos.
The reference is HTML with inline styles: **a design reference, not production code**. Rebuild it in Next.js and Tailwind following `AGENTS.md`.

All values are CSS px unless noted. `clamp(a, b, c)` values are intentional fluid scaling; keep them.

---

## 1. Design tokens
See `tokens.json` (source of truth) and `tailwind-theme.css` (drop-in).

### Colours
| Token | Hex | Use |
|---|---|---|
| `turquoise` | `#1BB0CE` | Brand fill: logo mark, Droogkuis cell, Story band, loyalty card, CTA in the ophaal banner, hover fill of ink buttons. **Never text on light backgrounds.** |
| `ink` | `#0B2730` | All text on light backgrounds, ink buttons, dark sections, 1px section rules |
| `ink-hover` | `#123744` | Hover on ink cards/banners |
| `white` | `#FFFFFF` | Page background |
| `muted` | `#47616A` | Secondary text on white (6.4:1) |
| `muted-dark` | `#C5D3D7` | Secondary text on ink |
| `rule` | `#CFDDE1` | Inner hairlines on white |
| `rule-dark` | `#2A4852` | Hairlines on ink |
| `tint` | `#D6F0F6` | Today row in hours, map placeholder |
| `closed` | `#C9533F` | Status dot when closed (dot only, never text) |

Overlays and glass:
- Hero photo overlay: `rgba(11,39,48,0.18)`
- Glass nav bar: bg `rgba(255,255,255,0.80)`, `backdrop-filter: blur(24px) saturate(1.3)`, border `1px solid rgba(255,255,255,0.6)`
- Glass hero panel: bg `rgba(255,255,255,0.74)`, `backdrop-filter: blur(28px) saturate(1.3)`, same border
- Fallback without backdrop-filter: bg `rgba(255,255,255,0.94)`

### Typography
Families: **Instrument Sans** (variable, wdth 75–100, wght 400–700) and **IBM Plex Mono** (400, 500). Both are Google Fonts under the SIL OFL licence.

| Role | Size | Weight | Stretch | Tracking | Line height |
|---|---|---|---|---|---|
| H1 hero | `clamp(64px, 8vw, 112px)` | 600 | 78% | −0.035em | 0.86 |
| H2 section | `clamp(48px, 6vw, 88px)` | 600 | 78% | −0.035em | 0.88 |
| Droogkuis title | `clamp(48px, 5vw, 72px)` | 600 | 78% | −0.035em | 0.90 |
| Ophaal banner title | `clamp(40px, 4vw, 56px)` | 600 | 78% | −0.035em | 0.92 |
| H3 service | 36 | 600 | 80% | −0.03em | 0.95 |
| H3 pillar | 28 | 600 | 80% | −0.02em | 1.0 |
| Step title | 24 | 600 | 80% | −0.02em | 1.1 |
| Stat number | `clamp(36px, 4vw, 56px)` | 600 | 78% | −0.03em | 1.0 |
| Loyalty card name | 40 | 600 | 78% | −0.03em | 1.0 |
| Wordmark (header) | 26 | 700 | 80% | −0.02em | 1.0 |
| Wordmark (footer) | 28 | 700 | 80% | −0.02em | 1.0 |
| Logo mark "db" | 22 (card: 24) | 700 | 78% | −0.04em | — |
| Lead | 18 | 400 | 100% | 0 | 1.55 |
| Body | 17 / 16 | 400 | 100% | 0 | 1.5–1.6 |
| Small | 15 | 400 | 100% | 0 | 1.55 |
| Nav link | 15 | 500 | 100% | 0 | — |
| Button | 15 | 600 | 100% | 0 | — |
| Eyebrow (mono) | 12 | 400 | — | 0.14em, UPPERCASE | — |
| Number label (mono) | 12 | 400 | — | 0.12em | — |
| Stat label (mono) | 11 | 400 | — | 0.10em, UPPERCASE | — |
| Hours time (mono) | 14 | 400 | — | 0 | — |

Use `text-wrap: balance` on h2 and `text-wrap: pretty` on leads.

### Layout and spacing
- Container: `max-width: 1440px; margin: 0 auto; padding-inline: clamp(20px, 4.4vw, 64px)`
- Section padding-block: `clamp(72px, 9vw, 128px)` for Services, Process and Visit; `clamp(72px, 9vw, 120px)` for Loyalty; `clamp(56px, 7vw, 104px)` for the Story text column
- Section header → content gap: 48px. Inside the header: eyebrow → h2 gap 18px
- Section header grid: `repeat(auto-fit, minmax(min(100%, 420px), 1fr))`, gap `24px 64px`, `align-items: end`. Left: eyebrow + h2. Right: lead in `muted`, max-width 30em
- Radius: **0** everywhere. Loyalty card: 12px
- Borders: 1px only
- Shadow: loyalty card only, `0 30px 60px -20px rgba(0,0,0,0.55)`

### Buttons
All buttons are square, 15px/600, with no underline.
| Variant | Default | Hover |
|---|---|---|
| `ink` | bg ink, text white, padding 16×24 | bg turquoise, text ink |
| `outline` | 1px ink border, text ink, padding 15×23 | bg ink, text white |
| `navCta` | bg ink, text white, padding 13×20 | bg turquoise, text ink |
| `turquoise` | bg turquoise, text ink, padding 16×24, label + `→` with 24px gap | bg white, text ink |
| `storyCta` (on turquoise) | bg ink, text white, padding 16×24, label + `→` with 24px gap | bg white, text ink |
Transition: `background-color, color 150ms ease`.

---

## 2. Sections (top to bottom)

### 2.1 Hero
- `<section>`: `position:relative; min-height: clamp(720px, 100svh, 980px)`; bg ink (shows while the image loads); `overflow:hidden`
- Photo: `public/images/hero-wasserij.jpg`, `object-fit: cover`, fills the section. Overlay `rgba(11,39,48,0.18)`
- Inner wrapper: flex column, gap 48px, padding `clamp(16px,2.2vw,32px) clamp(16px,4.4vw,64px) clamp(24px,4.4vw,64px)`
- **Nav bar** (glass): flex, space-between, wraps, gap `12px 24px`, padding `10px 10px 10px 14px`, min-height 68px
  - Left: Logo (mark 44×44 + wordmark 26px), gap 12px, links to `#top`
  - Right: nav links (Diensten → `#diensten`, Werkwijze → `#werkwijze`, Ons verhaal → `#verhaal`, Contact → `#bezoek`), gap 32px, then `navCta` "Ophaling aanvragen"
  - < 900px: replace the links with a "Menu" button (outline variant, padding 12×16). The menu opens a glass panel under the bar: links as 48px rows with 1px `rule` dividers, CTA full width. *(Not drawn in the reference; follow this spec.)*
- **Glass panel**: pinned bottom-left (flex:1 + align-items:flex-end), `width: min(720px, 100%)`, padding `clamp(28px, 3.6vw, 52px)`, flex column gap 24px
  1. Mono row, space-between, wraps: "Wasserij · Droogkuis · Ninove" | OpenStatus (8×8 square dot + label, gap 8px). Dot is turquoise when open, `closed` when closed
  2. H1 "Met de ijver" ⏎ "van een bij." (forced line break)
  3. Lead, max-width 30em
  4. Buttons (gap 12px, padding-top 4px): `ink` "Ontdek onze diensten" → `#diensten`; `outline` "Bel 054 33 11 12" → `tel:+3254331112`

### 2.2 Pillars
- Full-width band, `border-bottom: 1px solid ink`
- Grid inside the 1440 container: `repeat(auto-fit, minmax(min(100%, 200px), 1fr))`. 4 across from about 860px
- Cell: padding `clamp(28px,3vw,40px) clamp(20px,3.4vw,48px)`, flex column gap 12px, `border-right` and `border-bottom` 1px `rule`. Remove the outer duplicate lines so the band only shows inner dividers
- Content: mono number "01"–"04", H3 pillar, small text in `muted`

### 2.3 Services `#diensten`
- Section header: eyebrow "Diensten", h2 "Van hemd tot trouwjurk.", lead
- Grid: `repeat(auto-fit, minmax(min(100%, 340px), 1fr))`, which gives 3 columns at desktop and 2 on tablet. Lines are drawn on the cells: container `border-top` + `border-left` 1px ink; each cell `border-right` + `border-bottom` 1px ink
- **Cell 01 Droogkuis**: bg turquoise, `grid-row: span 2`, min-height 300px, padding 32px. Top row (mono, uppercase): "01" left, "Specialisatie" right. Title pinned to the bottom (`margin-top:auto`), body 17px ink, max-width 26em
- **Cells 02–05**: bg white, min-height 240px, padding 32px, flex column gap 14px. Mono number, H3 (margin-top:auto), body 16px `muted`
- **Cell 06 Eigen ophaaldienst**: `grid-column: 1 / -1` (full width), bg ink, text white, padding `clamp(28px,3vw,40px) 32px`. Inner grid `repeat(auto-fit, minmax(min(100%,260px),1fr))`, gap `20px 48px`, align-items end:
  - col 1: mono "06" + "Aan huis" (turquoise text on ink), then title
  - col 2: body 17px `muted-dark`, max-width 30em
  - col 3: `turquoise` button "Ophaling aanvragen →" (justify-self start)
  - The whole banner is a link → `#bezoek`; hover bg `ink-hover`
- Result: 1+4 cells form a clean 3×2 block (2×3 on tablet), with the banner below. **No empty cells.**

### 2.4 Story `#verhaal`
- Full-width band: bg turquoise, text ink, `border-block: 1px solid ink`
- 2-col grid inside the container: `repeat(auto-fit, minmax(min(100%, 480px), 1fr))`
- **Left**: padding `clamp(56px,7vw,104px) clamp(20px,4.4vw,64px)`, flex column gap 32px, space-between
  - eyebrow "Ons verhaal · sinds 1950", h2 "De laatste van zeven.", body 18px/1.6, max 32em
  - Stats row: 3 equal columns, `border-top: 1px ink`, vertical dividers 1px ink; each has a number + mono label (1950 Opgericht · 1991 3e generatie · 2017 Groen pand)
  - `storyCta` "Lees ons verhaal →" → `/ons-verhaal`
- **Right**: figure, min-height 520px, `border-left: 1px ink`, photo `story-bart-mady.jpg` (cover). Caption tag absolute bottom-left: bg white, padding 12×18, `border-top` + `border-right` 1px ink, mono 12px uppercase "Bart De Smet & Mady Buys"

### 2.5 Process `#werkwijze`
- Section header: eyebrow "Werkwijze", h2 "Elk stuk krijgt een nummer.", lead
- Grid: **max 3 columns**: `repeat(auto-fill, minmax(max(min(100%, 260px), calc(33.34% - 1px)), 1fr))`. Lines on the cells (container top+left 1px `rule`, cells right+bottom 1px `rule`)
- Cell: bg white, padding 24×28, `grid-template-columns: 40px minmax(0,1fr)`, gap `4px 12px`, baseline aligned. Mono number spans 2 rows; title 24px; text 15px `muted`. Titles: `overflow-wrap:anywhere; hyphens:auto` with `lang="nl"`

### 2.6 Loyalty card
- Full-width band: bg ink, text white
- Grid `repeat(auto-fit, minmax(min(100%, 440px), 1fr))`, gap `56px 80px`, centred vertically
- **Left** (gap 24px): eyebrow "Klantenkaart" in turquoise, h2 "Blijvende korting, elke keer opnieuw.", lead `muted-dark`, ruled list (top border + row borders 1px `rule-dark`, rows padding 14px 0, 16px text, mono number right in `muted-dark`)
- **Right**: card visual, max-width 440, `aspect-ratio: 1.586`, bg turquoise, text ink, radius 12, padding 28, `rotate(-4deg)`, shadow as in tokens. Top row: logo mark (48×48, ink square, turquoise "db") left, mono "KLANTENKAART" right. Bottom: "Shop De Bie" 40px + mono "Nr. 1950 · blijvende korting". The card is decorative: `aria-hidden="true"`

### 2.7 Visit `#bezoek`
- Container grid `repeat(auto-fit, minmax(min(100%, 420px), 1fr))`, gap `48px 64px`
- **Left** (gap 28px): eyebrow "Kom langs", h2 "Leopoldlaan 39, Ninove.", hours table, buttons
  - Hours table: `border-top 1px ink`; rows padding 12px, `border-bottom 1px rule`, day left (16px) / time right (mono 14px). Today's row: bg `tint`, weight 600. Use a `<table>` or `<dl>` for semantics
  - Buttons (wrap, gap 12px): `ink` "Tel. 054 33 11 12", `outline` "Gsm 0495 52 08 26", `outline` "Route plannen →" (Google Maps directions URL, new tab)
- **Right**: map box, `border:1px ink`, bg `tint`, min-height 460px. Click-to-load placeholder (see AGENTS.md). After the click: iframe `https://maps.google.com/maps?q=Leopoldlaan%2039%2C%209400%20Ninove&t=m&z=16&output=embed`, `filter: grayscale(0.4)`, `title="Kaart Shop De Bie"`

### 2.8 Footer
- bg ink, text white. Container padding `clamp(56px,6vw,80px)` top, 28px bottom; gap 56px
- Grid `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`, gap 40px:
  1. Logo (mark 44 + wordmark 28) + tagline 15px `muted-dark`, max 22em
  2. "Bezoek" (mono label, turquoise): address, hours summary in `muted-dark`
  3. "Contact": tel, gsm, Facebook (underlined)
  4. "Menu": the 4 anchor links
- Bottom bar: `border-top 1px rule-dark`, padding-top 24px, mono 12px `muted-dark`: "© {year} Shop De Bie · BE 0418.374.955" | "Privacy & cookies" → `/privacy`

---

## 3. Interactions
| Element | Behaviour |
|---|---|
| Nav / footer links | Smooth scroll to the anchor (instant with reduced motion) |
| Buttons | Hover colours per §Buttons, 150ms |
| Ophaal banner | Whole block clickable, bg → `ink-hover` |
| OpenStatus | "Nu open tot 18:00" / "Open om 13:00" / "Morgen open om 09:00" / "Maandag open om 09:00" (Brussels time, refreshes every 60s) |
| HoursTable | Highlights today (Brussels time) |
| Mobile menu | Disclosure, Escape closes, focus trapped, body scroll locked |
| Map | Placeholder → iframe on click |

## 4. Responsive checkpoints
- **1440+**: as in the reference. Services 3 columns, Process 3×3, Pillars 4 across
- **1024**: Services 2 columns (Droogkuis spans 2 rows next to 2 cells, then 2 cells, then the banner), Process 3 columns, Story stacks below about 1024 if the columns get under 480
- **768**: nav collapses into the menu (< 900), Pillars 2×2, Process 2 columns, Visit stacks
- **375**: everything one column. Hero panel full width. H1 at least 64px; check that "van een bij." fits on one line, and lower the clamp minimum to 56px if needed (log it as a deviation)

## 5. Files in this folder
| File | Purpose |
|---|---|
| `reference/home-v2.dc.html` + `reference/support.js` | Visual reference. Open in a browser (keep both files together) |
| `tokens.json` | Design tokens |
| `tailwind-theme.css` | Tailwind v4 `@theme` + `@utility` recipes, ready to paste |
| `content/home.json` | All copy, hours, steps, business data, SEO text |
| `assets.json` | Image manifest (source URL → local path, alt text, where used) |
| `scripts/download-assets.mjs` | Downloads the photos into `public/images/` |
| `open-questions.md` | Missing client input; keep `TODO(client)` markers until answered |
