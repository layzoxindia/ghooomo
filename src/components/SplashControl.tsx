"use client";

import { useEffect } from "react";

/** Lets visitors skip the opening screen and removes it from layout once it has played. */
export default function SplashControl() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-on")) return;
    const el = document.getElementById("splash");
    const done = () => {
      root.classList.add("intro-done");
      cleanup();
    };
    const skip = () => root.classList.add("intro-skip");
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el && (e.animationName === "splash-out" || e.animationName === "splash-out-fast")) done();
    };
    const events = ["pointerdown", "keydown", "wheel", "touchmove"] as const;
    events.forEach((t) => window.addEventListener(t, skip, { passive: true }));
    el?.addEventListener("animationend", onEnd);
    const fallback = window.setTimeout(done, 5000);
    function cleanup() {
      events.forEach((t) => window.removeEventListener(t, skip));
      el?.removeEventListener("animationend", onEnd);
      window.clearTimeout(fallback);
    }
    return cleanup;
  }, []);
  return null;
}
