"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** One IntersectionObserver for every .reveal element on the page. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    // Anything already on screen stays visible; only below-the-fold items animate in.
    const below = els.filter((el) => el.getBoundingClientRect().top > vh * 0.9);
    below.forEach((el) => el.classList.add("is-pending"));
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            e.target.classList.remove("is-pending");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    below.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
