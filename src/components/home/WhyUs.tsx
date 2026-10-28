import Reveal from "../Reveal";

const items = [
  { t: "Tailor-made itineraries", d: "Every holiday is planned around your dates, your pace and who is travelling." },
  { t: "Handpicked hotels", d: "Resorts, villas and boutique stays we know and trust." },
  { t: "Visas & flights", d: "Help with visas, flights, insurance and forex, all in one place." },
  { t: "Support on the go", d: "A dedicated contact for you, from booking until you are back home." },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="wrap flex flex-col gap-12">
        <Reveal className="flex max-w-[760px] flex-col gap-5">
          <h2 className="text-[clamp(34px,4.2vw,56px)] leading-[1.04] text-ink">Why travel with Ghooomo</h2>
          <p className="text-[18px] leading-relaxed text-muted">
            Ghooomo is a travel company in Noida that plans tailor-made holidays from India. We arrange international holidays to Europe, the Maldives, Bali, Dubai, Thailand, Vietnam, Sri Lanka and beyond, and holidays across India, from Kashmir and Rajasthan to Kerala, Goa and the Andaman Islands. Honeymoons, family holidays, trips with friends and group tours, each planned around the people travelling.
          </p>
        </Reveal>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x, i) => (
            <Reveal as="li" key={x.t} delay={i * 0.06} className="flex flex-col gap-3 border-t-2 border-ink pt-6">
              <span className="text-[21px] font-bold leading-tight text-ink">{x.t}</span>
              <span className="text-[16px] leading-relaxed text-muted">{x.d}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
