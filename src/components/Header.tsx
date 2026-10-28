"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MenuIcon, XIcon } from "./Icons";
import { segments, site, type Segment } from "@/lib/site";

const nav = [
  { href: "/packages", label: "Journeys" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Pages that open on a dark full-bleed photo: the header starts transparent with white text.
const overlayPaths = ["/", "/solo", "/couple", "/group", "/packages", "/about"];
const isOverlay = (path: string) => overlayPaths.includes(path) || path.startsWith("/packages/");

export default function Header() {
  const pathname = usePathname();
  const overlay = isOverlay(pathname);
  const [scrolled, setScrolled] = useState(false);
  // Menu is tied to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overlay && !scrolled && !open;
  const textCls = light ? "text-white" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        light ? "bg-gradient-to-b from-night/70 to-transparent" : "bg-white/95 shadow-[0_1px_0_rgba(15,43,91,0.1)] backdrop-blur-xl"
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Logo tone={light ? "light" : "ink"} bg={light ? "transparent" : "#FFFFFF"} width={164} id="hdr" />

        <nav aria-label="Main" className={`hidden items-center gap-1 lg:flex ${textCls}`}>
          {(Object.keys(segments) as Segment[]).map((s) => {
            const active = pathname.startsWith(segments[s].href);
            return (
              <Link
                key={s}
                href={segments[s].href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors ${
                  active ? (light ? "bg-white/18" : "bg-ink/8") : light ? "hover:bg-white/12" : "hover:bg-ink/6"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: segments[s].color }} />
                {segments[s].label}
              </Link>
            );
          })}
          <span className={`mx-2 h-5 w-px ${light ? "bg-white/30" : "bg-ink/15"}`} />
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold ${light ? "hover:bg-white/12" : "hover:bg-ink/6"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary hidden !min-h-12 !px-6 !text-[16px] sm:inline-flex">
            Plan my trip
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex h-12 w-12 items-center justify-center rounded-full lg:hidden ${light ? "text-white hover:bg-white/12" : "text-ink hover:bg-ink/6"}`}
          >
            {open ? <XIcon size={24} /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col gap-1 py-4">
            {(Object.keys(segments) as Segment[]).map((s) => (
              <Link key={s} href={segments[s].href} className="flex min-h-12 items-center gap-3 rounded-2xl px-3 text-lg font-semibold text-ink hover:bg-ink/5">
                <span className="h-3 w-3 rounded-full" style={{ background: segments[s].color }} />
                {segments[s].label} trips
                <span className="ml-auto text-sm font-medium text-subtle">{segments[s].who}</span>
              </Link>
            ))}
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="flex min-h-12 items-center rounded-2xl px-3 text-lg font-semibold text-ink hover:bg-ink/5">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary mt-2">Plan my trip</Link>
            <a href={`tel:${site.phoneE164}`} className="btn border-2 border-ink text-ink">
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
