import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solo Trips | Small-batch tours for solo travellers",
  description: "Solo trips to Spiti, Ladakh and Meghalaya in small batches, with checked stays and a trip captain. Enquire on WhatsApp.",
  alternates: { canonical: "/solo" },
};

export const revalidate = 300;

const day = [
  { t: "Morning", d: "Breakfast with the batch and a quick plan for the day from your trip captain, then on the road." },
  { t: "Afternoon", d: "Sightseeing together, or time on your own if you’d rather wander. The captain keeps track of everyone." },
  { t: "Evening", d: "Dinner at the homestay or camp. Some nights there’s a bonfire, some nights an early sleep." },
];

export default function SoloPage() {
  return (
    <SegmentPage
      segment="solo"
      heading="Solo trips, in small batches."
      intro="You book alone and travel with a small group of other solo travellers, a trip captain and stays we have checked ourselves."
      primaryCta="See solo trips"
      whyTitle="What a solo trip includes"
      why={[
        { t: "Checked stays", d: "Every hotel, homestay and camp on a solo route is visited or vetted by our team before it’s used." },
        { t: "A trip captain", d: "One person on the road with the batch, handling drivers, check-ins and changes." },
        { t: "A small batch", d: "You travel with other people who came on their own, so it’s easy to talk and easy to keep to yourself." },
        { t: "Help on WhatsApp", d: "Your planner stays reachable from the day you book until you’re home." },
      ]}
      extra={
        <section className="wrap pt-24 sm:pt-32">
          <div className="grid gap-10 rounded-[32px] bg-white p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="text-[clamp(32px,3.8vw,50px)] leading-[1] text-ink">A normal day on the road</h2>
            </Reveal>
            <ol className="flex flex-col">
              {day.map((d, i) => (
                <Reveal as="li" key={d.t} delay={i * 0.06} className="grid gap-2 border-t border-line py-5 first:border-0 first:pt-0 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <span className="font-display text-[20px] text-solo-text">{d.t}</span>
                  <span className="text-[17px] text-muted">{d.d}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      }
      enquiry={{
        title: "Where would you like to go?",
        text: "Your message reaches our WhatsApp marked as a solo enquiry, so the right planner picks it up.",
        submit: "Send solo enquiry on WhatsApp",
      }}
    />
  );
}
