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
          <p className="eyebrow text-solo-text">All packages</p>
          <h1 className="text-[clamp(42px,5.4vw,76px)] font-extrabold leading-[0.96] text-ink">Find your next holiday.</h1>
          <p className="max-w-[620px] text-[18px] text-muted">Every price is a real starting price per person, with what’s included spelled out. Don’t see what you want? We build custom trips too.</p>
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
      <EnquirySection title="Want something custom?" text="Tell us where, when and who — a planner will build a trip and send it to you on WhatsApp." />
    </>
  );
}
