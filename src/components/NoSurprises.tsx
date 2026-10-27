import Reveal from "./Reveal";

const promises = [
  { t: "One price, taxes included", d: "The price you see includes GST. No booking fee or convenience fee is added later." },
  { t: "Nothing ticked for you", d: "Insurance, upgrades and extras are never pre-selected. You add them only if you ask." },
  { t: "No pressure tactics", d: "No countdown timers and no “only 1 seat left” unless it is true and we can show you." },
  { t: "Cancellation in rupees", d: "Every trip shows exactly how much you get back if you cancel, before you pay." },
  { t: "Hotels named in writing", d: "Your quote names each hotel. If we have to change one, we tell you first and offer the same standard." },
  { t: "Refunds with a date", d: "Approved refunds reach you within 7 to 10 working days, and we tell you when it is sent." },
];

/** The "no surprises" promise, shown on the home page and every package page. */
export default function NoSurprises({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`rounded-[32px] border-2 border-ink ${compact ? "p-6 sm:p-10" : "p-7 sm:p-14"}`} aria-labelledby={compact ? "ns-c" : "ns"}>
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal className="flex flex-col gap-4">
          <h2 id={compact ? "ns-c" : "ns"} className={`${compact ? "text-[clamp(28px,3vw,40px)]" : "text-[clamp(36px,4.4vw,62px)]"} leading-[0.98] text-ink`}>
            Our no-surprises promise
          </h2>
          <p className="text-[17px] text-muted">What you see before paying is what you pay. If we ever break one of these, tell us and we will make it right.</p>
        </Reveal>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.04} className="flex gap-4 border-t border-line py-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14834A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
                <path d="M5 12l5 5L20 7" />
              </svg>
              <span className="flex flex-col gap-1">
                <span className="text-[18px] font-semibold text-ink">{p.t}</span>
                <span className="text-[15px] text-muted">{p.d}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
