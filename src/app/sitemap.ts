import type { MetadataRoute } from "next";
import { packages } from "@/data/packages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/solo", "/couple", "/group", "/packages", "/about", "/contact", "/privacy", "/terms", "/cancellation-policy", "/data-request"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...packages.map((p) => ({ url: `${base}/packages/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
