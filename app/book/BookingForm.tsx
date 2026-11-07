"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui";
import { ASAP, SERVICE_OPTIONS, STEP_FIELDS, WINDOWS, bookingSchema, dateLabel, formatPhone, serviceLabel, type Booking, type BookingField } from "@/lib/booking";
import { submitBooking, type BookingResult } from "./actions";

type Draft = Omit<Booking, "notes" | "member"> & { notes: string; member: boolean };
const empty: Draft = { service: "", date: "", window: "", name: "", phone: "", email: "", address: "", zip: "", notes: "", member: false };
const STEPS = ["Service", "Time", "Your details", "Review"];

const noop = () => () => {};
const getQueryService = () => new URLSearchParams(location.search).get("service") ?? "";

/** The next 10 bookable days (no Sundays), computed on the visitor's device. */
function upcomingDays() {
  const out: { iso: string; dow: string; day: number; mon: string }[] = [];
  const d = new Date();
  if (d.getHours() >= 15) d.setDate(d.getDate() + 1); // after 3 pm, start tomorrow
  while (out.length < 10) {
    if (d.getDay() !== 0) {
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      out.push({ iso, dow: d.toLocaleDateString("en-US", { weekday: "short" }), day: d.getDate(), mon: d.toLocaleDateString("en-US", { month: "short" }) });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}
let daysCache: ReturnType<typeof upcomingDays> | null = null;
const getDays = () => (daysCache ??= upcomingDays());
const noDays: ReturnType<typeof upcomingDays> = [];

const input =
  "mt-2 block w-full rounded-2xl border-2 border-line bg-paper px-4 py-3.5 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-spruce focus:outline-none aria-[invalid=true]:border-copper";

export function BookingForm() {
  const queryService = useSyncExternalStore(noop, getQueryService, () => "");
  const days = useSyncExternalStore(noop, getDays, () => noDays);
  const [draft, setDraft] = useState<Draft>(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [result, setResult] = useState<BookingResult | null>(null);
  const [pending, start] = useTransition();
  const top = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const service = draft.service || (SERVICE_OPTIONS.some((s) => s.id === queryService) ? queryService : "");
  const data = { ...draft, service };

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  useEffect(() => {
    if (step > 0 || result) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, result]);

  const validate = (fields: BookingField[]) => {
    const res = bookingSchema.safeParse(data);
    const next: Partial<Record<BookingField, string>> = {};
    if (!res.success) for (const i of res.error.issues) if (fields.includes(i.path[0] as BookingField)) next[i.path[0] as BookingField] ??= i.message;
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"], [data-error]')?.focus());
      return false;
    }
    return true;
  };

  const next = () => validate(STEP_FIELDS[step]) && setStep((s) => s + 1);
  /** Sends the user back to the first step that has an error. */
  const showErrors = (errs: Partial<Record<BookingField, string>>) => {
    setErrors(errs);
    const first = STEP_FIELDS.findIndex((f) => f.some((k) => errs[k]));
    if (first >= 0) setStep(first);
  };
  const submit = () => {
    // Every step validated on the way here, but check once more rather than throw inside the transition.
    const parsed = bookingSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Partial<Record<BookingField, string>> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as BookingField] ??= i.message;
      return showErrors(errs);
    }
    start(async () => {
      const r = await submitBooking(parsed.data, honeypot.current?.value ?? "");
      if (!r.ok && r.errors) showErrors(r.errors);
      setResult(r);
    });
  };

  if (result?.ok) {
    return (
      <div ref={top} className="scroll-mt-32 rounded-[2rem] bg-paper p-8 shadow-[var(--shadow-lift)] sm:p-12" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-spruce">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-4xl font-extrabold text-spruce">You&apos;re booked in, {data.name.split(" ")[0]}.</h2>
        <p className="mt-3 text-lg text-muted">
          Reference <strong className="text-ink">{result.ref}</strong>. A dispatcher will call {formatPhone(data.phone)} within 30 minutes during business hours to confirm.
        </p>
        <dl className="mt-8 grid gap-4 rounded-2xl bg-linen p-6 sm:grid-cols-2">
          {[
            ["Service", serviceLabel(data.service)],
            ["When", data.date === "asap" ? ASAP : `${dateLabel(data.date)}, ${data.window}`],
            ["Address", `${data.address}, ${data.zip}`],
            ["Contact", [formatPhone(data.phone), data.email].filter(Boolean).join(" · ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{k}</dt>
              <dd className="mt-1 font-semibold text-spruce">{v}</dd>
            </div>
          ))}
        </dl>
        {!result.delivered && (
          <p className="mt-6 rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
            Preview mode: email delivery isn&apos;t configured on this server, so this request was logged instead of emailed.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-spruce px-6 font-semibold text-paper hover:bg-spruce-2">
            Back to home
          </Link>
          <Link href="/comfort-club" className="inline-flex min-h-12 items-center rounded-full border-2 border-spruce px-6 font-semibold text-spruce hover:bg-spruce hover:text-paper">
            Explore the Comfort Club
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: BookingField) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-copper-2">
        <Icon name="close" className="h-4 w-4" />
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: BookingField) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <div ref={top} className="scroll-mt-32 overflow-hidden rounded-[2rem] bg-paper shadow-[var(--shadow-lift)]">
      {/* Progress */}
      <div className="border-b border-line bg-linen/60 px-6 py-5 sm:px-10">
        <ol className="flex items-center gap-2" aria-label="Booking steps">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i < step ? "bg-spruce text-mint" : i === step ? "bg-copper text-white" : "bg-sand text-muted"
                }`}
              >
                {i < step ? <Icon name="check" className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden text-sm font-semibold sm:inline ${i === step ? "text-spruce" : "text-muted"}`}>{label}</span>
              {i < STEPS.length - 1 && <span className={`h-0.5 flex-1 rounded-full ${i < step ? "bg-spruce" : "bg-sand"}`} />}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted sm:hidden">
          Step {step + 1} of {STEPS.length}: <strong className="text-spruce">{STEPS[step]}</strong>
        </p>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) next();
          else submit();
        }}
        className="p-6 sm:p-10"
      >
        {step === 0 && (
          <fieldset className="min-w-0">
            <legend className="font-display text-3xl font-bold text-spruce">What do you need?</legend>
            <p className="mt-2 text-muted">Pick the closest match. Your technician will confirm the details.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2" data-error={errors.service ? "" : undefined} tabIndex={errors.service ? -1 : undefined}>
              {SERVICE_OPTIONS.map((s) => (
                <label
                  key={s.id}
                  className="group relative flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border-2 border-line bg-linen p-4 transition-all hover:border-spruce/40 has-[:checked]:border-copper has-[:checked]:bg-paper has-[:checked]:shadow-[var(--shadow-card)] has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-copper"
                >
                  <input type="radio" name="service" value={s.id} checked={service === s.id} onChange={() => set("service", s.id)} className="sr-only" />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-spruce text-mint transition-colors group-has-[:checked]:bg-copper group-has-[:checked]:text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-spruce">{s.label}</span>
                </label>
              ))}
            </div>
            {err("service")}
          </fieldset>
        )}

        {step === 1 && (
          <div>
            <fieldset className="min-w-0">
              <legend className="font-display text-3xl font-bold text-spruce">When suits you?</legend>
              <p className="mt-2 text-muted">Choose a day and a two-hour arrival window. We text you when the technician is on the way.</p>
              <label className="mt-6 flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 border-line bg-linen px-4 has-[:checked]:border-copper has-[:checked]:bg-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-copper">
                <input
                  type="checkbox"
                  checked={draft.date === "asap"}
                  onChange={(e) => {
                    set("date", e.target.checked ? "asap" : "");
                    set("window", e.target.checked ? ASAP : "");
                  }}
                  className="h-5 w-5 accent-[#c4622d]"
                />
                <span className="font-semibold text-spruce">It&apos;s urgent: send the first available technician</span>
              </label>
              {draft.date !== "asap" && (
                <>
                  <p className="mt-6 font-semibold text-spruce">Day</p>
                  <div className="-mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0" data-error={errors.date ? "" : undefined} tabIndex={errors.date ? -1 : undefined}>
                    {days.map((d) => (
                      <label
                        key={d.iso}
                        className="relative flex min-w-[4.75rem] shrink-0 cursor-pointer flex-col items-center rounded-2xl border-2 border-line bg-linen py-3 transition-all hover:border-spruce/40 has-[:checked]:border-copper has-[:checked]:bg-copper has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-spruce"
                      >
                        <input type="radio" name="date" value={d.iso} checked={draft.date === d.iso} onChange={() => set("date", d.iso)} className="sr-only" />
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{d.dow}</span>
                        <span className="font-display text-2xl font-extrabold">{d.day}</span>
                        <span className="text-xs opacity-80">{d.mon}</span>
                      </label>
                    ))}
                  </div>
                  {err("date")}
                  <p className="mt-6 font-semibold text-spruce">Arrival window</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5" data-error={errors.window ? "" : undefined} tabIndex={errors.window ? -1 : undefined}>
                    {WINDOWS.map((w) => (
                      <label
                        key={w}
                        className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border-2 border-line bg-linen px-2 text-center text-sm font-semibold text-spruce transition-all hover:border-spruce/40 has-[:checked]:border-spruce has-[:checked]:bg-spruce has-[:checked]:text-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-copper"
                      >
                        <input type="radio" name="window" value={w} checked={draft.window === w} onChange={() => set("window", w)} className="sr-only" />
                        {w}
                      </label>
                    ))}
                  </div>
                  {err("window")}
                </>
              )}
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <fieldset className="min-w-0">
            <legend className="font-display text-3xl font-bold text-spruce">Where and who?</legend>
            <p className="mt-2 text-muted">We only use these details to arrange and confirm your visit.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-semibold text-spruce">Full name</label>
                <input id="name" autoComplete="name" value={draft.name} onChange={(e) => set("name", e.target.value)} className={input} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="phone" className="font-semibold text-spruce">Mobile phone</label>
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(919) 555-0142" value={draft.phone} onChange={(e) => set("phone", e.target.value)} onBlur={(e) => set("phone", formatPhone(e.target.value))} className={input} {...aria("phone")} />
                {err("phone")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="font-semibold text-spruce">
                  Email <span className="font-normal text-muted">(optional, for your confirmation)</span>
                </label>
                <input id="email" type="email" inputMode="email" autoComplete="email" value={draft.email} onChange={(e) => set("email", e.target.value)} className={input} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="address" className="font-semibold text-spruce">Street address</label>
                <input id="address" autoComplete="street-address" value={draft.address} onChange={(e) => set("address", e.target.value)} className={input} {...aria("address")} />
                {err("address")}
              </div>
              <div>
                <label htmlFor="zip" className="font-semibold text-spruce">ZIP code</label>
                <input id="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="27601" value={draft.zip} onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))} className={input} {...aria("zip")} />
                {err("zip")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="font-semibold text-spruce">
                  What&apos;s happening? <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea id="notes" rows={4} placeholder="e.g. Upstairs is 82°F, the outdoor unit hums but the fan isn't spinning." value={draft.notes} onChange={(e) => set("notes", e.target.value)} className={input} {...aria("notes")} />
                {err("notes")}
              </div>
              <label className="relative flex min-h-12 cursor-pointer items-center gap-3 sm:col-span-2">
                <input type="checkbox" checked={draft.member} onChange={(e) => set("member", e.target.checked)} className="h-5 w-5 accent-[#0c3b39]" />
                <span className="text-spruce">I&apos;m a Comfort Club member</span>
              </label>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-spruce">Check and send</h2>
            <p className="mt-2 text-muted">Make sure everything looks right. You can go back to change anything.</p>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line">
              {(
                [
                  ["Service", serviceLabel(data.service), 0],
                  ["When", data.date === "asap" ? ASAP : `${dateLabel(data.date)}, ${data.window}`, 1],
                  ["Name", data.name, 2],
                  ["Phone", formatPhone(data.phone), 2],
                  ["Email", data.email || "Not provided", 2],
                  ["Address", `${data.address}, ${data.zip}`, 2],
                  ["Notes", data.notes || "None", 2],
                ] as const
              ).map(([k, v, s]) => (
                <div key={k} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-1 break-words font-semibold text-spruce">{v}</dd>
                  </div>
                  <button type="button" onClick={() => setStep(s)} className="min-h-11 shrink-0 rounded-full px-3 text-sm font-semibold text-copper hover:bg-linen">
                    Edit
                  </button>
                </div>
              ))}
            </dl>
            {result && !result.ok && (
              <p role="alert" className="mt-6 rounded-2xl bg-[#fbe7dc] p-4 font-semibold text-copper-2">
                {result.message}
              </p>
            )}
            <p className="mt-6 text-sm text-muted">
              By sending this request you agree to be contacted about your visit. See our{" "}
              <Link href="/privacy" className="font-semibold text-copper underline-offset-4 hover:underline">
                privacy notice
              </Link>
              .
            </p>
          </div>
        )}

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company website
            <input ref={honeypot} name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-5 font-semibold text-spruce hover:bg-linen">
              <Icon name="left" className="h-4 w-4" /> Back
            </button>
          ) : (
            <a href={site.phoneHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-5 font-semibold text-spruce hover:bg-linen">
              <Icon name="phone" className="h-4 w-4" /> Rather call? {site.phone}
            </a>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-copper px-8 text-lg font-semibold text-white shadow-[0_10px_24px_-10px_rgb(196_98_45/0.8)] transition-all hover:-translate-y-0.5 hover:bg-copper-2 disabled:translate-y-0 disabled:opacity-60"
          >
            {pending ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Sending…
              </>
            ) : step < 3 ? (
              <>
                Continue <Icon name="arrow" className="h-4 w-4" />
              </>
            ) : (
              <>
                Confirm booking <Icon name="check" className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
