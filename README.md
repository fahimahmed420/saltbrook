# Saltbrook Heating & Air

Concept website for a fictional Raleigh heating and air contractor, built by Zordev as a portfolio project. Eight pages with a real four-step booking flow. See [DEMO.md](DEMO.md) for the pitch, disclosure rules and test log.

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Zod, Resend.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3006. For a production build:

```bash
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local`. Without the Resend keys, local development logs bookings to the console and production shows "please call" instead of pretending to send.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends booking emails |
| `BOOKING_TO_EMAIL` | Where bookings go (comma-separated allowed) |
| `BOOKING_FROM_EMAIL` | A sender on a Resend-verified domain |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and share images |
| `NEXT_PUBLIC_CASE_STUDY_URL` | Link behind the "Concept site by Zordev" pill |

## Layout

| Path | What lives there |
| --- | --- |
| `app/` | One folder per route, plus `globals.css` and the share-image routes |
| `app/book/` | Booking form (client), server action, and the shared Zod schema in `lib/booking.ts` |
| `components/` | Header, footer, call bar, reviews, thermostat dial, FAQ, shared UI primitives |
| `content/site.ts` | Every word and number on the site: services, areas, reviews, FAQs, credits |
| `lib/` | Booking schema, metadata helper, share-image template |
| `public/images/` | Unsplash photos, credited on `/credits` |

## Conventions

- The site is never indexed: `robots.txt`, metadata and an `X-Robots-Tag` header all say so.
- Animations are opt-in: content is visible without JavaScript, and `prefers-reduced-motion` turns motion off.
- Tap targets are at least 44px; every page is checked at phone widths for sideways scroll.
- `?shots=1` hides the demo pill for screenshots.
