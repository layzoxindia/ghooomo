import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call, WhatsApp or visit Ghooomo in Sector 121, Noida. ${site.phoneDisplay} · ${site.email}`,
  alternates: { canonical: "/contact" },
};

const cards = [
  { I: PhoneIcon, k: "Call", v: site.phoneDisplay, href: `tel:${site.phoneE164}` },
  { I: MailIcon, k: "Email", v: site.email, href: `mailto:${site.email}` },
  { I: PinIcon, k: "Office", v: site.address, href: site.mapsUrl, ext: true },
];

export default function ContactPage() {
  return (
    <section className="wrap grid gap-10 pb-24 pt-28 sm:pt-32 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col gap-6">
        <h1 className="text-[clamp(42px,5.4vw,76px)] font-extrabold leading-[0.96] text-ink">Contact us</h1>
        <p className="text-[18px] text-muted">Fill in the form and a planner gets back to you on WhatsApp. You can also call, email or visit the office in Noida. For a quick chat, use the WhatsApp button at the bottom of the screen.</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {cards.map(({ I, k, v, href, ext }) => (
            <li key={k}>
              <a
                href={href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full items-start gap-4 rounded-[20px] border border-line bg-white p-5 transition-colors hover:border-ink"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink"><I /></span>
                <span className="flex flex-col"><span className="text-[13px] font-semibold text-subtle">{k}</span><span className="text-[16px] font-semibold text-ink">{v}</span></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-2 text-[15px] font-semibold text-muted"><ClockIcon size={18} /> {site.hours}</p>
        <p className="text-[14px] text-subtle">{site.legalName}</p>
      </div>
      <EnquiryForm />
    </section>
  );
}
