import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RingChooser from "@/components/RingChooser";
import { ArrowIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ghooomo",
  description: `${site.legalName} plans tailor-made holidays abroad and across India from its office in Sector 121, Noida. One planner per trip, quotes in writing, hotels named before you pay.`,
  alternates: { canonical: "/about" },
};

const values = [
  { t: "We start with who is travelling", d: "A honeymoon and a family holiday to the same island need different hotels, a different pace and a different plan. So we ask who is coming before we suggest where." },
  { t: "Quotes you can check line by line", d: "No brochure prices. You get a quote for your dates with every hotel, transfer and tax on its own line, held in writing for the dates it states." },
  { t: "A person, not a ticket number", d: "Your planner works from our Noida office, designs the trip, and is the same person you reach while you are away." },
  { t: "Partners we know", d: "We work with a short list of hotels, drivers and guides in each place we send people, and we keep that list short on purpose." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
        <Image src="/photos/sky-window.jpg" alt="" fill priority sizes="100vw" quality={72} className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/30" aria-hidden="true" />
        <div className="wrap flex max-w-[1240px] flex-col gap-6">
          <p className="kicker flex items-center gap-3 text-ring-2"><span className="ring-gradient h-[3px] w-10 rounded-full" aria-hidden="true" />About Ghooomo</p>
          <h1 className="max-w-[900px] text-[clamp(44px,6.2vw,92px)] font-bold leading-[1.02]">Holidays designed around the people taking them.</h1>
          <p className="max-w-[640px] text-[19px] leading-relaxed text-on-night">
            {site.legalName} plans private, tailor-made holidays abroad and across India from our office in Sector 121, Noida. Every trip has one planner, from the first conversation to the flight home.
          </p>
          <Link href="/packages" className="btn btn-primary self-start">See our journeys <ArrowIcon /></Link>
        </div>
      </section>

      <section className="wrap grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-5">
          <p className="kicker text-solo-text">Why three circles</p>
          <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] text-ink">One for travelling alone, two for a couple, three for a group.</h2>
          <p className="text-[18px] leading-relaxed text-muted">
            The rings in our logo are the three ways people travel. Each needs something different from a hotel, a driver and a day, so each is planned differently.
          </p>
        </Reveal>
        <RingChooser />
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker text-solo-text">How we work</p>
            <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] text-ink">What you can expect from us</h2>
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
            <p className="text-[17px] text-on-night">{site.hours}. Plan your trip in person over a cup of tea. Messages outside these hours are answered the next working day.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Contact us <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
