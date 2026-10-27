"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PackageCard from "./PackageCard";
import type { TravelPackage } from "@/data/packages";

type Tab = "All" | "India" | "International";

export default function PackageGrid({ items, showTag = true, tabs = true }: { items: TravelPackage[]; showTag?: boolean; tabs?: boolean }) {
  const [tab, setTab] = useState<Tab>("All");
  const reduce = useReducedMotion();
  const list = useMemo(() => (tab === "All" ? items : items.filter((p) => p.region === tab)), [items, tab]);
  const available = (t: Tab) => t === "All" || items.some((p) => p.region === t);

  return (
    <div className="flex flex-col gap-7">
      {tabs && (
        <div role="tablist" aria-label="Filter packages" className="flex flex-wrap gap-2">
          {(["All", "India", "International"] as Tab[]).filter(available).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${
                tab === t ? "bg-ink text-white" : "border-[1.5px] border-line-strong bg-white text-ink hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <motion.div layout={!reduce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.05 }}
              className="flex"
            >
              <div className="flex w-full flex-col [&>article]:flex-1">
                <PackageCard p={p} showTag={showTag} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
