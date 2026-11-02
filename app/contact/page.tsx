import { site } from "@/content/site";
import { Container, PageHero, PhoneIcon } from "@/components/ui";
import { OpenNow } from "@/components/OpenNow";
import { pageMeta } from "@/lib/seo";
import { RequestForm } from "./RequestForm";

export const metadata = pageMeta({
  title: "Request service",
  description: "Book an AC or heating repair, a maintenance visit or a free estimate for a new system. Same-day visits for morning bookings.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Request service" title="Tell us what's going on." intro="Morning requests usually get a same-day visit. For anything urgent, calling is fastest." />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.7fr]">
        <RequestForm />
        <aside className="space-y-6">
          <div className="rounded-2xl bg-teal p-6 text-cream">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cream-2">Fastest</p>
            <a href={site.phoneHref} className="mt-2 flex min-h-11 items-center gap-2 font-display text-3xl font-bold hover:text-copper">
              <PhoneIcon className="h-7 w-7" /> {site.phone}
            </a>
            <p className="mt-2 text-cream-2">Emergency line answered 24/7.</p>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6">
            <OpenNow />
            <ul className="mt-4 space-y-3">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                  <span className="font-semibold">{h.days}</span>
                  <span className="text-right text-muted">{h.close ? `${h.open} – ${h.close}` : h.open}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted">
            Email: <span className="select-all font-semibold text-ink">{site.email}</span>
          </p>
        </aside>
      </Container>
    </>
  );
}
