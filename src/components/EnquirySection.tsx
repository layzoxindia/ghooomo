import EnquiryForm from "./EnquiryForm";
import { PhoneIcon } from "./Icons";
import { site, type Segment } from "@/lib/site";
import Reveal from "./Reveal";

export default function EnquirySection({
  segment,
  bg = "#EADFCF",
  title = "Plan your trip with us",
  text = "Share a few details and they reach our WhatsApp straight away. A planner from our Noida office replies during working hours.",
  submitLabel,
}: {
  segment?: Segment;
  bg?: string;
  title?: string;
  text?: string;
  submitLabel?: string;
}) {
  return (
    <section id="enquire" className="scroll-mt-20 py-20 sm:py-28" style={{ background: bg }}>
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28">
          <h2 className="text-[clamp(38px,4.6vw,64px)] leading-[0.98] text-ink">{title}</h2>
          <p className="max-w-[460px] text-[18px] text-muted">{text}</p>
          <div className="flex flex-col gap-4 border-t border-ink/15 pt-6">
            <a href={`tel:${site.phoneE164}`} className="flex items-center gap-2 text-[16px] font-semibold text-text hover:text-ink">
              <PhoneIcon size={18} /> {site.phoneDisplay}
            </a>
            <span className="text-[15px] font-medium text-subtle">{site.hours} · {site.address}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <EnquiryForm variant={segment ?? "general"} segment={segment} submitLabel={submitLabel} />
        </Reveal>
      </div>
    </section>
  );
}
