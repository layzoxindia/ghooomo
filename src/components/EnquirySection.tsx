import EnquiryForm from "./EnquiryForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { site, type Segment } from "@/lib/site";
import Reveal from "./Reveal";

export default function EnquirySection({
  segment,
  title = "Start with a conversation.",
  text = "Tell us who is travelling, roughly when, and what you have in mind. A planner from our Noida office comes back to you with ideas and a quote for your dates.",
  submitLabel,
}: {
  segment?: Segment;
  /** Kept for older callers; the section is always dark now. */
  bg?: string;
  title?: string;
  text?: string;
  submitLabel?: string;
}) {
  return (
    <section id="enquire" className="tech-grid relative scroll-mt-16 overflow-hidden bg-night py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-ring-1/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-ring-3/20 blur-[120px]" aria-hidden="true" />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28">
          <p className="kicker text-ring-2">Plan your holiday</p>
          <h2 className="text-[clamp(38px,4.6vw,64px)] leading-[1.02]">{title}</h2>
          <p className="max-w-[480px] text-[18px] leading-relaxed text-on-night">{text}</p>
          <ul className="flex flex-col gap-4 border-t border-white/15 pt-6 text-[16px] font-semibold">
            <li>
              <a href={`tel:${site.phoneE164}`} className="flex items-center gap-3 hover:text-ring-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><PhoneIcon size={18} /></span>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-ring-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><MailIcon size={18} /></span>
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-on-night">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><PinIcon size={18} /></span>
              {site.address} · {site.hours}
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <EnquiryForm variant={segment ?? "general"} segment={segment} submitLabel={submitLabel} />
        </Reveal>
      </div>
    </section>
  );
}
