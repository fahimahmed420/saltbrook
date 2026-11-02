import Link from "next/link";
import { nav, site } from "@/content/site";
import { Container, PhoneIcon } from "./ui";
import { Logo } from "./Logo";

/** No JavaScript: the mobile menu is a native <details> disclosure. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" aria-label={`${site.name} home`} className="min-h-11 py-1">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 font-semibold text-ink hover:bg-cream-2">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-teal hover:text-copper">
            <PhoneIcon /> {site.phone}
          </a>
          <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg bg-copper px-5 font-semibold text-white hover:bg-copper-2">
            Request service
          </Link>
        </div>
        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border-2 border-teal text-teal [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-6 w-6 group-open:block" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 top-14 w-64 rounded-xl border border-line bg-paper p-2 shadow-xl">
            <Link href="/" className="flex min-h-12 items-center rounded-lg px-4 font-semibold hover:bg-cream-2">
              Home
            </Link>
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-12 items-center rounded-lg px-4 font-semibold hover:bg-cream-2">
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
