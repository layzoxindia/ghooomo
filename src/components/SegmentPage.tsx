import Image from "next/image";
import type { ReactNode } from "react";
import PackageCard from "./PackageCard";
import EnquirySection from "./EnquirySection";
import Reveal from "./Reveal";
import { RingMark } from "./Logo";
import { ArrowIcon } from "./Icons";
import { getCatalog } from "@/lib/server/catalog";
import { segments, type Segment } from "@/lib/site";

type Props = {
  segment: Segment;
  heading: ReactNode;
  intro: string;
  primaryCta: string;
  heroPhoto: string;
  heroAlt: string;
  why: { t: string; d: string }[];
  whyTitle: string;
  extra?: ReactNode;
  enquiry: { title: string; text: string; submit: string };
};

const dots = { solo: 1, couple: 2, group: 3 } as const;
const accent = { solo: "#FF9C7E", couple: "#FFD27A", group: "#6FE3DA" } as const;

export default async function SegmentPage({ segment, heading, intro, primaryCta, heroPhoto, heroAlt, why, whyTitle, extra, enquiry }: Props) {
  const seg = segments[segment];
  const items = (await getCatalog()).filter((p) => p.idealFor.includes(segment));

  return (
    <>
      <section className="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-night text-white">
        <div className="kenburns absolute inset-0 -z-10 motion-reduce:animate-none">
          <Image src={heroPhoto} alt={heroAlt} fill priority sizes="100vw" quality={80} className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,21,48,0.88)_0%,rgba(7,21,48,0.5)_55%,rgba(7,21,48,0.15)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
        <div className="wrap mt-auto flex flex-col gap-6 pb-16 pt-36">
          <Reveal className="flex items-center gap-4">
            <span className="rounded-full bg-white p-1.5"><RingMark dots={dots[segment]} color={seg.color} size={44} /></span>
            <span className="kicker" style={{ color: accent[segment] }}>{seg.label} holidays</span>
          </Reveal>
          <Reveal delay={0.06}><h1 className="max-w-[900px] text-[clamp(44px,6.4vw,96px)] font-bold leading-[1.02]">{heading}</h1></Reveal>
          <Reveal delay={0.1}><p className="max-w-[620px] text-[19px] font-medium leading-relaxed text-on-night">{intro}</p></Reveal>
          <Reveal delay={0.14} className="flex flex-wrap gap-3">
            <a href="#journeys" className="btn btn-primary">{primaryCta} <ArrowIcon /></a>
            <a href="#enquire" className="btn btn-ghost">Ask for a custom plan</a>
          </Reveal>
        </div>
      </section>

      <section id="journeys" className="wrap flex scroll-mt-20 flex-col gap-10 py-20 sm:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(34px,4.2vw,58px)] leading-[1.02] text-ink">{seg.label} holidays</h2>
          </div>
          <span className="text-[16px] font-semibold text-subtle">Trending now · every itinerary can be tailored</span>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 5) * 0.05} className="flex [&>article]:flex-1">
              <PackageCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {extra}

      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.02] text-ink">{whyTitle}</h2>
        </Reveal>
        <dl className="flex flex-col">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.05} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[230px_1fr] sm:gap-8">
              <dt className="flex items-center gap-3 text-[20px] font-bold text-ink">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: seg.color }} aria-hidden="true" />
                {w.t}
              </dt>
              <dd className="text-[17px] leading-relaxed text-muted">{w.d}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <EnquirySection segment={segment} title={enquiry.title} text={enquiry.text} submitLabel={enquiry.submit} />
    </>
  );
}
