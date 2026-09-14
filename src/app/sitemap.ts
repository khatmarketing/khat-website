import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/news/") ? "monthly" : "monthly",
    priority: route === "/" ? 1 : route.includes("/services") ? 0.8 : 0.7,
  }));
}
