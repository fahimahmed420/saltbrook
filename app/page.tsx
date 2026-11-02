import Link from "next/link";
import { areas, faqs, reviews, services, site } from "@/content/site";
import { ButtonLink, CallLink, Check, Container, Eyebrow } from "@/components/ui";
import { HouseIllustration } from "@/components/Illustration";
import { OpenNow } from "@/components/OpenNow";
import { JsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HVACBusiness",
          name: site.name,
          description: site.description,
          url: site.url,
          telephone: "+1-919-555-0142",
          email: site.email,
          foundingDate: String(site.founded),
          address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "US" },
          areaServed: areas.map((a) => ({ "@type": "City", name: `${a.name}, NC` })),
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
          ],
          priceRange: "$$",
        }}
      />

      {/* Seasonal banner */}
      <div className="bg-teal text-cream">
        <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm">
          <strong>Fall heating check, $79.</strong>
          <span>Book before December 15 and we&apos;ll test your carbon monoxide detectors free.</span>
        </Container>
      </div>

      {/* Hero */}
      <section className="overflow-x-clip">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <OpenNow />
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] text-teal sm:text-6xl lg:text-7xl">
              Too hot, too cold, <span className="text-copper">or too loud?</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
              Saltbrook fixes and installs heating and cooling across Raleigh, Durham, Cary, Apex and Wake Forest. Same-day visits, a price before any work starts, and no upsell.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request service</ButtonLink>
              <CallLink variant="outline" />
            </div>
            <ul className="mt-8 grid gap-2 text-ink sm:grid-cols-2">
              {["Licensed and insured", "Same-day repair visits", "Every major brand", "Written prices, no surprises"].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HouseIllustration />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-teal sm:text-5xl">Four things, done properly.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className="group flex flex-col rounded-2xl border border-line bg-cream p-6 transition-colors hover:border-copper"
              >
                <h3 className="text-xl font-bold text-teal">{s.name}</h3>
                <p className="mt-2 flex-1 text-muted">{s.short}</p>
                <p className="mt-5 text-sm font-semibold text-copper">{s.from}</p>
                <span className="mt-3 font-semibold text-teal group-hover:text-copper">Details →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How a visit works */}
      <section>
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>How a repair visit works</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold text-teal sm:text-5xl">You know the price before we pick up a tool.</h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["Call or book online", "Tell us what's happening. Morning bookings usually get a same-day slot."],
              ["We diagnose", "A technician finds the cause and writes down the price. The $89 visit fee comes off the repair."],
              ["You decide", "Fix it now, get a second opinion, or ask about replacement. No pressure either way."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-line bg-paper p-6">
                <span className="font-display text-4xl font-extrabold text-copper">{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-teal">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Reviews (sample) */}
      <section className="bg-teal text-cream">
        <Container className="py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow tone="cream">What customers say</Eyebrow>
              <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Fixed right, priced fairly.</h2>
            </div>
            <span className="rounded-full border border-cream/40 px-3 py-1 text-sm">Sample reviews for this demo</span>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.quote} className="flex flex-col rounded-2xl bg-teal-2 p-6">
                <blockquote className="flex-1 text-lg leading-relaxed">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-cream-2">
                  {r.name} · {r.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Area + FAQ teaser */}
      <section>
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold text-teal sm:text-4xl">Five towns across the Triangle.</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.name} className="rounded-full border border-line bg-paper px-4 py-2 font-semibold text-teal">
                  {a.name}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/service-area" variant="outline">
                See the service area
              </ButtonLink>
            </div>
          </div>
          <div>
            <Eyebrow>Quick answers</Eyebrow>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {faqs.slice(0, 2).map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-bold text-teal">{f.q}</dt>
                  <dd className="mt-1 text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
            <Link href="/services#faq" className="mt-4 inline-flex min-h-11 items-center font-semibold text-copper hover:underline">
              More questions →
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-cream-2">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl font-bold text-teal sm:text-4xl">Something not working? Let&apos;s get it fixed today.</h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request service</ButtonLink>
            <CallLink variant="outline" />
          </div>
        </Container>
      </section>
    </>
  );
}
