"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "../Icons";
import { useLocalTime, formatCoords } from "@/lib/geo";

export type HeroSlide = {
  slug: string;
  title: string;
  place: string;
  country: string;
  coords: [number, number];
  timeZone: string;
  photo: string;
  alt: string;
};

const DURATION = 6500;

/**
 * Full-screen opening: destination photos change slowly with a gentle zoom,
 * and a small instrument panel shows where in the world you are looking.
 */
export default function HeroCinematic({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = slides[i];
  const time = useLocalTime(s.timeZone);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % slides.length), DURATION);
    return () => window.clearTimeout(t);
  }, [i, paused, slides.length]);

  const words = ["Holidays", "designed", "around", "who’s", "coming."];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white" aria-label="Featured destinations">
      {/* Photos */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={s.slug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`absolute inset-0 ${reduce ? "" : "kenburns"}`}>
              <Image src={s.photo} alt="" fill priority={i === 0} sizes="100vw" quality={78} className="object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,48,0.88)_0%,rgba(7,21,48,0.55)_45%,rgba(7,21,48,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/60 to-transparent" />
      </div>

      <div className="wrap relative mt-auto grid gap-10 pb-10 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-14">
        <div className="flex flex-col gap-7">
          <motion.p
            className="kicker flex items-center gap-3 text-on-night"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="ring-gradient h-[3px] w-10 rounded-full" aria-hidden="true" />
            Tailor-made holidays from India
          </motion.p>

          <h1 className="max-w-[880px] text-[clamp(44px,6.6vw,104px)] font-bold leading-[1.02] tracking-[-0.035em]">
            {words.map((w, n) => (
              <span key={n} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${n >= 3 ? "ring-text" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + n * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
                {n < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            className="max-w-[600px] text-[clamp(18px,1.4vw,21px)] font-medium leading-relaxed text-on-night"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Private journeys to the Maldives, Bali, Vietnam, Europe and the best of India. Planned by one specialist from our Noida office, quoted for your dates, with every hotel named in writing.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <Link href="#enquire" className="btn btn-primary">Plan my holiday <ArrowIcon /></Link>
            <Link href="#journeys" className="btn btn-ghost">Explore journeys</Link>
          </motion.div>
        </div>

        {/* Instrument panel */}
        <motion.div
          className="glass rounded-[24px] p-5 sm:p-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-between gap-4 text-[14px] font-semibold text-on-night">
            <span className="tabular">
              {String(i + 1).padStart(2, "0")} <span className="text-white/70">/ {String(slides.length).padStart(2, "0")}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ring-3 opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ring-3" />
              </span>
              Live local time
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.slug}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="mt-4 flex items-end justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-[28px] font-bold leading-tight sm:text-[32px]">{s.place}</p>
                <p className="tabular mt-1 text-[14px] font-medium text-on-night">{formatCoords(s.coords)}</p>
              </div>
              <p className="tabular shrink-0 text-right text-[28px] font-semibold leading-tight sm:text-[32px]">{time}</p>
            </motion.div>
          </AnimatePresence>

          <Link href={`/packages/${s.slug}`} className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-[15px] font-semibold hover:text-ring-2">
            <span className="truncate">{s.title}</span>
            <ArrowIcon className="shrink-0" />
          </Link>

          <div className="mt-5 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }} role="tablist" aria-label="Choose a destination">
            {slides.map((x, n) => (
              <button
                key={x.slug}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={x.place}
                onClick={() => setI(n)}
                className="group flex h-6 items-center"
              >
                <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                  {n < i && <span className="absolute inset-0 bg-white" />}
                  {n === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="ring-gradient absolute inset-y-0 left-0 w-full origin-left"
                      style={reduce || paused ? undefined : { animation: `hero-progress ${DURATION}ms linear forwards` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
