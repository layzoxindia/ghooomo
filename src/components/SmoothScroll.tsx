"use client";

import { useEffect } from "react";

/**
 * Smooth wheel scrolling for mouse and trackpad users. Phones and tablets keep their
 * native touch scrolling, and never download the library.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let id = 0;
    let stop = false;
    let destroy = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (stop) return;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -20 } });
      const raf = (t: number) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
      destroy = () => lenis.destroy();
    });
    return () => {
      stop = true;
      cancelAnimationFrame(id);
      destroy();
    };
  }, []);
  return null;
}
