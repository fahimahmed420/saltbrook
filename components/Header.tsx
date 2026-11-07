"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, services, site } from "@/content/site";
import { Container, Icon } from "./ui";
import { Logo } from "./Logo";
import { OpenNow } from "./OpenNow";

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<{ open: boolean; at: string }>({ open: false, at: pathname });
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Any navigation closes the mobile menu (derived from the path, no effect needed).
  const open = menu.open && menu.at === pathname;
  const setOpen = (v: boolean) => setMenu({ open: v, at: pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMenu((m) => ({ ...m, open: false })), setDropdown(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e: PointerEvent) => !dropRef.current?.contains(e.target as Node) && setDropdown(false);
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [dropdown]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-spruce-2 text-sm text-mint md:block">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-5">
            <OpenNow compact />
            <span className="flex items-center gap-1.5">
              <Icon name="pin" className="h-4 w-4" /> Serving Raleigh, Durham, Cary, Apex &amp; Wake Forest
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="h-4 w-4" /> Licensed &amp; insured
            </span>
            <span className="font-semibold text-gold">24/7 emergency line</span>
          </div>
        </Container>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-paper/95 shadow-[0_8px_30px_-12px_rgb(12_59_57/0.25)] backdrop-blur-md" : "bg-paper"}`}>
        <Container className={`flex items-center justify-between gap-4 transition-all duration-300 xl:gap-6 ${scrolled ? "h-16" : "h-[4.5rem] lg:h-20"}`}>
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0 py-1">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div ref={dropRef} className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button
                type="button"
                aria-expanded={dropdown}
                aria-controls="services-menu"
                onClick={() => setDropdown((d) => !d)}
                className={`flex items-center gap-1 rounded-full px-3 py-2.5 font-semibold transition-colors hover:bg-linen xl:px-4 ${active("/services") ? "text-copper" : "text-ink"}`}
              >
                Services <Icon name="chevron" className={`h-4 w-4 transition-transform ${dropdown ? "rotate-180" : ""}`} />
              </button>
              <div
                id="services-menu"
                className={`absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3 transition-all duration-200 ${dropdown ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
              >
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-paper p-3 shadow-[var(--shadow-lift)]">
                  {services.map((s) => (
                    <Link key={s.id} href={`/services#${s.id}`} onClick={() => setDropdown(false)} className="group rounded-xl p-4 transition-colors hover:bg-linen">
                      <span className="flex items-center gap-2 font-display text-lg font-bold text-spruce group-hover:text-copper">{s.nav}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{s.short}</span>
                    </Link>
                  ))}
                  <Link href="/services" onClick={() => setDropdown(false)} className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-spruce px-4 py-3 font-semibold text-paper hover:bg-spruce-2">
                    All services and prices <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            {nav.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2.5 font-semibold transition-colors hover:bg-linen xl:px-4 ${active(l.href) ? "text-copper" : "text-ink"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* nowrap throughout: at the 1024px breakpoint "Comfort Club", the phone number and "Book online" used to break onto two lines. */}
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            <a href={site.phoneHref} className="group flex items-center gap-3 whitespace-nowrap">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-spruce transition-colors group-hover:bg-copper group-hover:text-white">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Call any time</span>
                <span className="font-display text-lg font-bold text-spruce">{site.phone}</span>
              </span>
            </a>
            <Link href="/book" className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-copper px-5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-copper-2 xl:px-6">
              Book online
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={site.phoneHref} aria-label={`Call ${site.phone}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-spruce">
              <Icon name="phone" className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-spruce text-paper"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-spruce-2/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setOpen(false)}
      >
        <nav
          aria-label="Mobile"
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-x-0 top-0 max-h-dvh overflow-y-auto rounded-b-3xl bg-paper px-5 pb-8 pt-24 shadow-2xl transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Services</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {services.map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} onClick={() => setOpen(false)} className="rounded-xl bg-linen p-3.5 font-semibold text-spruce">
                {s.nav}
              </Link>
            ))}
          </div>
          <div className="mt-5 divide-y divide-line border-y border-line">
            {[{ href: "/", label: "Home" }, ...nav].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className="flex min-h-13 items-center justify-between font-display text-xl font-bold text-spruce aria-[current=page]:text-copper"
              >
                {l.label} <Icon name="right" className="h-5 w-5 text-muted" />
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <Link href="/book" onClick={() => setOpen(false)} className="flex min-h-13 items-center justify-center rounded-full bg-copper font-semibold text-white">
              Book online
            </Link>
            <a href={site.phoneHref} className="flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-spruce font-semibold text-spruce">
              <Icon name="phone" className="h-5 w-5" /> {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
