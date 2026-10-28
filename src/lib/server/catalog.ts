import "server-only";
import { packages, type TravelPackage } from "@/data/packages";
import { db } from "./db";

export type CatalogItem = TravelPackage & { active: boolean };

/** Packages with the admin's show/hide switch applied. Falls back to the built-in data. */
export async function getCatalog(includeInactive = false): Promise<CatalogItem[]> {
  const base = packages.map((p) => ({ ...p, active: true }));
  const client = db();
  if (!client) return base;
  const { data, error } = await client.from("package_overrides").select("slug, active");
  if (error || !data) return base;
  const map = new Map(data.map((o) => [o.slug as string, o as { slug: string; active: boolean }]));
  const merged = base.map((p) => {
    const o = map.get(p.slug);
    return o ? { ...p, active: o.active } : p;
  });
  return includeInactive ? merged : merged.filter((p) => p.active);
}

export async function getCatalogItem(slug: string) {
  return (await getCatalog()).find((p) => p.slug === slug);
}
