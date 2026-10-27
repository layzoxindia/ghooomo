"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroMedia } from "@/lib/media";

export default function HeroVideo({ media, className = "", priority = true }: { media: HeroMedia; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = media.video;
    if (!v?.ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Respect data-saver connections: keep the still poster.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    // Start the video after first paint so the poster image stays the fast LCP element.
    const t = window.setTimeout(() => setSrc(mobile && v.mobileSrc ? v.mobileSrc : v.src), 300);
    return () => window.clearTimeout(t);
  }, [media.video]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Image
        src={media.poster}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        quality={80}
        className={`object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      {src && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}
