import type { MetadataRoute } from "next";
import { categories } from "../lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) return [];

  const staticUrls = ["", "/about", "/services", "/gallery", "/contact"];
  const categoryUrls = categories.map((category) => `/projects/${category.slug}`);

  return [...staticUrls, ...categoryUrls].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const):("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.7,
  }));
}
