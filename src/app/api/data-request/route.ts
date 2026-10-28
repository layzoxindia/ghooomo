import { NextResponse, after } from "next/server";
import { dataRequestSchema } from "@/lib/validation";
import { clientIp, globalLimited, hashIp, sameOrigin, verifyTurnstile } from "@/lib/server/security";
import { db } from "@/lib/server/db";
import { sendAlert } from "@/lib/server/notify";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad request" }, { status: 403 });
  const ip = clientIp(req);
  if (await globalLimited(`dr:${await hashIp(ip)}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please email us instead." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const parsed = dataRequestSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message || "Please check the form", field: first?.path?.[0] }, { status: 422 });
  }
  const r = parsed.data;
  if (r.website) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(r.turnstileToken, ip))) {
    return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 400 });
  }

  // Privacy requests have legal deadlines, so the team hears about every one, saved or not.
  const alert = (saved: boolean, why = "") =>
    after(() =>
      sendAlert({
        title: saved ? `Privacy request (${r.requestType}): ${r.name}` : `PRIVACY REQUEST NOT SAVED: ${r.name}`,
        urgent: true,
        fields: [
          ["Request", r.requestType],
          ["Name", r.name],
          ["Phone", r.phone],
          ["Email", r.email],
          ["Details", r.details],
          ["Saved in admin", saved ? "Yes" : `No (${why})`],
        ],
        data: { kind: "data-request", saved },
      }),
    );

  const client = db();
  if (!client) {
    alert(false, "database not configured");
    return NextResponse.json({ error: "We couldn't record this online right now. Please email us." }, { status: 503 });
  }
  const { error } = await client.from("data_requests").insert({
    name: r.name,
    phone: r.phone,
    email: r.email || null,
    request_type: r.requestType,
    details: r.details || null,
    ip_hash: await hashIp(ip),
  });
  if (error) {
    console.error("data request insert failed", error.message);
    alert(false, error.message.slice(0, 200));
    return NextResponse.json({ error: "We couldn't record this online right now. Please email us." }, { status: 500 });
  }
  alert(true);
  return NextResponse.json({ ok: true });
}
