import { ogImage, ogSize } from "@/lib/og";

export const alt = "Saltbrook Heating & Air, Raleigh HVAC";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Raleigh heating & cooling", "Too hot, too cold, or too loud?");
}
