# Saltbrook Heating & Air — demo by Zordev

Pitch: a fast, five-page site for a fictional Raleigh HVAC contractor.
Sells: Launch site ($1,200) — scoped to: 5 pages (Home, Services, Service area, About, Request service), a request form, structured data.
Label on zordev.com: concept
Case study: https://www.zordev.com/work/saltbrook-heating-and-air

## Name check
- Web search: 2 Nov 2026 (planning pass) — no business found; nearest is "Salt Air Heating & Cooling", Wilmington NC.
- USPTO TSDR: TODO before launch
- EUIPO eSearch: TODO before launch

## Disclosure (footer on every page)
"Saltbrook Heating & Air is a fictional company created by Zordev as a portfolio demo. Nothing here is for sale."

## Hosting
- Vercel project: TODO (Pro team; Hobby is non-commercial)
- Domain: saltbrook.zordev.com — Cloudflare CNAME `saltbrook` → Vercel target, proxy off
- Env (optional): NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CASE_STUDY_URL. No secrets needed: the form runs in demo mode and sends nothing.
- Kill switch: if broken, redirect the subdomain to the case study the same day.

## What's in it
- No photos to license: house illustration, service-area map, logo and icons are inline SVG.
- `HVACBusiness` JSON-LD (home), `FAQPage` JSON-LD (services). No rating schema; reviews are labelled "Sample reviews".
- Unique title, description and share image per page (`opengraph-image.tsx` in each route).
- noindex everywhere: metadata, `X-Robots-Tag` header, `robots.txt` disallows `/`, no sitemap.
- Sticky mobile Call / Book bar; "Open now" computed in America/New_York; mobile menu is a native `<details>` (no JS).
- Request form: server action validates name, US phone, Triangle ZIP (27xxx), service, urgency; honeypot; shows success without storing or sending.
- "Demo by Zordev" badge links to the case study with UTM; dismissible per session; `?shots=1` hides it for screenshots.

## Credits
- Fonts: Bricolage Grotesque, Source Sans 3 (SIL OFL, Google Fonts)
- Artwork: drawn for this demo

## Tests (3 Nov 2026, Chrome emulation)
- 8 phones × 7 routes: 0 sideways scroll, 0 tiny text, no console errors except the intended 404.
- Tap tests (iPhone 13, Pixel 5): 16/16 pass — menu, call bar, badge placement, FAQ, 16px fields, form errors, form success, landscape.

## Measured numbers (keep every run)
| Date | Tool + version | Page | Perf | A11y | SEO | JS KB | Notes |
|---|---|---|---|---|---|---|---|
| TODO after deploy | | | | | | | |

## Screenshots
- TODO after deploy: public/work/saltbrook-heating-and-air/desktop.png (1440×900) · detail.png · mobile.png (780×1688) in the Zordev repo.
