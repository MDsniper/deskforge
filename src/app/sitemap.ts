import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://deskforge.ai";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/disclosure/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
