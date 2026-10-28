import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquirySection from "@/components/EnquirySection";
import Reveal from "@/components/Reveal";
import { ArrowIcon, CheckIcon, PlusIcon } from "@/components/Icons";
import { getDestination } from "@/data/destinations";
import { getGuide, guides } from "@/data/guides";
import { photoSrc, site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/holidays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.seoTitle} | Ghooomo` },
    description: g.metaDescription,
    alternates: { canonical: `/holidays/${g.slug}` },
    openGraph: { title: g.seoTitle, description: g.metaDescription, images: [{ url: photoSrc(g.hero.id), alt: g.hero.alt }] },
  };
}

const h2 = "text-[clamp(28px,3.2vw,42px)] leading-[1.08] text-ink";

export default async function GuidePage({ params }: PageProps<"/holidays/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const others = guides.filter((x) => x.slug !== g.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: g.picksTitle,
      itemListElement: g.picks.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        ...(p.dest ? { url: `${site.url}/destinations/${p.dest}` } : {}),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Destinations", item: `${site.url}/destinations` },
        { "@type": "ListItem", position: 3, name: g.nav, item: `${site.url}/holidays/${g.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate flex min-h-[72svh] flex-col overflow-hidden bg-night text-white">
        <Image src={photoSrc(g.hero.id)} alt={g.hero.alt} fill priority sizes="100vw" quality={80} className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,21,48,0.9)_0%,rgba(7,21,48,0.55)_55%,rgba(7,21,48,0.2)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
        <div className="wrap mt-auto flex flex-col gap-6 pb-14 pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[15px] font-medium text-on-night">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span>
            <Link href="/destinations" className="hover:text-white">Destinations</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">{g.nav}</span>
          </nav>
          <h1 className="max-w-[920px] text-[clamp(40px,5.6vw,84px)] font-bold leading-[1.03]">{g.h1}</h1>
          <p className="max-w-[640px] text-[19px] font-medium leading-relaxed text-on-night">{g.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#enquire" className="btn btn-primary">Plan my holiday <ArrowIcon /></a>
            <a href="#picks" className="btn btn-ghost">See the destinations</a>
          </div>
        </div>
      </section>

      <div className="wrap flex flex-col gap-20 py-16 lg:py-24">
        <section className="flex max-w-[800px] flex-col gap-5 text-[19px] leading-relaxed text-text">
          {g.intro.map((p, i) => <p key={i}>{p}</p>)}
        </section>

        <section id="picks" className="flex scroll-mt-28 flex-col gap-8">
          <div className="flex max-w-[760px] flex-col gap-3">
            <h2 className={h2}>{g.picksTitle}</h2>
            <p className="text-[18px] text-muted">{g.picksIntro}</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {g.picks.map((p, i) => {
              const d = p.dest ? getDestination(p.dest) : undefined;
              const body = (
                <>
                  {d && (
                    <span className="relative block aspect-[16/9] overflow-hidden rounded-[18px] bg-paper-2">
                      <Image src={photoSrc(d.hero.id)} alt={d.hero.alt} fill sizes="(max-width: 768px) 100vw, 45vw" quality={68} className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    </span>
                  )}
                  <span className="flex flex-col gap-2 p-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[22px] font-bold text-ink">{p.name}</h3>
                      <span className="text-[15px] font-semibold text-solo-text">{p.when}</span>
                    </span>
                    <span className="text-[16px] leading-relaxed text-muted">{p.text}</span>
                    {d && <span className="mt-1 flex items-center gap-2 text-[15px] font-bold text-ink">Read the {d.name} guide <ArrowIcon size={15} className="transition-transform group-hover:translate-x-1" /></span>}
                  </span>
                </>
              );
              return (
                <Reveal as="li" key={p.name} delay={(i % 2) * 0.05}>
                  {d ? (
                    <Link href={`/destinations/${d.slug}`} className="group flex h-full flex-col gap-4 rounded-[24px] border border-line bg-white p-4 hover:border-line-strong">{body}</Link>
                  ) : (
                    <div className="flex h-full flex-col gap-4 rounded-[24px] border border-line bg-white p-5">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </section>

        {g.sections.map((s) => (
          <section key={s.heading} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <h2 className={h2}>{s.heading}</h2>
            <div className="flex flex-col gap-5">
              {s.paras.map((p, i) => <p key={i} className="text-[18px] leading-relaxed text-text">{p}</p>)}
              {s.bullets && (
                <ul className="flex flex-col gap-3 rounded-[22px] bg-paper-2 p-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[17px] leading-relaxed text-text"><CheckIcon size={20} className="mt-1 shrink-0 text-wa" />{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        {g.table && (
          <section className="flex flex-col gap-7">
            <div className="flex max-w-[760px] flex-col gap-3">
              <h2 className={h2}>{g.table.heading}</h2>
              <p className="text-[18px] text-muted">{g.table.intro}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {g.table.groups.map((grp) => (
                <div key={grp.label} className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6">
                  <div>
                    <h3 className="text-[21px] font-bold text-ink">{grp.label} <span className="tabular text-subtle">({grp.countries.length})</span></h3>
                    <p className="mt-1 text-[15px] text-muted">{grp.note}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {grp.countries.map((c) => (
                      <li key={c} className="rounded-full bg-paper-2 px-3 py-1.5 text-[15px] font-medium text-text">{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-[15px] text-subtle">{g.table.source} Entry rules can change. We confirm the current requirements for your dates before you book.</p>
          </section>
        )}

        <section className="flex flex-col gap-6">
          <h2 className={h2}>Frequently asked questions</h2>
          <div className="flex flex-col rounded-[22px] border border-line bg-white px-5 sm:px-7">
            {g.faqs.map((f) => (
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

        <section className="flex flex-col gap-5">
          <h2 className="text-[clamp(24px,2.6vw,32px)] text-ink">More holiday guides</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/holidays/${o.slug}`} className="flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line-strong bg-white px-5 text-[16px] font-semibold text-ink hover:border-ink">
                  {o.nav} <ArrowIcon size={15} />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/destinations" className="flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line-strong bg-white px-5 text-[16px] font-semibold text-ink hover:border-ink">
                All destinations <ArrowIcon size={15} />
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <EnquirySection title="Tell us where you’d like to go" text="Share your dates, who is travelling and the kind of holiday you have in mind, and we’ll suggest the right destination and plan it for you." />
    </>
  );
}
