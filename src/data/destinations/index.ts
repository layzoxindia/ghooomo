import type { Destination } from "./types";
import { maldives } from "./maldives";
import { bali } from "./bali";
import { dubai } from "./dubai";
import { thailand } from "./thailand";
import { europe } from "./europe";
import { vietnam } from "./vietnam";
import { sriLanka } from "./sri-lanka";
import { singapore } from "./singapore";
import { switzerland } from "./switzerland";
import { greece } from "./greece";
import { japan } from "./japan";
import { mauritius } from "./mauritius";
import { kashmir } from "./kashmir";
import { kerala } from "./kerala";
import { goa } from "./goa";
import { rajasthan } from "./rajasthan";
import { andaman } from "./andaman";
import { sikkim } from "./sikkim";

export type { Destination } from "./types";

// Europe stays ahead of Switzerland so the Paris-Swiss-Venice package links to the wider Europe guide.
export const destinations: Destination[] = [
  maldives, bali, dubai, thailand, europe, vietnam, sriLanka, singapore, switzerland, greece, japan, mauritius,
  kashmir, kerala, goa, rajasthan, andaman, sikkim,
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Destination guide that covers a given holiday package, if any. */
export function destinationForPackage(packageSlug: string) {
  return destinations.find((d) => d.packageSlugs.includes(packageSlug));
}
