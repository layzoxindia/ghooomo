import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Group Tours | Friends, family and office trips",
  description: "Group tour packages to Goa, Manali, Kasol and Thailand for friends, families, colleges and office teams. One planner and one itinerary. Enquire on WhatsApp.",
  alternates: { canonical: "/group" },
};

export const revalidate = 300;

const sizes = [
  { n: "4 to 8", t: "Small group", d: "A villa or homestay and one cab." },
  { n: "9 to 15", t: "Friends’ trip", d: "A tempo traveller and better room rates." },
  { n: "16 to 30", t: "Family or batch", d: "A coach, group meals and a coordinator." },
  { n: "30 and up", t: "Office teams", d: "A custom plan and one company invoice." },
];

export default function GroupPage() {
  return (
    <SegmentPage
      segment="group"
      heading="Trips for the whole group."
      intro="Friends, families, college batches and office teams. One planner, one itinerary, and each person pays their own share."
      primaryCta="See group trips"
      whyTitle="What a group trip includes"
      mosaic={[
        { id: 37940208, alt: "Anjuna beach with palm trees, Goa" },
        { id: 37292541, alt: "Limestone cliffs in Krabi, Thailand" },
      ]}
      why={[
        { t: "One coordinator", d: "The organiser deals with one planner on WhatsApp instead of twenty phone calls." },
        { t: "Group rates", d: "The bigger the group, the better the price per person on stays and transport." },
        { t: "Split payments", d: "Everyone pays their own share by link, so nobody has to collect money." },
        { t: "Your itinerary", d: "Dates, stays and activities are changed to suit your group." },
      ]}
      extra={
        <section className="wrap pt-24 sm:pt-32">
          <Reveal className="mb-8 flex flex-col gap-3">
            <h2 className="text-[clamp(32px,3.8vw,50px)] leading-[1] text-ink">Planned for your group size</h2>
          </Reveal>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.05} className="flex flex-col gap-2 border-t-2 border-group py-6">
                <span className="font-display text-[38px] font-extrabold leading-none text-group-strong">{s.n}</span>
                <span className="text-[18px] font-semibold text-ink">{s.t}</span>
                <span className="text-[15px] text-muted">{s.d}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      }
      enquiry={{
        title: "How many of you are going?",
        text: "Share the basics and we’ll send a quote and a draft plan on WhatsApp, marked as a group enquiry.",
        submit: "Get a group quote on WhatsApp",
      }}
    />
  );
}
