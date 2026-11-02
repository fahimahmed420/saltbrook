"use client";

import { useId, useState } from "react";
import { faqs } from "@/content/site";
import { Icon } from "./ui";

/** Accordion with an animated height (CSS grid rows), one open at a time. */
export function Faq({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-paper shadow-[var(--shadow-card)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-lg font-bold text-spruce sm:px-8 sm:text-xl"
              >
                {f.q}
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-copper text-white" : "bg-linen text-spruce"}`}>
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-muted sm:px-8">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
