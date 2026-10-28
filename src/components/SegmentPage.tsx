import Image from "next/image";
import type { ReactNode } from "react";
import HeroImage from "./HeroImage";
import PackageGrid from "./PackageGrid";
import EnquirySection from "./EnquirySection";
import Reveal from "./Reveal";
import { RingMark } from "./Logo";
import { ArrowIcon } from "./Icons";
import { heroMedia } from "@/lib/media";
import { getCatalog } from "@/lib/server/catalog";
import { photoSrc, segments, type Segment } from "@/lib/site";

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
      <a href="#packages" className="btn btn-primary">
        {primaryCta} <ArrowIcon />
      </a>
      <a
        href="#enquire"
        className={`btn border-2 ${light ? "border-white text-white hover:bg-white/10" : "border-ink text-ink hover:bg-ink hover:text-white"}`}
      >
        Ask for a custom plan
      </a>
    </div>
  );

  return (
    <>
      {segment === "solo" ? (
        // Split hero on paper
        <section className="wrap flex flex-wrap items-center gap-10 pb-12 pt-28 lg:gap-14 lg:pt-32">
          <div className="flex flex-[1_1_440px] flex-col gap-6">
            <Reveal className="flex items-center gap-4"><RingMark dots={1} color={seg.color} size={56} /><span className="text-[17px] font-semibold" style={{ color: seg.text }}>Solo trips</span></Reveal>
            <Reveal delay={0.08}><h1 className="text-[clamp(48px,6.4vw,96px)] font-extrabold leading-[0.94] text-ink">{heading}</h1></Reveal>
            <Reveal delay={0.12}><p className="max-w-[520px] text-[18px] text-muted">{intro}</p></Reveal>
            <Reveal delay={0.16}>{ctas(false)}</Reveal>
          </div>
          <Reveal delay={0.1} className="relative h-[460px] flex-[1_1_460px] overflow-hidden rounded-[34px] bg-[#1d3b4a] sm:h-[580px]">
            <HeroImage media={media} />
          </Reveal>
        </section>
      ) : segment === "couple" ? (
        // Full-bleed photo hero
        <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-[#3E3326] text-white">
          <HeroImage media={media} />
          <div className="absolute inset-0 bg-[#1F160D]/50" aria-hidden="true" />
          <div className="wrap relative z-10 mt-auto flex flex-col gap-6 pb-20 pt-32">
            <Reveal className="flex items-center gap-4"><RingMark dots={2} color={seg.color} size={56} /><span className="text-[17px] font-semibold text-[#FFD88A]">Couple holidays</span></Reveal>
            <Reveal delay={0.08}><h1 className="max-w-[920px] text-[clamp(48px,6.8vw,104px)] font-extrabold leading-[0.94]">{heading}</h1></Reveal>
            <Reveal delay={0.12}><p className="max-w-[560px] text-[19px] font-medium text-[#F5ECE0]">{intro}</p></Reveal>
            <Reveal delay={0.16}>{ctas(true)}</Reveal>
          </div>
        </section>
      ) : (
        // Teal block with photo mosaic
        <section className="bg-group-strong text-white">
          <div className="wrap flex flex-wrap items-center gap-10 pb-20 pt-28 lg:pt-32">
            <div className="flex flex-[1_1_440px] flex-col gap-6">
              <Reveal className="flex items-center gap-4"><RingMark dots={3} color="#19C2B7" size={56} /><span className="text-[17px] font-semibold text-[#BFF0EB]">Group tours</span></Reveal>
              <Reveal delay={0.08}><h1 className="text-[clamp(48px,6.2vw,94px)] font-extrabold leading-[0.94]">{heading}</h1></Reveal>
              <Reveal delay={0.12}><p className="max-w-[520px] text-[19px] font-medium text-[#DDF3F0]">{intro}</p></Reveal>
              <Reveal delay={0.16}>{ctas(true)}</Reveal>
            </div>
            <div className="grid h-[460px] flex-[1_1_480px] grid-cols-2 grid-rows-2 gap-3 sm:h-[540px]">
              <Reveal delay={0.08} className="relative row-span-2 overflow-hidden rounded-[28px] bg-[#0a524d]">
                <HeroImage media={media} />
              </Reveal>
              {(mosaic ?? []).slice(0, 2).map((m, i) => (
                <Reveal key={m.id} delay={0.14 + i * 0.06} className="relative overflow-hidden rounded-[28px] bg-[#0a524d]">
                  <Image src={photoSrc(m.id)} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 25vw" quality={70} className="object-cover" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="packages" className="wrap flex scroll-mt-20 flex-col gap-10 pt-20 sm:pt-28">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[clamp(36px,4.2vw,58px)] leading-none text-ink">{seg.label} trips</h2>
          <span className="text-[15px] font-semibold text-subtle">{items.length} trips · starting prices per person</span>
        </Reveal>
        <PackageGrid items={items} showTag={false} />
      </section>

      {extra}

      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-[clamp(36px,4.4vw,62px)] leading-[0.98] text-ink">{whyTitle}</h2>
        </Reveal>
        <dl className="flex flex-col">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.05} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="flex items-center gap-3 font-display text-[21px] text-ink">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: seg.color }} aria-hidden="true" />
                {w.t}
              </dt>
              <dd className="text-[17px] text-muted">{w.d}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <EnquirySection
        segment={segment}
        bg={seg.soft}
        title={enquiry.title}
        text={enquiry.text}
        submitLabel={enquiry.submit}
      />
    </>
  );
}
