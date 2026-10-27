import Image from "next/image";
import Link from "next/link";
import type { TravelPackage } from "@/data/packages";
import { formatINR, pexels, segments, waLink } from "@/lib/site";
import { ArrowIcon, ChatIcon } from "./Icons";

export default function PackageCard({ p, showTag = true }: { p: TravelPackage; showTag?: boolean }) {
  const seg = segments[p.segment];
  const photo = p.photos[0];
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(15,43,91,0.12)]">
      <Link href={`/packages/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image
          src={pexels(photo.id, 900, 675)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={70}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {showTag && (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em]"
            style={{ background: p.segment === "couple" ? seg.color : seg.strong, color: p.segment === "couple" ? "#0F2B5B" : "#fff" }}
          >
            {seg.label}
          </span>
        )}
        <span className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-[13px] font-semibold text-text">
          {p.nights}N / {p.days}D
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[24px] leading-tight text-ink">
          <Link href={`/packages/${p.slug}`} className="decoration-2 underline-offset-4 hover:underline">
            {p.title}
          </Link>
        </h3>
        <p className="text-[15px] font-medium text-subtle">{p.destination} · {p.region}</p>
        <ul className="flex flex-wrap gap-2">
          {p.highlights.slice(0, 2).map((h) => (
            <li key={h} className="rounded-full bg-paper px-3 py-1 text-[13px] font-semibold text-muted">{h}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-subtle">From</span>
            <span className="text-[24px] font-bold leading-none text-ink">{formatINR(p.price)}</span>
            <span className="mt-1 text-[12px] font-medium text-subtle">{p.priceBasis.split(" · ")[0]}</span>
          </div>
          <div className="flex gap-2">
            <Link href={`/packages/${p.slug}`} className="btn min-h-[46px] border-2 border-ink px-4 text-ink hover:bg-ink hover:text-white" aria-label={`View ${p.title}`}>
              View <ArrowIcon size={16} />
            </Link>
            <a
              href={waLink(`Hi Ghooomo! I'm interested in ${p.title} (${p.nights}N/${p.days}D).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn min-h-[46px] w-[46px] bg-wa p-0 text-white hover:bg-wa-deep"
              aria-label={`Ask about ${p.title} on WhatsApp`}
            >
              <ChatIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
