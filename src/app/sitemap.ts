import type { MetadataRoute } from "next";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/destinations", "/packages", "/solo", "/couple", "/group", "/about", "/contact", "/privacy", "/terms", "/cancellation-policy", "/data-request"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : p === "/destinations" || p === "/packages" ? 0.9 : 0.6 })),
    ...destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...packages.map((p) => ({ url: `${base}/packages/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
