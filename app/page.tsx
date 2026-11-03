import Image from "next/image";
import Link from "next/link";
import { areas, club, services, site, visitSteps } from "@/content/site";
import { Arrow, ButtonLink, CallButton, Container, Eyebrow, Icon, SectionHead, Stars, Ticker, Words } from "@/components/ui";
import { Counter } from "@/components/Counter";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { OpenNow } from "@/components/OpenNow";
import { ThermoDial } from "@/components/ThermoDial";
import { JsonLd } from "@/lib/seo";

const promises = ["Upfront, written prices", "Same-day repairs", "10-year install warranty", "0% financing for 12 months", "Licensed & insured", "No overtime fees for members"];

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
          image: `${site.url}/images/living-room.jpg`,
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

      {/* 1. Hero: the photo fills the screen; the booking card hangs over the edge into the next section. */}
      <section className="relative isolate bg-spruce-2">
        <div className="duotone veil absolute inset-0 -z-10 overflow-hidden">
          <Image src="/images/living-room.jpg" alt="A sunlit living room with a fire going in the fireplace" fill priority sizes="100vw" className="object-cover object-[55%_60%]" />
        </div>
        <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-0 pt-10 sm:pt-16 lg:min-h-[calc(100svh-7.5rem)]">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="pb-4 text-paper lg:pb-24">
              <div data-reveal>
                <OpenNow />
              </div>
              <h1 className="mt-7 text-[3.15rem] font-extrabold leading-[0.92] tracking-[-0.04em] sm:text-[5.4rem] lg:text-[7rem] xl:text-[7.8rem]">
                <Words text="Comfort you can *count on,* every season." delay={80} />
              </h1>
              <p data-reveal style={{ ["--d" as string]: "320ms" }} className="mt-7 max-w-xl text-lg leading-relaxed text-mint sm:text-xl">
                Same-day AC and heat pump repair, honest advice on new systems, and technicians who show you the price before they pick up a tool. Raleigh, Durham, Cary, Apex and Wake Forest since {site.founded}.
              </p>
              <div data-reveal style={{ ["--d" as string]: "400ms" }} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
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
            <div data-reveal style={{ ["--d" as string]: "240ms" }} className="relative z-10 -mb-24 rounded-[2rem] bg-paper p-6 shadow-[var(--shadow-deep)] sm:p-8 lg:-mb-28">
              <p className="font-display text-[1.7rem] font-bold leading-tight text-spruce">What can we help with?</p>
              <p className="mt-1.5 text-muted">Pick one and choose a time. It takes about a minute.</p>
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
              <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-mint/60 px-4 py-3 text-sm text-spruce">
                <span className="flex items-center gap-2">
                  <Icon name="clock" className="h-5 w-5 shrink-0" />
                  <span>
                    <strong>Next available:</strong> today, 2–4 pm
                  </span>
                </span>
                <a href={site.phoneHref} className="hidden shrink-0 font-semibold underline-offset-4 hover:underline sm:inline">
                  or call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Services: tall photo tiles, numbered in copper, staggered on wide screens. */}
      <section className="overflow-hidden pb-20 pt-36 sm:pb-28 lg:pt-44">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Our services" title="Everything that keeps your home comfortable." />
            <ButtonLink href="/services" variant="outline" className="group">
              All services and prices <Arrow />
            </ButtonLink>
          </div>
        </Container>
        <Container className="mt-12">
          <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:[&>li:nth-child(even)]:translate-y-10 [&::-webkit-scrollbar]:hidden">
            {services.map((s, i) => (
              <li key={s.id} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <Link href={`/services#${s.id}`} className="group tile zoom-img relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-spruce-2 text-paper shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-deep)]">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw" className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-spruce-2 via-spruce-2/35 to-transparent" />
                  <span className="condensed absolute left-5 top-4 font-display text-[4rem] font-extrabold leading-none text-gold/90">0{i + 1}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-spruce">
                    {s.price === "Free" ? "Free estimate" : `From ${s.price}`}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="block font-display text-[1.65rem] font-bold leading-[1.05] tracking-tight">{s.name}</span>
                    <span className="mt-2 block text-sm leading-snug text-mint/90">{s.short}</span>
                    <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-spruce transition-all duration-300 group-hover:bg-copper group-hover:text-white">
                      <Arrow className="h-5 w-5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Ticker items={promises} />

      {/* 3. The dial: one crew for both seasons. */}
      <section className="relative isolate overflow-hidden bg-spruce-2 pb-24 pt-28 text-paper sm:pb-32 sm:pt-36">
        <div aria-hidden="true" className="absolute -left-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-cool/20 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-copper/30 blur-[120px]" />
        <Container className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-reveal className="order-2 lg:order-1">
            <ThermoDial />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead
              light
              size="lg"
              eyebrow="Why Saltbrook"
              title={
                <>
                  Outside swings sixty degrees. <span className="text-gold">Inside, it&apos;s 71.</span>
                </>
              }
              intro="A January morning and a July afternoon ask very different things of a house. One Saltbrook crew handles both: heat pumps and gas furnaces in winter, air conditioning in summer, with the same technician who knows your system."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                ["Repair before replace", "If a repair makes sense we'll say so, even when a new system would earn us more."],
                ["Clean, respectful visits", "Shoe covers, drop cloths, and a tidier space than we found."],
                ["One technician, start to finish", "The person who diagnoses the problem is the one who fixes it."],
              ].map(([t, d], i) => (
                <li key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="border-t border-white/15 pt-5">
                  <span className="block font-display text-lg font-bold text-paper">{t}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-mint/80">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <Container className="mt-24">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="border-l-2 border-copper pl-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="condensed block font-display text-[3.6rem] font-extrabold leading-none text-paper sm:text-[5rem]">
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </span>
                  <span className="mt-3 block text-sm text-mint/80">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 4. How a visit works */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="How it works" title="From call to cool air, without the guesswork." intro="Four steps, one technician, and a price you approve before anything happens." />
            <div className="mt-8">
              <ButtonLink href="/book" className="group">
                Book a visit <Arrow />
              </ButtonLink>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {visitSteps.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className={`group relative overflow-hidden rounded-[1.75rem] bg-paper p-7 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1 ${i % 2 ? "sm:translate-y-8" : ""}`}>
                <span aria-hidden="true" className="condensed absolute -right-2 -top-6 font-display text-[7rem] font-extrabold leading-none text-sand transition-colors duration-500 group-hover:text-copper/20">
                  0{i + 1}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-spruce font-display text-base font-extrabold text-gold">0{i + 1}</span>
                <h3 className="relative mt-10 text-[1.4rem] font-bold text-spruce">{p.title}</h3>
                <p className="relative mt-2 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 5. Comfort Club */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-spruce text-paper">
          <div className="duotone absolute inset-0 -z-10">
            <Image src="/images/fireplace.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-spruce via-spruce/95 to-spruce/50" />
          <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
            <div data-reveal className="rounded-[2rem] bg-paper p-8 text-ink shadow-[var(--shadow-deep)] sm:p-10 lg:rotate-[1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copper">Membership</p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="condensed font-display text-[6.5rem] font-extrabold leading-none text-spruce">${club.price}</span>
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

      {/* 6. Reviews: a slow drift, angled edges. */}
      <section className="slant-tb -mb-10 mt-24 overflow-hidden bg-spruce-2 pb-32 pt-28 text-paper sm:mt-32 sm:pb-40 sm:pt-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHead light eyebrow="Reviews" title="Neighbors who stopped sweating it." />
            <div data-reveal className="flex flex-wrap items-center gap-6 lg:justify-end">
              <div>
                <p className="condensed font-display text-7xl font-extrabold leading-none">4.9</p>
                <Stars className="mt-2 h-5 w-5" />
              </div>
              <p className="max-w-[14rem] text-mint">Average across 1,240 reviews from homeowners in the Triangle.</p>
            </div>
          </div>
        </Container>
        <Container className="mt-12">
          <Reviews />
        </Container>
      </section>

      {/* 7. Service area */}
      <section className="pb-20 pt-28 sm:pb-28 sm:pt-36">
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
          <div data-reveal className="duotone relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)] sm:aspect-[5/4] lg:aspect-[4/5] lg:-rotate-1">
            <Image src="/images/porch-home.jpg" alt="A two-story home with a covered porch in the Triangle" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <span className="absolute bottom-5 left-5 rounded-full bg-paper/95 px-4 py-2 text-sm font-semibold text-spruce">Raleigh, NC</span>
          </div>
        </Container>
      </section>

      {/* 8. FAQ */}
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

      {/* 9. Final CTA */}
      <section className="relative isolate overflow-hidden bg-copper text-white">
        <Image src="/images/van.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25 mix-blend-multiply" />
        <Container className="py-20 sm:py-28">
          <Eyebrow light>Ready when you are</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-[2.7rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6rem]">
            <Words text="Too hot, too cold, or *too loud?* Let's fix it today." accent="text-spruce-2" />
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
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
