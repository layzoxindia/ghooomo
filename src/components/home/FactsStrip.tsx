"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{v}</span>;
}

/** Plain facts about the catalogue. Every number here is counted from the site's own data. */
export default function FactsStrip({ facts }: { facts: { n: number; t: string }[] }) {
  return (
    <section className="border-y border-line bg-white">
      <ul className="wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {facts.map((f, i) => (
          <li key={f.t} className={`flex flex-col gap-1 py-8 sm:py-10 ${i ? "lg:border-l lg:border-line lg:pl-8" : ""}`}>
            <span className="tabular text-[clamp(40px,4.6vw,60px)] font-bold leading-none text-ink">
              <Count to={f.n} />
            </span>
            <span className="text-[16px] font-semibold text-muted">{f.t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
