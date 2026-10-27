import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Couple Holidays and Honeymoon Packages",
  description: "Honeymoon and couple holiday packages to Bali, Maldives, Andaman and Kerala, with private transfers and stays chosen for two. Enquire on WhatsApp.",
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
      intro="Honeymoons, anniversaries and long weekends with private transfers, rooms picked for the view, and a relaxed pace."
      primaryCta="See couple holidays"
      whyTitle="What a couple holiday includes"
      why={[
        { t: "Private transfers", d: "A cab or speedboat just for the two of you on every couple package." },
        { t: "Rooms with a view", d: "We choose rooms for the outlook and the quiet, not only the star rating." },
        { t: "Free time built in", d: "Late breakfasts and empty afternoons are part of the plan." },
        { t: "One planner", d: "Surprises, changes or a late check-out are a single WhatsApp message away." },
      ]}
      extra={
        <section className="wrap pt-24 sm:pt-32">
          <div className="grid gap-10 rounded-[32px] border border-[#F0DDB2] bg-[#FFF6E3] p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="flex flex-col gap-4">
              <h2 className="text-[clamp(32px,3.8vw,50px)] leading-[1] text-ink">Add something special</h2>
              <p className="text-[17px] text-muted">Mention any of these when you enquire. Your planner adds them to the trip and quotes them separately.</p>
            </Reveal>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {extras.map((x, i) => (
                <Reveal as="li" key={x.t} delay={i * 0.04} className="flex flex-col gap-1 border-t border-[#E8D5A8] py-5">
                  <span className="text-[18px] font-semibold text-ink">{x.t}</span>
                  <span className="text-[15px] text-muted">{x.d}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      }
      enquiry={{
        title: "Tell us about your trip",
        text: "Your message reaches our WhatsApp marked as a couple enquiry, along with the occasion and dates.",
        submit: "Send couple enquiry on WhatsApp",
      }}
    />
  );
}
