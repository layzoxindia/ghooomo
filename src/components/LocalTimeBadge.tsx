"use client";

import { formatCoords, useLocalTime, useOffsetFromIST } from "@/lib/geo";

/** Small live readout: local time, difference from India and coordinates. */
export default function LocalTimeBadge({ timeZone, coords, place }: { timeZone: string; coords: [number, number]; place: string }) {
  const time = useLocalTime(timeZone);
  const off = useOffsetFromIST(timeZone);
  return (
    <div className="glass inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl px-5 py-3 text-[15px] font-semibold text-white">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ring-3 opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ring-3" />
        </span>
        <span className="tabular">{time}</span>
        <span className="text-on-night">in {place}</span>
      </span>
      {off && <span className="tabular text-on-night">{off}</span>}
      <span className="tabular text-on-night">{formatCoords(coords)}</span>
    </div>
  );
}
