"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import DotGlobe, { type City } from "./DotGlobe";
import { ArrowIcon } from "../Icons";

const cities: City[] = [
  { name: "Paris", at: [2.35, 48.86] },
  { name: "London", at: [-0.13, 51.51] },
  { name: "Swiss Alps", at: [7.86, 46.68] },
  { name: "Venice", at: [12.34, 45.44] },
  { name: "Rome", at: [12.5, 41.9] },
  { name: "Barcelona", at: [2.17, 41.39] },
  { name: "Amsterdam", at: [4.9, 52.37] },
  { name: "Prague", at: [14.42, 50.08] },
  { name: "Santorini", at: [25.43, 36.39] },
  { name: "Reykjavik", at: [-21.9, 64.15] },
  { name: "Istanbul", at: [28.98, 41.01] },
  { name: "Cappadocia", at: [34.83, 38.64] },
  { name: "Cairo", at: [31.24, 30.04] },
  { name: "Dubai", at: [55.27, 25.2] },
  { name: "Masai Mara", at: [35.14, -1.5] },
  { name: "Cape Town", at: [18.42, -33.92] },
  { name: "Seychelles", at: [55.45, -4.68] },
  { name: "Mauritius", at: [57.55, -20.35] },
  { name: "Maldives", at: [73.22, 3.2] },
  { name: "Sri Lanka", at: [80.77, 7.87] },
  { name: "Bhutan", at: [89.42, 27.43] },
  { name: "Kathmandu", at: [85.32, 27.7] },
  { name: "Bangkok", at: [100.5, 13.75] },
  { name: "Phuket", at: [98.34, 7.95] },
  { name: "Singapore", at: [103.82, 1.35] },
  { name: "Bali", at: [115.19, -8.41] },
  { name: "Hanoi", at: [105.85, 21.03] },
  { name: "Ha Long Bay", at: [107.18, 20.91] },
  { name: "Tokyo", at: [139.69, 35.69] },
  { name: "Kyoto", at: [135.77, 35.01] },
  { name: "Seoul", at: [126.98, 37.57] },
  { name: "Sydney", at: [151.21, -33.87] },
  { name: "Queenstown", at: [168.66, -45.03] },
  { name: "New York", at: [-74.0, 40.71] },
  { name: "Cancún", at: [-86.85, 21.16] },
  { name: "Kashmir", at: [74.8, 34.08], india: true },
  { name: "Udaipur", at: [73.71, 24.58], india: true },
  { name: "Kerala", at: [76.52, 9.59], india: true },
  { name: "Goa", at: [73.94, 15.3], india: true },
  { name: "Andaman", at: [92.99, 11.97], india: true },
  { name: "Sikkim", at: [88.61, 27.33], india: true },
  { name: "Kutch", at: [69.86, 23.87], india: true },
];

const regions = [
  { t: "Europe", list: "Paris, Switzerland, Italy, Greece, London, Spain, Iceland" },
  { t: "Asia", list: "Bali, Thailand, Vietnam, Singapore, Japan, Bhutan" },
  { t: "Middle East & Africa", list: "Dubai, Türkiye, Egypt, Kenya, South Africa" },
  { t: "Islands", list: "Maldives, Mauritius, Seychelles, Sri Lanka" },
  { t: "India", list: "Kashmir, Rajasthan, Kerala, Goa, Andamans, Sikkim, Gujarat" },
];

export default function GlobeSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-night py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ring-3/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-ring-1/15 blur-[120px]" aria-hidden="true" />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-7"
        >
          <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[1.04]">Holidays to every corner of the world</h2>
          <p className="max-w-[520px] text-[18px] leading-relaxed text-on-night">
            From the Greek islands to the temples of Kyoto, the beaches of the Maldives to the houseboats of Kashmir. Wherever you want to go, we’ll plan it.
          </p>
          <dl className="flex flex-col">
            {regions.map((r) => (
              <div key={r.t} className="grid gap-1 border-t border-white/12 py-3.5 sm:grid-cols-[190px_1fr] sm:gap-4">
                <dt className="text-[16px] font-bold text-ring-2">{r.t}</dt>
                <dd className="text-[16px] font-medium text-on-night">{r.list}</dd>
              </div>
            ))}
          </dl>
          <Link href="#enquire" className="btn btn-primary self-start">Plan a holiday <ArrowIcon /></Link>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <div className="absolute inset-[4%] rounded-full border border-white/10" aria-hidden="true" />
          <DotGlobe cities={cities} />
        </div>
      </div>
    </section>
  );
}
