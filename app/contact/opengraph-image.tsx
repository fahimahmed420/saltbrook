import { ogImage, ogSize } from "@/lib/og";

export const alt = "Request service from Saltbrook";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Request service", "Tell us what's going on.");
}
