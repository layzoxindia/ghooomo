import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import PackageFinder from "@/components/PackageFinder";
import EnquirySection from "@/components/EnquirySection";
import PackageCard from "@/components/PackageCard";
import { getCatalog } from "@/lib/server/catalog";

export const metadata: Metadata = {
  title: "Journeys | Tailor-made holidays abroad and in India",
  description:
    "Tailor-made holidays to the Maldives, Bali, Vietnam, Thailand, Sri Lanka and Europe, and to Kerala, the Andamans, Sikkim, Meghalaya, Goa and Gujarat. Quoted for your dates.",
  alternates: { canonical: "/packages" },
};

export const revalidate = 300;

export default async function PackagesPage() {
  const packages = await getCatalog();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <Image src="/photos/vietnam-halong-aerial.jpg" alt="" fill priority sizes="100vw" quality={70} className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/30" aria-hidden="true" />
        <div className="wrap flex flex-col gap-5">
          <p className="kicker flex items-center gap-3 text-ring-2"><span className="ring-gradient h-[3px] w-10 rounded-full" aria-hidden="true" />Journeys</p>
          <h1 className="max-w-[860px] text-[clamp(44px,6vw,88px)] font-bold leading-[1.02]">Every journey, planned around you.</h1>
          <p className="max-w-[640px] text-[19px] leading-relaxed text-on-night">
            Use these as a starting point. Each one is changed to suit who is travelling, and quoted for your dates with every hotel named.
          </p>
        </div>
      </section>
      <section className="wrap py-14 sm:py-20">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => <PackageCard key={p.slug} p={p} />)}
            </div>
          }
        >
          <PackageFinder items={packages} />
        </Suspense>
      </section>
      <EnquirySection
        title="Somewhere not on the list?"
        text="Tell us where, when and who is coming. If it is a place we know well, a planner will design the trip and send a quote for your dates."
      />
    </>
  );
}
