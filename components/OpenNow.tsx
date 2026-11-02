"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

function isOpen() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const day = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const range = day === "Sat" ? site.schedule.saturday : day === "Sun" ? null : site.schedule.weekday;
  return !!range && hour >= range[0] && hour < range[1];
}

const noop = () => () => {};

/** "Open now" pill computed in Raleigh's time zone on the visitor's device (a placeholder during prerender). */
export function OpenNow() {
  const open = useSyncExternalStore(noop, isOpen, () => null);

  if (open === null) return <span className="inline-block h-7" aria-hidden="true" />;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${open ? "bg-[#dcefe3] text-[#1d5e36]" : "bg-cream-2 text-muted"}`}>
      <span className={`h-2 w-2 rounded-full ${open ? "bg-[#2f8a52]" : "bg-muted"}`} />
      {open ? "Open now · phones answered" : "Closed now · emergency line open 24/7"}
    </span>
  );
}
