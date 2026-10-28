"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { RingMark } from "./Logo";
import { ArrowIcon, GlobeIcon, MountainIcon, SearchIcon, SlidersIcon } from "./Icons";
import type { TravelPackage } from "@/data/packages";
import { parseIntent } from "@/lib/intent";
import { priceOf } from "@/lib/pricing";
import { formatINR, photoSrc, segments } from "@/lib/site";

type Item = TravelPackage & { active?: boolean };

const categories: { label: string; href: string; icon: ReactNode; tint: string }[] = [
  { label: "Solo", href: "/solo", icon: <RingMark dots={1} color={segments.solo.color} size={34} />, tint: "#FBE4DA" },
  { label: "Couple", href: "/couple", icon: <RingMark dots={2} color={segments.couple.color} size={34} />, tint: "#FFF1D6" },
  { label: "Group", href: "/group", icon: <RingMark dots={3} color={segments.group.color} size={34} />, tint: "#D6F1EE" },
  { label: "India", href: "/packages?region=India#results", icon: <MountainIcon className="text-ink" />, tint: "#E3E9F4" },
  { label: "Abroad", href: "/packages?region=International#results", icon: <GlobeIcon className="text-ink" />, tint: "#E3E9F4" },
];

/**
 * Phone-only home screen laid out like a travel app: search, categories,
 * an offer card and a swipeable row of trips. Desktop keeps the full hero.
 */
export default function MobileHome({ items }: { items: Item[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = q.trim().toLowerCase();
    if (!text) return router.push("/packages");
    // A place name goes straight to that destination.
    const hit = items.find((p) => p.destination.toLowerCase().includes(text) || p.title.toLowerCase().includes(text));
    if (hit) return router.push(`/packages?dest=${encodeURIComponent(hit.destination)}#results`);
    // Otherwise read it as a budget sentence: "₹80k for 2 in December".
    const i = parseIntent(q);
    const params = new URLSearchParams();
    if (i.budget) params.set("budget", String(i.perPerson && i.people ? i.budget * i.people : i.budget));
    if (i.people) params.set("people", String(i.people));
    if (i.month) params.set("month", String(i.month));
    router.push(`/packages${params.size ? `?${params}` : ""}#results`);
  }

  const popular = items.slice(0, 6);

  return (
    <div className="md:hidden">
      {/* Top panel */}
      <section className="rounded-b-[32px] bg-ink px-5 pb-8 pt-[96px] text-white">
        <p className="text-[16px] font-semibold text-[#C9D5E6]">Namaste, traveller</p>
        <h1 className="mt-1 text-[38px] font-extrabold leading-[1.05]">
          Find your next <span className="italic text-sun">trip</span>
        </h1>
        <form onSubmit={search} role="search" className="mt-6 flex gap-2.5">
          <label className="flex min-h-[56px] flex-1 items-center gap-3 rounded-2xl bg-white px-4 text-text shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
            <SearchIcon className="shrink-0 text-subtle" />
            <span className="sr-only">Search trips</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Spiti, Bali, ₹30k in Dec…"
              enterKeyHint="search"
              className="w-full min-w-0 bg-transparent text-[17px] font-medium outline-none placeholder:text-[#6B7280]"
            />
          </label>
          <Link
            href="/packages"
            aria-label="All trips with filters"
            className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white ring-1 ring-white/30"
          >
            <SlidersIcon size={22} />
          </Link>
        </form>
        <p className="mt-4 text-[15px] font-medium text-[#DCE4F2]">Prices include taxes · Planned from our Noida office</p>
      </section>

      {/* Categories */}
      <section className="px-5 pt-8" aria-labelledby="m-cat">
        <h2 id="m-cat" className="font-sans text-[20px] font-bold tracking-normal text-ink">Who’s coming?</h2>
        <ul className="mt-4 grid grid-cols-5 gap-2">
          {categories.map((c) => (
            <li key={c.label}>
              <Link href={c.href} className="flex flex-col items-center gap-2 rounded-2xl py-1 active:scale-95">
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl" style={{ background: c.tint }}>
                  {c.icon}
                </span>
                <span className="text-[14px] font-semibold text-text">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Offer card */}
      <section className="px-5 pt-8">
        <Link href="/packages" className="relative flex min-h-[176px] overflow-hidden rounded-[24px] bg-ink text-white">
          <Image src={photoSrc(28843922)} alt="" fill sizes="100vw" quality={70} className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-r from-[#08151E]/90 via-[#08151E]/65 to-transparent" aria-hidden="true" />
          <span className="relative flex max-w-[75%] flex-col justify-center gap-2 p-6">
            <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-sun">No-surprises price</span>
            <span className="font-display text-[26px] font-bold leading-[1.1]">The price you see is the price you pay</span>
            <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-cta)] px-4 py-2 text-[15px] font-bold">
              See trips <ArrowIcon size={16} />
            </span>
          </span>
        </Link>
      </section>

      {/* Popular trips: swipe row */}
      <section className="pt-9" aria-labelledby="m-pop">
        <div className="flex items-center justify-between px-5">
          <h2 id="m-pop" className="font-sans text-[20px] font-bold tracking-normal text-ink">Popular trips</h2>
          <Link href="/packages" className="min-h-11 py-2.5 text-[15px] font-bold text-[var(--color-cta)]">View all</Link>
        </div>
        <ul className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
          {popular.map((p) => (
            <li key={p.slug} className="w-[74%] shrink-0 snap-start">
              <Link href={`/packages/${p.slug}`} className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
                <span className="relative aspect-[4/3]">
                  <Image src={photoSrc(p.photos[0].id)} alt={p.photos[0].alt} fill sizes="75vw" quality={70} className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[13px] font-semibold text-white">
                    {p.nights}N · {p.days}D
                  </span>
                </span>
                <span className="flex flex-col gap-1 p-4">
                  <span className="text-[13px] font-semibold text-subtle">{p.destination}</span>
                  <span className="line-clamp-1 text-[18px] font-bold leading-snug text-ink">{p.title}</span>
                  <span className="mt-1 text-[15px] font-medium text-subtle">
                    from <span className="text-[19px] font-bold text-ink">{formatINR(priceOf(p).total)}</span> /person
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
