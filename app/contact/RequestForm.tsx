"use client";

import { useActionState } from "react";
import { requestService, type RequestState } from "./actions";

const input =
  "mt-1.5 block w-full rounded-lg border-2 border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-teal focus:outline-none aria-[invalid=true]:border-copper";

export function RequestForm() {
  const [state, action, pending] = useActionState<RequestState, FormData>(requestService, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border-2 border-teal bg-paper p-8">
        <p className="font-display text-3xl font-bold text-teal">Thanks, {state.firstName}. We&apos;ve got it.</p>
        <p className="mt-3 text-lg text-muted">On a real Saltbrook site, a dispatcher would call you back within 30 minutes during business hours.</p>
        <p className="mt-4 rounded-lg bg-cream-2 p-4 text-sm">
          <strong>Demo mode:</strong> this form validated your details and stopped there. Nothing was stored or sent, because Saltbrook is a fictional company.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const field = (name: keyof NonNullable<RequestState["errors"]>) => ({
    id: name,
    name,
    "aria-invalid": !!e[name],
    "aria-describedby": e[name] ? `${name}-error` : undefined,
    defaultValue: v[name],
  });
  const error = (name: keyof NonNullable<RequestState["errors"]>) =>
    e[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm font-semibold text-copper-2">
        {e[name]}
      </p>
    ) : null;

  return (
    <form action={action} noValidate className="space-y-5 rounded-2xl border border-line bg-paper p-6 sm:p-8">
      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-[#f8e3d8] p-4 font-semibold text-copper-2">
          {state.message}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold">
            Your name
          </label>
          <input {...field("name")} autoComplete="name" className={input} />
          {error("name")}
        </div>
        <div>
          <label htmlFor="phone" className="font-semibold">
            Phone
          </label>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(919) 555-0142" className={input} />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" className={input} />
          {error("email")}
        </div>
        <div>
          <label htmlFor="zip" className="font-semibold">
            ZIP code
          </label>
          <input {...field("zip")} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="27601" className={input} />
          {error("zip")}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="font-semibold">
          What do you need?
        </label>
        <select {...field("service")} defaultValue={v.service ?? ""} className={input}>
          <option value="" disabled>
            Choose one
          </option>
          {["AC repair", "Heating repair", "New system estimate", "Maintenance plan", "Something else"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {error("service")}
      </div>

      <fieldset aria-describedby={e.urgency ? "urgency-error" : undefined}>
        <legend className="font-semibold">How soon?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {["Today if possible", "This week", "Just planning ahead"].map((o) => (
            <label key={o} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 border-line bg-cream px-4 has-[:checked]:border-teal has-[:checked]:bg-paper">
              <input type="radio" name="urgency" value={o} defaultChecked={v.urgency === o} className="h-5 w-5 accent-[#0f4c4a]" />
              {o}
            </label>
          ))}
        </div>
        {error("urgency")}
      </fieldset>

      <div>
        <label htmlFor="details" className="font-semibold">
          What&apos;s happening? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea {...field("details")} rows={4} placeholder="e.g. Upstairs is 82°F, outdoor unit is humming but the fan isn't spinning." className={input} />
        {error("details")}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-copper px-6 text-lg font-semibold text-white hover:bg-copper-2 disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Request service"}
      </button>
      <p className="text-sm text-muted">Demo form: it checks your details but never sends them.</p>
    </form>
  );
}
