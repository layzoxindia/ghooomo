import Image from "next/image";
import Link from "next/link";
import type { TravelPackage } from "@/data/packages";
import { photoSrc, segments } from "@/lib/site";
import { ArrowIcon } from "./Icons";

/** Holiday card. */
export default function PackageCard({ p }: { p: TravelPackage; showTag?: boolean }) {
  const photo = p.photos[0];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[26px] border border-line bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(15,43,91,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image
          src={photoSrc(photo.id)}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={72}
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[14px] font-semibold text-ink">{p.region === "India" ? "India" : p.country}</span>
          <span className="tabular rounded-full bg-night/85 px-3 py-1.5 text-[14px] font-semibold text-white backdrop-blur">
            {p.nights}N · {p.days}D
          </span>
        </div>
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[14px] font-semibold text-ink">
          {p.idealFor.map((s) => (
            <span key={s} className="h-2.5 w-2.5 rounded-full" style={{ background: segments[s].color }} aria-hidden="true" />
          ))}
          <span className="ml-1">{p.idealFor.map((s) => segments[s].label).join(" · ")}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[23px] font-bold leading-[1.15] text-ink">
          <Link href={`/packages/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[16px] text-muted">{p.highlights.slice(0, 3).join(" · ")}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <p className="flex flex-col">
            <span className="text-[14px] font-semibold text-subtle">Best time</span>
            <span className="text-[16px] font-bold text-ink">{p.bestTime.replace(/ \(.*\)$/, "")}</span>
          </p>
          <span className="flex items-center gap-2 text-[15px] font-bold text-cta">
            View holiday
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-white transition-transform duration-500 group-hover:translate-x-1">
              <ArrowIcon size={16} />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
