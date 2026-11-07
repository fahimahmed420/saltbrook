import { reviews } from "@/content/site";
import { Stars } from "./ui";

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="flex h-full w-[20rem] shrink-0 flex-col rounded-[1.75rem] bg-paper p-7 text-ink shadow-[var(--shadow-card)] sm:w-[24rem]">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-muted">{r.service}</span>
      </div>
      <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed">“{r.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-spruce font-display font-bold text-mint">
          {r.name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold">{r.name}</span>
          <span className="text-sm text-muted">{r.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Reviews drift past slowly; the row pauses while hovered or pressed. The second copy is decorative. */
export function Reviews() {
  return (
    <div role="marquee" className="marquee -mx-5 sm:-mx-8" aria-label="Customer reviews">
      <div className="marquee-track flex w-max gap-5 pl-5 animate-marquee-slow sm:pl-8">
        {reviews.map((r) => (
          <Card key={r.name} r={r} />
        ))}
        <div aria-hidden="true" className="flex gap-5 pl-0">
          {reviews.map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
