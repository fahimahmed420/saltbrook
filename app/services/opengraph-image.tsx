import { ogImage, ogSize } from "@/lib/og";

export const alt = "Saltbrook services";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Services", "Repair, replace or keep it running.");
}
