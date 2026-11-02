import { ogImage, ogSize } from "@/lib/og";

export const alt = "About Saltbrook";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("About", "A Raleigh crew since 2009.");
}
