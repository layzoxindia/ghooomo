import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import Itinerary from "@/components/Itinerary";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import LocalTimeBadge from "@/components/LocalTimeBadge";
import { ArrowIcon, CheckIcon, XIcon, ClockIcon, PinIcon, PhoneIcon } from "@/components/Icons";
import { packages } from "@/data/packages";
import { getCatalog } from "@/lib/server/catalog";
import { destinationForPackage } from "@/data/destinations";
import { photoSrc, segments, site } from "@/lib/site";
import { cancellationTiers, REFUND_DAYS } from "@/lib/pricing";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
export const revalidate = 300;

function trim(s: string, n = 155) {
  if (s.length <= n) return s;
  return s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[,.;:]$/, "") + "…";
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getCatalog()).find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${p.nights} Nights Holiday Package`,
    description: trim(`${p.nights} nights ${p.title}. ${p.summary}`),
    alternates: { canonical: `/packages/${p.slug}` },
    openGraph: { images: [{ url: photoSrc(p.photos[0].id), width: 1800, height: 1200, alt: p.photos[0].alt }] },
  };
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const p = catalog.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = catalog.filter((x) => x.slug !== p.slug && x.region === p.region).slice(0, 3);
  const [hero, ...gallery] = p.photos;

  const guide = destinationForPackage(p.slug);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Holidays", item: `${site.url}/packages` },
      { "@type": "ListItem", position: 3, name: p.title, item: `${site.url}/packages/${p.slug}` },
    ],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.title,
    description: p.summary,
    touristType: p.idealFor.map((s) => segments[s].label),
    itinerary: { "@type": "ItemList", itemListElement: p.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.title })) },
    provider: { "@type": "TravelAgency", name: site.legalName, telephone: site.phoneE164 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]) }} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-night text-white">
        <div className="kenburns absolute inset-0 -z-10 motion-reduce:animate-none">
          <Image src={photoSrc(hero.id)} alt={hero.alt} fill priority sizes="100vw" quality={80} className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,21,48,0.85)_0%,rgba(7,21,48,0.45)_55%,rgba(7,21,48,0.15)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
        <div className="wrap mt-auto flex flex-col gap-6 pb-14 pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[15px] font-medium text-on-night">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span>
            <Link href="/packages" className="hover:text-white">Holidays</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">{p.destination}</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <span className="tabular rounded-full bg-white px-3.5 py-1.5 text-[14px] font-bold text-ink">{p.nights} nights · {p.days} days</span>
            <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-[14px] font-semibold backdrop-blur">{p.region === "India" ? "India" : p.country}</span>
            {p.idealFor.map((s) => (
              <span key={s} className="flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[14px] font-semibold backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: segments[s].color }} aria-hidden="true" />
                {segments[s].label}
              </span>
            ))}
          </div>
          <h1 className="max-w-[980px] text-[clamp(40px,6vw,88px)] font-bold leading-[1.02]">{p.title}</h1>
          <p className="max-w-[760px] text-[18px] font-medium text-on-night">{p.route}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#enquire-form" className="btn btn-primary">Enquire now</a>
            <LocalTimeBadge clocks={p.clocks} />
          </div>
        </div>
      </section>

      <section className="wrap flex flex-wrap items-start gap-10 pb-16 pt-14 lg:gap-14">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
          <Reveal className="flex flex-col gap-6">
            <p className="text-[20px] leading-relaxed text-text">{p.summary}</p>
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                { k: "Best time", v: p.bestTime, I: ClockIcon },
                { k: "Where you stay", v: p.stayStyle, I: PinIcon },
                { k: "Suits", v: p.idealFor.map((s) => segments[s].label).join(", "), I: CheckIcon },
              ].map(({ k, v, I }) => (
                <div key={k} className="flex gap-3 rounded-[20px] border border-line bg-white p-4">
                  <span className="mt-0.5 text-cta"><I size={20} /></span>
                  <div><dt className="text-[14px] font-semibold text-subtle">{k}</dt><dd className="text-[16px] font-semibold text-ink">{v}</dd></div>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-full bg-paper-2 px-4 py-2 text-[15px] font-semibold text-ink">{h}</li>
              ))}
            </ul>
          </Reveal>

          {gallery.length > 0 && (
            <div className={`grid gap-3 ${gallery.length >= 2 ? "sm:grid-cols-2" : ""}`}>
              {gallery.slice(0, 3).map((ph, i) => (
                <Reveal key={ph.id} delay={i * 0.06} className={`relative overflow-hidden rounded-[24px] bg-paper-2 ${gallery.length === 3 && i === 0 ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"}`}>
                  <Image src={photoSrc(ph.id)} alt={ph.alt} fill sizes="(max-width: 640px) 100vw, 50vw" quality={75} className="object-cover" />
                </Reveal>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(28px,3vw,40px)] text-ink">Day by day</h2>
            <Itinerary days={p.itinerary} accent="#C9431D" />
            <p className="text-[15px] text-subtle">This itinerary can be tailored to suit you.</p>
            {guide && (
              <Link href={`/destinations/${guide.slug}`} className="flex items-center justify-between gap-4 rounded-[22px] bg-paper-2 p-5 text-ink hover:bg-line">
                <span className="flex flex-col">
                  <span className="text-[18px] font-bold">{guide.name} travel guide</span>
                  <span className="text-[15px] text-muted">Best time to visit, visa, places to see and tips</span>
                </span>
                <ArrowIcon className="shrink-0" />
              </Link>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6">
              <h2 className="text-[26px] text-ink">Usually included</h2>
              <ul className="flex flex-col gap-3">
                {p.inclusions.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] font-medium text-text"><CheckIcon className="mt-0.5 shrink-0 text-wa" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6">
              <h2 className="text-[26px] text-ink">Not included</h2>
              <ul className="flex flex-col gap-3">
                {p.exclusions.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] font-medium text-text"><XIcon className="mt-0.5 shrink-0 text-[#B42318]" />{x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(28px,3vw,40px)] text-ink">If you need to cancel</h2>
              <p className="text-[16px] text-muted">
                Standard cancellation charges, as a share of the holiday cost. Refunds are processed within {REFUND_DAYS}.
                {p.region === "International" ? " Flights and visas already issued are refunded only as the airline or embassy allows." : ""}
              </p>
            </div>
            <div className="overflow-hidden rounded-[22px] border border-line bg-white">
              <table className="w-full text-left text-[16px]">
                <caption className="sr-only">Cancellation charges for {p.title}</caption>
                <thead className="bg-paper-2 text-[15px] text-ink">
                  <tr><th scope="col" className="p-4 font-semibold">When you cancel</th><th scope="col" className="p-4 font-semibold">Charge</th><th scope="col" className="p-4 font-semibold">You get back</th></tr>
                </thead>
                <tbody>
                  {cancellationTiers.map((c) => (
                    <tr key={c.label} className="border-t border-line">
                      <td className="p-4 text-muted">{c.label}</td>
                      <td className="tabular p-4 font-semibold text-text">{c.pct}%</td>
                      <td className="tabular p-4 font-semibold text-wa">{100 - c.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[15px] text-subtle">
              Full terms in our <Link href="/cancellation-policy" className="font-semibold text-ink underline underline-offset-2">cancellation and refund policy</Link>.
            </p>
          </div>
        </div>

        <aside id="enquire" className="w-full flex-[1_1_380px] scroll-mt-24 lg:sticky lg:top-24">
          <div className="relative mb-4 overflow-hidden rounded-[26px] bg-night p-7 text-white">
            <div className="ring-gradient absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
            <h2 className="text-[26px] font-bold leading-tight">Like this holiday?</h2>
            <p className="mt-2 text-[16px] font-medium leading-relaxed text-on-night">Share your dates and who is travelling, and we’ll send you the full plan with prices.</p>
            <a href={`tel:${site.phoneE164}`} className="mt-5 flex items-center gap-3 text-[16px] font-semibold hover:text-ring-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><PhoneIcon size={18} /></span>
              {site.phoneDisplay}
            </a>
          </div>
          <div id="enquire-form" className="scroll-mt-24" />
          <EnquiryForm variant="package" segment={p.segment} packageSlug={p.slug} packageTitle={`${p.title} · ${p.nights}N/${p.days}D`} compact submitLabel="Send enquiry" />
        </aside>
      </section>

      {related.length > 0 && (
        <section className="wrap flex flex-col gap-6 pb-32 lg:pb-24">
          <h2 className="text-[clamp(28px,3vw,40px)] text-ink">More holidays {p.region === "India" ? "in India" : "abroad"}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <PackageCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}

      {/* Phones: a quote is always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(15,43,91,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-[640px] items-center justify-between gap-3">
          <p className="flex min-w-0 flex-col">
            <span className="truncate text-[16px] font-bold text-ink">{p.destination}</span>
            <span className="tabular text-[14px] font-semibold text-subtle">{p.nights} nights · tailor-made</span>
          </p>
          <a href="#enquire-form" className="btn btn-primary shrink-0 !min-h-12 !px-5 !text-[16px]">Enquire now</a>
        </div>
      </div>
    </>
  );
}
