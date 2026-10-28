import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Family and Group Holidays",
  description: "Tailor-made holidays for families, friends and small company offsites to Thailand, Bali, Vietnam, Europe, Goa, Kerala and Gujarat. One planner and one itinerary for everyone.",
  alternates: { canonical: "/group" },
};

export const revalidate = 300;

const sizes = [
  { n: "4 to 8", t: "Family or friends", d: "A villa or connecting rooms, and one large vehicle with a driver." },
  { n: "9 to 20", t: "Extended family", d: "Group rates on rooms, a coach with a guide and group meals arranged." },
  { n: "20 to 40", t: "Celebrations", d: "Milestone birthdays and destination weddings, with a coordinator on the ground." },
  { n: "Teams", t: "Company offsites", d: "Meeting space, team activities and one invoice in your company's name." },
];

export default function GroupPage() {
  return (
    <SegmentPage
      segment="group"
      heading="One plan for the whole group."
      intro="Three generations of a family, a circle of friends or a small company offsite. One planner, one itinerary, and rooms and vehicles sized for your group."
      primaryCta="See group journeys"
      heroPhoto="/photos/thailand-maya-bay.jpg"
      heroAlt="Boats in the turquoise water of Maya Bay, Thailand"
      whyTitle="What a group trip includes"
      why={[
        { t: "One coordinator", d: "The organiser deals with one planner instead of twenty phone calls, and everyone gets the same plan." },
        { t: "Rooms that work", d: "Connecting rooms for families, accessible rooms for older travellers, and everyone on the same floor where possible." },
        { t: "The right vehicle", d: "Sized for the group and the luggage, with child seats and a guide who speaks your language when you need one." },
        { t: "Everyone's pace", d: "Free afternoons built in, and an easier option on long days for anyone who wants to sit one out." },
      ]}
      extra={
        <section className="wrap pb-4">
          <Reveal className="mb-8 flex flex-col gap-3">
            <h2 className="text-[clamp(30px,3.6vw,48px)] leading-[1.04] text-ink">Planned for your group size</h2>
          </Reveal>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.05} className="flex flex-col gap-2 border-t-2 border-group py-6">
                <span className="text-[36px] font-bold leading-none text-group-strong">{s.n}</span>
                <span className="text-[18px] font-bold text-ink">{s.t}</span>
                <span className="text-[15px] text-muted">{s.d}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      }
      enquiry={{
        title: "How many of you are going?",
        text: "Share the basics: how many, roughly when and where. We send a draft plan and a quote for the whole group.",
        submit: "Get a group quote",
      }}
    />
  );
}
