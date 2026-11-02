import { ogImage, ogSize } from "@/lib/og";

export const alt = "Saltbrook service area";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Service area", "Five towns, one van ride away.");
}
