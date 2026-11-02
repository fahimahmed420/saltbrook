"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { bookingSchema, dateLabel, formatPhone, serviceLabel, type BookingField } from "@/lib/booking";

export type BookingResult =
  | { ok: true; ref: string; delivered: boolean }
  | { ok: false; message: string; errors?: Partial<Record<BookingField, string>> };

// Small in-memory limiter: 5 bookings per IP per 10 minutes (per server instance).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitBooking(input: unknown, honeypot: string): Promise<BookingResult> {
  const ref = `SB-${Date.now().toString(36).slice(-5).toUpperCase()}`;
  if (honeypot) return { ok: true, ref, delivered: false }; // quietly drop bots

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  if (limited(ip)) return { ok: false, message: "Too many requests from this connection. Please call us instead." };

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Partial<Record<BookingField, string>> = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as BookingField] ??= issue.message;
    return { ok: false, message: "Please check the highlighted fields.", errors };
  }
  const b = parsed.data;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  if (!key || !to) {
    // Not configured: allowed while developing, never silently in production.
    if (process.env.NODE_ENV !== "production") {
      console.info("[booking] email not configured; booking received:", ref, b);
      return { ok: true, ref, delivered: false };
    }
    return { ok: false, message: "Online booking is unavailable right now. Please call us and we'll book you in." };
  }

  const rows: [string, string][] = [
    ["Reference", ref],
    ["Service", serviceLabel(b.service)],
    ["Day", dateLabel(b.date)],
    ["Time window", b.window],
    ["Name", b.name],
    ["Phone", formatPhone(b.phone)],
    ["Email", b.email || "—"],
    ["Address", `${b.address}, ${b.zip}`],
    ["Comfort Club member", b.member ? "Yes" : "No"],
    ["Notes", b.notes || "—"],
  ];
  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px"><h2 style="color:#0c3b39;margin:0 0 4px">New booking request</h2><p style="color:#586663;margin:0 0 16px">Saltbrook Heating &amp; Air · ${esc(ref)}</p><table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;color:#586663;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#17201f;font-weight:600">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table></div>`;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || "Saltbrook bookings <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: b.email || undefined,
      subject: `Booking ${ref}: ${serviceLabel(b.service)}, ${dateLabel(b.date)} ${b.date === "asap" ? "" : b.window}`.trim(),
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });
    if (error) throw new Error(error.message);
    return { ok: true, ref, delivered: true };
  } catch (e) {
    console.error("[booking] send failed", e);
    return { ok: false, message: "We couldn't send your request just now. Please try again in a minute, or call us." };
  }
}
