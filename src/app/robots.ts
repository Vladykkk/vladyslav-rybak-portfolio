import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

// Only production is indexable; previews and local builds disallow everything.
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production")
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
