import { site } from "@/content/site";
import { Container, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Credits", description: "Fonts, artwork and tools used in this portfolio demo.", path: "/credits" });

const credits = [
  ["Bricolage Grotesque", "Mathieu Triay, SIL Open Font License, via Google Fonts"],
  ["Source Sans 3", "Paul D. Hunt for Adobe, SIL Open Font License, via Google Fonts"],
  ["Illustrations and map", "Drawn for this demo as inline SVG (no stock photos)"],
  ["Icons", "Drawn for this demo, in the style of Lucide (ISC License)"],
  ["Built with", "Next.js 16, React 19, TypeScript, Tailwind CSS 4"],
];

export default function CreditsPage() {
  return (
    <>
      <PageHero eyebrow="Credits" title="About this demo" intro="Saltbrook Heating & Air is a fictional company. Every name, phone number and review on this site is invented." />
      <Container className="py-12 sm:py-16">
        <dl className="max-w-2xl divide-y divide-line border-y border-line">
          {credits.map(([k, val]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-bold text-teal">{k}</dt>
              <dd className="text-muted">{val}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-2xl text-lg">
          Designed and built by Zordev as an example of the Launch site package: five pages, a request form and structured data.{" "}
          <a href={site.caseStudyUrl} className="font-semibold text-copper underline underline-offset-4">
            Read the case study
          </a>
          .
        </p>
      </Container>
    </>
  );
}
