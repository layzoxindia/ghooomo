"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RingMark } from "../Logo";
import { ArrowIcon } from "../Icons";
import { segments, type Segment } from "@/lib/site";

const panels: { s: Segment; dots: 1 | 2 | 3; title: string; text: string; photo: string; alt: string }[] = [
  {
    s: "solo",
    dots: 1,
    title: "Travelling alone",
    text: "Private holidays with a driver-guide and hotels in safe, central locations. Your pace, your plans.",
    photo: "/photos/europe-swiss-train.jpg",
    alt: "Mountain train below the Eiger in Switzerland",
  },
  {
    s: "couple",
    dots: 2,
    title: "The two of you",
    text: "Honeymoons, anniversaries and romantic escapes, with rooms chosen for the view and private transfers throughout.",
    photo: "/photos/28843966.jpg",
    alt: "Overwater villa with a private pool in the Maldives",
  },
  {
    s: "group",
    dots: 3,
    title: "Family & friends",
    text: "Family holidays, friends’ getaways and celebrations, with the right rooms and transport for everyone.",
    photo: "/photos/thailand-maya-bay.jpg",
    alt: "Boats in Maya Bay, Thailand",
  },
];

/** The three rings of the logo, as three ways to travel. Panels widen on hover on desktop. */
export default function TravellerTypes() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Segment>("couple");

  return (
    <section className="wrap py-24 sm:py-32">
      <div className="mb-12 flex max-w-[720px] flex-col gap-4">
        <h2 className="text-[clamp(36px,4.6vw,64px)] leading-[1.02] text-ink">Holidays for every kind of traveller</h2>
        <p className="text-[18px] text-muted">Travelling solo, as a couple, or with family and friends. Each holiday is planned around the people on it.</p>
      </div>

      <div className="flex flex-col gap-4 lg:h-[560px] lg:flex-row">
        {panels.map((p, n) => {
          const seg = segments[p.s];
          const isOpen = open === p.s;
          return (
            <motion.div
              key={p.s}
              onMouseEnter={() => setOpen(p.s)}
              onFocus={() => setOpen(p.s)}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: n * 0.1 }}
              className={`relative min-h-[420px] overflow-hidden rounded-[28px] bg-night transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0 ${isOpen ? "lg:flex-[2.2]" : "lg:flex-1"}`}
            >
              <Link href={seg.href} className="group absolute inset-0 flex flex-col justify-end p-7 text-white sm:p-8">
                <Image src={p.photo} alt={p.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" quality={72} className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/5" aria-hidden="true" />
                <span className="relative flex flex-col gap-4">
                  <span className="flex items-center gap-3">
                    <span className="rounded-full bg-white p-1.5"><RingMark dots={p.dots} color={seg.color} size={40} /></span>
                    <span className="kicker" style={{ color: p.s === "solo" ? "#FF9C7E" : p.s === "couple" ? "#FFD27A" : "#6FE3DA" }}>{seg.label}</span>
                  </span>
                  <span className="text-[30px] font-bold leading-tight sm:text-[34px]">{p.title}</span>
                  <span className={`max-w-[460px] text-[17px] font-medium leading-relaxed text-on-night transition-opacity duration-500 ${isOpen ? "lg:opacity-100" : "lg:opacity-0"}`}>
                    {p.text}
                  </span>
                  <span className="flex items-center gap-2 text-[16px] font-bold">
                    {seg.label} holidays <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
