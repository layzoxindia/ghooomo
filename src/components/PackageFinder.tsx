"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import PackageCard from "./PackageCard";
import type { TravelPackage } from "@/data/packages";
import { formatINR, segments, type Segment } from "@/lib/site";
import { priceOf } from "@/lib/pricing";
import { MONTH_NAMES, seasonMonths } from "@/lib/intent";

const segmentFor = (n: number): Segment => (n <= 1 ? "solo" : n === 2 ? "couple" : "group");

export default function PackageFinder({ items: packages }: { items: TravelPackage[] }) {
  const destinations = Array.from(new Set(packages.map((p) => p.destination)));
  const sp = useSearchParams();
  const router = useRouter();
  const type = (sp.get("type") || "") as Segment | "";
  const dest = sp.get("dest") || "";
  const region = sp.get("region") || "";
  const budget = Number(sp.get("budget") || 0); // total for the whole party
  const people = Math.max(1, Number(sp.get("people") || 0) || 0);
  const month = Number(sp.get("month") || 0);
  const each = budget && people ? Math.floor(budget / people) : 0;
  const hasIntent = Boolean(budget || month || sp.get("people"));

  const set = (k: string, v: string) => {
    const q = new URLSearchParams(sp.toString());
    if (v) q.set(k, v);
    else q.delete(k);
    router.replace(`/packages${q.size ? `?${q}` : ""}`, { scroll: false });
  };

  const { fits, near } = useMemo(() => {
    const base = packages.filter(
      (p) =>
        (!type || p.segment === type) &&
        (!dest || p.destination === dest) &&
        (!region || p.region === region) &&
        (!month || seasonMonths(p.bestTime).has(month)),
    );
    const want = sp.get("people") ? segmentFor(people) : null;
    const rank = (p: TravelPackage) => (want && p.segment === want ? 0 : 1);
    const sorted = [...base].sort((a, b) => rank(a) - rank(b) || priceOf(a).total - priceOf(b).total);
    if (!each) return { fits: sorted, near: [] as TravelPackage[] };
    return {
      fits: sorted.filter((p) => priceOf(p).total <= each),
      near: sorted.filter((p) => priceOf(p).total > each && priceOf(p).total <= each * 1.25).slice(0, 3),
    };
  }, [packages, type, dest, region, month, each, people, sp]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-3 rounded-[24px] border border-line bg-white p-4 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="pf-type">Trip type</label>
          <select id="pf-type" className="field" value={type} onChange={(e) => set("type", e.target.value)}>
            <option value="">All types</option>
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
      </div>

      <div id="results" className="flex scroll-mt-28 flex-wrap items-center justify-between gap-4" aria-live="polite">
        {hasIntent ? (
          <p className="text-[18px] text-text">
            {each ? <>{formatINR(budget)} for {people} {people === 1 ? "person" : "people"} is <strong className="text-ink">{formatINR(each)} each</strong>{month ? <> in <strong className="text-ink">{MONTH_NAMES[month - 1]}</strong></> : null}. </> : month ? <>Trips in season in <strong className="text-ink">{MONTH_NAMES[month - 1]}</strong>. </> : null}
            <span className="font-semibold">{fits.length} {fits.length === 1 ? "trip fits" : "trips fit"}</span>, prices with taxes included.
          </p>
        ) : (
          <p className="text-[15px] font-semibold text-subtle">{fits.length} trips · prices per person, taxes included</p>
        )}
        {hasIntent && (
          <button type="button" onClick={() => router.replace("/packages", { scroll: false })} className="text-[15px] font-semibold text-ink underline underline-offset-4">
            Clear budget search
          </button>
        )}
      </div>

      {fits.length > 0 && (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {fits.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
      )}

      {near.length > 0 && (
        <div className="flex flex-col gap-6 border-t border-line pt-10">
          <h2 className="text-[clamp(26px,3vw,36px)] text-ink">Just over your budget</h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {near.map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </div>
      )}

      {fits.length === 0 && near.length === 0 && (
        <div className="flex flex-col items-start gap-4 rounded-[24px] border border-line bg-white p-8">
          <h2 className="text-2xl text-ink">No trip matches this yet.</h2>
          <p className="text-muted">Tell us your budget and dates in the form below, and a planner will put a trip together that fits.</p>
          <button type="button" onClick={() => router.replace("/packages")} className="btn border-2 border-ink text-ink">Show all trips</button>
        </div>
      )}
    </div>
  );
}
