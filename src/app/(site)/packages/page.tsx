import type { Metadata } from "next";
import { Suspense } from "react";
import PackageFinder from "@/components/PackageFinder";
import EnquirySection from "@/components/EnquirySection";
import PackageCard from "@/components/PackageCard";
import { getCatalog } from "@/lib/server/catalog";

export const metadata: Metadata = {
  title: "All Holiday Packages",
  description: "Browse solo, couple and group holiday packages across India and abroad with clear starting prices. Filter by destination and budget.",
  alternates: { canonical: "/packages" },
};

export const revalidate = 300;

export default async function PackagesPage() {
  const packages = await getCatalog();
  return (
    <>
      <section className="wrap flex flex-col gap-8 pb-10 pt-28 sm:pt-32">
        <div className="flex flex-col gap-4">
          <h1 className="text-[clamp(42px,5.4vw,76px)] font-extrabold leading-[0.96] text-ink">All trips</h1>
          <p className="max-w-[620px] text-[18px] text-muted">Starting prices per person, with inclusions listed on every trip. Can’t find what you want? Ask us for a custom plan.</p>
        </div>
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
      <div className="h-16" />
      <EnquirySection title="Want something custom?" text="Tell us where, when and who is coming. A planner will put a trip together and send it on WhatsApp." />
    </>
  );
}
