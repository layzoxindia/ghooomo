"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import PackageCard from "./PackageCard";
import type { TravelPackage } from "@/data/packages";
import { segments, type Segment } from "@/lib/site";

export default function PackageFinder({ items: packages }: { items: TravelPackage[] }) {
  const destinations = Array.from(new Set(packages.map((p) => p.destination)));
  const sp = useSearchParams();
  const router = useRouter();
  const type = (sp.get("type") || "") as Segment | "";
  const dest = sp.get("dest") || "";
  const budget = Number(sp.get("budget") || 0);
  const region = sp.get("region") || "";

  const set = (k: string, v: string) => {
    const q = new URLSearchParams(sp.toString());
    if (v) q.set(k, v);
    else q.delete(k);
    router.replace(`/packages${q.size ? `?${q}` : ""}`, { scroll: false });
  };

  const list = useMemo(
    () =>
      packages.filter(
        (p) =>
          (!type || p.segment === type) &&
          (!dest || p.destination === dest) &&
          (!budget || p.price <= budget) &&
          (!region || p.region === region),
      ),
    [packages, type, dest, budget, region],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-3 rounded-[24px] border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="label" htmlFor="pf-type">Travelling as</label>
          <select id="pf-type" className="field" value={type} onChange={(e) => set("type", e.target.value)}>
            <option value="">Anyone</option>
            {(Object.keys(segments) as Segment[]).map((s) => <option key={s} value={s}>{segments[s].label}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pf-dest">Destination</label>
          <select id="pf-dest" className="field" value={dest} onChange={(e) => set("dest", e.target.value)}>
            <option value="">Anywhere</option>
            {destinations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pf-region">India or abroad</label>
          <select id="pf-region" className="field" value={region} onChange={(e) => set("region", e.target.value)}>
            <option value="">Both</option>
            <option value="India">India</option>
            <option value="International">International</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pf-budget">Budget per person</label>
          <select id="pf-budget" className="field" value={budget ? String(budget) : ""} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Any budget</option>
            <option value="15000">Under ₹15,000</option>
            <option value="30000">Under ₹30,000</option>
            <option value="60000">Under ₹60,000</option>
          </select>
        </div>
      </div>

      <p className="text-[15px] font-semibold text-subtle" aria-live="polite">
        {list.length} {list.length === 1 ? "package" : "packages"} found
      </p>

      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[24px] border border-line bg-white p-8">
          <h2 className="text-2xl text-ink">Nothing matches — yet.</h2>
          <p className="text-muted">We plan custom trips too. Tell us what you have in mind and a planner will build it.</p>
          <button type="button" onClick={() => router.replace("/packages")} className="btn border-2 border-ink text-ink">Clear filters</button>
        </div>
      )}
    </div>
  );
}
