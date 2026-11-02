import { ogImage, ogSize } from "@/lib/og";

export const alt = "Saltbrook Heating & Air";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Raleigh heating & cooling", "Comfort you can count on, every season.");
}
