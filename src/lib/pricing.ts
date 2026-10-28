// Packages carry no fixed price on the site: hotel rates, flights and exchange rates
// change daily, so every trip is quoted live for the traveller's dates.

export const cancellationTiers = [
  { label: "30 days or more before departure", short: "30+ days before", pct: 10 },
  { label: "15 to 29 days before departure", short: "15 to 29 days", pct: 25 },
  { label: "7 to 14 days before departure", short: "7 to 14 days", pct: 50 },
  { label: "Less than 7 days before, or no-show", short: "Under 7 days", pct: 100 },
] as const;

export const REFUND_DAYS = "7 to 10 working days";
