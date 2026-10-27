import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RingChooser from "@/components/RingChooser";
import { ArrowIcon } from "@/components/Icons";
import { pexels, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ghooomo",
  description: "Ghooomo India Pvt Ltd is a Noida-based holiday company planning solo trips, couple getaways and group tours across India and abroad.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Who you travel with comes first", d: "A honeymoon and a college trip to the same beach are not the same holiday. We start with your circle, then pick the place." },
  { t: "Honest prices", d: "Starting prices are real, inclusions are listed line by line, and the final quote comes before any payment." },
  { t: "People, not bots", d: "Your planner is a real person in our Noida office who stays with you on WhatsApp until you’re home." },
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid items-center gap-10 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <p className="eyebrow text-solo-text">About us</p>
          <h1 className="text-[clamp(44px,6vw,86px)] font-extrabold leading-[0.95] text-ink">Three circles. One way to travel well.</h1>
          <p className="max-w-[560px] text-[18px] text-muted">
            The three rings in the Ghooomo logo stand for the three ways people travel — alone, as two, and together. {site.legalName} is a holiday company
            from Noida that plans each kind of trip differently, because each one deserves it.
          </p>
          <Link href="/packages" className="btn self-start bg-ink text-white hover:bg-ink-deep">Browse packages <ArrowIcon /></Link>
        </div>
        <Reveal className="relative h-[420px] overflow-hidden rounded-[34px] sm:h-[520px]">
          <Image src={pexels(26870963, 1200, 1300)} alt="Pangong Tso lake in Ladakh" fill sizes="(max-width: 1024px) 100vw, 45vw" quality={80} className="object-cover" priority />
        </Reveal>
      </section>

      <section className="wrap py-16 text-center">
        <RingChooser />
      </section>

      <section className="wrap grid gap-5 pb-24 md:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.06} className="flex flex-col gap-3 rounded-[24px] border border-line bg-white p-7">
            <span className="font-display text-[24px] leading-tight text-ink">{v.t}</span>
            <span className="text-[16px] text-muted">{v.d}</span>
          </Reveal>
        ))}
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-3">
            <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04]">Come say hello in Sector 121, Noida.</h2>
            <p className="text-[17px] text-[#DCE4F2]">{site.hours}. Or message us anytime — we reply during office hours.</p>
          </div>
          <Link href="/contact" className="btn bg-sun text-ink hover:bg-[#F2B13A]">Contact us <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
