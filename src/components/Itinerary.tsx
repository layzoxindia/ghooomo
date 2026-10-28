"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Day } from "@/data/packages";
import { PlusIcon } from "./Icons";

export default function Itinerary({ days, accent }: { days: Day[]; accent: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ol className="rounded-[26px] border border-line bg-white px-5 sm:px-7">
      {days.map((d, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b border-line last:border-0">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`day-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="w-[68px] shrink-0 text-[14px] font-bold tracking-[0.1em]" style={{ color: accent }}>
                  DAY {i + 1}
                </span>
                <span className="flex-1 text-[19px] font-bold text-ink sm:text-[20px]">{d.title}</span>
                <span className={`text-ink transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`day-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-0 text-[16px] text-muted sm:pl-[84px]">{d.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
