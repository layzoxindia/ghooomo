import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Group Tours — Friends, family & corporate trips",
  description: "Group tour packages to Goa, Manali, Kasol and Thailand for friends, families, colleges and offsites. One planner, one itinerary. Enquire on WhatsApp.",
  alternates: { canonical: "/group" },
};

const sizes = [
  { n: "4–8", t: "Small gang", d: "Shared villa or homestay, one cab." },
  { n: "9–15", t: "Big friends’ trip", d: "Tempo traveller and better room rates." },
  { n: "16–30", t: "Family or batch", d: "Coach, group meals, one coordinator." },
  { n: "30+", t: "Corporate & events", d: "Custom itinerary and a single company invoice." },
];

export const revalidate = 300;

export default function GroupPage() {
  return (
    <SegmentPage
      segment="group"
      heading="Bring everyone. We’ll handle the chaos."
      intro="Friends’ trips, family reunions, college batches and office offsites — one planner, one itinerary, one bill."
      primaryCta="See group trips"
      whyTitle="The boring parts, done for you."
      mosaic={[
        { id: 29494585, alt: "River view in Kasol, Parvati valley" },
        { id: 37292541, alt: "Limestone cliffs in Krabi, Thailand" },
      ]}
      why={[
        { t: "One coordinator", d: "A single planner on WhatsApp for the organiser — not twenty phone calls." },
        { t: "Group rates", d: "Bigger group, better per-person price on stays and transport." },
        { t: "Split payments", d: "Everyone pays their own share by link. You don’t chase anyone." },
        { t: "Fully custom", d: "Change dates, stays and activities to suit your crew." },
      ]}
      extra={
        <section className="wrap pt-20 sm:pt-24">
          <Reveal className="mb-6 flex flex-col gap-3">
            <p className="eyebrow text-group-strong">How many of you?</p>
            <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04] text-ink">Prices drop as your group grows.</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.05} className="flex flex-col gap-2 rounded-[22px] border border-line bg-white p-6">
                <span className="font-display text-[40px] font-extrabold leading-none text-group-strong">{s.n}</span>
                <span className="text-[18px] font-semibold text-ink">{s.t}</span>
                <span className="text-[15px] text-muted">{s.d}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      }
      enquiry={{
        title: "How big is the crew?",
        text: "Share the basics — your quote and draft itinerary arrive on WhatsApp, tagged “Group”.",
        submit: "Get group quote on WhatsApp",
      }}
    />
  );
}
