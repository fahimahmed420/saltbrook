import Image from "next/image";
import Link from "next/link";
import { areas, club, services, site, visitSteps } from "@/content/site";
import { Arrow, ButtonLink, CallButton, Container, Eyebrow, Icon, SectionHead, Stars } from "@/components/ui";
import { Counter } from "@/components/Counter";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { OpenNow } from "@/components/OpenNow";
import { JsonLd } from "@/lib/seo";

const trust = [
  { icon: "tag", title: "Upfront, written prices", body: "You approve the price before any work starts." },
  { icon: "clock", title: "Same-day repairs", body: "Book before noon and we're usually there today." },
  { icon: "shield", title: "10-year warranty", body: "Parts and labor on every new system we install." },
  { icon: "card", title: "0% financing", body: "12 months interest-free on approved credit." },
];

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
          image: `${site.url}/images/family.jpg`,
          telephone: "+1-919-555-0142",
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

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-spruce-2">
        <Image src="/images/family.jpg" alt="A family relaxing together on the sofa at home" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_30%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-spruce-2/90 via-spruce-2/75 to-spruce-2/95 lg:bg-gradient-to-r lg:from-spruce-2 lg:via-spruce-2/80 lg:to-spruce-2/10" />
        <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[44rem] lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="text-paper">
            <div data-reveal>
              <OpenNow />
            </div>
            <h1 data-reveal style={{ ["--d" as string]: "80ms" }} className="mt-6 text-[2.75rem] font-extrabold leading-[0.98] sm:text-7xl lg:text-[5.4rem]">
              Comfort you can <span className="text-gold">count on,</span> every season.
            </h1>
            <p data-reveal style={{ ["--d" as string]: "160ms" }} className="mt-6 max-w-xl text-lg leading-relaxed text-mint sm:text-xl">
              Same-day AC and heat pump repair, honest advice on new systems, and technicians who show you the price before they pick up a tool. Across Raleigh, Durham, Cary, Apex and Wake Forest since {site.founded}.
            </p>
            <div data-reveal style={{ ["--d" as string]: "240ms" }} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/book">
                Book a visit <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
              <CallButton variant="light" />
            </div>
            <div data-reveal style={{ ["--d" as string]: "320ms" }} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <Stars className="h-5 w-5" />
                <span className="text-sm">
                  <strong className="text-paper">4.9 out of 5</strong>
                  <span className="text-mint/80"> · 1,240 local reviews</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-mint/90">
                <Icon name="shield" className="h-5 w-5 text-gold" /> Licensed, insured &amp; background-checked
              </div>
            </div>
          </div>

          {/* Quick booking card */}
          <div data-reveal style={{ ["--d" as string]: "200ms" }} className="rounded-[2rem] bg-paper p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <p className="font-display text-2xl font-bold text-spruce">What can we help with?</p>
            <p className="mt-1 text-muted">Pick one and choose a time. It takes about a minute.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {services.map((s, i) => (
                <Link
                  key={s.id}
                  href={`/book?service=${s.id}`}
                  className="group flex flex-col gap-3 rounded-2xl border-2 border-line bg-linen p-4 transition-all hover:-translate-y-0.5 hover:border-copper hover:bg-paper"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-spruce text-mint transition-colors group-hover:bg-copper group-hover:text-white">
                    <Icon name={["snow", "flame", "home", "thermo"][i]} className="h-5 w-5" />
                  </span>
                  <span className="font-semibold leading-tight text-spruce">{s.nav}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-mint/60 p-4 text-sm text-spruce">
              <Icon name="clock" className="h-5 w-5 shrink-0" />
              <span>
                <strong>Next available:</strong> today, 2–4 pm in Raleigh
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Trust strip */}
      <section className="border-b border-line bg-paper">
        <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <div key={t.title} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linen text-copper">
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-spruce">{t.title}</span>
                <span className="text-sm leading-relaxed text-muted">{t.body}</span>
              </span>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. Services */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Our services" title="Everything that keeps your home comfortable." />
            <ButtonLink href="/services" variant="outline" className="group">
              All services and prices <Arrow />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                data-reveal
                style={{ ["--d" as string]: `${i * 80}ms` }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-paper shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="zoom-img relative aspect-[4/3] overflow-hidden">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-spruce">
                    {s.price === "Free" ? "Free estimate" : `From ${s.price}`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-spruce">{s.name}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-5 flex items-center gap-2 font-semibold text-copper">
                    Learn more <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Why Saltbrook */}
      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src="/images/tech-arrival.jpg" alt="Saltbrook technician arriving with a tool belt" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 max-w-[15rem] rounded-3xl bg-spruce p-6 text-paper shadow-[var(--shadow-lift)] sm:-right-6">
              <p className="font-display text-5xl font-extrabold text-gold">
                <Counter value={92} suffix="%" />
              </p>
              <p className="mt-2 text-sm leading-snug text-mint">of repairs finished on the first visit, because our vans carry the parts.</p>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Why Saltbrook"
              title={
                <>
                  The straight answer, <span className="text-copper">every time.</span>
                </>
              }
              intro="We grew the slow way, through neighbors telling neighbors. So we still work like every visit is a referral: show up on time, explain what we find, and never sell a system you don't need."
            />
            <ul className="mt-8 space-y-4">
              {[
                ["Repair before replace", "If a repair makes sense, we'll say so, even when a new system would earn us more."],
                ["Clean, respectful visits", "Shoe covers, drop cloths, and we leave the space tidier than we found it."],
                ["One technician, start to finish", "The person who diagnoses the problem is the one who fixes it."],
              ].map(([t, d], i) => (
                <li key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-copper text-white">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-spruce">{t}</span>
                    <span className="leading-relaxed text-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <Container className="mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="bg-linen px-6 py-8 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-extrabold text-spruce sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </span>
                  <span className="mt-2 block text-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 5. How a visit works */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead center eyebrow="How it works" title="From call to cool air, without the guesswork." />
          <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent lg:block" />
            {visitSteps.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="relative rounded-3xl bg-paper p-7 shadow-[var(--shadow-card)]">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-spruce font-display text-2xl font-extrabold text-gold">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-bold text-spruce">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 6. Comfort Club */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-spruce text-paper">
          <Image src="/images/living-room.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-spruce via-spruce/95 to-spruce/60" />
          <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHead
                light
                eyebrow="Comfort Club membership"
                title={
                  <>
                    Two tune-ups a year, <span className="text-gold">priority when it counts.</span>
                  </>
                }
                intro="Most breakdowns start as small problems a tune-up would catch. Members get both seasonal checks, jump the line during heat waves, and save 15% on every repair."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {club.perks.slice(0, 4).map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="font-semibold">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal className="rounded-[2rem] bg-paper p-8 text-ink shadow-[var(--shadow-lift)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copper">Membership</p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-7xl font-extrabold text-spruce">${club.price}</span>
                <span className="text-lg text-muted">/ month</span>
              </p>
              <p className="mt-2 text-muted">or ${club.annual} a year. Cancel any time.</p>
              <div className="mt-8 grid gap-3">
                <ButtonLink href="/book?service=maintenance">Join the Comfort Club</ButtonLink>
                <ButtonLink href="/comfort-club" variant="outline">
                  See everything included
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* 7. Reviews */}
      <section className="mt-20 bg-spruce-2 py-20 text-paper sm:mt-28 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHead light eyebrow="Reviews" title="Neighbors who stopped sweating it." />
            <div data-reveal className="flex flex-wrap items-center gap-6 lg:justify-end">
              <div>
                <p className="font-display text-6xl font-extrabold">4.9</p>
                <Stars className="h-5 w-5" />
              </div>
              <p className="max-w-[14rem] text-mint">Average across 1,240 reviews from homeowners in the Triangle.</p>
            </div>
          </div>
          <div className="mt-12">
            <Reviews />
          </div>
        </Container>
      </section>

      {/* 8. Service area */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Service area" title="Five towns, one van ride away." intro="Our shop is in Raleigh, so most of the Triangle gets a same-day visit." />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {areas.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3 font-display text-xl font-bold text-spruce">
                    <Icon name="pin" className="h-5 w-5 text-copper" />
                    {a.name}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${a.eta === "Same day" ? "bg-mint text-spruce" : "bg-sand text-muted"}`}>{a.eta}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/service-area" variant="dark" className="group">
                See the service area <Arrow />
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image src="/images/porch-home.jpg" alt="A two-story home with a covered porch in the Triangle" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      {/* 9. FAQ */}
      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Questions" title="Good to know before you call." />
            <p className="mt-6 text-muted">Still wondering about something?</p>
            <div className="mt-4">
              <CallButton variant="outline" label={`Ask us: ${site.phone}`} />
            </div>
          </div>
          <div data-reveal>
            <Faq />
          </div>
        </Container>
      </section>

      {/* 10. Final CTA */}
      <section className="relative isolate overflow-hidden bg-copper">
        <Image src="/images/van.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20 mix-blend-multiply" />
        <Container className="flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div className="max-w-2xl text-white">
            <Eyebrow light>Ready when you are</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] sm:text-6xl">Too hot, too cold, or too loud? Let&apos;s fix it today.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book" variant="white">
              Book online
            </ButtonLink>
            <CallButton variant="light" />
          </div>
        </Container>
      </section>
    </>
  );
}
