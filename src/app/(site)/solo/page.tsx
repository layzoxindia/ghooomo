import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solo Trips — Small-batch tours for solo travellers",
  description: "Solo trips to Spiti, Ladakh and Meghalaya with small batches, checked stays and a trip captain. Enquire on WhatsApp.",
  alternates: { canonical: "/solo" },
};

const day = [
  { t: "Morning", d: "Breakfast with the batch, a short briefing from your trip captain, then on the road." },
  { t: "Afternoon", d: "Sightseeing at your pace — join the group or wander off, we keep track of everyone." },
  { t: "Evening", d: "Homestay dinners and bonfires. Talk, or sit back with a book. Both are fine." },
];

export const revalidate = 300;

export default function SoloPage() {
  return (
    <SegmentPage
      segment="solo"
      heading={<>Go alone.<br />Never feel alone.</>}
      intro="Small-batch departures with other solo travellers, stays we’ve checked ourselves, and a trip captain who knows the road."
      primaryCta="See solo trips"
      whyTitle="Freedom of solo, none of the worry."
      why={[
        { t: "Stays we’ve checked", d: "Every hotel, homestay and camp on our solo trips is vetted by our team before it goes on a route." },
        { t: "A trip captain on ground", d: "One person handles the road, the plans and the people, so you just travel." },
        { t: "Travel with your kind", d: "Batches of fellow solo travellers — make friends or keep your space." },
        { t: "WhatsApp support all trip", d: "A planner on chat from booking till you’re back home." },
      ]}
      extra={
        <section className="wrap pt-20 sm:pt-24">
          <div className="grid gap-8 rounded-[34px] bg-white p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow text-solo-text">A day on a solo trip</p>
              <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04] text-ink">Company when you want it. Space when you don’t.</h2>
            </Reveal>
            <ol className="flex flex-col">
              {day.map((d, i) => (
                <Reveal as="li" key={d.t} delay={i * 0.06} className="flex gap-5 border-b border-line py-5 last:border-0">
                  <span className="w-28 shrink-0 font-display text-[20px] text-solo-text">{d.t}</span>
                  <span className="text-[17px] text-muted">{d.d}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      }
      enquiry={{
        title: "Where are you headed alone?",
        text: "Your message reaches our WhatsApp tagged “Solo”, so the right planner picks it up.",
        submit: "Send solo enquiry on WhatsApp",
      }}
    />
  );
}
