import Reveal from "./Reveal";
import { site, testimonials } from "@/lib/site";

/** Traveller reviews. Renders nothing until at least three real reviews are added in src/lib/site.ts. */
export default function Testimonials() {
  if (testimonials.length < 3) return null;
  return (
    <section className="wrap flex flex-col gap-10 pb-24 sm:pb-32" aria-labelledby="reviews">
      <Reveal className="flex flex-wrap items-end justify-between gap-5">
        <h2 id="reviews" className="text-[clamp(36px,4.4vw,62px)] leading-[1] text-ink">From people who went</h2>
        {site.googleReviewsUrl && (
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">
            All reviews on Google
          </a>
        )}
      </Reveal>
      <ul className="grid gap-5 md:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <Reveal as="li" key={t.name + t.trip} delay={i * 0.06} className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-7">
            <p className="text-[17px] leading-relaxed text-text">“{t.quote}”</p>
            <p className="mt-auto flex flex-col border-t border-line pt-4">
              <span className="text-[16px] font-semibold text-ink">{t.name}{t.city ? `, ${t.city}` : ""}</span>
              <span className="text-[14px] font-medium text-subtle">{t.trip}</span>
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
