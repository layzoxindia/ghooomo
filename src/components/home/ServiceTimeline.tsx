"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { REFUND_DAYS } from "@/lib/pricing";

const steps = [
  { t: "A first conversation", d: "A short call or WhatsApp chat with a planner. Who is travelling, when, what you love and what you would rather avoid." },
  { t: "Your plan and quote", d: "A day-by-day plan and an itemised quote. Change anything you like until it is right. Revisions cost nothing." },
  { t: "Paperwork, handled", d: "Visa forms and appointments, travel insurance, forex guidance and a document checklist, so nothing is missed at the airport." },
  { t: "On the road", d: "Met on arrival, hotels briefed before you check in, and your planner reachable on one number for the whole trip." },
  { t: "Home again", d: `We ask how it went. If anything fell short, we put it right, and any refund due reaches you within ${REFUND_DAYS}.` },
];

/** How we look after a trip from first call to return. The line fills as you scroll. */
export default function ServiceTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative overflow-hidden bg-night-2 py-24 text-white sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <p className="kicker text-ring-2">05 · Looking after you</p>
          <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04]">One person, from the first call to the flight home.</h2>
          <p className="max-w-[480px] text-[18px] leading-relaxed text-on-night">
            You will not be passed between departments. The planner who designs your trip is the one who answers when you land, and the one you call if a flight moves.
          </p>
        </div>

        <ol ref={ref} className="relative flex flex-col gap-12 pl-14 sm:pl-16">
          <span className="absolute bottom-2 left-[19px] top-2 w-[2px] rounded-full bg-white/12 sm:left-[23px]" aria-hidden="true" />
          <motion.span
            className="absolute bottom-2 left-[19px] top-2 w-[2px] origin-top rounded-full bg-[linear-gradient(180deg,var(--color-ring-1),var(--color-ring-2),var(--color-ring-3))] sm:left-[23px]"
            style={{ scaleY: reduce ? 1 : fill }}
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              className="relative flex flex-col gap-2"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="tabular absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-night text-[15px] font-bold sm:-left-16 sm:h-12 sm:w-12">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[24px] font-bold leading-tight sm:text-[26px]">{s.t}</span>
              <span className="max-w-[560px] text-[17px] leading-relaxed text-on-night">{s.d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
