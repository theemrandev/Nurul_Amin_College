import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://nurul-amin-college.vercel.app');

  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/academics', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/admission', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/notice', changeFrequency: 'daily', priority: 0.95 },
    { path: '/routine', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/student-services', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/teachers', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/gallery', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/humanitarian', changeFrequency: 'monthly', priority: 0.65 },
    { path: '/sports', changeFrequency: 'monthly', priority: 0.65 },
    { path: '/tour', changeFrequency: 'monthly', priority: 0.65 },
    { path: '/credits', changeFrequency: 'yearly', priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
