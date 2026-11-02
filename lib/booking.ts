import { z } from "zod";

export const SERVICE_OPTIONS = [
  { id: "ac-repair", label: "AC repair", icon: "snow" },
  { id: "heating", label: "Heating repair", icon: "flame" },
  { id: "installation", label: "New system estimate", icon: "home" },
  { id: "maintenance", label: "Tune-up / Comfort Club", icon: "thermo" },
  { id: "other", label: "Something else", icon: "wrench" },
] as const;

export const WINDOWS = ["8–10 am", "10 am–12 pm", "12–2 pm", "2–4 pm", "4–6 pm"] as const;
export const ASAP = "As soon as possible (urgent)";

const phoneDigits = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");

/** Shared by the browser (per-step checks) and the server (final check). */
export const bookingSchema = z.object({
  service: z.enum(SERVICE_OPTIONS.map((s) => s.id) as [string, ...string[]], { error: "Choose what you need help with." }),
  date: z.string().regex(/^(asap|\d{4}-\d{2}-\d{2})$/, "Choose a day."),
  window: z.string().min(1, "Choose a time window."),
  name: z.string().trim().min(2, "Enter your name so the technician knows who to ask for.").max(80),
  phone: z
    .string()
    .trim()
    .refine((v) => phoneDigits(v).length === 10, "Enter a 10-digit US phone number, like (919) 555-0142."),
  email: z.union([z.literal(""), z.email("That email doesn't look right. Leave it blank if you prefer a call.")]),
  address: z.string().trim().min(5, "Enter the street address for the visit.").max(120),
  zip: z.string().trim().regex(/^27\d{3}$/, "Enter a 5-digit Triangle ZIP code (starts with 27)."),
  notes: z.string().trim().max(1000, "Keep it under 1,000 characters.").optional().default(""),
  member: z.boolean().optional().default(false),
});

export type Booking = z.infer<typeof bookingSchema>;
export type BookingField = keyof Booking;

export const STEP_FIELDS: BookingField[][] = [["service"], ["date", "window"], ["name", "phone", "email", "address", "zip", "notes"], []];

export function formatPhone(v: string) {
  const d = phoneDigits(v);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : v;
}

export function serviceLabel(id: string) {
  return SERVICE_OPTIONS.find((s) => s.id === id)?.label ?? id;
}

export function dateLabel(date: string) {
  if (date === "asap") return ASAP;
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
