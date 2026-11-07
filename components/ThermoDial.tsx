"use client";

import { useEffect, useRef, useState } from "react";

const LOW = 34; // January low in Raleigh
const HIGH = 94; // July high
const INSIDE = 71;

/**
 * The signature visual: a thermostat dial that sweeps from a January morning to a July afternoon
 * as the section scrolls through the viewport. The outside number and the arc move; the inside
 * number never does. Reduced motion: the dial rests mid-sweep.
 */
const outsideAt = (t: number) => Math.round(LOW + t * (HIGH - LOW));

export function ThermoDial() {
  const root = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0.5);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let shown = outsideAt(0.5);
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      // 0 when the dial's top enters at the bottom of the screen, 1 when its bottom leaves at the top.
      const raw = (vh - r.top) / (vh + r.height);
      const p = Math.min(1, Math.max(0, (raw - 0.15) / 0.7));
      // The arc and needle follow the CSS variable; React only re-renders when the displayed degree changes.
      el.style.setProperty("--t", p.toFixed(3));
      const next = outsideAt(p);
      if (next !== shown) {
        shown = next;
        setT(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const outside = outsideAt(t);
  const heating = t < 0.5;
  const ticks = Array.from({ length: 28 }, (_, i) => -135 + (i * 270) / 27);

  return (
    <div ref={root} className="dial relative mx-auto w-full max-w-[26rem]" role="img" aria-label={`Thermostat showing ${INSIDE} degrees inside while it is ${outside} degrees outside`}>
      {/* The shadow lives on a static disc behind the dial, so the SVG (which repaints while scrolling) carries no filter. */}
      <div aria-hidden="true" className="absolute inset-[3.2%] rounded-full shadow-[0_30px_50px_rgb(0_0_0/0.45)]" />
      <svg viewBox="0 0 320 320" className="relative h-auto w-full">
        <defs>
          <linearGradient id="dial-sweep" x1="0" y1="1" x2="1" y2="1">
            <stop offset="0" stopColor="#5aa7c4" />
            <stop offset="0.5" stopColor="#f2b544" />
            <stop offset="1" stopColor="#c4622d" />
          </linearGradient>
          <radialGradient id="dial-face" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#145653" />
            <stop offset="1" stopColor="#072927" />
          </radialGradient>
        </defs>
        {/* Face */}
        <circle cx="160" cy="160" r="150" fill="url(#dial-face)" stroke="#cfe7df" strokeOpacity="0.14" strokeWidth="2" />
        <circle cx="160" cy="160" r="128" fill="none" stroke="#cfe7df" strokeOpacity="0.08" strokeWidth="1" />
        {/* Ticks */}
        {ticks.map((a, i) => (
          <line
            key={a}
            x1="160"
            y1="22"
            x2="160"
            y2={i % 3 === 0 ? "34" : "29"}
            stroke="#cfe7df"
            strokeOpacity={i % 3 === 0 ? 0.6 : 0.3}
            strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
            transform={`rotate(${a} 160 160)`}
          />
        ))}
        {/* Track and progress arc (r = 120, 270° sweep) */}
        <path d="M75.1 244.9A120 120 0 1 1 244.9 244.9" fill="none" stroke="#cfe7df" strokeOpacity="0.15" strokeWidth="14" strokeLinecap="round" />
        <path d="M75.1 244.9A120 120 0 1 1 244.9 244.9" fill="none" stroke="url(#dial-sweep)" strokeWidth="14" strokeLinecap="round" className="dial-progress" />
        {/* Needle */}
        <g className="dial-needle">
          <line x1="160" y1="160" x2="160" y2="52" stroke="#fffdf9" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="52" r="6" fill="#fffdf9" />
        </g>
        <circle cx="160" cy="160" r="86" fill="#072927" stroke="#cfe7df" strokeOpacity="0.12" />
        {/* Readouts */}
        <text x="160" y="150" textAnchor="middle" fill="#fffdf9" style={{ font: "800 72px var(--font-bricolage), sans-serif", letterSpacing: "-0.04em" }}>
          {INSIDE}°
        </text>
        <text x="160" y="178" textAnchor="middle" fill="#cfe7df" style={{ font: "600 13px var(--font-instrument), sans-serif", letterSpacing: "0.16em" }}>
          INSIDE, ALL YEAR
        </text>
        <text x="160" y="212" textAnchor="middle" fill={heating ? "#5aa7c4" : "#f2b544"} style={{ font: "700 15px var(--font-bricolage), sans-serif" }}>
          {heating ? "HEATING" : "COOLING"}
        </text>
        <text x="86" y="286" textAnchor="middle" fill="#5aa7c4" style={{ font: "600 13px var(--font-instrument), sans-serif" }}>
          Jan {LOW}°
        </text>
        <text x="234" y="286" textAnchor="middle" fill="#c4622d" style={{ font: "600 13px var(--font-instrument), sans-serif" }}>
          Jul {HIGH}°
        </text>
      </svg>
      {/* Outside temperature, floating */}
      <div className="absolute -right-2 top-6 rounded-2xl bg-paper px-4 py-3 text-ink shadow-[var(--shadow-lift)] sm:-right-6">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">Outside</p>
        <p className="font-display text-3xl font-extrabold tabular-nums text-spruce">{outside}°</p>
      </div>
    </div>
  );
}
