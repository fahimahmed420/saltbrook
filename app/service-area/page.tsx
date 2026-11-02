import { areas } from "@/content/site";
import { ButtonLink, CallLink, Container, PageHero } from "@/components/ui";
import { AreaMap } from "@/components/Illustration";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Service area: Raleigh, Durham, Cary, Apex and Wake Forest",
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
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <AreaMap />
        <ul className="grid content-start gap-3">
          {areas.map((a) => (
            <li key={a.name} className="rounded-xl border border-line bg-paper p-5">
              <h2 className="text-xl font-bold text-teal">{a.name}, NC</h2>
              <p className="mt-1 text-muted">{a.note}</p>
            </li>
          ))}
        </ul>
      </Container>
      <section className="border-t border-line bg-cream-2">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-teal sm:text-3xl">Not sure if we cover your street?</h2>
            <p className="mt-2 text-muted">Call and ask. If we can&apos;t come, we&apos;ll tell you who can.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CallLink />
            <ButtonLink href="/contact" variant="outline">
              Request service
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
