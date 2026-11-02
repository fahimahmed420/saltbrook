import { ogImage, ogSize } from "@/lib/og";

export const alt = "Book a Saltbrook visit";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Book online", "Book a visit in about a minute.");
}
