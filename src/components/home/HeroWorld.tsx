"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "../Icons";

export type HeroPlace = { name: string; country: string; photo: string; href: string };

function Column({ items, reverse, duration }: { items: HeroPlace[]; reverse?: boolean; duration: number }) {
  // The list is doubled so the loop is seamless.
  const loop = [...items, ...items];
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex flex-col gap-4 hover:[animation-play-state:paused] motion-reduce:!animate-none"
        style={{ animation: `${reverse ? "col-down" : "col-up"} ${duration}s linear infinite` }}
      >
        {loop.map((p, i) => (
          <Link
            key={`${p.name}-${i}`}
            href={p.href}
            aria-label={`${p.name}, ${p.country}: read the guide`}
            aria-hidden={i >= items.length || undefined}
            tabIndex={i >= items.length ? -1 : undefined}
            className="group relative block aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[22px] bg-night-2 ring-white/70 transition-shadow hover:ring-2"
          >
            <Image src={p.photo} alt="" fill sizes="(max-width: 1024px) 40vw, 16vw" quality={68} className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block text-[17px] font-bold leading-tight text-white">{p.name}</span>
              <span className="block text-[14px] font-medium text-on-night">{p.country}</span>
              <span className="mt-2 flex items-center gap-1.5 text-[14px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">View guide <ArrowIcon size={14} /></span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Row({ items, reverse }: { items: HeroPlace[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-3 active:[animation-play-state:paused] motion-reduce:!animate-none"
        style={{ animation: `${reverse ? "row-right" : "row-left"} 60s linear infinite` }}
      >
        {loop.map((p, i) => (
          <Link
            key={`${p.name}-${i}`}
            href={p.href}
            aria-label={`${p.name}, ${p.country}: read the guide`}
            aria-hidden={i >= items.length || undefined}
            tabIndex={i >= items.length ? -1 : undefined}
            className="relative block h-[150px] w-[120px] shrink-0 overflow-hidden rounded-[18px] bg-night-2"
          >
            <Image src={p.photo} alt="" fill sizes="120px" quality={60} className="object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-night/85 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-2.5 text-[14px] font-bold leading-tight text-white">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Opening section: the message on a calm background, with destinations from around the world drifting past beside it. */
export default function HeroWorld({ places }: { places: HeroPlace[] }) {
  const reduce = useReducedMotion();
  const third = Math.ceil(places.length / 3);
  const cols = [places.slice(0, third), places.slice(third, third * 2), places.slice(third * 2)];
  const half = Math.ceil(places.length / 2);

  const rise = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-ring-1/20 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-ring-3/15 blur-[140px]" aria-hidden="true" />

      <div className="wrap grid min-h-[100svh] grid-cols-1 items-center gap-10 pb-12 pt-32 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:py-0">
        <div className="flex min-w-0 flex-col gap-7 lg:py-32">
          <motion.p {...rise(0.05)} className="flex items-center gap-3 text-[16px] font-semibold text-on-night">
            <span className="ring-gradient h-[3px] w-10 rounded-full" aria-hidden="true" />
            Holidays across the world
          </motion.p>
          <motion.h1 {...rise(0.12)} className="text-[clamp(46px,6.4vw,96px)] font-bold leading-[1.02] tracking-[-0.035em]">
            Your world,
            <br />
            beautifully planned.
          </motion.h1>
          <motion.p {...rise(0.22)} className="max-w-[560px] text-[clamp(18px,1.4vw,21px)] font-medium leading-relaxed text-on-night">
            Tailor-made holidays to Europe, the Maldives, Bali, Dubai, Japan and every corner of India. For solo travellers, couples, families and groups.
          </motion.p>
          <motion.div {...rise(0.32)} className="flex flex-wrap gap-3">
            <Link href="#enquire" className="btn btn-primary">Plan my holiday <ArrowIcon /></Link>
            <Link href="/packages" className="btn btn-ghost">Explore destinations</Link>
          </motion.div>
        </div>

        {/* Desktop: three drifting columns */}
        <nav
          aria-label="Featured destinations"
          className="relative hidden h-[100svh] min-w-0 grid-cols-3 gap-4 lg:grid [mask-image:linear-gradient(to_bottom,transparent_9%,black_24%,black_84%,transparent)]"
        >
          <Column items={cols[0]} duration={46} />
          <Column items={cols[1]} duration={54} reverse />
          <Column items={cols[2]} duration={50} />
        </nav>

        {/* Phones and tablets: two drifting rows */}
        <nav aria-label="Featured destinations" className="-mx-5 flex min-w-0 flex-col gap-3 overflow-hidden sm:-mx-7 lg:hidden">
          <Row items={places.slice(0, half)} />
          <Row items={places.slice(half)} reverse />
        </nav>
      </div>
    </section>
  );
}
