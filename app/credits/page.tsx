import { credits, site } from "@/content/site";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Credits", description: "Photography, fonts and tools used on this site.", path: "/credits" });

export default function CreditsPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copper">Credits</p>
          <h1 className="mt-3 text-5xl font-extrabold text-spruce">About this site</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Saltbrook Heating &amp; Air is a fictional company. The business, team, reviews and figures are invented for this portfolio project by{" "}
            <a href={site.caseStudyUrl} className="font-semibold text-copper underline underline-offset-4">
              Zordev
            </a>
            .
          </p>
          <h2 className="mt-12 text-2xl font-bold text-spruce">Photography (Unsplash License)</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {credits.map((c) => (
              <div key={c.what} className="grid gap-1 py-3 sm:grid-cols-[1fr_1fr]">
                <dt className="text-muted">{c.what}</dt>
                <dd className="font-semibold text-spruce">{c.who} on Unsplash</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-12 text-2xl font-bold text-spruce">Type and tools</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Bricolage Grotesque and Inter (SIL Open Font License). Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Logo, map and icons drawn for this site.
          </p>
        </div>
      </Container>
    </section>
  );
}
