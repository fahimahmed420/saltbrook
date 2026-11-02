/**
 * Saltbrook Heating & Air is a fictional company created by Zordev as a portfolio demo.
 * Names, figures and reviews are invented. Phone numbers use the reserved 555-01xx range.
 */

export const site = {
  name: "Saltbrook Heating & Air",
  shortName: "Saltbrook",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltbrook.zordev.com",
  caseStudyUrl: process.env.NEXT_PUBLIC_CASE_STUDY_URL ?? "https://www.zordev.com/work/saltbrook-heating-and-air",
  tagline: "Heating and cooling for the Triangle, done right the first time.",
  description:
    "Raleigh heating and air conditioning: same-day AC and heat pump repair, new system installs with written options, and the Comfort Club maintenance plan. Serving Raleigh, Durham, Cary, Apex and Wake Forest.",
  phone: "(919) 555-0142",
  phoneHref: "tel:+19195550142",
  email: "service@saltbrook-demo.example",
  city: "Raleigh",
  region: "NC",
  founded: 2009,
  hours: [
    { days: "Monday – Friday", time: "7:00 am – 7:00 pm" },
    { days: "Saturday", time: "8:00 am – 2:00 pm" },
    { days: "Sunday", time: "Emergency calls only" },
  ],
  schedule: { weekday: [7, 19], saturday: [8, 14] } as const,
  stats: [
    { value: 16, suffix: "", label: "years in the Triangle" },
    { value: 9800, suffix: "+", label: "homes serviced" },
    { value: 92, suffix: "%", label: "fixed on the first visit" },
    { value: 4.9, suffix: "", label: "average review score", decimals: 1 },
  ],
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/comfort-club", label: "Comfort Club" },
  { href: "/service-area", label: "Service area" },
  { href: "/about", label: "About" },
];

export type Service = {
  id: string;
  name: string;
  nav: string;
  short: string;
  body: string;
  signs: string[];
  included: string[];
  price: string;
  priceNote: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "ac-repair",
    name: "Air conditioning repair",
    nav: "AC repair",
    short: "Same-day diagnosis when the house won't cool down.",
    body: "Most summer breakdowns come down to a failed capacitor, a frozen coil or a refrigerant leak. Our vans carry the common parts, so most repairs are finished on the first visit, with the price agreed before any work starts.",
    signs: ["Warm air from the vents", "Outdoor unit humming but the fan won't spin", "Ice on the copper lines", "Water pooling around the indoor unit"],
    included: ["Full system diagnosis", "Written price before work starts", "Common parts carried on every van", "1-year warranty on repairs"],
    price: "$89",
    priceNote: "diagnostic visit, credited to the repair",
    image: "/images/heatpump-garden.jpg",
    imageAlt: "Outdoor heat pump unit beside a brick home",
  },
  {
    id: "heating",
    name: "Heating & heat pump repair",
    nav: "Heating repair",
    short: "Heat pumps and gas furnaces, fixed before the cold sets in.",
    body: "Heat pumps do most of the work in the Triangle, with gas furnaces in older homes. We repair both, check for carbon monoxide on every gas visit, and tell you straight when a repair isn't worth it.",
    signs: ["System runs but the house stays cold", "Burning smell or a clicking that won't stop", "Heat pump stuck in defrost", "Energy bill jumped without a reason"],
    included: ["Heat pumps, gas and electric furnaces", "Carbon monoxide test on gas systems", "Repair-or-replace advice with both prices", "1-year warranty on repairs"],
    price: "$89",
    priceNote: "diagnostic visit, credited to the repair",
    image: "/images/fireplace.jpg",
    imageAlt: "Warm fire glowing in a brick fireplace",
  },
  {
    id: "installation",
    name: "New system installation",
    nav: "New systems",
    short: "Right-sized installs with three written options.",
    body: "An oversized system short-cycles and leaves the house clammy; an undersized one never catches up in August. Every install starts with a room-by-room load calculation, then three written options so you can compare like for like.",
    signs: ["System is 12+ years old", "Repairs two summers in a row", "Rooms that never feel comfortable", "Moving from oil or old electric heat"],
    included: ["Room-by-room load calculation", "Good, better and best options in writing", "Permit, install and inspection handled", "10-year parts and labor warranty"],
    price: "Free",
    priceNote: "in-home estimate, usually within 48 hours",
    image: "/images/install-house.jpg",
    imageAlt: "Modern home with a new heat pump installed beside the entrance",
  },
  {
    id: "maintenance",
    name: "Tune-ups & maintenance",
    nav: "Tune-ups",
    short: "Two visits a year that keep small problems small.",
    body: "A spring cooling check and a fall heating check: coils cleaned, refrigerant and electrical tested, drains cleared, and a written report with photos. Join the Comfort Club and you also get priority booking and 15% off repairs.",
    signs: ["No service in the last 12 months", "Filters you can't remember changing", "Uneven temperatures between floors", "Rising summer power bills"],
    included: ["21-point inspection with photo report", "Coil and drain cleaning", "Electrical and refrigerant checks", "Filter replacement included"],
    price: "$129",
    priceNote: "single tune-up, or $19/month in the Comfort Club",
    image: "/images/thermostat-hand.jpg",
    imageAlt: "Hand adjusting a modern wall thermostat",
  },
];

export const club = {
  price: 19,
  annual: 199,
  perks: [
    { title: "Two tune-ups a year", body: "Spring cooling and fall heating checks, with a photo report after each one." },
    { title: "Priority booking", body: "Members go to the front of the line during heat waves and cold snaps." },
    { title: "15% off every repair", body: "Parts and labor, on any system in your home." },
    { title: "No overtime fees", body: "Evenings and Saturdays cost the same as a Tuesday morning." },
    { title: "Repair-cost cap", body: "If a repair costs more than $1,500, your membership fees come off a new system." },
    { title: "Cancel any time", body: "No contracts. Stop with one phone call or email." },
  ],
};

export const areas = [
  { name: "Raleigh", note: "Our home base. Most repair visits within 90 minutes.", eta: "Same day" },
  { name: "Cary", note: "Including Morrisville and west Cary.", eta: "Same day" },
  { name: "Apex", note: "Including Holly Springs on request.", eta: "Same day" },
  { name: "Durham", note: "Downtown, Southpoint and north to the Eno.", eta: "Next morning" },
  { name: "Wake Forest", note: "Including Rolesville and Heritage.", eta: "Next morning" },
];

export const visitSteps = [
  { title: "Book in a minute", body: "Call, or pick a time online. Morning bookings usually get a same-day visit." },
  { title: "We text when we're close", body: "You get the technician's name, photo and a live arrival window." },
  { title: "Diagnosis and a written price", body: "We find the cause and show you the price before we pick up a tool." },
  { title: "Fixed, cleaned up, explained", body: "We test everything, tidy up, and walk you through what we did." },
];

export const reviews = [
  { quote: "Came out the same afternoon in the middle of July, found a dead capacitor and had the AC running in forty minutes. The price was exactly what they quoted on the phone.", name: "Marissa T.", place: "North Raleigh", service: "AC repair" },
  { quote: "They talked us out of replacing a nine-year-old heat pump. Fixed the reversing valve instead and it has run perfectly for two winters.", name: "Devon & Kim R.", place: "Cary", service: "Heat pump repair" },
  { quote: "Three clear written options for the new system, zero pressure, and they handled the county inspection. Upstairs finally stays cool.", name: "Alan P.", place: "Apex", service: "New system" },
  { quote: "The Comfort Club paid for itself the first summer. Priority booking during the heat wave was worth it on its own.", name: "Jasmine W.", place: "Wake Forest", service: "Comfort Club" },
  { quote: "Technician texted a photo before arriving, wore shoe covers and showed me the burnt contactor. Professional from start to finish.", name: "Greg H.", place: "Durham", service: "AC repair" },
];

export const faqs = [
  { q: "How fast can you come out?", a: "Requests made before noon on a weekday usually get a same-day visit in Raleigh, Cary and Apex. Durham and Wake Forest are usually next morning. Comfort Club members go to the front of the line." },
  { q: "Do you charge for a quote?", a: "Estimates for new systems are free. Repair visits have an $89 diagnostic fee, which comes off the repair if you go ahead." },
  { q: "Repair or replace: how do you decide?", a: "If a system is over 12 years old and the repair costs more than a third of a replacement, we show you both prices and let you decide. Most of the time, repair wins." },
  { q: "Do you offer financing?", a: "Yes. New systems can be spread over 12 to 60 months, including 0% options for 12 months on approved credit. Ask for both prices so you can compare." },
  { q: "Do you work on all brands?", a: "Yes. We service every major brand of heat pump, furnace, central AC and ductless mini-split." },
  { q: "Are your technicians licensed?", a: "Every technician is licensed, background-checked and trained on both heat pumps and gas systems. We pull permits on every installation." },
];

export const credits = [
  { what: "Family on the sofa", who: "Vitaly Gariev" },
  { what: "Technician with tool belt", who: "Kevin Grieve" },
  { what: "Technician portrait", who: "Iain Feeney" },
  { what: "Technician at work", who: "Raze Solar" },
  { what: "Heat pumps and modern home", who: "alpha innotec" },
  { what: "Thermostat (wall)", who: "HUUM" },
  { what: "Thermostat (round)", who: "Dan LeFebvre" },
  { what: "Home with porch", who: "Christian McMenamy" },
  { what: "Blue two-story home", who: "Idean Azad" },
  { what: "Living room", who: "Clay Banks" },
  { what: "Service van", who: "Autotrader UK" },
  { what: "Fireplace", who: "Adhirej J R Nair" },
];
