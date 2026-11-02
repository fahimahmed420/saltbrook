"use client";

import { useRef } from "react";
import { reviews } from "@/content/site";
import { Icon, Stars } from "./ui";

/** Swipeable review row (native scroll-snap) with arrow buttons for mouse users. */
export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={track}
        aria-label="Customer reviews"
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <li key={r.name} className="w-[85%] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
            <figure className="flex h-full flex-col rounded-3xl bg-paper p-7 text-ink shadow-[var(--shadow-card)]">
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
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors hover:bg-white hover:text-spruce">
          <Icon name="left" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next reviews" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors hover:bg-white hover:text-spruce">
          <Icon name="right" />
        </button>
      </div>
    </div>
  );
}
