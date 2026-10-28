"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoInterpolate, geoOrthographic } from "d3-geo";
import landDots from "@/data/land-dots.json";

export type City = { name: string; at: [number, number]; india?: boolean };

const ORIGIN: [number, number] = [77.21, 28.61]; // New Delhi
const DOTS = landDots as [number, number][];

/**
 * Dotted globe on a 2D canvas. Turns slowly on its own, can be dragged,
 * and labels the holiday cities facing you.
 */
export default function DotGlobe({ cities }: { cities: City[] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const proj = geoOrthographic().clipAngle(90).precision(0.5);
    const rot = [-60, -18]; // start over the Indian Ocean
    let hover = false;
    let drag: { x: number; y: number; r0: number; r1: number } | null = null;

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, r0: rot[0], r1: rot[1] };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const k = 180 / Math.max(200, size);
      rot[0] = drag.r0 + (e.clientX - drag.x) * k;
      rot[1] = Math.max(-50, Math.min(50, drag.r1 - (e.clientY - drag.y) * k));
    };
    const up = () => (drag = null);
    const enter = () => (hover = true);
    const leave = () => { hover = false; drag = null; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerenter", enter);
    canvas.addEventListener("pointerleave", leave);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let t = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || !size) return;
      t += 1;
      if (!drag && !hover && !reduce) rot[0] += 0.09;

      const r = size / 2 - 8;
      proj.translate([size / 2, size / 2]).scale(r).rotate([rot[0], rot[1], 0]);
      const centre: [number, number] = [-rot[0], -rot[1]];
      const front = (p: [number, number]) => geoDistance(p, centre) < Math.PI / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const g = ctx.createRadialGradient(size * 0.36, size * 0.3, r * 0.1, size / 2, size / 2, r);
      g.addColorStop(0, "#1C3E7A");
      g.addColorStop(1, "#0A1D42");
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(19,178,168,0.45)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const dot = Math.max(1.1, size / 330);
      for (const p of DOTS) {
        const d = geoDistance(p, centre);
        if (d > Math.PI / 2) continue;
        const xy = proj(p);
        if (!xy) continue;
        ctx.fillStyle = `rgba(168,196,240,${0.22 + 0.6 * Math.cos(d)})`;
        ctx.fillRect(xy[0] - dot / 2, xy[1] - dot / 2, dot, dot);
      }

      // Faint routes from Delhi to the cities abroad.
      ctx.lineWidth = 1;
      for (const c of cities) {
        if (c.india) continue;
        const interp = geoInterpolate(ORIGIN, c.at);
        ctx.beginPath();
        let on = false;
        for (let n = 0; n <= 40; n++) {
          const q = interp(n / 40) as [number, number];
          if (!front(q)) { on = false; continue; }
          const xy = proj(q);
          if (!xy) continue;
          const lift = Math.sin((n / 40) * Math.PI) * 0.04;
          const x = size / 2 + (xy[0] - size / 2) * (1 + lift);
          const y = size / 2 + (xy[1] - size / 2) * (1 + lift);
          if (!on) { ctx.moveTo(x, y); on = true; } else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(242,96,58,0.28)";
        ctx.stroke();
      }

      // Markers and names. Names closest to the centre win when two would overlap.
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const font = Math.max(12, Math.min(15, size / 42));
      ctx.font = `600 ${font}px "General Sans", system-ui, sans-serif`;
      const order = cities
        .map((c) => ({ c, d: geoDistance(c.at, centre) }))
        .filter((o) => o.d < Math.PI / 2 - 0.08)
        .sort((a, b) => a.d - b.d);
      // Pass 1: all markers. Pass 2: names on top, so a dot never covers a name.
      for (const { c, d } of order) {
        const xy = proj(c.at);
        if (!xy) continue;
        const fade = Math.min(1, Math.cos(d) * 1.6);
        const pulse = reduce ? 0 : ((t + c.name.length * 9) % 120) / 120;
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 3 + pulse * 9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(247,174,42,${0.55 * (1 - pulse) * fade})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 3.4, 0, Math.PI * 2);
        ctx.fillStyle = c.india ? `rgba(19,178,168,${fade})` : `rgba(247,174,42,${fade})`;
        ctx.fill();
      }
      for (const { c, d } of order) {
        const xy = proj(c.at);
        if (!xy) continue;
        const fade = Math.min(1, Math.cos(d) * 1.6);
        const w = ctx.measureText(c.name).width + 14;
        const h = font + 8;
        const right = xy[0] < size - w - 12;
        const box = { x: right ? xy[0] + 8 : xy[0] - 8 - w, y: xy[1] - h / 2, w, h };
        if (placed.some((b) => box.x < b.x + b.w && box.x + box.w > b.x && box.y < b.y + b.h && box.y + box.h > b.y)) continue;
        placed.push(box);
        ctx.fillStyle = `rgba(7,21,48,${0.72 * fade})`;
        ctx.beginPath();
        ctx.roundRect(box.x, box.y, box.w, box.h, 7);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.textBaseline = "middle";
        ctx.fillText(c.name, box.x + 7, xy[1] + 0.5);
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerenter", enter);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [cities]);

  return <canvas ref={ref} aria-hidden="true" className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing" />;
}
