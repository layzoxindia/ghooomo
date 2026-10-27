import Image from "next/image";
import type { ReactNode } from "react";
import HeroVideo from "./HeroVideo";
import PackageGrid from "./PackageGrid";
import EnquirySection from "./EnquirySection";
import Reveal from "./Reveal";
import { RingMark } from "./Logo";
import { ChatIcon } from "./Icons";
import { heroMedia } from "@/lib/media";
import { getCatalog } from "@/lib/server/catalog";
import { pexels, segments, waLink, type Segment } from "@/lib/site";

type Props = {
  segment: Segment;
  heading: ReactNode;
  intro: string;
  primaryCta: string;
  why: { t: string; d: string }[];
  whyTitle: string;
  extra?: ReactNode;
  enquiry: { title: string; text: string; submit: string };
  mosaic?: { id: number; alt: string }[];
};

export default async function SegmentPage({ segment, heading, intro, primaryCta, why, whyTitle, extra, enquiry, mosaic }: Props) {
  const seg = segments[segment];
  const items = (await getCatalog()).filter((p) => p.segment === segment);
  const media = heroMedia[segment];

  const ctas = (light: boolean) => (
    <div className="flex flex-wrap gap-3">
      <a
        href="#packages"
        className="btn"
        style={{ background: segment === "couple" ? seg.color : light ? "#fff" : seg.strong, color: segment === "couple" ? "#0F2B5B" : light ? seg.strong : "#fff" }}
      >
        {primaryCta}
      </a>
      <a
        href={waLink(`Hi Ghooomo! I'd like to plan a ${seg.label.toLowerCase()} trip.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn border-2 ${light ? "border-white text-white hover:bg-white/10" : "border-ink text-ink hover:bg-ink hover:text-white"}`}
      >
        <ChatIcon /> Plan on WhatsApp
      </a>
    </div>
  );

  return (
    <>
      {segment === "solo" ? (
        // Split hero on paper
        <section className="wrap flex flex-wrap items-center gap-10 pb-12 pt-28 lg:gap-14 lg:pt-32">
          <div className="flex flex-[1_1_440px] flex-col gap-6">
            <Reveal><RingMark dots={1} color={seg.color} size={80} /></Reveal>
            <Reveal delay={0.04}><p className="eyebrow" style={{ color: seg.text }}>{seg.label} trips</p></Reveal>
            <Reveal delay={0.08}><h1 className="text-[clamp(48px,6.4vw,96px)] font-extrabold leading-[0.94] text-ink">{heading}</h1></Reveal>
            <Reveal delay={0.12}><p className="max-w-[520px] text-[18px] text-muted">{intro}</p></Reveal>
            <Reveal delay={0.16}>{ctas(false)}</Reveal>
          </div>
          <Reveal delay={0.1} className="relative h-[460px] flex-[1_1_460px] overflow-hidden rounded-[34px] bg-[#1d3b4a] sm:h-[580px]">
            <HeroVideo media={media} />
          </Reveal>
        </section>
      ) : segment === "couple" ? (
        // Full-bleed video hero
        <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-[#3E3326] text-white">
          <HeroVideo media={media} />
          <div className="absolute inset-0 bg-[#1F160D]/50" aria-hidden="true" />
          <div className="wrap relative z-10 mt-auto flex flex-col gap-6 pb-20 pt-32">
            <Reveal><RingMark dots={2} color={seg.color} size={80} /></Reveal>
            <Reveal delay={0.04}><p className="eyebrow text-[#FFD88A]">{seg.label} getaways</p></Reveal>
            <Reveal delay={0.08}><h1 className="max-w-[920px] text-[clamp(48px,6.8vw,104px)] font-extrabold leading-[0.94]">{heading}</h1></Reveal>
            <Reveal delay={0.12}><p className="max-w-[560px] text-[19px] font-medium text-[#F5ECE0]">{intro}</p></Reveal>
            <Reveal delay={0.16}>{ctas(true)}</Reveal>
          </div>
        </section>
      ) : (
        // Teal block with video + photo mosaic
        <section className="bg-group-strong text-white">
          <div className="wrap flex flex-wrap items-center gap-10 pb-20 pt-28 lg:pt-32">
            <div className="flex flex-[1_1_440px] flex-col gap-6">
              <Reveal><RingMark dots={3} color="#19C2B7" size={80} /></Reveal>
              <Reveal delay={0.04}><p className="eyebrow text-[#BFF0EB]">{seg.label} tours</p></Reveal>
              <Reveal delay={0.08}><h1 className="text-[clamp(48px,6.2vw,94px)] font-extrabold leading-[0.94]">{heading}</h1></Reveal>
              <Reveal delay={0.12}><p className="max-w-[520px] text-[19px] font-medium text-[#DDF3F0]">{intro}</p></Reveal>
              <Reveal delay={0.16}>{ctas(true)}</Reveal>
            </div>
            <div className="grid h-[460px] flex-[1_1_480px] grid-cols-2 grid-rows-2 gap-3 sm:h-[540px]">
              <Reveal delay={0.08} className="relative row-span-2 overflow-hidden rounded-[28px] bg-[#0a524d]">
                <HeroVideo media={media} />
              </Reveal>
              {(mosaic ?? []).slice(0, 2).map((m, i) => (
                <Reveal key={m.id} delay={0.14 + i * 0.06} className="relative overflow-hidden rounded-[28px] bg-[#0a524d]">
                  <Image src={pexels(m.id, 700, 600)} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 25vw" quality={70} className="object-cover" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="packages" className="wrap flex scroll-mt-20 flex-col gap-8 pt-16 sm:pt-20">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[clamp(30px,3.4vw,46px)] leading-none text-ink">{seg.label} packages</h2>
          <span className="text-[15px] font-semibold text-subtle">{items.length} trips · prices per person</span>
        </Reveal>
        <PackageGrid items={items} showTag={false} />
      </section>

      {extra}

      <section className="wrap flex flex-col gap-8 pb-24 pt-20 sm:pt-24">
        <Reveal className="flex max-w-[680px] flex-col gap-4">
          <p className="eyebrow" style={{ color: seg.text }}>Why {seg.label.toLowerCase()} with Ghooomo</p>
          <h2 className="text-[clamp(32px,4vw,54px)] leading-[1.02] text-ink">{whyTitle}</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06} className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-[18px] font-bold" style={{ background: seg.tint, color: seg.text }}>
                0{i + 1}
              </span>
              <span className="font-display text-[21px] text-ink">{w.t}</span>
              <span className="text-[16px] text-muted">{w.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <EnquirySection
        segment={segment}
        bg={seg.soft}
        eyebrow={`${seg.label} enquiry`}
        eyebrowColor={seg.text}
        title={enquiry.title}
        text={enquiry.text}
        submitLabel={enquiry.submit}
      />
    </>
  );
}
