import Image from "next/image";
import { club, site } from "@/content/site";
import { ButtonLink, CallButton, Container, Icon, PageHero, SectionHead } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Comfort Club maintenance plan",
  description: `Two tune-ups a year, priority booking, 15% off repairs and no overtime fees, for $${club.price} a month. Cancel any time.`,
  path: "/comfort-club",
});

const compare = [
  ["Spring and fall tune-ups", "$258 a year", "Included"],
  ["Priority booking in heat waves", "—", "Included"],
  ["Repair discount", "—", "15% off"],
  ["Evening and Saturday visits", "+$75 overtime", "No extra charge"],
  ["Filters", "$24 each", "Included at tune-ups"],
];

const clubFaqs = [
  { q: "Is there a contract?", a: "No. Membership renews monthly or yearly and you can stop any time with a phone call or an email." },
  { q: "Does it cover more than one system?", a: "Each membership covers one heating and one cooling system. Additional systems are $9 a month each." },
  { q: "When are the tune-ups scheduled?", a: "We'll contact you in March for the cooling check and in September for the heating check, and book a time that suits you." },
  { q: "What if my system needs a big repair?", a: "You get 15% off. If the repair would cost more than $1,500, every membership fee you've paid comes off a new system instead." },
];

export default function ComfortClubPage() {
  return (
    <>
      <PageHero
        eyebrow="Comfort Club"
        title="Fewer breakdowns. *Front of the line* when one happens."
        intro={`Two seasonal tune-ups, priority booking and 15% off every repair, for $${club.price} a month. No contracts.`}
        image="/images/living-room.jpg"
        imageAlt="Bright living room with a sectional sofa and fireplace"
      >
        <ButtonLink href="/book?service=maintenance">Join for ${club.price}/month</ButtonLink>
        <CallButton variant="light" />
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead center eyebrow="What members get" title="Everything a well-kept system needs." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {club.perks.map((p, i) => (
              <div key={p.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }} className="rounded-3xl bg-paper p-7 shadow-[var(--shadow-card)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-spruce">
                  <Icon name={["calendar", "clock", "tag", "sparkle", "shield", "check"][i]} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-spruce">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* min-w-0: otherwise the table's minimum width widens this grid cell and the whole page on phones. */}
          <div className="min-w-0">
            <SectionHead eyebrow="The math" title="Members pay less for the same care." />
            <div data-reveal className="mt-10 overflow-x-auto rounded-3xl border border-line">
              <table className="w-full min-w-[32rem] text-left">
                <thead className="bg-linen text-sm uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-6 py-4 font-semibold">&nbsp;</th>
                    <th className="px-6 py-4 font-semibold">Without membership</th>
                    <th className="bg-spruce px-6 py-4 font-semibold text-gold">Comfort Club</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {compare.map(([a, b, c]) => (
                    <tr key={a}>
                      <td className="px-6 py-4 font-semibold text-spruce">{a}</td>
                      <td className="px-6 py-4 tabular-nums text-muted">{b}</td>
                      <td className="bg-spruce/[0.04] px-6 py-4 font-semibold text-spruce">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div data-reveal className="rounded-[2rem] bg-spruce p-8 text-paper shadow-[var(--shadow-lift)] sm:p-10 lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Comfort Club</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-7xl font-extrabold">${club.price}</span>
              <span className="text-lg text-mint">/ month</span>
            </p>
            <p className="mt-2 text-mint">or ${club.annual} a year, which saves ${club.price * 12 - club.annual}.</p>
            <ul className="mt-6 space-y-2.5">
              {club.perks.map((p) => (
                <li key={p.title} className="flex gap-2.5 text-mint">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  {p.title}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/book?service=maintenance">Join the Comfort Club</ButtonLink>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center justify-center text-sm text-mint underline-offset-4 hover:underline">
                or call {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="/images/thermostat-nest.jpg" alt="Smart thermostat on a wall" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHead eyebrow="Questions" title="How membership works." />
            <div data-reveal className="mt-8">
              <Faq items={clubFaqs} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
