import EnquiryForm from "./EnquiryForm";
import { ChatIcon, PhoneIcon } from "./Icons";
import { site, waLink, type Segment } from "@/lib/site";
import Reveal from "./Reveal";

export default function EnquirySection({
  segment,
  bg = "#EADFCF",
  eyebrow = "Plan my trip",
  eyebrowColor = "#B23C17",
  title = "Tell us once. We’ll handle the rest.",
  text = "Fill this in and your enquiry lands straight on our WhatsApp — a planner replies from a real number, not a bot.",
  submitLabel,
}: {
  segment?: Segment;
  bg?: string;
  eyebrow?: string;
  eyebrowColor?: string;
  title?: string;
  text?: string;
  submitLabel?: string;
}) {
  return (
    <section id="enquire" className="scroll-mt-20 py-20 sm:py-24" style={{ background: bg }}>
      <div className="wrap flex flex-wrap items-start gap-10 lg:gap-14">
        <Reveal className="flex flex-[1_1_360px] flex-col gap-5">
          <p className="eyebrow" style={{ color: eyebrowColor }}>{eyebrow}</p>
          <h2 className="text-[clamp(34px,4.2vw,56px)] leading-[1.02] text-ink">{title}</h2>
          <p className="text-[18px] text-muted">{text}</p>
          <div className="mt-2 flex flex-col gap-3">
            <a href={waLink("Hi Ghooomo! I'd like to plan a holiday.")} target="_blank" rel="noopener noreferrer" className="btn self-start bg-wa text-white hover:bg-wa-deep">
              <ChatIcon /> Chat on WhatsApp now
            </a>
            <a href={`tel:${site.phoneE164}`} className="flex items-center gap-2 text-[16px] font-semibold text-text">
              <PhoneIcon size={18} /> or call {site.phoneDisplay} · {site.hours}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex-[1_1_520px]">
          <EnquiryForm variant={segment ?? "general"} segment={segment} submitLabel={submitLabel} />
        </Reveal>
      </div>
    </section>
  );
}
