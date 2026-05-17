import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/admin/", "/dashboard/", "/api/"],
      },
    ],
    sitemap: `${env.app.url}/sitemap.xml`,
    host:    env.app.url,
  };
}
