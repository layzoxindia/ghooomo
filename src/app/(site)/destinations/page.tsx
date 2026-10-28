import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquirySection from "@/components/EnquirySection";
import Reveal from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import { destinations } from "@/data/destinations";
import { photoSrc } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Holiday Destinations from India: Travel Guides | Ghooomo" },
  description: "Travel guides to the Maldives, Bali, Dubai, Thailand, Europe, Kashmir, Kerala and Goa: best time to visit, visas, places to see and itineraries.",
  alternates: { canonical: "/destinations" },
  openGraph: { images: [{ url: "/photos/world-santorini.jpg" }] },
};

function Grid({ title, list }: { title: string; list: typeof destinations }) {
  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-[clamp(30px,3.6vw,48px)] leading-[1.06] text-ink">{title}</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d, i) => (
          <Reveal as="li" key={d.slug} delay={i * 0.05}>
            <Link href={`/destinations/${d.slug}`} className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[24px] bg-night p-5 text-white">
              <Image src={photoSrc(d.hero.id)} alt={d.hero.alt} fill sizes="(max-width: 640px) 100vw, 25vw" quality={70} className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" aria-hidden="true" />
              <span className="relative flex flex-col gap-1">
                <span className="text-[26px] font-bold leading-tight">{d.name}</span>
                <span className="text-[15px] font-medium text-on-night">{d.facts[0].value}</span>
                <span className="mt-2 flex items-center gap-2 text-[15px] font-bold">Read the guide <ArrowIcon size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export default function DestinationsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <Image src="/photos/world-santorini.jpg" alt="" fill priority sizes="100vw" quality={70} className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/30" aria-hidden="true" />
        <div className="wrap flex flex-col gap-5">
          <h1 className="max-w-[900px] text-[clamp(44px,6vw,88px)] font-bold leading-[1.02]">Holiday destinations</h1>
          <p className="max-w-[680px] text-[19px] leading-relaxed text-on-night">
            Our travel guides to the places Indian travellers love most: when to go, how to get there, visas, where to stay and what to do. We plan holidays to all of them, and to many more around the world.
          </p>
        </div>
      </section>
      <div className="wrap flex flex-col gap-20 py-16 sm:py-24">
        <Grid title="International destinations" list={destinations.filter((d) => d.region === "International")} />
        <Grid title="Destinations in India" list={destinations.filter((d) => d.region === "India")} />
      </div>
      <EnquirySection title="Looking for somewhere else?" text="We plan holidays worldwide. Tell us where and when, and we’ll put it together for you." />
    </>
  );
}
