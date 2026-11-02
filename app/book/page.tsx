import { site } from "@/content/site";
import { Container, Icon, Stars } from "@/components/ui";
import { OpenNow } from "@/components/OpenNow";
import { pageMeta } from "@/lib/seo";
import { BookingForm } from "./BookingForm";

export const metadata = pageMeta({
  title: "Book a visit online",
  description: "Book AC repair, heating repair, a tune-up or a free new-system estimate in about a minute. Same-day visits for morning bookings.",
  path: "/book",
});

export default function BookPage() {
  return (
    <section className="relative bg-gradient-to-b from-spruce-2 from-[22rem] to-linen to-[22rem] pb-20 sm:pb-28">
      <Container className="pt-12 text-paper sm:pt-16">
        <OpenNow />
        <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl">Book a visit</h1>
        <p className="mt-4 max-w-xl text-lg text-mint">Four quick steps. We&apos;ll call to confirm within 30 minutes during business hours.</p>
      </Container>
      <Container className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        <BookingForm />
        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="rounded-[2rem] bg-spruce p-7 text-paper">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Fastest for emergencies</p>
            <a href={site.phoneHref} className="mt-3 flex min-h-11 items-center gap-2 font-display text-3xl font-bold hover:text-gold">
              <Icon name="phone" className="h-7 w-7" /> {site.phone}
            </a>
            <p className="mt-2 text-mint">Answered live, 24/7.</p>
          </div>
          <div className="rounded-[2rem] bg-paper p-7 shadow-[var(--shadow-card)]">
            <ul className="space-y-4">
              {[
                ["tag", "Written price before any work starts"],
                ["clock", "Text alert when your technician is on the way"],
                ["shield", "1-year warranty on every repair"],
              ].map(([i, t]) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint text-spruce">
                    <Icon name={i} className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5 font-semibold text-spruce">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <Stars />
              <span className="text-sm text-muted">4.9 from 1,240 reviews</span>
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
