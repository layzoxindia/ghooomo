import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/admin-auth";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const cols = ["created_at", "name", "phone", "email", "segment", "package_slug", "destination", "travel_month", "travellers", "budget", "occasion", "group_type", "message", "status", "notes"];

function cell(v: unknown) {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const client = db();
  if (!client) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { data, error } = await client.from("leads").select(cols.join(",")).order("created_at", { ascending: false }).limit(5000);
  if (error) return NextResponse.json({ error: "Export failed" }, { status: 500 });
  const rows = (data as unknown as Record<string, unknown>[]) || [];
  const csv = "﻿" + [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="ghooomo-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
