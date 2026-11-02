# Saltbrook Heating & Air — concept site by Zordev

Pitch: a complete, professional website for a fictional Raleigh heating and air contractor.
Sells: Launch / Growth site — 8 pages (Home, Services, Comfort Club, Service area, About, Book online, Privacy, Credits) with a real booking flow.
Label on zordev.com: concept
Case study: https://www.zordev.com/work/saltbrook-heating-and-air

## Name check
- Web search: 2 Nov 2026 — no business found; nearest is "Salt Air Heating & Cooling", Wilmington NC.
- USPTO TSDR: TODO before launch
- EUIPO eSearch: TODO before launch

## Disclosure
- Footer on every page: "A fictional company designed and built by Zordev as a portfolio project. Nothing here is for sale."
- Floating "Concept site by Zordev" pill links to the case study (dismissible per session; `?shots=1` hides it).
- noindex everywhere: metadata, `X-Robots-Tag` header, `robots.txt` disallows `/`, no sitemap.

## What's in it
- Real photography: 14 Unsplash-licensed photos (credited on /credits), served through next/image.
- Header: utility bar with live open/closed status, services dropdown, phone CTA, mobile drawer that closes on navigation and locks page scroll.
- Home: photo hero with quick-book card, trust strip, service photo cards, animated counters, visit process, Comfort Club, swipeable reviews, service area, animated FAQ, CTA band.
- Booking (/book): 4 steps (service, day and window, details, review with Edit), zod validation shared by browser and server, honeypot, 5-per-10-minute rate limit, emailed through Resend.
- HVACBusiness and FAQPage structured data; unique title, description and share image per page.

## Hosting
- Vercel project: TODO (Pro team; Hobby is non-commercial)
- Domain: saltbrook.zordev.com — Cloudflare CNAME `saltbrook` → Vercel target, proxy off
- Env (see .env.example): RESEND_API_KEY, BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL (a sender on a Resend-verified domain, e.g. send.zordev.com)
- Without the email settings: local dev logs bookings to the console; production shows "please call" instead of pretending to send.
- Kill switch: if broken, redirect the subdomain to the case study the same day.

## Credits
- Photos: see /credits (Unsplash License)
- Fonts: Bricolage Grotesque, Inter (SIL OFL)

## Tests (3 Nov 2026, Chrome emulation)
- 8 phones × 8 routes: 0 sideways scroll, 0 tiny text, 0 console errors, tap targets at least 44px.
- Flow test on iPhone 13, Pixel 5 and desktop: menu and dropdown navigation, quick-book preselect, every booking step, validation, Edit, final submit, rate limit.
- Fixed during testing: the booking day picker widened the page on phones (hidden radios escaped their tiles), which made the browser zoom out.

## Measured numbers (keep every run)
| Date | Tool + version | Page | Perf | A11y | SEO | JS KB | Notes |
|---|---|---|---|---|---|---|---|
| TODO after deploy | | | | | | | |
