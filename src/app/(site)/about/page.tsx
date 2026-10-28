import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RingChooser from "@/components/RingChooser";
import { ArrowIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.legalName} creates tailor-made holidays around the world and across India, from its office in Sector 121, Noida.`,
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Planned around you", d: "Every holiday is built around who is travelling, when, and what you enjoy." },
  { t: "Handpicked stays", d: "Resorts, villas and boutique hotels we know and trust, in India and abroad." },
  { t: "One point of contact", d: "The same person looks after your holiday from the first call until you are home." },
  { t: "Worldwide", d: "Europe, Asia, the Middle East, Africa, the islands and every corner of India." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
        <Image src="/photos/sky-window.jpg" alt="" fill priority sizes="100vw" quality={72} className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/30" aria-hidden="true" />
        <div className="wrap flex max-w-[1240px] flex-col gap-6">
          <h1 className="max-w-[900px] text-[clamp(44px,6.2vw,92px)] font-bold leading-[1.02]">About Ghooomo</h1>
          <p className="max-w-[640px] text-[19px] leading-relaxed text-on-night">
            {site.legalName} creates tailor-made holidays around the world and across India, from our office in Sector 121, Noida.
          </p>
          <Link href="/packages" className="btn btn-primary self-start">Explore holidays <ArrowIcon /></Link>
        </div>
      </section>

      <section className="wrap grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-5">
          <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] text-ink">Solo, couple or group</h2>
          <p className="text-[18px] leading-relaxed text-muted">The three circles in our logo stand for the three ways people travel. Whichever you are, we plan it around you.</p>
        </Reveal>
        <RingChooser />
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] text-ink">What you can expect</h2>
          </Reveal>
          <dl className="flex flex-col">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06} className="flex flex-col gap-2 border-t border-line py-7">
                <dt className="text-[22px] font-bold leading-tight text-ink">{v.t}</dt>
                <dd className="text-[17px] leading-relaxed text-muted">{v.d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="tech-grid bg-night py-20 text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3">
            <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.06]">Visit us in Sector 121, Noida</h2>
            <p className="text-[17px] text-on-night">{site.hours}. Drop in to plan your holiday in person.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Contact us <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
