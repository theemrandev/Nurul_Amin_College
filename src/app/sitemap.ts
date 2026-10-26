import type { MetadataRoute } from "next";

/**
 * Sitemap XML Configuration for Search Engine Indexing
 *
 * NOTE: Production canonical domain is pending deployment confirmation.
 * Resolves dynamically to NEXT_PUBLIC_SITE_URL or local runtime.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const currentDate = new Date().toISOString();

  return [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}?lang=en`,
          bn: `${siteUrl}?lang=bn`,
        },
      },
    },
  ];
}
