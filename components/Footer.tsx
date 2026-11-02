import Link from "next/link";
import { areas, nav, site } from "@/content/site";
import { Container } from "./ui";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-teal-2 pb-28 text-cream-2 lg:pb-10">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">{site.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-semibold text-cream hover:text-copper">
              {site.phone}
            </a>
            <br />
            {site.email}
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream">Pages</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[{ href: "/", label: "Home" }, ...nav].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream">We serve</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {areas.map((a) => (
              <li key={a.name} className="flex min-h-9 items-center">
                {a.name}, NC
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream">Hours</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="block text-cream">{h.days}</span>
                {h.close ? `${h.open} – ${h.close}` : h.open}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-cream/15 pt-6 text-sm">
        <p className="max-w-3xl">
          <strong className="text-cream">Saltbrook Heating &amp; Air is a fictional company created by Zordev as a portfolio demo. Nothing here is for sale.</strong>{" "}
          <a href={site.caseStudyUrl} className="underline underline-offset-4 hover:text-cream">
            See the case study
          </a>
          .
        </p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          <span>© 2026 Zordev</span>
          <Link href="/credits" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
            Credits
          </Link>
        </p>
      </Container>
    </footer>
  );
}
