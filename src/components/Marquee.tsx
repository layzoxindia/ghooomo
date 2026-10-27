"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";

type Item = { label: string; href: string };

/** Slow, endless strip of destination names. Pauses on hover and for reduced motion. */
export default function Marquee({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={it.label + i} className="flex items-center gap-10 sm:gap-16">
          <Link
            href={it.href}
            tabIndex={hidden ? -1 : undefined}
            className="font-display text-[clamp(44px,7vw,104px)] font-extrabold leading-none tracking-[-0.03em] text-ink/90 transition-colors hover:text-solo-strong"
          >
            {it.label}
          </Link>
          <svg width="22" height="22" viewBox="-12 -12 24 24" aria-hidden="true" className="shrink-0">
            <circle r="8" fill="none" stroke={["#E8552B", "#F2A51A", "#12A69F"][i % 3]} strokeWidth="4" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative flex overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={reduce ? undefined : { animation: "marquee 48s linear infinite" }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
