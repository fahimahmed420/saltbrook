import Link from "next/link";
import { areas, nav, services, site } from "@/content/site";
import { Container, Icon } from "./ui";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-spruce-2 pb-28 text-mint/80 lg:pb-0">
      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed">{site.tagline}</p>
          <a href={site.phoneHref} className="mt-6 inline-flex min-h-11 items-center gap-2 font-display text-2xl font-bold text-paper hover:text-gold">
            <Icon name="phone" className="h-5 w-5" /> {site.phone}
          </a>
          <p className="mt-1 flex min-h-11 items-center gap-2 select-all">
            <Icon name="mail" className="h-4 w-4" /> {site.email}
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper">Services</h2>
          <ul className="mt-4 space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="inline-flex min-h-11 items-center hover:text-paper">
                  {s.nav}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/comfort-club" className="inline-flex min-h-11 items-center hover:text-paper">
                Comfort Club
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper">Company</h2>
          <ul className="mt-4 space-y-1">
            {[...nav.slice(2), { href: "/book", label: "Book online" }, { href: "/privacy", label: "Privacy" }, { href: "/credits", label: "Credits" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper">Hours</h2>
          <ul className="mt-4 space-y-3">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-paper">{h.days}</span>
                <span className="text-right">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">Serving {areas.map((a) => a.name).join(", ")}, NC.</p>
        </div>
      </Container>

      {/* Oversized wordmark, the last thing on every page. */}
      <div aria-hidden="true" className="pointer-events-none select-none px-2 leading-none">
        <p className="condensed -mb-[0.19em] whitespace-nowrap text-center font-display text-[21.5vw] font-extrabold tracking-[-0.05em] text-paper/[0.07]">Saltbrook</p>
      </div>

      <div className="relative border-t border-white/10 bg-spruce-2">
        <Container className="flex flex-col gap-3 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>
            A fictional company designed and built by{" "}
            <a href={site.caseStudyUrl} className="font-semibold text-paper underline-offset-4 hover:underline">
              Zordev
            </a>{" "}
            as a portfolio project. Nothing here is for sale.
          </p>
        </Container>
      </div>
    </footer>
  );
}
