"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { segments, type Segment } from "@/lib/site";
import { packages } from "@/data/packages";

const destinations = Array.from(new Set(packages.map((p) => p.destination)));

export default function HeroSearch() {
  const router = useRouter();
  const [seg, setSeg] = useState<Segment | "">("");

  function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = new URLSearchParams();
    if (seg) q.set("type", seg);
    const dest = String(fd.get("dest") || "");
    const budget = String(fd.get("budget") || "");
    if (dest) q.set("dest", dest);
    if (budget) q.set("budget", budget);
    router.push(`/packages${q.size ? `?${q}` : ""}`);
  }

  return (
    <form onSubmit={go} className="glass grid max-w-[1080px] gap-4 rounded-[28px] p-4 sm:p-5 md:grid-cols-[1fr_1fr_auto]" aria-label="Find a holiday">
      <fieldset className="flex flex-wrap gap-2 md:col-span-3">
        <legend className="sr-only">Who is travelling?</legend>
        {(Object.keys(segments) as Segment[]).map((s) => {
          const on = seg === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={on}
              onClick={() => setSeg(on ? "" : s)}
              className={`flex min-h-11 items-center gap-2 rounded-full px-4 sm:px-5 text-[15px] font-semibold transition-colors ${
                on ? "bg-white text-ink" : "border border-white/40 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: segments[s].color }} />
              {segments[s].label}
            </button>
          );
        })}
      </fieldset>
      <div>
        <label htmlFor="hs-dest" className="label !text-white">Where to?</label>
        <select id="hs-dest" name="dest" className="field" defaultValue="">
          <option value="">Anywhere</option>
          {destinations.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="hs-budget" className="label !text-white">Budget per person</label>
        <select id="hs-budget" name="budget" className="field" defaultValue="">
          <option value="">Any budget</option>
          <option value="15000">Under ₹15,000</option>
          <option value="30000">Under ₹30,000</option>
          <option value="60000">Under ₹60,000</option>
        </select>
      </div>
      <button type="submit" className="btn min-h-[52px] self-end bg-sun text-ink hover:bg-[#F2B13A]">Show trips</button>
    </form>
  );
}
