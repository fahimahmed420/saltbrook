import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "./ui";

/** Sticky phone action bar: the two things someone with a broken AC wants. */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-[max(0.75rem,env(safe-area-inset-left,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3 shadow-[0_-10px_30px_-15px_rgb(12_59_57/0.3)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-spruce font-semibold text-paper">
          <Icon name="phone" className="h-5 w-5" /> Call now
        </a>
        <Link href="/book" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper font-semibold text-white">
          <Icon name="calendar" className="h-5 w-5" /> Book online
        </Link>
      </div>
    </div>
  );
}
