/**
 * Saltbrook Heating & Air is a fictional company created by Zordev as a portfolio demo.
 * Every name, number and review here is invented. Phone numbers use the reserved 555-01xx range.
 */

export const site = {
  name: "Saltbrook Heating & Air",
  shortName: "Saltbrook",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltbrook.zordev.com",
  caseStudyUrl: process.env.NEXT_PUBLIC_CASE_STUDY_URL ?? "https://www.zordev.com/work/saltbrook-heating-and-air",
  tagline: "Heating and cooling for the Triangle, done right the first time.",
  description:
    "Fictional HVAC contractor in Raleigh, NC: AC repair, heating, installation and maintenance plans across Raleigh, Durham, Cary, Apex and Wake Forest. A portfolio demo by Zordev.",
  phone: "(919) 555-0142",
  phoneHref: "tel:+19195550142",
  email: "service@example.com",
  city: "Raleigh",
  region: "NC",
  founded: 2009,
  // Mon–Fri 7–19, Sat 8–14, emergency line 24/7. Times are America/New_York.
  hours: [
    { days: "Monday – Friday", open: "7:00 am", close: "7:00 pm" },
    { days: "Saturday", open: "8:00 am", close: "2:00 pm" },
    { days: "Sunday", open: "Emergency calls only", close: "" },
  ],
  schedule: { weekday: [7, 19], saturday: [8, 14] } as const,
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Request service" },
];

export type Service = { id: string; name: string; short: string; body: string; points: string[]; from: string };

export const services: Service[] = [
  {
    id: "ac-repair",
    name: "AC repair",
    short: "Same-day diagnosis when the house gets hot.",
    body: "Most summer breakdowns come down to a failed capacitor, a frozen coil or low refrigerant. We find the cause, give you a price before any work starts, and carry common parts on every van.",
    points: ["Same-day visits booked before noon", "Price agreed before work starts", "Common parts carried on every van"],
    from: "$89 diagnostic, credited to the repair",
  },
  {
    id: "heating",
    name: "Heating repair",
    short: "Furnaces and heat pumps, gas or electric.",
    body: "Heat pumps do most of the work in the Triangle, with gas furnaces in older homes. We repair both, check carbon monoxide on every gas visit, and tell you straight when a repair isn't worth it.",
    points: ["Heat pumps and gas furnaces", "Carbon monoxide check on every gas visit", "Honest repair-or-replace advice"],
    from: "$89 diagnostic, credited to the repair",
  },
  {
    id: "installation",
    name: "New systems",
    short: "Right-sized installs with a written load calculation.",
    body: "An oversized system short-cycles and leaves the house clammy. We size every install with a room-by-room load calculation, quote three options in writing, and handle the permit and inspection.",
    points: ["Room-by-room load calculation", "Three written options, no pressure", "Permit and inspection handled"],
    from: "Free in-home estimate",
  },
  {
    id: "maintenance",
    name: "Maintenance plan",
    short: "Two tune-ups a year and priority booking.",
    body: "A spring cooling check and a fall heating check, priority scheduling when the weather turns, and 10% off repairs. Cancel any time.",
    points: ["Spring and fall tune-ups", "Priority booking in heat waves", "10% off repairs, cancel any time"],
    from: "$16 a month",
  },
];

export const areas = [
  { name: "Raleigh", note: "Home base. Most visits within 90 minutes." },
  { name: "Durham", note: "Downtown, Southpoint and north to the Eno." },
  { name: "Cary", note: "Including Morrisville and west Cary." },
  { name: "Apex", note: "Including Holly Springs on request." },
  { name: "Wake Forest", note: "Including Rolesville and Heritage." },
];

export const faqs = [
  {
    q: "How fast can you come out?",
    a: "Calls booked before noon on a weekday usually get a same-day visit in Raleigh, Cary and Apex. Durham and Wake Forest are usually next morning.",
  },
  {
    q: "Do you charge for a quote?",
    a: "Estimates for new systems are free. Repair visits have an $89 diagnostic fee, which comes off the repair if you go ahead.",
  },
  {
    q: "Repair or replace: how do you decide?",
    a: "If a system is over 12 years old and the repair costs more than a third of a replacement, we'll show you both prices and let you decide. Most of the time, repair wins.",
  },
  {
    q: "Do you work on all brands?",
    a: "Yes. We service every major brand of heat pump, furnace and central AC.",
  },
];

// Sample reviews: invented for the demo and labelled as such on the page. No rating schema.
export const reviews = [
  { quote: "Came out the same afternoon in July, found a dead capacitor, and had the AC running in forty minutes. Price was exactly what they said on the phone.", name: "Sample review", place: "Raleigh" },
  { quote: "They talked us out of replacing a nine-year-old heat pump. Fixed the reversing valve instead and it has run fine for two winters.", name: "Sample review", place: "Cary" },
  { quote: "Clear written options for the new system, no upsell, and they handled the inspection. The house finally cools evenly upstairs.", name: "Sample review", place: "Apex" },
];
