"use client";

import { useEffect, useState } from "react";

function fmt(tz: string, d: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true }).format(d).toUpperCase();
}

/** Current time, refreshed every 20 seconds. Null until mounted, so server and client render the same. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const t = window.setInterval(tick, 20000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

/** Time now in a given time zone. */
export function useLocalTime(timeZone: string) {
  const now = useNow();
  return now ? fmt(timeZone, now) : "\u00A0";
}
