import { site } from "@/content/site";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy notice", description: "What we collect when you book a visit, and how we use it.", path: "/privacy" });

const sections = [
  ["What we collect", "When you book online we collect your name, phone number, optional email, service address, ZIP code, preferred time and any notes you add."],
  ["How we use it", "Only to arrange, confirm and carry out your visit, and to contact you about it. We never sell or rent your details."],
  ["How long we keep it", "Booking emails are kept for up to 24 months for service history, then deleted."],
  ["Cookies and analytics", "This site sets no tracking or advertising cookies. A per-visit setting in your browser remembers if you hide the portfolio notice."],
  ["Your choices", `To see, correct or delete your details, email ${site.email} and we'll respond within 30 days.`],
  ["About this site", "Saltbrook Heating & Air is a fictional company created by Zordev as a portfolio project. Booking requests made here go to Zordev, are used only to show that the form works, and are deleted."],
];

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copper">Privacy</p>
          <h1 className="mt-3 text-5xl font-extrabold text-spruce">Privacy notice</h1>
          <p className="mt-4 text-muted">Last updated 3 November 2026</p>
          <div className="mt-10 space-y-8">
            {sections.map(([h, p]) => (
              <section key={h}>
                <h2 className="text-2xl font-bold text-spruce">{h}</h2>
                <p className="mt-2 text-lg leading-relaxed text-muted">{p}</p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
