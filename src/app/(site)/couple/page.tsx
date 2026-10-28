import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Honeymoons and Holidays for Two",
  description: "Tailor-made honeymoons and couple holidays to the Maldives, Bali, Europe, Sri Lanka, Kerala and the Andamans, with private transfers and rooms chosen for two.",
  alternates: { canonical: "/couple" },
};

export const revalidate = 300;

const extras = [
  { t: "Candlelight dinner", d: "On the beach, a rooftop or your own deck." },
  { t: "Room decoration", d: "Flowers and a cake in the room when you arrive." },
  { t: "Couple spa", d: "One session, booked at your hotel." },
  { t: "Photo shoot", d: "An hour with a local photographer." },
  { t: "Room upgrade", d: "Sea view or a water villa, when available." },
  { t: "Late check-out", d: "Requested in advance for your last day." },
];

export default function CouplePage() {
  return (
    <SegmentPage
      segment="couple"
      heading="Holidays for two."
      intro="Honeymoons, anniversaries and long weekends. Rooms chosen for the view and the quiet, private transfers, and a pace with room to breathe."
      primaryCta="See journeys for two"
      heroPhoto="/posters/couple.jpg"
      heroAlt="A couple walking hand in hand on the beach"
      whyTitle="What a couple holiday includes"
      why={[
        { t: "Private transfers", d: "A car, speedboat or seaplane just for the two of you, never a shared shuttle." },
        { t: "Rooms with a view", d: "We choose rooms for the outlook and the quiet, not only the star rating." },
        { t: "Free time built in", d: "Late breakfasts and empty afternoons are part of the plan." },
        { t: "Quiet arrangements", d: "Tell your planner about a surprise and it is arranged with the hotel without a word to your partner." },
      ]}
      extra={
        <section className="wrap pb-4">
          <div className="grid gap-10 rounded-[30px] border border-[#F0DDB2] bg-[#FFF6E3] p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="flex flex-col gap-4">
              <h2 className="text-[clamp(30px,3.6vw,48px)] leading-[1.04] text-ink">Add something special</h2>
              <p className="text-[17px] text-muted">Mention any of these when you enquire. Your planner adds them to the trip and quotes them separately.</p>
            </Reveal>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {extras.map((x, i) => (
                <Reveal as="li" key={x.t} delay={i * 0.04} className="flex flex-col gap-1 border-t border-[#E8D5A8] py-5">
                  <span className="text-[18px] font-bold text-ink">{x.t}</span>
                  <span className="text-[15px] text-muted">{x.d}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      }
      enquiry={{
        title: "Tell us about your trip",
        text: "Share the occasion and rough dates. A planner will suggest two or three ways to do it and quote the one you like.",
        submit: "Get our quote",
      }}
    />
  );
}
