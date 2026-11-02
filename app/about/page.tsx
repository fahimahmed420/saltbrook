import { site } from "@/content/site";
import { ButtonLink, Check, Container, Eyebrow, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Saltbrook",
  description: "A small Raleigh HVAC crew since 2009: licensed, insured, and known for telling customers when a repair beats a replacement.",
  path: "/about",
});

const team = [
  { name: "Dana Whitfield", role: "Owner and lead technician", initials: "DW", tone: "bg-copper" },
  { name: "Marcus Ellery", role: "Install crew lead", initials: "ME", tone: "bg-teal" },
  { name: "Priya Lamb", role: "Scheduling and service plans", initials: "PL", tone: "bg-teal-2" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`A Raleigh crew since ${site.founded}.`}
        intro="Six technicians, three vans and one rule: tell the customer the truth about their system, even when the truth is a cheap repair."
      />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-2">
        <div className="space-y-4 text-lg">
          <p>
            Saltbrook started as one technician and a pickup truck. The business grew the slow way, through neighbours telling neighbours, so we still work like every
            customer is a referral.
          </p>
          <p>
            That means written prices before work starts, repairs before replacements when repair makes sense, and installs sized with a real load calculation instead of a
            guess.
          </p>
          <ul className="space-y-2 pt-2 text-base">
            {["Licensed and insured in North Carolina", "Technicians trained on heat pumps and gas furnaces", "Permits and inspections handled on every install"].map((t) => (
              <li key={t} className="flex gap-2">
                <Check />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>The people you&apos;ll meet</Eyebrow>
          <ul className="mt-4 grid gap-3">
            {team.map((p) => (
              <li key={p.name} className="flex items-center gap-4 rounded-xl border border-line bg-paper p-4">
                <span aria-hidden="true" className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-cream ${p.tone}`}>
                  {p.initials}
                </span>
                <span>
                  <span className="block font-bold text-teal">{p.name}</span>
                  <span className="text-muted">{p.role}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">Fictional team for this demo.</p>
        </div>
      </Container>
      <section className="border-t border-line bg-cream-2">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <h2 className="max-w-xl text-2xl font-bold text-teal sm:text-3xl">Want an honest opinion on your system?</h2>
          <ButtonLink href="/contact">Request a visit</ButtonLink>
        </Container>
      </section>
    </>
  );
}
