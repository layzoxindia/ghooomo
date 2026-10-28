"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoInterpolate, geoOrthographic } from "d3-geo";
import landDots from "@/data/land-dots.json";

type LngLat = [number, number];

const ORIGIN: LngLat = [77.21, 28.61]; // New Delhi
const DOTS = landDots as LngLat[];

/**
 * A dotted globe drawn on a 2D canvas (works on every browser, no WebGL).
 * Turns towards `focus`, draws a route from Delhi to each point and highlights the active one.
 */
export default function DotGlobe({ points, active, spin }: { points: LngLat[]; active: number; spin: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const state = useRef({ active, spin });
  useEffect(() => {
    state.current = { active, spin };
  }, [active, spin]);

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
    // Rotation is [-lng, -lat]: start looking at the first point.
    const rot = [-points[0][0], -points[0][1] * 0.6];
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let t = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || !size) return;
      t += 1;
      const { active: a, spin: s } = state.current;
      const target = points[a];
      if (s && !reduce) {
        rot[0] += 0.12;
      } else {
        // Ease towards the active destination, the short way round.
        let d = -target[0] - rot[0];
        d = ((((d + 180) % 360) + 360) % 360) - 180;
        rot[0] += d * 0.07;
        rot[1] += (-target[1] * 0.6 - rot[1]) * 0.07;
      }
      const r = size / 2 - 6;
      proj.translate([size / 2, size / 2]).scale(r).rotate([rot[0], rot[1], 0]);
      const centre: LngLat = [-rot[0], -rot[1]];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Sphere with a soft light from the top left.
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

      // Land as dots, fainter towards the edge.
      const dot = Math.max(1.1, size / 330);
      for (const p of DOTS) {
        const dist = geoDistance(p, centre);
        if (dist > Math.PI / 2) continue;
        const xy = proj(p);
        if (!xy) continue;
        const k = Math.cos(dist);
        ctx.fillStyle = `rgba(168,196,240,${0.25 + 0.6 * k})`;
        ctx.fillRect(xy[0] - dot / 2, xy[1] - dot / 2, dot, dot);
      }

      // Routes from Delhi.
      points.forEach((p, i) => {
        const interp = geoInterpolate(ORIGIN, p);
        const isActive = i === a;
        ctx.beginPath();
        let started = false;
        const steps = 48;
        for (let n = 0; n <= steps; n++) {
          const q = interp(n / steps) as LngLat;
          if (geoDistance(q, centre) > Math.PI / 2) { started = false; continue; }
          const xy = proj(q);
          if (!xy) continue;
          // Lift the arc slightly off the surface.
          const lift = Math.sin((n / steps) * Math.PI) * (isActive ? 0.06 : 0.035);
          const x = size / 2 + (xy[0] - size / 2) * (1 + lift);
          const y = size / 2 + (xy[1] - size / 2) * (1 + lift);
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isActive ? "rgba(247,174,42,0.95)" : "rgba(242,96,58,0.32)";
        ctx.lineWidth = isActive ? 2.2 : 1.1;
        ctx.stroke();
      });

      // Markers.
      const drawMarker = (p: LngLat, color: string, big: boolean) => {
        if (geoDistance(p, centre) > Math.PI / 2) return;
        const xy = proj(p);
        if (!xy) return;
        if (big && !reduce) {
          const pulse = (t % 90) / 90;
          ctx.beginPath();
          ctx.arc(xy[0], xy[1], 4 + pulse * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(247,174,42,${0.8 * (1 - pulse)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], big ? 5.5 : 3.2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      };
      points.forEach((p, i) => drawMarker(p, i === a ? "#F7AE2A" : "#F2603A", i === a));
      drawMarker(ORIGIN, "#13B2A8", false);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [points]);

  return <canvas ref={ref} aria-hidden="true" className="h-full w-full" />;
}
