import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "copper" }: { children: ReactNode; tone?: "copper" | "cream" }) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${tone === "copper" ? "text-copper" : "text-cream-2"}`}>{children}</p>
  );
}

const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-colors";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "light" }) {
  const styles = {
    primary: "bg-copper text-white hover:bg-copper-2",
    outline: "border-2 border-teal text-teal hover:bg-teal hover:text-cream",
    light: "border-2 border-cream/70 text-cream hover:bg-cream hover:text-teal",
  }[variant];
  return (
    <Link href={href} className={`${btn} ${styles}`}>
      {children}
    </Link>
  );
}

export function CallLink({ variant = "primary" }: { variant?: "primary" | "outline" | "light" }) {
  const styles = {
    primary: "bg-copper text-white hover:bg-copper-2",
    outline: "border-2 border-teal text-teal hover:bg-teal hover:text-cream",
    light: "border-2 border-cream/70 text-cream hover:bg-cream hover:text-teal",
  }[variant];
  return (
    <a href={site.phoneHref} className={`${btn} ${styles}`}>
      <PhoneIcon /> Call {site.phone}
    </a>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-copper" fill="currentColor">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-line bg-cream-2/60">
      <Container className="py-12 sm:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-[2.4rem] font-bold leading-[1.05] text-teal sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>
      </Container>
    </section>
  );
}
