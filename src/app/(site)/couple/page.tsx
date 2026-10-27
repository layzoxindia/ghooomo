import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Couple Getaways & Honeymoon Packages",
  description: "Honeymoon and couple holiday packages to Bali, Maldives, Andaman and Kerala with private transfers and handpicked stays. Enquire on WhatsApp.",
  alternates: { canonical: "/couple" },
};

const extras = [
  { t: "Candlelight dinner", d: "On the beach, a rooftop or a private deck." },
  { t: "Room decor", d: "Flowers and a cake waiting when you arrive." },
  { t: "Couple spa", d: "One session, booked at your stay." },
  { t: "Private transfers", d: "No shared vans for the whole trip." },
  { t: "Photo shoot", d: "An hour with a local photographer." },
  { t: "Room upgrade", d: "Sea view or water villa, on request." },
];

export const revalidate = 300;

export default function CouplePage() {
  return (
    <SegmentPage
      segment="couple"
      heading="Just the two of you. Everything else, sorted."
      intro="Honeymoons, anniversaries and stolen long weekends — private, unhurried, planned around you two."
      primaryCta="See couple getaways"
      whyTitle="Planned for two, not for a tour bus."
      why={[
        { t: "Private by default", d: "Private cabs and transfers on every couple package — no strangers in the van." },
        { t: "Stays with a view", d: "We pick rooms for the view and the quiet, not just the star rating." },
        { t: "Your pace", d: "Late breakfasts and free afternoons are part of the plan, not an afterthought." },
        { t: "One planner on WhatsApp", d: "Changes, surprises, a late check-out — one message and it’s handled." },
      ]}
      extra={
        <section className="wrap pt-20 sm:pt-24">
          <div className="flex flex-wrap items-center gap-10 rounded-[34px] border border-[#F0DDB2] bg-[#FFF6E3] p-7 sm:p-12">
            <Reveal className="flex flex-[1_1_320px] flex-col gap-4">
              <p className="eyebrow text-couple-text">Little extras</p>
              <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04] text-ink">Add the moments you’ll talk about later.</h2>
              <p className="text-[17px] text-muted">Mention any of these in your enquiry — your planner folds them into the trip and quotes them separately.</p>
            </Reveal>
            <ul className="grid flex-[1_1_460px] gap-3 sm:grid-cols-2">
              {extras.map((x, i) => (
                <Reveal as="li" key={x.t} delay={i * 0.04} className="flex flex-col gap-1 rounded-[18px] border border-[#E8D5A8] bg-white p-5">
                  <span className="text-[17px] font-semibold text-ink">{x.t}</span>
                  <span className="text-[15px] text-muted">{x.d}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      }
      enquiry={{
        title: "Tell us about you two.",
        text: "Goes straight to our WhatsApp, tagged “Couple”, with your occasion and dates.",
        submit: "Send couple enquiry on WhatsApp",
      }}
    />
  );
}
