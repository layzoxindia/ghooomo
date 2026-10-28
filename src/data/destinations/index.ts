import type { Destination } from "./types";
import { maldives } from "./maldives";
import { bali } from "./bali";
import { dubai } from "./dubai";
import { thailand } from "./thailand";
import { europe } from "./europe";
import { kashmir } from "./kashmir";
import { kerala } from "./kerala";
import { goa } from "./goa";

export type { Destination } from "./types";

export const destinations: Destination[] = [maldives, bali, dubai, thailand, europe, kashmir, kerala, goa];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Destination guide that covers a given holiday package, if any. */
export function destinationForPackage(packageSlug: string) {
  return destinations.find((d) => d.packageSlugs.includes(packageSlug));
}
