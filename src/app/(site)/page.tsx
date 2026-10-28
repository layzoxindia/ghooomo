import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import TripFinder from "@/components/TripFinder";
import NoSurprises from "@/components/NoSurprises";
import PackageGrid from "@/components/PackageGrid";
import EnquirySection from "@/components/EnquirySection";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { RingMark } from "@/components/Logo";
import { ArrowIcon, ChatIcon } from "@/components/Icons";
import { heroMedia } from "@/lib/media";
import { getCatalog } from "@/lib/server/catalog";
import { photoSrc, segments, site, waLink } from "@/lib/site";

export const revalidate = 300;

const circleCards = [
  { s: "solo" as const, title: "Solo trips", text: "Small batches of people travelling on their own, with a trip captain on the road.", photo: 38056503, alt: "Key Monastery, Spiti Valley", bg: "#B23C17", ink: "#fff", sub: "#FFFFFF" },
  { s: "couple" as const, title: "Couple holidays", text: "Honeymoons, anniversaries and long weekends with private transfers.", photo: 28843922, alt: "Overwater villas in the Maldives", bg: "#F2A51A", ink: "#0F2B5B", sub: "#2A3550" },
  { s: "group" as const, title: "Group tours", text: "Friends, families and office teams on one plan, with one coordinator.", photo: 28550376, alt: "Chapora beach, Goa", bg: "#0B6B65", ink: "#fff", sub: "#FFFFFF" },
];

const plan = [
  { dots: 1 as const, c: "#F2603A", t: "You tell us who’s coming", d: "Solo, couple or a group, plus rough dates, a budget and the places you have in mind. A two-minute form or a WhatsApp message is enough." },
  { dots: 2 as const, c: "#F7AE2A", t: "A planner sends a real plan", d: "Day by day, with the hotels named and a price that includes taxes. If something doesn’t suit you, it gets changed." },
  { dots: 3 as const, c: "#19C2B7", t: "You pay an advance and go", d: "We book everything and share vouchers. The same planner stays on WhatsApp until you’re back home." },
];

const facts = [
  { k: "Where we are", v: "Sector 121, Noida. You’re welcome to visit and plan in person." },
  { k: "How we price", v: "Every package shows a starting price and a full list of what’s included and what isn’t." },
  { k: "Who you talk to", v: "One planner from the first message to the last day of the trip." },
  { k: "Your data", v: "Used only to plan your trip. Ask and we delete it." },
];

export default async function Home() {
  const packages = await getCatalog();
  const marquee = packages.map((p) => ({
    label: p.destination.replace(/,.*$/, "").replace(" Islands", "").replace("Himachal Pradesh", p.slug.startsWith("spiti") ? "Spiti" : "Manali"),
    href: `/packages/${p.slug}`,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#13242B] text-white">
        <HeroVideo media={heroMedia.home} />
        <div className="absolute inset-0 bg-[#08151E]/45" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#08151E]/80 to-transparent" aria-hidden="true" />
        <div className="wrap relative z-10 mt-auto flex flex-col gap-8 pb-10 pt-32 sm:pb-14">
          <div className="hero-rise">
            <h1 className="max-w-[1050px] text-[clamp(44px,7.6vw,120px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Holidays planned around <span className="font-bold italic text-sun">who’s coming.</span>
            </h1>
          </div>
          <div className="hero-rise" style={{ "--d": "0.08s" } as CSSProperties}>
            <p className="max-w-[580px] text-[clamp(18px,1.5vw,20px)] font-medium text-[#E6ECF1]">
              Travelling alone, as a couple or with a group? Pick one, and a planner from our Noida office puts the trip together for you.
            </p>
          </div>
          <div className="hero-rise flex flex-wrap gap-3 sm:hidden" style={{ "--d": "0.1s" } as CSSProperties}>
            <a href={waLink("Hi Ghooomo! I'd like to plan a holiday.")} target="_blank" rel="noopener noreferrer" className="btn flex-1 bg-wa text-white hover:bg-wa-deep">
              <ChatIcon /> WhatsApp us
            </a>
            <Link href="#packages" className="btn flex-1 bg-white text-ink">See trips</Link>
          </div>
          <div className="hero-rise" style={{ "--d": "0.14s" } as CSSProperties}>
            <TripFinder />
          </div>
          <div className="hero-rise" style={{ "--d": "0.2s" } as CSSProperties}>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-white/20 pt-5 text-[14px] font-medium text-[#D7E0E8]">
              <li>Replies on WhatsApp, {site.hours}</li>
              <li>Prices include taxes</li>
              <li>{site.legalName}, Noida</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section aria-label="Destinations" className="border-b border-line pb-4 pt-10">
        <Marquee items={marquee} />
      </section>

      {/* WHO */}
      <section className="wrap pb-10 pt-24 sm:pt-32">
        <Reveal className="mb-10 flex flex-col gap-5 sm:mb-12">
          <h2 className="text-[clamp(40px,5vw,72px)] leading-[1] text-ink">Who’s coming along?</h2>
          <p className="max-w-[560px] text-[18px] text-muted">
            The three rings in our logo stand for the three ways people travel. Each has its own trips, prices and planners. Pick one to start.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {circleCards.map((c, i) => (
            <Reveal key={c.s} delay={i * 0.08}>
              <Link
                href={segments[c.s].href}
                className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[30px] p-7"
                style={{ background: c.bg, color: c.ink }}
              >
                <span className="absolute inset-x-0 top-0 h-[62%] overflow-hidden">
                  <Image src={photoSrc(c.photo)} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 33vw" quality={70} className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[44%]" style={{ background: c.bg }} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-[44%] h-36" style={{ background: `linear-gradient(to top, ${c.bg} 10%, transparent)` }} aria-hidden="true" />
                <span className="relative flex flex-col gap-3">
                  <span className="font-display text-[34px] leading-none">{c.title}</span>
                  <span className="text-[16px] font-medium leading-relaxed" style={{ color: c.sub }}>{c.text}</span>
                  <span className="mt-2 flex items-center gap-2 text-[15px] font-bold">
                    See {segments[c.s].label.toLowerCase()} trips <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="wrap flex scroll-mt-20 flex-col gap-10 pt-24 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal className="flex max-w-[620px] flex-col gap-4">
            <h2 className="text-[clamp(38px,4.6vw,64px)] leading-[0.98] text-ink">Trips for this season</h2>
            <p className="text-[18px] text-muted">Starting prices per person with taxes included. Open any trip for the day-by-day plan and cancellation amounts.</p>
          </Reveal>
          <Link href="/packages" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">All {packages.length} trips <ArrowIcon /></Link>
        </div>
        <PackageGrid items={packages.slice(0, 6)} />
      </section>

      {/* PROMISE */}
      <section className="wrap pt-24 sm:pt-32">
        <NoSurprises />
      </section>

      {/* STAYS */}
      <section className="wrap grid items-center gap-10 pt-24 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[30px] bg-paper-2">
          <HeroVideo media={heroMedia.stay} priority={false} />
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col gap-5">
          <h2 className="text-[clamp(34px,4vw,56px)] leading-[1] text-ink">You’ll know the hotel before you pay.</h2>
          <p className="text-[18px] text-muted">
            Every quote names the hotels, homestays or camps you’ll stay in, with photos. We visit or vet them first, and swap anything that doesn’t meet the standard.
          </p>
        </Reveal>
      </section>

      {/* HOW */}
      <section className="mt-24 bg-ink py-20 text-white sm:mt-32 sm:py-28">
        <div className="wrap flex flex-col gap-14">
          <Reveal className="flex max-w-[720px] flex-col gap-4">
            <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[0.98]">How a trip comes together</h2>
            <p className="text-[18px] text-[#C9D5E6]">Three steps, all on WhatsApp. No call centre, no forms to chase.</p>
          </Reveal>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {plan.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.1} className="flex flex-col gap-4 border-t border-white/20 pt-7">
                <RingMark dots={s.dots} color={s.c} size={56} />
                <span className="font-display text-[26px] leading-tight">{s.t}</span>
                <span className="text-[16px] font-medium text-[#C9D5E6]">{s.d}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FACTS */}
      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[0.98] text-ink">Good to know before you book</h2>
        </Reveal>
        <dl className="flex flex-col">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.05} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="font-display text-[21px] text-ink">{f.k}</dt>
              <dd className="text-[17px] text-muted">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Testimonials />

      <EnquirySection />
    </>
  );
}
