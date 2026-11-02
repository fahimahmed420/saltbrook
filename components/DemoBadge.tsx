"use client";

import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const KEY = "zd_demo_badge";
const noop = () => () => {};
function dismissedThisSession() {
  try {
    return sessionStorage.getItem(KEY) === "0";
  } catch {
    return false;
  }
}

/** "Demo by Zordev" pill. Dismissible for this browser session only; ?shots=1 hides it for screenshots. */
export function DemoBadge() {
  const stored = useSyncExternalStore(noop, dismissedThisSession, () => false);
  const shots = useSyncExternalStore(noop, () => new URLSearchParams(location.search).has("shots"), () => false);
  const [dismissed, setDismissed] = useState(false);

  if (stored || dismissed || shots) return null;
  const href = `${site.caseStudyUrl}?utm_source=saltbrook-demo&utm_medium=badge`;

  return (
    <div className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] z-50 flex items-center rounded-full bg-ink/90 pl-4 pr-1 text-sm text-cream shadow-lg backdrop-blur lg:bottom-[max(1rem,env(safe-area-inset-bottom,0px))]">
      <a href={href} className="py-2.5 hover:underline">
        Demo by <strong>Zordev</strong>
        <span className="hidden sm:inline"> · fictional brand · see the case study</span> →
      </a>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem(KEY, "0");
          } catch {}
        }}
        className="ml-1 flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
        aria-label="Hide demo badge for this visit"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
