import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

const base = env.app.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                    lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/courses`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/videos`,        lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/notes`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/quizzes`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/tests`,         lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/login`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/register`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // TODO: fetch dynamic routes from Firestore for published courses/videos
  // const dynamicRoutes = await fetchPublishedSlugs();

  return staticRoutes;
}
