import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { ArrowIcon } from "../Icons";
import { destinations } from "@/data/destinations";
import { photoSrc } from "@/lib/site";

/** Links to the destination travel guides, with a one-line teaser each. */
export default function DestinationGuides() {
  return (
    <section className="wrap flex flex-col gap-10 py-24 sm:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex max-w-[680px] flex-col gap-4">
          <h2 className="text-[clamp(36px,4.6vw,64px)] leading-[1.02] text-ink">Destination guides</h2>
          <p className="text-[18px] text-muted">When to go, how to get there, visas for Indian travellers, where to stay and what to do.</p>
        </div>
        <Link href="/destinations" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">All destinations <ArrowIcon /></Link>
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((d, i) => (
          <Reveal as="li" key={d.slug} delay={Math.min(i, 4) * 0.05}>
            <Link href={`/destinations/${d.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white">
              <span className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                <Image src={photoSrc(d.hero.id)} alt={d.hero.alt} fill sizes="(max-width: 640px) 100vw, 25vw" quality={68} className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </span>
              <span className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-[21px] font-bold text-ink">{d.name}</span>
                <span className="text-[15px] leading-relaxed text-muted">{d.tagline}</span>
                <span className="mt-auto flex items-center gap-2 pt-2 text-[15px] font-bold text-cta">Read the guide <ArrowIcon size={15} /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
