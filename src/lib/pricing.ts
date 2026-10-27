import type { TravelPackage } from "@/data/packages";

// GST on tour packages: 5% on the gross value (tour operator scheme, no input credit).
// TCS on overseas tour packages: 2% from 1 April 2026, adjustable against income tax.
// Confirm both with your CA if your GST registration uses a different scheme.
export const GST_RATE = 0.05;
export const TCS_RATE = 0.02;

export type PriceBreakdown = {
  base: number;
  gst: number;
  total: number; // what the traveller pays per person, all taxes included
  tcs: number; // collected separately on international trips, adjustable in ITR
};

export function priceOf(p: Pick<TravelPackage, "price" | "region">): PriceBreakdown {
  const base = p.price;
  const gst = Math.round(base * GST_RATE);
  const total = base + gst;
  const tcs = p.region === "International" ? Math.round(total * TCS_RATE) : 0;
  return { base, gst, total, tcs };
}

export const cancellationTiers = [
  { label: "30 days or more before departure", short: "30+ days before", pct: 10 },
  { label: "15 to 29 days before departure", short: "15 to 29 days", pct: 25 },
  { label: "7 to 14 days before departure", short: "7 to 14 days", pct: 50 },
  { label: "Less than 7 days before, or no-show", short: "Under 7 days", pct: 100 },
] as const;

export const REFUND_DAYS = "7 to 10 working days";

export function cancellationFor(total: number) {
  return cancellationTiers.map((t) => {
    const charge = Math.round((total * t.pct) / 100);
    return { ...t, charge, refund: total - charge };
  });
}
