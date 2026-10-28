"use client";

import { usePathname } from "next/navigation";
import { ChatIcon } from "./Icons";
import { waLink } from "@/lib/site";

/** The only direct WhatsApp link on the site. Shown on every page. */
export default function WhatsAppFab() {
  // Phones: sit above the tab bar, or above the price bar on trip pages.
  const onPackage = usePathname().startsWith("/packages/");
  return (
    <a
      href={waLink("Hi Ghooomo! I'd like to plan a holiday.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`btn fixed right-5 z-40 min-h-[60px] w-[60px] bg-wa px-0 text-white shadow-[0_14px_30px_rgba(20,131,74,0.4)] hover:bg-wa-deep sm:w-auto sm:px-6 ${onPackage ? "bottom-[104px] lg:bottom-6" : "bottom-[92px] md:bottom-6"}`}
    >
      <ChatIcon size={24} />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
