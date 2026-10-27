export const site = {
  name: "Ghooomo",
  legalName: "Ghooomo India Pvt Ltd",
  tagline: "Solo · Couple · Group",
  description:
    "Solo trips, couple holidays and group tours across India and abroad, planned by Ghooomo in Noida. Clear prices, enquiries answered on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ghooomo.in",
  phoneDisplay: "+91 79837 77166",
  phoneE164: "+917983777166",
  whatsapp: "917983777166",
  email: "suneet@ghooomo.in",
  address: "Sector 121, Noida, Uttar Pradesh, India",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+121+Noida",
  hours: "Mon to Sat, 10 am to 7 pm",
  grievanceEmail: "suneet@ghooomo.in",
  // DPDP: how long enquiries are kept before automatic deletion.
  retentionMonths: 12,
  privacyNoticeVersion: "2026-10-28",
};

export type Segment = "solo" | "couple" | "group";

export const segments: Record<
  Segment,
  { label: string; href: string; who: string; color: string; strong: string; text: string; tint: string; soft: string }
> = {
  solo: { label: "Solo", href: "/solo", who: "Just you", color: "#E8552B", strong: "#C9431D", text: "#B23C17", tint: "#FBE4DA", soft: "#F4DCCF" },
  couple: { label: "Couple", href: "/couple", who: "The two of you", color: "#F2A51A", strong: "#F2A51A", text: "#8A5A00", tint: "#FFF1D6", soft: "#F3E3BF" },
  group: { label: "Group", href: "/group", who: "Friends, family, office", color: "#12A69F", strong: "#0B6B65", text: "#0B6B65", tint: "#D6F1EE", soft: "#CDEBE7" },
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

/** Locally hosted photo (originally from Pexels, free licence), served and resized by next/image. */
export function photoSrc(id: number) {
  return `/photos/${id}.jpg`;
}
