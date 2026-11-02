/** Saltbrook mark: a copper flame over a teal snowflake arm, i.e. heat and cool in one glyph. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
        <rect width="40" height="40" rx="9" className={light ? "fill-cream" : "fill-teal"} />
        <path d="M20 7c3 4.2 6.5 7.3 6.5 12a6.5 6.5 0 0 1-13 0c0-2.6 1.3-4.4 2.8-6 .2 2 1.2 3.3 2.6 3.8C18.4 13.8 18.6 10.4 20 7Z" className="fill-copper" />
        <path d="M11 31h18M14 27.5l3 3.5-3 3.5M26 27.5l-3 3.5 3 3.5" fill="none" strokeWidth="2.2" strokeLinecap="round" className={light ? "stroke-teal" : "stroke-cream"} />
      </svg>
      <span className={`font-display text-lg font-bold leading-none tracking-tight ${light ? "text-cream" : "text-teal"}`}>
        Saltbrook
        <span className={`block text-xs font-semibold uppercase tracking-[0.16em] ${light ? "text-cream-2" : "text-copper"}`}>Heating &amp; Air</span>
      </span>
    </span>
  );
}
