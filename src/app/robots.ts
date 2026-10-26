import type { MetadataRoute } from "next";

/**
 * Robots Configuration for Search Engine Crawlers (Googlebot, Bingbot, etc.)
 *
 * NOTE: Production canonical domain is pending deployment confirmation.
 * Resolves to NEXT_PUBLIC_SITE_URL when deployed, defaulting to local host.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
