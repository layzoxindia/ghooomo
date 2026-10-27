import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RingChooser from "@/components/RingChooser";
import { ArrowIcon } from "@/components/Icons";
import { pexels, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ghooomo",
  description: "Ghooomo India Pvt Ltd is a holiday company in Noida that plans solo trips, couple holidays and group tours across India and abroad.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "We start with who’s travelling", d: "A honeymoon and a college trip to the same beach need different hotels, pace and budget. So we ask who’s coming before we suggest where." },
  { t: "Prices you can check", d: "Starting prices are real, inclusions are listed line by line, and you get the final quote in writing before paying anything." },
  { t: "A person, not a ticket number", d: "Your planner works from our Noida office and stays on WhatsApp with you until the trip is over." },
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid items-center gap-12 pb-16 pt-28 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[clamp(46px,6.4vw,92px)] font-extrabold leading-[0.94] text-ink">Why our logo has three circles</h1>
          <p className="max-w-[560px] text-[18px] text-muted">
            One circle for people who travel alone, two for couples and three for groups. {site.legalName} is a holiday company in Noida, and we plan each of
            these trips differently because each one needs something different.
          </p>
          <Link href="/packages" className="btn self-start bg-ink text-white hover:bg-ink-deep">See all trips <ArrowIcon /></Link>
        </div>
        <Reveal className="relative h-[420px] overflow-hidden rounded-[32px] sm:h-[540px]">
          <Image src={pexels(26870963, 1200, 1300)} alt="Pangong Tso lake in Ladakh" fill sizes="(max-width: 1024px) 100vw, 45vw" quality={80} className="object-cover" priority />
        </Reveal>
      </section>

      <section className="wrap py-16">
        <RingChooser />
      </section>

      <section className="wrap grid gap-12 pb-28 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[0.98] text-ink">How we work</h2>
        <dl className="flex flex-col">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06} className="flex flex-col gap-2 border-t border-line py-7">
              <dt className="font-display text-[24px] leading-tight text-ink">{v.t}</dt>
              <dd className="text-[17px] text-muted">{v.d}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-3">
            <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04]">Visit us in Sector 121, Noida</h2>
            <p className="text-[17px] text-[#DCE4F2]">{site.hours}. Messages outside these hours are answered the next working day.</p>
          </div>
          <Link href="/contact" className="btn bg-sun text-ink hover:bg-[#F2B13A]">Contact us <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
