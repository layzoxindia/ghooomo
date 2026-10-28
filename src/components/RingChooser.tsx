"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { segments, type Segment } from "@/lib/site";

const order: { s: Segment; dots: 1 | 2 | 3 }[] = [
  { s: "solo", dots: 1 },
  { s: "couple", dots: 2 },
  { s: "group", dots: 3 },
];

const dotPos = (n: 1 | 2 | 3): [number, number][] =>
  n === 1 ? [[0, 0]] : n === 2 ? [[-13, 0], [13, 0]] : [[0, -12], [-12, 9], [12, 9]];

/** The three logo rings, big and interactive. Each one opens its trip page. */
export default function RingChooser({ bg = "#F4F6FA" }: { bg?: string }) {
  const [hover, setHover] = useState<Segment | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="flex items-start justify-center">
      {order.map(({ s, dots }, i) => {
        const seg = segments[s];
        const dim = hover !== null && hover !== s;
        const on = hover === s;
        return (
          <motion.div
            key={s}
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="-mx-1.5 w-[118px] sm:-mx-4 sm:w-[230px]"
            style={{ zIndex: hover === s ? 3 : 3 - i }}
          >
            <Link
              href={seg.href}
              onPointerEnter={() => setHover(s)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(s)}
              onBlur={() => setHover(null)}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-3xl px-2 pb-2 pt-4 outline-offset-8"
              aria-label={`${seg.label} trips, ${seg.who.toLowerCase()}`}
            >
              <motion.svg
                viewBox="-64 -64 128 128"
                className="h-[108px] w-[108px] sm:h-[190px] sm:w-[190px]"
                animate={reduce ? undefined : { scale: on ? 1.22 : dim ? 0.92 : 1, rotate: on ? 18 : 0, opacity: dim ? 0.6 : 1 }}
                whileTap={reduce ? undefined : { scale: 1.12 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                aria-hidden="true"
              >
                <circle r="47" fill="none" stroke={bg} strokeWidth="40" />
                <circle r="47" fill="none" stroke={seg.color} strokeWidth="26" />
                {dotPos(dots).map(([x, y], k) => (
                  <motion.circle
                    key={k}
                    cx={x}
                    cy={y}
                    r={dots === 1 ? 10 : 9}
                    fill={s === "couple" ? "#E59612" : seg.color}
                    animate={reduce ? undefined : { scale: on ? 1.35 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14, delay: k * 0.04 }}
                  />
                ))}
              </motion.svg>
              <span className={`font-display text-[22px] text-ink transition-transform duration-300 sm:text-[28px] ${on ? "scale-110" : ""}`}>{seg.label}</span>
              <span className="text-center text-[13px] font-medium leading-snug text-muted sm:text-[15px]">{seg.who}</span>
              <span className={`hidden items-center gap-1.5 text-[15px] font-bold transition-all duration-300 sm:flex ${on ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`} style={{ color: seg.text }}>
                See holidays <ArrowIcon size={15} />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
