import type { ReactNode } from "react";

export default function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <article className="wrap max-w-[860px] pb-24 pt-28 sm:pt-32">
      <p className="text-[15px] font-semibold text-subtle">Last updated {updated}</p>
      <h1 className="mt-4 text-[clamp(38px,5vw,64px)] font-extrabold leading-[0.98] text-ink">{title}</h1>
      {intro && <div className="mt-6 text-[18px] text-muted">{intro}</div>}
      <div className="prose-legal mt-8 text-[17px]">{children}</div>
    </article>
  );
}
