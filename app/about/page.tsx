import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink, Container, Icon, PageHero, SectionHead } from "@/components/ui";
import { Counter } from "@/components/Counter";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Saltbrook",
  description: "A Raleigh heating and air crew since 2009: licensed, background-checked technicians who tell you when a repair beats a replacement.",
  path: "/about",
});

const values = [
  { icon: "tag", title: "Price first, then work", body: "Every job starts with a written price. If it changes, you approve it before we continue." },
  { icon: "wrench", title: "Repair before replace", body: "We only recommend a new system when the numbers say so, and we show you the numbers." },
  { icon: "home", title: "Treat it like our home", body: "Shoe covers, drop cloths, and a tidy space when we leave. Every time." },
  { icon: "shield", title: "Stand behind the work", body: "One year on repairs, ten years on installs. If it's not right, we come back." },
];

const timeline = [
  ["2009", "Dana Whitfield starts Saltbrook with one van and a Raleigh service list of twelve neighbors."],
  ["2014", "First full-time install crew. We start doing room-by-room load calculations on every system."],
  ["2019", "The Comfort Club launches. Members now make up half of our repair calls."],
  ["2025", "Six technicians, three install crews and five towns across the Triangle."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`A Raleigh crew since ${site.founded}.`}
        intro="We grew through neighbors telling neighbors. That's still how we work: on time, upfront about price, and honest about what your system actually needs."
        image="/images/tech-smile.jpg"
        imageAlt="Smiling technician in uniform outside a building"
      />

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div data-reveal className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[2rem]">
              <Image src="/images/tech-arrival.jpg" alt="Technician arriving at a job with a full tool belt" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div data-reveal className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image src="/images/tech-work.jpg" alt="Technician working on equipment" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div data-reveal style={{ ["--d" as string]: "80ms" }} className="flex aspect-square flex-col justify-end rounded-[2rem] bg-spruce p-5 text-paper sm:p-6">
              <p className="condensed font-display text-4xl font-extrabold text-gold sm:text-5xl">
                <Counter value={9800} suffix="+" />
              </p>
              <p className="mt-2 text-mint">homes kept comfortable across the Triangle</p>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Our story"
              title="One van, one rule."
              intro="Saltbrook started in 2009 with one technician and a pickup truck. The rule was simple: tell people the truth about their system, even when the truth is a cheap repair."
            />
            <p data-reveal className="mt-5 text-lg leading-relaxed text-muted">
              Sixteen years later we have six technicians and three install crews, but the rule hasn&apos;t changed. It&apos;s why most of our work still comes from referrals, and why half our customers are Comfort Club members who stay year after year.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHead center eyebrow="What we stand for" title="Four promises on every visit." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl bg-linen p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper text-white">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-spruce">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Milestones" title="How we got here." />
          <ol className="relative space-y-8 border-l-2 border-line pl-8">
            {timeline.map(([year, text], i) => (
              <li key={year} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="relative">
                <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-linen bg-copper" />
                <p className="font-display text-3xl font-extrabold text-spruce">{year}</p>
                <p className="mt-1 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-spruce py-16 text-paper">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl">Want an honest opinion on your system?</h2>
          <ButtonLink href="/book">Book a visit</ButtonLink>
        </Container>
      </section>
    </>
  );
}
