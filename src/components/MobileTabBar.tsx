"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { GridIcon, HomeIcon, InfoIcon, PhoneIcon, PlusIcon } from "./Icons";

const tabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/packages", label: "Trips", Icon: GridIcon },
  { href: "/contact", label: "Plan trip", Icon: PlusIcon, main: true },
  { href: "/about", label: "About", Icon: InfoIcon },
  { href: `tel:${site.phoneE164}`, label: "Call", Icon: PhoneIcon },
];

/** App-style bottom navigation on phones. Hidden on trip pages, which have their own price bar. */
export default function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/packages/")) return null;
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,43,91,0.08)] md:hidden"
    >
      <ul className="mx-auto grid h-[68px] max-w-[520px] grid-cols-5 items-center">
        {tabs.map(({ href, label, Icon, main }) => {
          const active = href === "/" ? pathname === "/" : pathname === href;
          if (main) {
            return (
              <li key={label} className="flex justify-center">
                <Link href={href} className="-mt-7 flex flex-col items-center gap-1">
                  <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[var(--color-cta)] text-white shadow-[0_10px_22px_rgba(210,68,27,0.45)] ring-4 ring-white">
                    <Icon size={26} />
                  </span>
                  <span className="text-[13px] font-bold text-[var(--color-cta)]">{label}</span>
                </Link>
              </li>
            );
          }
          const cls = `flex min-h-[56px] flex-col items-center justify-center gap-1 text-[13px] font-semibold ${active ? "text-ink" : "text-subtle"}`;
          if (href.startsWith("tel:")) {
            return (
              <li key={label}>
                <a href={href} className={cls}><Icon />{label}</a>
              </li>
            );
          }
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cls}
              >
                <Icon />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
