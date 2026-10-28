"use client";

import { useLocalTime } from "@/lib/geo";

function Clock({ place, timeZone }: { place: string; timeZone: string }) {
  const time = useLocalTime(timeZone);
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-on-night">{place}</span>
      <span className="tabular text-white">{time}</span>
    </span>
  );
}

/** Local time at the destination; one clock per country on multi-country holidays. */
export default function LocalTimeBadge({ clocks }: { clocks: { place: string; timeZone: string }[] }) {
  return (
    <div className="glass inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl px-5 py-3 text-[15px] font-semibold">
      <span className="text-white/75">Local time</span>
      {clocks.map((c) => <Clock key={c.place} {...c} />)}
    </div>
  );
}
