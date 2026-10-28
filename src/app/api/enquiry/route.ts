import { NextResponse, after } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { clientIp, globalLimited, hashIp, sameOrigin, verifyTurnstile } from "@/lib/server/security";
import { db } from "@/lib/server/db";
import { site, waLink, segments } from "@/lib/site";
import { getPackage } from "@/data/packages";
import { sendAlert } from "@/lib/server/notify";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad request" }, { status: 403 });

  const ip = clientIp(req);
  const ipHash = await hashIp(ip);
  if (await globalLimited(`enq:${ipHash}`, 6, 10 * 60 * 1000)) {
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

  // Same number many times, or a flood from many IPs: stop before touching the leads table.
  if ((await globalLimited(`enq-phone:${await hashIp(e.phone)}`, 4, 60 * 60 * 1000)) || (await globalLimited("enq-all", 120, 60 * 60 * 1000))) {
    return NextResponse.json({ error: "We have received a lot of enquiries just now. Please message us on WhatsApp directly." , whatsapp: waLink("Hi Ghooomo! I'd like to plan a holiday.") }, { status: 429 });
  }

  const pkg = e.packageSlug ? getPackage(e.packageSlug) : undefined;

  const sourcePath = new URL(req.headers.get("referer") || site.url).pathname.slice(0, 200);
  let saved = false;
  let failure = "";
  const client = db();
  if (client) {
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
      source_path: sourcePath,
      ip_hash: ipHash,
    });
    if (error) {
      failure = [error.code, error.message].filter(Boolean).join(": ").slice(0, 200) || "insert failed";
      console.error("LEAD NOT SAVED: insert failed", failure);
    } else saved = true;
  } else {
    failure = "database not configured";
    if (process.env.NODE_ENV === "production") console.error("SUPABASE not configured: lead not stored");
  }

  // Tell the team straight away. The alert holds every detail, so the lead survives a database failure.
  after(() =>
    sendAlert({
      title: saved ? `New enquiry: ${e.name}` : `LEAD NOT SAVED: ${e.name}`,
      urgent: !saved,
      fields: [
        ["Name", e.name],
        ["Phone", e.phone],
        ["Email", e.email],
        ["Trip type", segments[e.segment].label],
        ["Package", pkg ? `${pkg.title} (${pkg.nights}N/${pkg.days}D)` : ""],
        ["Destination", e.destination],
        ["When", e.travelMonth],
        ["Travellers", e.travellers],
        ["Group", e.groupType],
        ["Occasion", e.occasion],
        ["Budget", e.budget],
        ["Note", e.message],
        ["Page", sourcePath],
        ["Saved in admin", saved ? "Yes" : `No (${failure})`],
      ],
      data: { kind: "enquiry", saved, segment: e.segment, packageSlug: pkg?.slug ?? null },
    }),
  );

  const lines = [
    `Hi Ghooomo! I'd like a quote for a ${segments[e.segment].label.toLowerCase()} holiday.`,
    pkg ? `Journey: ${pkg.title} (${pkg.nights}N/${pkg.days}D)` : e.destination ? `Destination: ${e.destination}` : "",
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
