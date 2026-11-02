/** Saltbrook mark: a copper flame over a snowflake arm, heat and cool in one glyph. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10 shrink-0">
        <rect width="40" height="40" rx="11" className={light ? "fill-paper" : "fill-spruce"} />
        <path d="M20 6.5c3.2 4.3 6.8 7.5 6.8 12.3a6.8 6.8 0 0 1-13.6 0c0-2.7 1.4-4.6 3-6.3.2 2.1 1.2 3.4 2.7 4C18.3 13.4 18.6 9.9 20 6.5Z" className="fill-copper" />
        <path d="M10.5 31h19M14 27.2l3.4 3.8-3.4 3.8M26 27.2 22.6 31l3.4 3.8" fill="none" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={light ? "stroke-spruce" : "stroke-mint"} />
      </svg>
      <span className={`font-display text-xl font-extrabold leading-none tracking-tight ${light ? "text-paper" : "text-spruce"}`}>
        Saltbrook
        <span className={`mt-1 block text-[0.72rem] font-bold uppercase tracking-[0.22em] ${light ? "text-mint" : "text-copper"}`}>Heating &amp; Air</span>
      </span>
    </span>
  );
}
