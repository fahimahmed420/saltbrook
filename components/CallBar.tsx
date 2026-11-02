import Link from "next/link";
import { site } from "@/content/site";
import { PhoneIcon } from "./ui";

/** Sticky mobile action bar: the two things a homeowner with a broken AC wants. */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-[max(0.75rem,env(safe-area-inset-left,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal font-semibold text-cream">
          <PhoneIcon /> Call now
        </a>
        <Link href="/contact" className="flex min-h-12 items-center justify-center rounded-lg bg-copper font-semibold text-white">
          Book a visit
        </Link>
      </div>
    </div>
  );
}
