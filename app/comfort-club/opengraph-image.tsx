import { ogImage, ogSize } from "@/lib/og";

export const alt = "Saltbrook Comfort Club";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Comfort Club", "Two tune-ups a year, priority when it counts.");
}
