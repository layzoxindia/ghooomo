import type { Metadata } from "next";
import SegmentPage from "@/components/SegmentPage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solo Holidays | Private holidays for one",
  description: "Private solo holidays from India to Vietnam, Sri Lanka, Bali, Sikkim and more, with driver-guides and safe, central hotels. Tailor-made by Ghooomo.",
  alternates: { canonical: "/solo" },
};

export const revalidate = 300;

const day = [
  { t: "Morning", d: "Breakfast at your own pace. Your driver-guide meets you at the time you chose the night before." },
  { t: "Afternoon", d: "The sights with a guide, or a few hours on your own with the car on call. Change the plan with one message." },
  { t: "Evening", d: "A table booked somewhere good, or room service and an early night. Your planner checks in either way." },
];

export default function SoloPage() {
  return (
    <SegmentPage
      segment="solo"
      heading="Travelling alone, well looked after."
      intro="Private holidays for one, never a group tour. A driver-guide, hotels in safe, central areas, and someone to call whenever you need."
      primaryCta="See solo holidays"
      heroPhoto="/photos/vietnam-hoian-bridge.jpg"
      heroAlt="Hoi An old town lit up at night"
      whyTitle="What a solo holiday includes"
      why={[
        { t: "Private, not a group", d: "Your own car and driver-guide. You decide when to start, where to linger and when to call it a day." },
        { t: "Hotels chosen for one", d: "Central, well-reviewed by solo guests, and briefed that you are arriving alone, so check-in and late arrivals are smooth." },
        { t: "A daily check-in", d: "Your planner messages every day to see how it is going and to change tomorrow if you want to." },
        { t: "Someone to call", d: "One number for the whole trip, for anything from a missed connection to a restaurant recommendation." },
      ]}
      extra={
        <section className="wrap pb-4">
          <div className="grid gap-10 rounded-[30px] bg-white p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="flex flex-col gap-3">
              <h2 className="text-[clamp(30px,3.6vw,48px)] leading-[1.04] text-ink">A normal day, travelling solo</h2>
            </Reveal>
            <ol className="flex flex-col">
              {day.map((d, i) => (
                <Reveal as="li" key={d.t} delay={i * 0.06} className="grid gap-2 border-t border-line py-5 first:border-0 first:pt-0 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <span className="text-[20px] font-bold text-solo-text">{d.t}</span>
                  <span className="text-[17px] leading-relaxed text-muted">{d.d}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      }
      enquiry={{
        title: "Where would you like to go?",
        text: "Tell us where, when and how you like to travel, and we’ll plan it for you.",
        submit: "Send enquiry",
      }}
    />
  );
}
