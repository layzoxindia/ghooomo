import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { clientIp, hashIp, rateLimited, sameOrigin, verifyTurnstile } from "@/lib/server/security";
import { db } from "@/lib/server/db";
import { site, waLink, segments, formatINR } from "@/lib/site";
import { priceOf } from "@/lib/pricing";
import { getPackage } from "@/data/packages";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad request" }, { status: 403 });

  const ip = clientIp(req);
  if (rateLimited(`enq:${ip}`, 6)) {
    return NextResponse.json({ error: "Too many enquiries. Please try again in a few minutes or call us." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message || "Please check the form", field: first?.path?.[0] }, { status: 422 });
  }
  const e = parsed.data;

  // Honeypot filled: pretend success, store nothing.
  if (e.website) return NextResponse.json({ ok: true, whatsapp: waLink("Hi Ghooomo!") });

  if (!(await verifyTurnstile(e.turnstileToken, ip))) {
    return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 400 });
  }

  const pkg = e.packageSlug ? getPackage(e.packageSlug) : undefined;

  const client = db();
  if (client) {
    const ipHash = await hashIp(ip);
    const { error } = await client.from("leads").insert({
      name: e.name,
      phone: e.phone,
      email: e.email || null,
      segment: e.segment,
      package_slug: pkg?.slug ?? null,
      destination: e.destination || pkg?.destination || null,
      travel_month: e.travelMonth || null,
      travellers: e.travellers || null,
      budget: e.budget || null,
      occasion: e.occasion || null,
      group_type: e.groupType || null,
      message: e.message || null,
      consent_at: new Date().toISOString(),
      notice_version: e.noticeVersion,
      source_path: new URL(req.headers.get("referer") || site.url).pathname.slice(0, 200),
      ip_hash: ipHash,
    });
    if (error) {
      console.error("lead insert failed", error.message);
      // Still hand the person over to WhatsApp so the enquiry is not lost.
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("SUPABASE not configured: lead not stored");
  }

  const lines = [
    `Hi Ghooomo! I'd like to plan a ${segments[e.segment].label.toLowerCase()} trip.`,
    pkg ? `Package: ${pkg.title} (${pkg.nights}N/${pkg.days}D), from ${formatINR(priceOf(pkg).total)} per person` : e.destination ? `Destination: ${e.destination}` : "",
    e.travelMonth ? `When: ${e.travelMonth}` : "",
    e.travellers ? `Travellers: ${e.travellers}` : "",
    e.groupType ? `Group: ${e.groupType}` : "",
    e.occasion ? `Occasion: ${e.occasion}` : "",
    e.budget ? `Budget: ${e.budget}` : "",
    e.message ? `Note: ${e.message}` : "",
    `Name: ${e.name}`,
  ].filter(Boolean);

  return NextResponse.json({ ok: true, whatsapp: waLink(lines.join("\n")) });
}
