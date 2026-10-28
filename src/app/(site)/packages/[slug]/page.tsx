import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import Itinerary from "@/components/Itinerary";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import { CheckIcon, XIcon, ClockIcon, PinIcon } from "@/components/Icons";
import { packages } from "@/data/packages";
import { getCatalog } from "@/lib/server/catalog";
import { formatINR, photoSrc, segments, site } from "@/lib/site";
import { cancellationFor, priceOf, REFUND_DAYS } from "@/lib/pricing";
import NoSurprises from "@/components/NoSurprises";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
export const revalidate = 300;

// Gallery layout on desktop: first photo large, the rest fill a 4×2 grid.
function tileClass(i: number, n: number) {
  if (n === 1) return "";
  if (i === 0) return n === 2 ? "md:col-span-3 md:row-span-2" : "md:col-span-2 md:row-span-2";
  const hide = "hidden md:block";
  if (n === 2) return `${hide} md:row-span-2`;
  if (n === 3) return `${hide} md:col-span-2`;
  if (n === 4 && i === 3) return `${hide} md:col-span-2`;
  return hide;
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getCatalog()).find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} · ${p.nights}N/${p.days}D from ${formatINR(priceOf(p).total)}`,
    description: p.summary,
    alternates: { canonical: `/packages/${p.slug}` },
    openGraph: { images: [{ url: photoSrc(p.photos[0].id), width: 1800, height: 1200, alt: p.photos[0].alt }] },
  };
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const p = catalog.find((x) => x.slug === slug);
  if (!p) notFound();
  const seg = segments[p.segment];
  const related = catalog.filter((x) => x.slug !== p.slug && x.segment === p.segment).slice(0, 3);
  const gallery = p.photos;
  const price = priceOf(p);
  const cancel = cancellationFor(price.total);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.title,
    description: p.summary,
    touristType: seg.label,
    itinerary: { "@type": "ItemList", itemListElement: p.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.title })) },
    offers: { "@type": "Offer", price: priceOf(p).total, priceCurrency: "INR", availability: "https://schema.org/InStock", url: `${site.url}/packages/${p.slug}` },
    provider: { "@type": "TravelAgency", name: site.legalName, telephone: site.phoneE164 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap flex flex-col gap-6 pt-28 sm:pt-32">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[14px] font-medium text-subtle">
          <Link href="/" className="hover:text-ink">Home</Link><span aria-hidden="true">/</span>
          <Link href={seg.href} className="hover:text-ink">{seg.label}</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-text">{p.title}</span>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em]" style={{ background: p.segment === "couple" ? seg.color : seg.strong, color: p.segment === "couple" ? "#0F2B5B" : "#fff" }}>{seg.label}</span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-ink">{p.nights}N / {p.days}D</span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-ink">{p.region}</span>
            </div>
            <h1 className="text-[clamp(40px,5.4vw,76px)] font-extrabold leading-[1.02] text-ink">{p.title}</h1>
            <p className="max-w-[720px] text-[17px] font-medium text-muted">{p.route}</p>
          </div>
        </div>

        <div className={`grid h-[420px] gap-3 sm:h-[520px] ${gallery.length > 1 ? "md:grid-cols-4 md:grid-rows-2" : ""}`}>
          {gallery.slice(0, 5).map((ph, i) => (
            <div key={ph.id} className={`relative overflow-hidden rounded-[24px] bg-paper-2 ${tileClass(i, gallery.length)}`}>
              <Image src={photoSrc(ph.id)} alt={ph.alt} fill priority={i === 0} sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "25vw"} quality={80} className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="wrap flex flex-wrap items-start gap-10 pb-16 pt-12">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-12">
          <Reveal className="flex flex-col gap-5">
            <p className="text-[19px] leading-relaxed text-text">{p.summary}</p>
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                { k: "Starts from", v: p.startCity, I: PinIcon },
                { k: "Best time", v: p.bestTime, I: ClockIcon },
                { k: "Pace", v: p.pace, I: CheckIcon },
              ].map(({ k, v, I }) => (
                <div key={k} className="flex gap-3 rounded-[18px] border border-line bg-white p-4">
                  <span className="mt-0.5 text-ink"><I size={20} /></span>
                  <div><dt className="text-[13px] font-semibold text-subtle">{k}</dt><dd className="text-[15px] font-semibold text-ink">{v}</dd></div>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-full px-4 py-2 text-[14px] font-semibold" style={{ background: seg.tint, color: seg.text }}>{h}</li>
              ))}
            </ul>
          </Reveal>

          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(28px,3vw,38px)] text-ink">Day-by-day plan</h2>
            <Itinerary days={p.itinerary} accent={seg.text} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6">
              <h2 className="text-[26px] text-ink">Included</h2>
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
              <h2 className="text-[clamp(28px,3vw,38px)] text-ink">If you need to cancel</h2>
              <p className="text-[16px] text-muted">
                Worked out on the starting price of {formatINR(price.total)} per person. Refunds reach your account within {REFUND_DAYS}.
                {p.region === "International" ? " Flights and visas already issued are refunded only as the airline or embassy allows." : ""}
              </p>
            </div>
            <div className="overflow-x-auto rounded-[22px] border border-line bg-white">
              <table className="w-full min-w-[520px] text-left text-[16px]">
                <caption className="sr-only">Cancellation charges per person for {p.title}</caption>
                <thead className="bg-paper-2 text-[14px] text-ink">
                  <tr><th scope="col" className="p-4 font-semibold">When you cancel</th><th scope="col" className="p-4 font-semibold">You pay</th><th scope="col" className="p-4 font-semibold">You get back</th></tr>
                </thead>
                <tbody>
                  {cancel.map((c) => (
                    <tr key={c.label} className="border-t border-line">
                      <td className="p-4 text-muted">{c.label}</td>
                      <td className="p-4 font-semibold text-text">{formatINR(c.charge)} <span className="font-medium text-subtle">({c.pct}%)</span></td>
                      <td className="p-4 font-semibold text-wa">{formatINR(c.refund)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] text-subtle">
              Your final price depends on dates, hotel availability and group size, and is confirmed in writing before you pay anything. Full terms in our{" "}
              <Link href="/cancellation-policy" className="font-semibold text-ink underline underline-offset-2">cancellation and refund policy</Link>.
            </p>
          </div>
        </div>

        <aside id="enquire" className="w-full flex-[1_1_360px] scroll-mt-24 lg:sticky lg:top-24">
          <div className="mb-4 flex flex-col gap-1 rounded-[24px] bg-ink p-6 text-white">
            <span className="text-[14px] font-medium text-[#C4D0E4]">Starting from, all taxes included</span>
            <span className="text-[42px] font-bold leading-none">{formatINR(price.total)}</span>
            <span className="text-[14px] font-medium text-[#DCE4F2]">{p.priceBasis}</span>
            <dl className="mt-4 flex flex-col gap-2 border-t border-white/20 pt-4 text-[15px]">
              <div className="flex justify-between gap-4"><dt className="text-[#C4D0E4]">Package price</dt><dd className="font-semibold">{formatINR(price.base)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#C4D0E4]">GST (5%)</dt><dd className="font-semibold">{formatINR(price.gst)}</dd></div>
              <div className="flex justify-between gap-4 border-t border-white/20 pt-2"><dt className="font-semibold">You pay</dt><dd className="font-bold">{formatINR(price.total)}</dd></div>
            </dl>
            <div className="mt-3 flex flex-col gap-2">
              {price.tcs > 0 && (
                <div className="flex flex-col gap-1 rounded-xl bg-white/8 p-3 text-[14px] text-[#DCE4F2]">
                  <span className="flex justify-between gap-4"><span>TCS (2%) collected at payment</span><span className="font-semibold text-white">{formatINR(price.tcs)}</span></span>
                  <span>Not a fee. It is income tax paid in advance and you claim it back when you file your ITR.</span>
                </div>
              )}
              <p className="text-[14px] text-[#C4D0E4]">No booking fee, no convenience fee, nothing added at checkout.</p>
            </div>
            <a href="#enquire-form" className="btn btn-primary mt-4">Check dates &amp; price</a>
          </div>
          <div id="enquire-form" className="scroll-mt-24" />
          <EnquiryForm variant="package" segment={p.segment} packageSlug={p.slug} packageTitle={`${p.title} · ${p.nights}N/${p.days}D`} compact submitLabel="Check dates & price" />
        </aside>
      </section>

      <div className="wrap pb-20"><NoSurprises compact /></div>

      {/* Phones: price and enquiry always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/98 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(15,43,91,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-[640px] items-center justify-between gap-3">
          <p className="flex min-w-0 flex-col">
            <span className="text-[13px] font-semibold text-subtle">From, taxes included</span>
            <span className="text-[22px] font-bold leading-tight text-ink">{formatINR(price.total)}<span className="text-[14px] font-semibold text-subtle"> /person</span></span>
          </p>
          <a href="#enquire-form" className="btn btn-primary shrink-0 !min-h-12 !px-5 !text-[16px]">Check dates</a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap flex flex-col gap-6 pb-32 lg:pb-24">
          <h2 className="text-[clamp(28px,3vw,40px)] text-ink">More {seg.label.toLowerCase()} trips</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <PackageCard key={r.slug} p={r} showTag={false} />)}
          </div>
        </section>
      )}
    </>
  );
}
