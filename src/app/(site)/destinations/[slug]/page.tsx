import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquirySection from "@/components/EnquirySection";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import { ArrowIcon, CheckIcon, PlusIcon } from "@/components/Icons";
import { destinations, getDestination } from "@/data/destinations";
import type { Rating } from "@/data/destinations/types";
import { getCatalog } from "@/lib/server/catalog";
import { photoSrc, site } from "@/lib/site";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: { absolute: `${d.seoTitle} | Ghooomo` },
    description: d.metaDescription,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: d.seoTitle, description: d.metaDescription, images: [{ url: photoSrc(d.hero.id), alt: d.hero.alt }] },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ratingStyle: Record<Rating, { bg: string; fg: string; label: string }> = {
  best: { bg: "#0B6B65", fg: "#FFFFFF", label: "Best" },
  good: { bg: "#F7AE2A", fg: "#0F2B5B", label: "Good" },
  low: { bg: "#DCE2EC", fg: "#354156", label: "Off season" },
};

const toc = [
  { id: "overview", t: "Overview" },
  { id: "best-time", t: "Best time to visit" },
  { id: "how-to-reach", t: "How to reach" },
  { id: "entry", t: "Visa & entry" },
  { id: "places", t: "Places to visit" },
  { id: "things-to-do", t: "Things to do" },
  { id: "where-to-stay", t: "Where to stay" },
  { id: "itineraries", t: "Sample itineraries" },
  { id: "tips", t: "Travel tips" },
  { id: "faqs", t: "FAQs" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-[clamp(28px,3.2vw,42px)] leading-[1.08] text-ink">
      {children}
    </h2>
  );
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const catalog = await getCatalog();
  const packs = catalog.filter((p) => d.packageSlugs.includes(p.slug));
  const others = destinations.filter((x) => x.slug !== d.slug && x.region === d.region).slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: d.name,
      description: d.metaDescription,
      url: `${site.url}/destinations/${d.slug}`,
      image: `${site.url}${photoSrc(d.hero.id)}`,
      touristType: d.goodFor.map((g) => g.t),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Destinations", item: `${site.url}/destinations` },
        { "@type": "ListItem", position: 3, name: d.name, item: `${site.url}/destinations/${d.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] flex-col overflow-hidden bg-night text-white">
        <Image src={photoSrc(d.hero.id)} alt={d.hero.alt} fill priority sizes="100vw" quality={80} className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,21,48,0.88)_0%,rgba(7,21,48,0.5)_55%,rgba(7,21,48,0.15)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
        <div className="wrap mt-auto flex flex-col gap-6 pb-12 pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[15px] font-medium text-on-night">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span>
            <Link href="/destinations" className="hover:text-white">Destinations</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">{d.name}</span>
          </nav>
          <h1 className="max-w-[900px] text-[clamp(42px,6vw,88px)] font-bold leading-[1.02]">{d.h1}</h1>
          <p className="max-w-[640px] text-[19px] font-medium leading-relaxed text-on-night">{d.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#enquire" className="btn btn-primary">Plan my {d.name} holiday <ArrowIcon /></a>
            {packs.length > 0 && <a href="#packages" className="btn btn-ghost">See {d.name} packages</a>}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {d.facts.map((f) => (
              <div key={f.label} className="glass rounded-2xl p-4">
                <dt className="text-[14px] font-semibold text-on-night">{f.label}</dt>
                <dd className="mt-1 text-[16px] font-bold leading-snug text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="wrap grid gap-12 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
        {/* Contents */}
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 flex flex-col gap-1 border-l-2 border-line pl-5">
            <p className="mb-2 text-[14px] font-bold uppercase tracking-[0.12em] text-subtle">On this page</p>
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="py-1.5 text-[16px] font-semibold text-muted hover:text-ink">{t.t}</a>
            ))}
            {packs.length > 0 && <a href="#packages" className="py-1.5 text-[16px] font-semibold text-muted hover:text-ink">Packages</a>}
          </nav>
        </aside>

        <article className="flex min-w-0 flex-col gap-20">
          {/* Overview */}
          <section className="flex flex-col gap-7">
            <H2 id="overview">About {d.name}</H2>
            <div className="flex max-w-[760px] flex-col gap-5 text-[18px] leading-relaxed text-text">
              {d.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {d.goodFor.map((g) => (
                <li key={g.t} className="rounded-[22px] border border-line bg-white p-5">
                  <p className="text-[18px] font-bold text-ink">{g.t}</p>
                  <p className="mt-1 text-[16px] leading-relaxed text-muted">{g.d}</p>
                </li>
              ))}
            </ul>
            {d.gallery.length > 0 && (
              <div className={`grid gap-3 ${d.gallery.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {d.gallery.slice(0, 3).map((g, i) => (
                  <Reveal key={String(g.id)} delay={i * 0.05} className={`relative overflow-hidden rounded-[24px] bg-paper-2 ${d.gallery.length === 3 && i === 0 ? "aspect-[16/8] sm:col-span-2" : "aspect-[4/3]"}`}>
                    <Image src={photoSrc(g.id)} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" quality={72} className="object-cover" />
                  </Reveal>
                ))}
              </div>
            )}
          </section>

          {/* Best time */}
          <section className="flex flex-col gap-7">
            <H2 id="best-time">Best time to visit {d.name}</H2>
            <div className="overflow-x-auto rounded-[22px] border border-line bg-white p-4 sm:p-5">
              <ol className="grid min-w-[560px] grid-cols-12 gap-1.5">
                {d.months.map((r, i) => (
                  <li key={MONTHS[i]} className="flex flex-col items-center gap-1.5 rounded-xl py-3 text-center" style={{ background: ratingStyle[r].bg, color: ratingStyle[r].fg }}>
                    <span className="text-[15px] font-bold">{MONTHS[i]}</span>
                    <span className="sr-only">{ratingStyle[r].label}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold text-muted">
                {(["best", "good", "low"] as Rating[]).map((r) => (
                  <span key={r} className="flex items-center gap-2"><span className="h-3 w-3 rounded" style={{ background: ratingStyle[r].bg }} aria-hidden="true" />{ratingStyle[r].label}</span>
                ))}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {d.seasons.map((s) => (
                <div key={s.name} className="flex flex-col gap-2 rounded-[22px] border border-line bg-white p-5">
                  <p className="text-[18px] font-bold text-ink">{s.name}</p>
                  <p className="text-[15px] font-semibold text-solo-text">{s.when}</p>
                  <p className="text-[16px] leading-relaxed text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to reach */}
          <section className="flex flex-col gap-5">
            <H2 id="how-to-reach">How to reach {d.name}</H2>
            <div className="flex max-w-[760px] flex-col gap-4 text-[18px] leading-relaxed text-text">
              {d.reach.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Entry */}
          <section className="flex flex-col gap-5">
            <H2 id="entry">{d.entry.title}</H2>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex flex-col gap-4 text-[18px] leading-relaxed text-text">
                {d.entry.text.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="rounded-[22px] bg-night p-6 text-white">
                <p className="text-[18px] font-bold">Checklist</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.entry.checklist.map((c) => (
                    <li key={c} className="flex gap-3 text-[16px] font-medium text-on-night"><CheckIcon size={18} className="mt-0.5 shrink-0 text-[#5BE0D5]" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            {d.region === "International" && (
              <p className="text-[15px] text-subtle">Entry rules can change. We confirm the current requirements for your dates before you book.</p>
            )}
          </section>

          {/* Places */}
          <section className="flex flex-col gap-7">
            <H2 id="places">Places to visit in {d.name}</H2>
            <ol className="grid gap-4 sm:grid-cols-2">
              {d.places.map((p, i) => (
                <li key={p.name} className="flex gap-4 rounded-[22px] border border-line bg-white p-5">
                  <span className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-2 text-[15px] font-bold text-ink">{i + 1}</span>
                  <span className="flex flex-col gap-1">
                    <h3 className="text-[19px] font-bold text-ink">{p.name}</h3>
                    <span className="text-[16px] leading-relaxed text-muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Things to do */}
          <section className="flex flex-col gap-7">
            <H2 id="things-to-do">Things to do in {d.name}</H2>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {d.things.map((t) => (
                <li key={t.name} className="flex flex-col gap-1 border-t border-line py-5">
                  <h3 className="text-[19px] font-bold text-ink">{t.name}</h3>
                  <span className="text-[16px] leading-relaxed text-muted">{t.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stay */}
          <section className="flex flex-col gap-7">
            <H2 id="where-to-stay">Where to stay in {d.name}</H2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {d.stay.map((s) => (
                <li key={s.name} className="rounded-[22px] border border-line bg-white p-5">
                  <h3 className="text-[19px] font-bold text-ink">{s.name}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Itineraries */}
          <section className="flex flex-col gap-7">
            <H2 id="itineraries">Sample {d.name} itineraries</H2>
            <div className="grid gap-5 lg:grid-cols-2">
              {d.itineraries.map((it) => (
                <div key={it.title} className="rounded-[22px] border border-line bg-white p-6">
                  <h3 className="text-[21px] font-bold text-ink">{it.title}</h3>
                  <ol className="mt-4 flex flex-col">
                    {it.days.map((day, i) => (
                      <li key={i} className="grid grid-cols-[64px_1fr] gap-3 border-t border-line py-2.5 text-[16px]">
                        <span className="font-bold text-solo-text">Day {i + 1}</span>
                        <span className="text-text">{day}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="text-[16px] text-muted">Every itinerary can be changed to suit your dates, pace and who is travelling.</p>
          </section>

          {/* Tips */}
          <section className="flex flex-col gap-6">
            <H2 id="tips">{d.name} travel tips</H2>
            <ul className="flex max-w-[800px] flex-col gap-3">
              {d.tips.map((t) => (
                <li key={t} className="flex gap-3 text-[17px] leading-relaxed text-text"><CheckIcon size={20} className="mt-1 shrink-0 text-wa" />{t}</li>
              ))}
            </ul>
          </section>

          {/* Packages */}
          {packs.length > 0 && (
            <section className="flex scroll-mt-28 flex-col gap-7" id="packages">
              <h2 className="text-[clamp(28px,3.2vw,42px)] leading-[1.08] text-ink">{d.name} holiday packages</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {packs.map((p) => <PackageCard key={p.slug} p={p} />)}
              </div>
            </section>
          )}

          {/* FAQs */}
          <section className="flex flex-col gap-6">
            <H2 id="faqs">{d.name} FAQs</H2>
            <div className="flex flex-col rounded-[22px] border border-line bg-white px-5 sm:px-7">
              {d.faqs.map((f) => (
                <details key={f.q} className="group border-b border-line last:border-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] font-bold text-ink [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <span className="shrink-0 transition-transform duration-300 group-open:rotate-45"><PlusIcon /></span>
                  </summary>
                  <p className="pb-5 text-[17px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* More */}
          {others.length > 0 && (
            <section className="flex flex-col gap-5">
              <h2 className="text-[clamp(24px,2.6vw,32px)] text-ink">More destinations {d.region === "India" ? "in India" : "abroad"}</h2>
              <ul className="flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/destinations/${o.slug}`} className="flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line-strong bg-white px-5 text-[16px] font-semibold text-ink hover:border-ink">
                      {o.name} <ArrowIcon size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>

      <EnquirySection title={`Plan your ${d.name} holiday`} text={`Tell us your dates, who is travelling and what you would like to do in ${d.name}, and we’ll put together a plan for you.`} />
    </>
  );
}
