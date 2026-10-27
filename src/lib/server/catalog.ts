import "server-only";
import { packages, type TravelPackage } from "@/data/packages";
import { db } from "./db";

export type CatalogItem = TravelPackage & { active: boolean };

/** Packages with admin price/visibility overrides applied. Falls back to the built-in data. */
export async function getCatalog(includeInactive = false): Promise<CatalogItem[]> {
  const base = packages.map((p) => ({ ...p, active: true }));
  const client = db();
  if (!client) return base;
  const { data, error } = await client.from("package_overrides").select("slug, price, active");
  if (error || !data) return base;
  const map = new Map(data.map((o) => [o.slug as string, o as { slug: string; price: number | null; active: boolean }]));
  const merged = base.map((p) => {
    const o = map.get(p.slug);
    return o ? { ...p, price: o.price ?? p.price, active: o.active } : p;
  });
  return includeInactive ? merged : merged.filter((p) => p.active);
}

export async function getCatalogItem(slug: string) {
  return (await getCatalog()).find((p) => p.slug === slug);
}
