"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowIcon } from "../Icons";
import { segments, type Segment } from "@/lib/site";

export type RailItem = {
  slug: string;
  title: string;
  country: string;
  region: "India" | "International";
  nights: number;
  days: number;
  bestTime: string;
  idealFor: Segment[];
  photo: string;
  alt: string;
};

function Card({ p, index }: { p: RailItem; index: number }) {
  return (
    <Link
      href={`/packages/${p.slug}`}
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[28px] bg-night text-white"
    >
      <Image
        src={p.photo}
        alt={p.alt}
        fill
        sizes="(max-width: 768px) 85vw, 34vw"
        quality={72}
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" aria-hidden="true" />
      <span className="absolute left-5 top-5 flex items-center gap-2">
        <span className="tabular rounded-full bg-night/70 px-3 py-1.5 text-[14px] font-semibold backdrop-blur-md">{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full bg-night/70 px-3 py-1.5 text-[14px] font-semibold backdrop-blur-md">{p.nights} nights</span>
      </span>
      <span className="relative flex flex-col gap-3 p-6 sm:p-7">
        <span className="kicker truncate text-ring-2">{p.country}</span>
        <span className="text-[26px] font-bold leading-[1.12] sm:text-[30px]">{p.title}</span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] font-medium text-on-night">
          <span>Best {p.bestTime.replace(/ \(.*\)$/, "")}</span>
          <span className="flex items-center gap-1.5" aria-label={`Suits ${p.idealFor.map((s) => segments[s].label).join(", ")}`}>
            {p.idealFor.map((s) => (
              <span key={s} className="h-2.5 w-2.5 rounded-full" style={{ background: segments[s].color }} />
            ))}
          </span>
        </span>
        <span className="mt-1 flex items-center gap-2 text-[15px] font-bold">
          View journey
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-1">
            <ArrowIcon size={16} />
          </span>
        </span>
      </span>
    </Link>
  );
}

/**
 * Desktop: the section pins while you scroll and the journeys slide past sideways.
 * Phones and reduced motion: a normal swipeable row.
 */
export default function JourneyRail({ items }: { items: RailItem[] }) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"International" | "India">("International");
  const list = items.filter((p) => p.region === tab);
  const count = list.length;

  const outer = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const isDesk = window.matchMedia("(min-width: 1024px)").matches;
      setDesktop(isDesk);
      // Width of the row worked out from the card size, so it is known before the row renders.
      const vw = window.innerWidth;
      const card = Math.min(vw * 0.34, 460);
      const pad = Math.max(28, (vw - 1240) / 2 + 28);
      const row = pad + count * card + (count - 1) * 24 + pad;
      setDistance(Math.max(0, row - vw));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  const pinned = desktop && !reduce && distance > 0;
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  const header = (
    <div className="wrap flex flex-wrap items-end justify-between gap-6">
      <div className="flex max-w-[680px] flex-col gap-4">
        <p className="kicker text-solo-text">01 · Journeys</p>
        <h2 className="text-[clamp(38px,4.8vw,68px)] leading-[1.02] text-ink">Where we’ll take you</h2>
        <p className="text-[18px] text-muted">
          A short list, chosen on purpose. Every journey here is one we plan often, with hotels and local partners we know well.
        </p>
      </div>
      <div role="tablist" aria-label="India or abroad" className="flex rounded-full border border-line-strong bg-white p-1">
        {(["International", "India"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${tab === t ? "bg-ink text-white" : "text-ink hover:bg-paper"}`}
          >
            {t === "International" ? "Abroad" : "India"}
          </button>
        ))}
      </div>
    </div>
  );

  if (!pinned) {
    return (
      <section id="journeys" className="scroll-mt-20 py-24 sm:py-32">
        {header}
        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-7 lg:px-[max(28px,calc((100vw-1240px)/2+28px))]">
          {list.map((p, n) => (
            <li key={p.slug} className="h-[480px] w-[84vw] shrink-0 snap-start sm:h-[540px] sm:w-[420px]">
              <Card p={p} index={n} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="journeys" ref={outer} className="relative scroll-mt-0" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-16">
        {header}
        <motion.ul style={{ x }} className="flex gap-6 px-[max(28px,calc((100vw-1240px)/2+28px))]">
          {list.map((p, n) => (
            <li key={p.slug} className="h-[min(56vh,560px)] w-[min(34vw,460px)] shrink-0">
              <Card p={p} index={n} />
            </li>
          ))}
        </motion.ul>
        <div className="wrap">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
            <motion.div className="ring-gradient h-full origin-left" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
