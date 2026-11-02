import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/content/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] ${light ? "text-mint" : "text-copper"}`}>
      <span aria-hidden="true" className={`h-px w-6 ${light ? "bg-mint" : "bg-copper"}`} />
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, intro, light = false, center = false }: { eyebrow: string; title: ReactNode; intro?: string; light?: boolean; center?: boolean }) {
  return (
    <div data-reveal className={`max-w-3xl ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-[2.1rem] font-bold leading-[1.05] sm:text-5xl lg:text-[3.4rem] ${light ? "text-paper" : "text-spruce"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-mint/90" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

const base = "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold transition-all duration-300";
const variants = {
  primary: "bg-copper text-white shadow-[0_10px_24px_-10px_rgb(196_98_45/0.8)] hover:-translate-y-0.5 hover:bg-copper-2",
  dark: "bg-spruce text-paper hover:-translate-y-0.5 hover:bg-spruce-2",
  outline: "border-2 border-spruce/80 text-spruce hover:bg-spruce hover:text-paper",
  light: "border-2 border-white/60 text-white backdrop-blur hover:bg-white hover:text-spruce",
  white: "bg-white text-spruce hover:-translate-y-0.5 hover:bg-linen",
};
type Variant = keyof typeof variants;

export function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function CallButton({ variant = "outline", label }: { variant?: Variant; label?: string }) {
  return (
    <a href={site.phoneHref} className={`${base} ${variants[variant]}`}>
      <Icon name="phone" className="h-5 w-5" />
      {label ?? site.phone}
    </a>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return <Icon name="arrow" className={`${className} transition-transform duration-300 group-hover:translate-x-1`} />;
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars" role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} aria-hidden="true" viewBox="0 0 20 20" className={className} fill="currentColor">
          <path d="m10 1.5 2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7Z" />
        </svg>
      ))}
    </span>
  );
}

const paths: Record<string, ReactNode> = {
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  snow: <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5M9 4l3 2 3-2M9 20l3-2 3 2M3.5 10.5 5 13.5l-1.5 3M20.5 10.5 19 13.5l1.5 3" />,
  flame: <path d="M12 2.5c3 3.8 6 6.6 6 11a6 6 0 0 1-12 0c0-2.6 1.4-4.5 3-6 .2 2 1.2 3.2 2.6 3.7C11 8.6 11 5.5 12 2.5Z" />,
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13a6 6 0 0 1-7.8 1.9l-6.4 6.4a2.1 2.1 0 0 1-3-3l6.4-6.4A6 6 0 0 1 12.1 4l1.6 1.6Z" />,
  shield: <path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6Zm-3.5 9.5 2.5 2.5 4.5-5" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  tag: <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9Zm5-4.5h.01" />,
  card: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5ZM3 10h18M7 15h3" />,
  pin: <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  mail: <path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />,
  calendar: <path d="M7 3v3m10-3v3M4 8.5h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />,
  thermo: <path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z" />,
  sparkle: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  left: <path d="m15 6-6 6 6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
};

export function Icon({ name, className = "h-5 w-5", style }: { name: keyof typeof paths | string; className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageAlt, children }: { eyebrow: string; title: ReactNode; intro: string; image: string; imageAlt: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-spruce-2 text-paper">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-spruce-2 via-spruce-2/85 to-spruce-2/30" />
      <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="max-w-2xl">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-mint sm:text-xl">{intro}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mint/80">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="right" className="h-3.5 w-3.5" />}
            {it.href ? (
              <Link href={it.href} className="hover:text-white">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
