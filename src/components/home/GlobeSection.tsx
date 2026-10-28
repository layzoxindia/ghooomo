"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import DotGlobe from "./DotGlobe";
import { ArrowIcon } from "../Icons";
import { useLocalTime, useOffsetFromIST } from "@/lib/geo";

export type GlobePoint = { slug: string; place: string; coords: [number, number]; timeZone: string; region: "India" | "International" };

function Row({ p, active, onFocus }: { p: GlobePoint; active: boolean; onFocus: () => void }) {
  const time = useLocalTime(p.timeZone);
  const off = useOffsetFromIST(p.timeZone);
  return (
    <li>
      <Link
        href={`/packages/${p.slug}`}
        onMouseEnter={onFocus}
        onFocus={onFocus}
        className={`grid grid-cols-[1fr_auto] items-center gap-3 border-t border-white/12 py-3 transition-colors ${active ? "text-white" : "text-on-night hover:text-white"}`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className={`h-2 w-2 shrink-0 rounded-full transition-all ${active ? "scale-150 bg-ring-1" : "bg-white/40"}`} aria-hidden="true" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[17px] font-semibold">{p.place}</span>
            <span className="tabular text-[14px] font-medium text-white/65">{off || "\u00A0"}</span>
          </span>
        </span>
        <span className="tabular whitespace-nowrap text-[16px] font-semibold">{time}</span>
      </Link>
    </li>
  );
}

/** Dark "control room" section: a WebGL globe that turns to whichever journey you point at. */
export default function GlobeSection({ points }: { points: GlobePoint[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [spin, setSpin] = useState(true);
  const lngLat = useMemo(() => points.map((p) => [p.coords[1], p.coords[0]] as [number, number]), [points]);

  const focus = (n: number) => {
    setActive(n);
    setSpin(false);
  };

  const intl = points.filter((p) => p.region === "International");
  const india = points.filter((p) => p.region === "India");

  return (
    <section className="tech-grid relative overflow-hidden bg-night py-24 text-white sm:py-32" onMouseLeave={() => setSpin(true)}>
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ring-3/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-ring-1/15 blur-[120px]" aria-hidden="true" />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <p className="kicker text-ring-2">02 · From Delhi to the world</p>
            <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[1.04]">One planner, watching every time zone you travel through.</h2>
            <p className="max-w-[540px] text-[18px] text-on-night">
              Point at a journey to see where it is and what time it is there right now. Your planner works on your clock and theirs, so transfers, check-ins and calls line up.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {[{ t: "Abroad", list: intl, start: 0 }, { t: "India", list: india, start: intl.length }].map((g) => (
              <div key={g.t}>
                <p className="kicker mb-1 text-white/70">{g.t}</p>
                <ul>
                  {g.list.map((p, n) => (
                    <Row key={p.slug} p={p} active={active === g.start + n} onFocus={() => focus(g.start + n)} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link href="/packages" className="btn btn-ghost self-start">See every journey <ArrowIcon /></Link>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <div className="absolute inset-[6%] rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute inset-[16%] rounded-full border border-dashed border-white/10" aria-hidden="true" />
          <DotGlobe points={lngLat} active={active} spin={spin} />
          <p className="tabular absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold text-on-night backdrop-blur">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ring-1 align-middle" aria-hidden="true" />
            {points[active].place}
          </p>
        </div>
      </div>
    </section>
  );
}
