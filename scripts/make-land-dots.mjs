// Builds src/data/land-dots.json: a grid of points that fall on land, for the homepage globe.
// Run with: node scripts/make-land-dots.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/land-110m.json", import.meta.url)));
const land = feature(topo, topo.objects.land);
const STEP = 2; // degrees
const dots = [];
for (let lat = -58; lat <= 78; lat += STEP) {
  // Fewer points near the poles so spacing looks even on the sphere.
  const step = STEP / Math.max(0.35, Math.cos((lat * Math.PI) / 180));
  for (let lng = -180; lng < 180; lng += step) {
    if (geoContains(land, [lng, lat])) dots.push([Math.round(lng * 10) / 10, lat]);
  }
}
writeFileSync(new URL("../src/data/land-dots.json", import.meta.url), JSON.stringify(dots));
console.log(`${dots.length} land dots`);
