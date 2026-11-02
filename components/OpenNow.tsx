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

/** "Open now" status in Raleigh's time zone, computed on the visitor's device. */
export function OpenNow({ compact = false }: { compact?: boolean }) {
  const open = useSyncExternalStore(noop, isOpen, () => null);
  if (open === null) return <span className="inline-block h-6 w-40" aria-hidden="true" />;

  if (compact)
    return (
      <span className="flex items-center gap-2">
        <span className={`relative flex h-2 w-2 ${open ? "" : "opacity-60"}`}>
          {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5fd39a] opacity-60" />}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-[#5fd39a]" : "bg-mint"}`} />
        </span>
        {open ? "Open now · phones answered live" : "After hours · emergency line open"}
      </span>
    );

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${open ? "bg-[#dcf2e6] text-[#17603a]" : "bg-sand text-muted"}`}>
      <span className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2f9a5e] opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-[#2f9a5e]" : "bg-muted"}`} />
      </span>
      {open ? "Open now · technicians on the road" : "After hours · emergency line open 24/7"}
    </span>
  );
}
