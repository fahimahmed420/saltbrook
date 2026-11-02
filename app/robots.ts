import type { MetadataRoute } from "next";

// Portfolio demo: keep every crawler out. No sitemap on purpose.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
