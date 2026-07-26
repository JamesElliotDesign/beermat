import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beermat.dev";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work/quickquote`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/kickoff`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/booked`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
