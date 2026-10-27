import { NextResponse } from "next/server";
import { dataRequestSchema } from "@/lib/validation";
import { clientIp, hashIp, rateLimited, sameOrigin, verifyTurnstile } from "@/lib/server/security";
import { db } from "@/lib/server/db";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad request" }, { status: 403 });
  const ip = clientIp(req);
  if (rateLimited(`dr:${ip}`, 3)) {
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

  const client = db();
  if (!client) {
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
    return NextResponse.json({ error: "We couldn't record this online right now. Please email us." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
