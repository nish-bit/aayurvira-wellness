import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aayurvirawellness.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.3
  }));
}
