import Reveal from "../Reveal";
import { CheckIcon } from "../Icons";
import { site } from "@/lib/site";

const points = [
  { n: "01", t: "Quoted for your dates", d: "Worked out from live rates for your dates, your rooms and the number of people travelling. Not a brochure number." },
  { n: "02", t: "Every line itemised", d: "Hotels by name and room type, transfers, tours, taxes and our service fee, each on its own line. Anything optional says so." },
  { n: "03", t: "Held in writing", d: "Your quote states how long the price is held. Inside that window, it does not move." },
  { n: "04", t: "Nothing added later", d: "No booking fee at checkout and no surcharge on arrival. GST, and TCS on trips abroad, are shown before you decide." },
];

const youGet = [
  "A day-by-day plan with every hotel named",
  "An itemised quote with all taxes shown",
  "Cancellation terms for your exact trip",
  `Bank details for ${site.legalName} only, never a personal account`,
  "A written confirmation for every payment you make",
];

/** Why packages carry no printed price, and what a Ghooomo quote contains. */
export default function PricingTrust() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-5">
            <p className="kicker text-solo-text">04 · How pricing works</p>
            <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] text-ink">Why you won’t find a price tag on our journeys.</h2>
            <p className="max-w-[640px] text-[19px] leading-relaxed text-muted">
              Hotel rates, airfares and exchange rates move every day, and differently for a December weekend than a Tuesday in July. A fixed price on a website is either already out of date or padded to cover the gap. We would rather quote you properly.
            </p>
          </Reveal>
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.06} className="flex flex-col gap-2 border-t-2 border-line py-6">
                <span className="tabular text-[15px] font-bold text-solo-text">{p.n}</span>
                <span className="text-[21px] font-bold text-ink">{p.t}</span>
                <span className="text-[16px] leading-relaxed text-muted">{p.d}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1} className="self-start lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[28px] bg-night p-8 text-white sm:p-10">
            <div className="ring-gradient absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ring-2/20 blur-3xl" aria-hidden="true" />
            <p className="kicker text-ring-2">Before you pay anything</p>
            <h3 className="mt-3 text-[28px] font-bold leading-tight">You will have, in writing:</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {youGet.map((x) => (
                <li key={x} className="flex gap-3 text-[17px] font-medium leading-snug text-on-night">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ring-3/20 text-[#5BE0D5]">
                    <CheckIcon size={15} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <a href="#enquire" className="btn btn-primary mt-8 w-full">Get a quote for my dates</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
