import Image from "next/image";
import { areas, site } from "@/content/site";
import { ButtonLink, CallButton, Container, Icon, PageHero, SectionHead } from "@/components/ui";
import { AreaMap } from "@/components/AreaMap";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Service area: Raleigh, Durham, Cary, Apex & Wake Forest",
  description: "Saltbrook serves five towns across the Triangle. Same-day visits in Raleigh, Cary and Apex; next-morning in Durham and Wake Forest.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Five towns, one van ride away."
        intro="Our shop is in Raleigh. Same-day visits in Raleigh, Cary and Apex; Durham and Wake Forest are usually next morning."
        image="/images/blue-home.jpg"
        imageAlt="Blue two-story home with black shutters"
      >
        <ButtonLink href="/book">Check a time in your area</ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
            <AreaMap />
          </div>
          <div>
            <SectionHead eyebrow="Where we work" title="Arrival times by town." intro="Times are typical for requests made before noon on a weekday. Comfort Club members get priority in every town." />
          </div>
        </Container>
        <Container className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {areas.map((a, i) => (
            <div key={a.name} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="flex flex-col rounded-3xl bg-paper p-6 shadow-[var(--shadow-card)]">
              <Icon name="pin" className="h-6 w-6 text-copper" />
              <h2 className="mt-4 text-2xl font-bold text-spruce">{a.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.note}</p>
              <span className={`mt-5 self-start rounded-full px-3 py-1 text-sm font-semibold ${a.eta === "Same day" ? "bg-mint text-spruce" : "bg-sand text-muted"}`}>{a.eta}</span>
            </div>
          ))}
        </Container>
      </section>

      <section className="px-3 pb-20 sm:px-5 sm:pb-28">
        <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-spruce text-paper">
          <Image src="/images/van.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-spruce via-spruce/90 to-spruce/40" />
          <Container className="py-16 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl">Not sure we cover your street?</h2>
              <p className="mt-4 text-lg text-mint">Call and ask. If we can&apos;t come, we&apos;ll tell you who can.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CallButton variant="white" label={`Call ${site.phone}`} />
                <ButtonLink href="/book" variant="light">
                  Book online
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
