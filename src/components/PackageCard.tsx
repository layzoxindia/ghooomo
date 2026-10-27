import Image from "next/image";
import Link from "next/link";
import type { TravelPackage } from "@/data/packages";
import { formatINR, pexels, segments, waLink } from "@/lib/site";
import { ArrowIcon, ChatIcon } from "./Icons";

export default function PackageCard({ p, showTag = true }: { p: TravelPackage; showTag?: boolean }) {
  const seg = segments[p.segment];
  const photo = p.photos[0];
  return (
    <article className="group relative flex flex-col gap-5">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[22px] bg-paper-2">
        <Image
          src={pexels(photo.id, 900, 720)}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={70}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          {showTag ? (
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-semibold text-ink">
              <span className="h-2 w-2 rounded-full" style={{ background: seg.color }} />
              {seg.label}
            </span>
          ) : <span />}
          <span className="rounded-full bg-ink/80 px-3 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
            {p.nights}N · {p.days}D
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1">
        <p className="text-[14px] font-semibold text-subtle">{p.destination}{p.region === "International" ? "" : ", India"}</p>
        <h3 className="text-[25px] leading-[1.1] text-ink">
          <Link href={`/packages/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[15px] text-muted">{p.highlights.join(" · ")}</p>
        <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-4">
          <p className="flex flex-col">
            <span className="text-[13px] font-medium text-subtle">From</span>
            <span className="text-[24px] font-bold leading-tight text-ink">{formatINR(p.price)}</span>
            <span className="text-[12px] font-medium text-subtle">{p.priceBasis.split(" · ")[0]}</span>
          </p>
          <div className="relative z-10 flex items-center gap-2">
            <a
              href={waLink(`Hi Ghooomo! I'm interested in ${p.title} (${p.nights}N/${p.days}D).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-wa text-white transition-colors hover:bg-wa-deep"
              aria-label={`Ask about ${p.title} on WhatsApp`}
            >
              <ChatIcon />
            </a>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors group-hover:bg-ink group-hover:text-white" aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
