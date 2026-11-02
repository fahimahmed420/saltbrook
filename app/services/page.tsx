import { faqs, services } from "@/content/site";
import { ButtonLink, CallLink, Check, Container, Eyebrow, PageHero } from "@/components/ui";
import { JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AC repair, heating, new systems and maintenance",
  description: "AC repair, heat pump and furnace repair, right-sized new systems and a $16/month maintenance plan across Raleigh, Durham, Cary, Apex and Wake Forest.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero
        eyebrow="Services"
        title="Repair, replace or keep it running."
        intro="Every visit starts with a diagnosis and a written price. You decide what happens next."
      />
      <nav aria-label="Services on this page" className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur sm:top-20">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex min-h-10 shrink-0 items-center rounded-full border border-line px-4 font-semibold text-teal hover:border-copper">
              {s.name}
            </a>
          ))}
        </Container>
      </nav>
      <Container className="divide-y divide-line">
        {services.map((s) => (
          <section key={s.id} id={s.id} className="grid scroll-mt-36 gap-6 py-12 md:grid-cols-[0.9fr_1.1fr] sm:py-16">
            <div>
              <h2 className="text-3xl font-bold text-teal sm:text-4xl">{s.name}</h2>
              <p className="mt-3 inline-block rounded-lg bg-cream-2 px-3 py-1.5 font-semibold text-copper">{s.from}</p>
            </div>
            <div>
              <p className="text-lg text-ink">{s.body}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </Container>
      <section id="faq" className="scroll-mt-36 border-t border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold text-teal sm:text-4xl">Before you call</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-line bg-cream p-5 open:bg-paper">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-teal [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl leading-none text-copper transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request service</ButtonLink>
            <CallLink variant="outline" />
          </div>
        </Container>
      </section>
    </>
  );
}
