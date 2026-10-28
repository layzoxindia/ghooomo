"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PackageCard from "./PackageCard";
import type { TravelPackage } from "@/data/packages";
import { segments, type Segment } from "@/lib/site";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Chips<T extends string>({ label, value, options, onChange }: { label: string; value: T | ""; options: { v: T | ""; t: string; dot?: string }[]; onChange: (v: T | "") => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.v || "all"}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors ${
            value === o.v ? "bg-ink text-white" : "border-[1.5px] border-line-strong bg-white text-ink hover:border-ink"
          }`}
        >
          {o.dot && <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.dot }} aria-hidden="true" />}
          {o.t}
        </button>
      ))}
    </div>
  );
}

/** Filter journeys by who is travelling, India or abroad, and month. State lives in the URL. */
export default function PackageFinder({ items }: { items: TravelPackage[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const reduce = useReducedMotion();
  const type = (sp.get("type") || "") as Segment | "";
  const region = (sp.get("region") || "") as "India" | "International" | "";
  const month = Number(sp.get("month") || 0);
  const dest = sp.get("dest") || "";

  const set = (k: string, v: string) => {
    const q = new URLSearchParams(sp.toString());
    if (v) q.set(k, v);
    else q.delete(k);
    router.replace(`/packages${q.size ? `?${q}` : ""}`, { scroll: false });
  };

  const list = useMemo(
    () =>
      items.filter(
        (p) =>
          (!type || p.idealFor.includes(type)) &&
          (!region || p.region === region) &&
          (!month || p.months.includes(month)) &&
          (!dest || p.destination === dest),
      ),
    [items, type, region, month, dest],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 rounded-[26px] border border-line bg-white p-5 sm:p-6 lg:grid-cols-[auto_auto_1fr] lg:items-end lg:gap-8">
        <div className="flex flex-col gap-2">
          <span className="label !mb-0">Who’s travelling</span>
          <Chips
            label="Who's travelling"
            value={type}
            onChange={(v) => set("type", v)}
            options={[{ v: "", t: "Everyone" }, ...(Object.keys(segments) as Segment[]).map((s) => ({ v: s, t: segments[s].label, dot: segments[s].color }))]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="label !mb-0">Where</span>
          <Chips
            label="India or abroad"
            value={region}
            onChange={(v) => set("region", v)}
            options={[{ v: "", t: "Everywhere" }, { v: "International", t: "Abroad" }, { v: "India", t: "India" }]}
          />
        </div>
        <div className="flex flex-col gap-2 lg:max-w-[260px]">
          <label className="label !mb-0" htmlFor="pf-month">When</label>
          <select id="pf-month" className="field" value={month || ""} onChange={(e) => set("month", e.target.value)}>
            <option value="">Any month</option>
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </div>
      </div>

      <div id="results" className="flex scroll-mt-28 flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="text-[17px] font-semibold text-muted">
          {list.length} {list.length === 1 ? "holiday" : "holidays"}
          {month ? ` in season in ${MONTHS[month - 1]}` : ""}
          {dest ? ` in ${dest}` : ""}
        </p>
        {(type || region || month || dest) && (
          <button type="button" onClick={() => router.replace("/packages", { scroll: false })} className="min-h-11 text-[15px] font-semibold text-ink underline underline-offset-4">
            Clear filters
          </button>
        )}
      </div>

      {list.length > 0 ? (
        <motion.ul layout={!reduce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04 }}
                className="flex [&>article]:flex-1"
              >
                <PackageCard p={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[26px] border border-line bg-white p-8">
          <h2 className="text-2xl text-ink">No trending holiday matches that yet.</h2>
          <p className="text-muted">We plan holidays worldwide. Tell us where and when in the form below.</p>
          <button type="button" onClick={() => router.replace("/packages")} className="btn border-2 border-ink text-ink">Show all holidays</button>
        </div>
      )}
    </div>
  );
}
