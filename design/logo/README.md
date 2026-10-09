# Logo 1c — "Stip"

A lowercase wordmark: **shop de bie**. The dot of the i is a square, turquoise on light/ink backgrounds and white on turquoise.
The mark (favicon, small uses) is that same i: a white stem with a turquoise square, on an ink square.

## Files → where they go in the Next.js project
| File | Destination | Note |
|---|---|---|
| `Logo.tsx` | `src/components/site/Logo.tsx` | Wordmark component (uses the Instrument Sans variable font, `wdth` axis) |
| `LogoMark.tsx` | `src/components/site/LogoMark.tsx` | Vector mark (SVG rects) |
| `icon.svg` | `src/app/icon.svg` | Favicon for modern browsers (Next file convention) |
| `favicon.ico` | `src/app/favicon.ico` | **Replaces the Next.js default.** Contains 16/32/48 px |
| `apple-icon.png` | `src/app/apple-icon.png` | 180×180 |
| `icon-512.png` | `public/icon-512.png` | For `app/manifest.ts` |

Delete `src/app/icon.tsx` / `apple-icon.tsx` if they were generated earlier.

## Usage
| Place | Code |
|---|---|
| Header (glass bar) | `<Logo variant="onLight" size={30} />` |
| Footer (ink) | `<Logo variant="onDark" size={36} />` |
| Story band / loyalty card (turquoise) | `<Logo variant="onTurquoise" size={40} />` |
| Loyalty card, top-left | `<LogoMark size={48} />` |
| OG image | `LogoMark` rects + the title text (ImageResponse) |

## Colours per background
| Background | Text | Square |
|---|---|---|
| White / glass | ink `#0B2730` | turquoise `#1BB0CE` |
| Ink `#0B2730` | white | turquoise |
| Turquoise `#1BB0CE` | ink | white |

## Rules
- Always lowercase. Never set it in another font or width, and never add effects.
- Clear space around the logo: at least the height of the square × 2.
- Minimum size: wordmark 18px; below that use `LogoMark`.
- The reference HTML (`design/reference/home-v2.dc.html`) still shows the old "db" block. **This folder overrides it.**
- For print (signage, letterhead), the wordmark must be converted to outlines in Figma or Illustrator from Instrument Sans Bold, width 80%, tracking −35, with the square as a separate shape.
