"use client";

import { useEffect, useState } from "react";

export function formatCoords([lat, lng]: [number, number]) {
  const la = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}`;
  const lo = `${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? "E" : "W"}`;
  return `${la} · ${lo}`;
}

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

/** "+2h 30m from India" style difference, empty until mounted. */
export function useOffsetFromIST(timeZone: string) {
  const now = useNow();
  return now ? offsetFromIST(timeZone, now) : "";
}

/** Difference from Indian time, e.g. "+2h 30m", "-4h 30m" or "Same as India". */
export function offsetFromIST(timeZone: string, d = new Date()) {
  const part = (tz: string) => {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(d);
    const g = (t: string) => Number(p.find((x) => x.type === t)?.value);
    return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour") % 24, g("minute"));
  };
  const mins = Math.round((part(timeZone) - part("Asia/Kolkata")) / 60000);
  if (mins === 0) return "Same as India";
  const a = Math.abs(mins);
  const h = Math.floor(a / 60);
  const m = a % 60;
  const span = [h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ");
  return `${span} ${mins > 0 ? "ahead of" : "behind"} India`;
}
