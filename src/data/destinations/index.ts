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
import { malaysia } from "./malaysia";
import { bhutan } from "./bhutan";
import { nepal } from "./nepal";
import { seychelles } from "./seychelles";
import { turkey } from "./turkey";
import { egypt } from "./egypt";
import { australia } from "./australia";
import { newZealand } from "./new-zealand";
import { kazakhstan } from "./kazakhstan";
import { hongKong } from "./hong-kong";
import { southKorea } from "./south-korea";
import { france } from "./france";
import { italy } from "./italy";
import { unitedKingdom } from "./united-kingdom";
import { azerbaijan } from "./azerbaijan";
import { georgia } from "./georgia";
import { jordan } from "./jordan";
import { kenya } from "./kenya";
import { southAfrica } from "./south-africa";
import { abuDhabi } from "./abu-dhabi";
import { kashmir } from "./kashmir";
import { kerala } from "./kerala";
import { goa } from "./goa";
import { rajasthan } from "./rajasthan";
import { andaman } from "./andaman";
import { sikkim } from "./sikkim";
import { himachal } from "./himachal";
import { ladakh } from "./ladakh";
import { uttarakhand } from "./uttarakhand";
import { meghalaya } from "./meghalaya";
import { gujarat } from "./gujarat";
import { lakshadweep } from "./lakshadweep";
import { coorg } from "./coorg";
import { ooty } from "./ooty";
import { varanasi } from "./varanasi";
import { agra } from "./agra";
import { kaziranga } from "./kaziranga";
import { puducherry } from "./puducherry";

export type { Destination } from "./types";

// Europe stays ahead of Switzerland so the Paris-Swiss-Venice package links to the wider Europe guide.
export const destinations: Destination[] = [
  maldives, bali, dubai, thailand, europe, vietnam, sriLanka, singapore, switzerland, greece, japan, mauritius,
  malaysia, bhutan, nepal, seychelles, turkey, egypt, australia, newZealand, kazakhstan, hongKong, southKorea,
  france, italy, unitedKingdom, azerbaijan, georgia, jordan, kenya, southAfrica, abuDhabi,
  kashmir, kerala, goa, rajasthan, andaman, sikkim, himachal, ladakh, uttarakhand, meghalaya, gujarat,
  lakshadweep, coorg, ooty, varanasi, agra, kaziranga, puducherry,
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Destination guide that covers a given holiday package, if any. */
export function destinationForPackage(packageSlug: string) {
  return destinations.find((d) => d.packageSlugs.includes(packageSlug));
}
