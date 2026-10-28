"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/server/admin-auth";
import { globalLimited, hashIp } from "@/lib/server/security";
import { db } from "@/lib/server/db";
import { packages } from "@/data/packages";

export async function login(_: { error?: string } | undefined, fd: FormData) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || "local").trim();
  // Per IP, plus an overall cap so a password cannot be guessed from many IPs at once.
  const locked = (await globalLimited(`admin:${await hashIp(ip)}`, 5, 15 * 60 * 1000)) || (await globalLimited("admin-all", 30, 60 * 60 * 1000));
  if (locked) return { error: "Too many attempts. Try again in 15 minutes." };
  const pw = String(fd.get("password") || "");
  if (!checkPassword(pw)) return { error: "Wrong password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

const id = z.string().uuid();

export async function updateLead(fd: FormData) {
  await requireAdmin();
  const parsed = z
    .object({
      id,
      status: z.enum(["new", "contacted", "quoted", "booked", "closed"]),
      notes: z.string().max(2000),
    })
    .safeParse({ id: fd.get("id"), status: fd.get("status"), notes: String(fd.get("notes") ?? "") });
  if (!parsed.success) return;
  const client = db();
  if (!client) return;
  await client
    .from("leads")
    .update({ status: parsed.data.status, notes: parsed.data.notes || null, last_contact_at: new Date().toISOString() })
    .eq("id", parsed.data.id);
  revalidatePath("/admin");
}

export async function deleteLead(fd: FormData) {
  await requireAdmin();
  const parsed = id.safeParse(fd.get("id"));
  const client = db();
  if (!parsed.success || !client) return;
  await client.from("leads").delete().eq("id", parsed.data);
  revalidatePath("/admin");
}

/** DPDP erasure: remove every enquiry for a phone number and close the request. */
export async function eraseForRequest(fd: FormData) {
  await requireAdmin();
  const parsed = z.object({ id, phone: z.string().regex(/^\+91[6-9]\d{9}$/) }).safeParse({ id: fd.get("id"), phone: fd.get("phone") });
  const client = db();
  if (!parsed.success || !client) return;
  await client.from("leads").delete().eq("phone", parsed.data.phone);
  await client
    .from("data_requests")
    .update({ status: "done", resolved_at: new Date().toISOString(), resolution_note: "All enquiries for this number deleted." })
    .eq("id", parsed.data.id);
  revalidatePath("/admin/requests");
  revalidatePath("/admin");
}

export async function updateRequest(fd: FormData) {
  await requireAdmin();
  const parsed = z
    .object({ id, status: z.enum(["open", "verified", "done", "rejected"]), note: z.string().max(500) })
    .safeParse({ id: fd.get("id"), status: fd.get("status"), note: String(fd.get("note") ?? "") });
  const client = db();
  if (!parsed.success || !client) return;
  const done = parsed.data.status === "done" || parsed.data.status === "rejected";
  await client
    .from("data_requests")
    .update({ status: parsed.data.status, resolution_note: parsed.data.note || null, resolved_at: done ? new Date().toISOString() : null })
    .eq("id", parsed.data.id);
  revalidatePath("/admin/requests");
}

export async function savePackage(fd: FormData) {
  await requireAdmin();
  const slugs = packages.map((p) => p.slug) as [string, ...string[]];
  const parsed = z
    .object({ slug: z.enum(slugs), price: z.coerce.number().int().min(500).max(1000000), active: z.boolean() })
    .safeParse({ slug: fd.get("slug"), price: fd.get("price"), active: fd.get("active") === "on" });
  const client = db();
  if (!parsed.success || !client) return;
  await client.from("package_overrides").upsert({ ...parsed.data, updated_at: new Date().toISOString() });
  revalidatePath("/", "layout");
}
