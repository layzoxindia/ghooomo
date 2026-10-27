import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import HeroSearch from "@/components/HeroSearch";
import RingChooser from "@/components/RingChooser";
import PackageGrid from "@/components/PackageGrid";
import EnquirySection from "@/components/EnquirySection";
import Reveal from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import { heroMedia } from "@/lib/media";
import { getCatalog } from "@/lib/server/catalog";
import { pexels, segments } from "@/lib/site";

const circleCards = [
  { s: "solo" as const, title: "Solo trips", text: "Small-batch departures, checked stays and a trip captain on the road.", photo: 38056503, alt: "Key Monastery, Spiti Valley", bg: "#C9431D", ink: "#fff", sub: "#FFE9DF" },
  { s: "couple" as const, title: "Couple getaways", text: "Honeymoons, anniversaries and long weekends planned for two.", photo: 28843922, alt: "Overwater villas in the Maldives", bg: "#F2A51A", ink: "#0F2B5B", sub: "#2A3550" },
  { s: "group" as const, title: "Group tours", text: "Friends, family and offsites — one planner, one itinerary.", photo: 28550376, alt: "Chapora beach, Goa", bg: "#0B6B65", ink: "#fff", sub: "#DDF3F0" },
];

const steps = [
  { n: "01", c: "#F2603A", t: "Tell us your circle", d: "Solo, couple or group — plus dates, budget and where you’re dreaming of." },
  { n: "02", c: "#F7AE2A", t: "Get a plan on WhatsApp", d: "A real planner sends an itinerary and a clear price. No call-centre scripts." },
  { n: "03", c: "#19C2B7", t: "Tweak, book, go", d: "Change anything you like, pay a small advance, and pack your bags." },
];

const promises = [
  { t: "Prices you can see", d: "Every package shows a real starting price and exactly what it includes — and what it doesn’t." },
  { t: "One planner, start to finish", d: "The person who plans your trip stays on WhatsApp until you’re home." },
  { t: "An office you can walk into", d: "We’re in Sector 121, Noida. Drop by for a chai and plan it face to face." },
  { t: "Your data stays yours", d: "We use your number only to plan your trip. Ask us to delete it anytime." },
];

export const revalidate = 300;

export default async function Home() {
  const packages = await getCatalog();
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#13242B] text-white">
        <HeroVideo media={heroMedia.home} />
        <div className="absolute inset-0 -z-0 bg-[#0B1A24]/55" aria-hidden="true" />
        <div className="wrap relative z-10 mt-auto flex flex-col gap-7 pb-16 pt-32 sm:pb-24">
          <Reveal>
            <p className="eyebrow text-sun">Holidays · India &amp; abroad</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-[980px] text-[clamp(52px,8vw,118px)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              Travel the way <span className="text-sun">you</span> travel.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[600px] text-[clamp(18px,1.6vw,21px)] font-medium text-[#E3EAF0]">
              Alone, as two, or with the whole gang — pick your circle and we’ll plan the trip around it.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-3">
            <HeroSearch />
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="wrap flex flex-col items-center gap-6 pb-10 pt-24 text-center sm:pt-28">
        <Reveal><p className="eyebrow text-solo-text">Pick your circle</p></Reveal>
        <Reveal delay={0.05}><h2 className="text-[clamp(36px,4.6vw,62px)] leading-none text-ink">Who’s coming along?</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[560px] text-[18px] text-muted">The three rings in our logo are you. Tap one — each has its own trips, prices and planners.</p>
        </Reveal>
        <div className="mt-6"><RingChooser /></div>
      </section>

      <section className="wrap pb-10 pt-10">
        <div className="grid gap-5 md:grid-cols-3">
          {circleCards.map((c, i) => (
            <Reveal key={c.s} delay={i * 0.08}>
              <Link
                href={segments[c.s].href}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[30px] p-7"
                style={{ background: c.bg, color: c.ink }}
              >
                <Image src={pexels(c.photo, 900, 1100)} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 33vw" quality={70} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 h-[58%]" style={{ background: c.bg }} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-[58%] h-16" style={{ background: `linear-gradient(to top, ${c.bg}, transparent)` }} aria-hidden="true" />
                <span className="relative flex flex-col gap-3">
                  <span className="font-display text-[34px] leading-none">{c.title}</span>
                  <span className="text-[16px] font-medium leading-relaxed" style={{ color: c.sub }}>{c.text}</span>
                  <span className="mt-2 flex items-center gap-2 text-[15px] font-bold">
                    Explore {segments[c.s].label.toLowerCase()} <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="wrap flex scroll-mt-20 flex-col gap-8 pt-20 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow text-solo-text">This season</p>
            <h2 className="text-[clamp(34px,4.2vw,58px)] leading-none text-ink">Trending holidays</h2>
          </Reveal>
          <Link href="/packages" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">See all {packages.length} packages <ArrowIcon /></Link>
        </div>
        <PackageGrid items={packages.slice(0, 9)} />
      </section>

      {/* STAYS */}
      <section className="wrap grid items-center gap-10 pt-24 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[34px] bg-paper-2">
          <HeroVideo media={heroMedia.stay} priority={false} />
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col gap-5">
          <p className="eyebrow text-solo-text">Where you’ll sleep</p>
          <h2 className="text-[clamp(32px,4vw,54px)] leading-[1.02] text-ink">Rooms we’d book for ourselves.</h2>
          <p className="text-[18px] text-muted">
            Clean sheets, quiet nights and a view worth waking up for. We check our hotels, homestays and camps before they go on a trip — and we tell you
            exactly where you’re staying before you pay.
          </p>
          <Link href="/packages" className="btn self-start bg-ink text-white hover:bg-ink-deep">Browse packages <ArrowIcon /></Link>
        </Reveal>
      </section>

      {/* HOW */}
      <section className="wrap pt-24 sm:pt-28">
        <div className="flex flex-col gap-10 rounded-[34px] bg-ink p-7 text-white sm:p-12 lg:p-16">
          <Reveal className="flex max-w-[680px] flex-col gap-4">
            <p className="eyebrow text-sun">How it works</p>
            <h2 className="text-[clamp(32px,4vw,54px)] leading-[1.02]">From “I need a break” to boarding pass.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="flex flex-col gap-3 rounded-[22px] border border-white/18 bg-white/[0.06] p-7">
                <span className="font-display text-[46px] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</span>
                <span className="font-display text-[23px]">{s.t}</span>
                <span className="text-[16px] font-medium text-[#D5DEEC]">{s.d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="wrap grid gap-10 pb-24 pt-24 sm:pt-28 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-4">
          <p className="eyebrow text-solo-text">Why Ghooomo</p>
          <h2 className="text-[clamp(34px,4.2vw,56px)] leading-[1.02] text-ink">A travel company that picks up the phone.</h2>
          <p className="text-[18px] text-muted">No bots, no hidden extras, no disappearing after you pay.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="flex flex-col gap-2 rounded-[22px] border border-line bg-white p-6">
              <span className="font-display text-[21px] text-ink">{p.t}</span>
              <span className="text-[16px] text-muted">{p.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
