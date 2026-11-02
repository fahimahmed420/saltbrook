"use server";

export type RequestState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  firstName?: string;
};

type Field = "name" | "phone" | "email" | "zip" | "service" | "urgency" | "details";

const SERVICES = ["AC repair", "Heating repair", "New system estimate", "Maintenance plan", "Something else"];
const URGENCY = ["Today if possible", "This week", "Just planning ahead"];
const TRIANGLE_ZIP = /^27\d{3}$/;

/**
 * Demo mode: validates exactly like a real form, then shows the success state.
 * Nothing is stored or sent anywhere, because Saltbrook is a fictional company.
 */
export async function requestService(_prev: RequestState, formData: FormData): Promise<RequestState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    zip: get("zip"),
    service: get("service"),
    urgency: get("urgency"),
    details: get("details"),
  };

  // Honeypot: real visitors never see this field.
  if (get("company_website")) return { status: "success", firstName: "there" };

  const errors: RequestState["errors"] = {};
  if (values.name.length < 2) errors.name = "Enter your name so the technician knows who to ask for.";
  const digits = values.phone.replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1")))) errors.phone = "Enter a 10-digit US phone number, e.g. (919) 555-0142.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "That email doesn't look right. Leave it blank if you prefer a call.";
  if (!TRIANGLE_ZIP.test(values.zip)) errors.zip = "Enter a 5-digit North Carolina ZIP code starting with 27.";
  if (!SERVICES.includes(values.service)) errors.service = "Choose what you need help with.";
  if (!URGENCY.includes(values.urgency)) errors.urgency = "Choose how soon you need us.";
  if (values.details.length > 1000) errors.details = "Keep it under 1,000 characters. The technician will ask the rest.";

  if (Object.keys(errors).length) return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  return { status: "success", firstName: values.name.split(/\s+/)[0] };
}
