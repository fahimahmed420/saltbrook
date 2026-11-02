import Image from "next/image";
import Link from "next/link";
import { faqs, services } from "@/content/site";
import { Arrow, ButtonLink, CallButton, Container, Icon, PageHero, SectionHead } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AC repair, heat pumps, new systems & tune-ups",
  description: "Same-day AC and heat pump repair, gas furnace service, right-sized new systems with three written options, and seasonal tune-ups across the Triangle.",
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
        title="Repair, replace, or keep it running."
        intro="Every visit starts with a diagnosis and a written price. You decide what happens next, with no pressure either way."
        image="/images/tech-work.jpg"
        imageAlt="Technician servicing equipment outside a home"
      >
        <ButtonLink href="/book">Book a visit</ButtonLink>
        <CallButton variant="light" />
      </PageHero>

      <nav aria-label="Services on this page" className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
        <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex min-h-11 shrink-0 items-center rounded-full border border-line bg-linen px-5 font-semibold text-spruce transition-colors hover:border-copper hover:text-copper">
              {s.nav}
            </a>
          ))}
        </Container>
      </nav>

      <div className="py-8">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} className="py-14 sm:py-20">
            <Container className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div data-reveal className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className={`absolute -bottom-6 rounded-2xl bg-paper px-6 py-4 shadow-[var(--shadow-lift)] ${i % 2 ? "left-4 sm:-left-6" : "right-4 sm:-right-6"}`}>
                  <p className="font-display text-3xl font-extrabold text-spruce">{s.price}</p>
                  <p className="max-w-[12rem] text-sm leading-snug text-muted">{s.priceNote}</p>
                </div>
              </div>
              <div>
                <SectionHead eyebrow={`0${i + 1} · ${s.nav}`} title={s.name} intro={s.body} />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div data-reveal className="rounded-3xl bg-paper p-6 shadow-[var(--shadow-card)]">
                    <p className="font-display text-lg font-bold text-spruce">Signs you need us</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.signs.map((x) => (
                        <li key={x} className="flex gap-2.5 text-[0.95rem] leading-snug text-muted">
                          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div data-reveal style={{ ["--d" as string]: "80ms" }} className="rounded-3xl bg-spruce p-6 text-paper">
                    <p className="font-display text-lg font-bold">What&apos;s included</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.included.map((x) => (
                        <li key={x} className="flex gap-2.5 text-[0.95rem] leading-snug text-mint">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/book?service=${s.id}`} className="group">
                    Book {s.nav.toLowerCase()} <Arrow />
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Questions" title="Before you call." />
            <p className="mt-6 leading-relaxed text-muted">
              Membership saves 15% on every repair.{" "}
              <Link href="/comfort-club" className="font-semibold text-copper underline-offset-4 hover:underline">
                See the Comfort Club
              </Link>
              .
            </p>
          </div>
          <div data-reveal>
            <Faq />
          </div>
        </Container>
      </section>
    </>
  );
}

