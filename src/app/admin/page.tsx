import Link from "next/link";
import AdminNav from "./AdminNav";
import { deleteLead, updateLead } from "./actions";
import { requireAdmin } from "@/lib/server/admin-auth";
import { db } from "@/lib/server/db";
import { turnstileConfigured } from "@/lib/server/security";
import { alertChannels } from "@/lib/server/notify";
import { segments, type Segment } from "@/lib/site";
import { getPackage } from "@/data/packages";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  segment: Segment;
  package_slug: string | null;
  destination: string | null;
  travel_month: string | null;
  travellers: string | null;
  budget: string | null;
  occasion: string | null;
  group_type: string | null;
  message: string | null;
  status: string;
  notes: string | null;
};

const statuses = ["new", "contacted", "quoted", "booked", "closed"];

export default async function AdminLeads({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const sp = await searchParams;
  const seg = typeof sp.segment === "string" ? sp.segment : "";
  const st = typeof sp.status === "string" ? sp.status : "";
  const client = db();

  let leads: Lead[] = [];
  let counts: Record<string, number> = {};
  let dbError = !client;
  let dbDetail = client ? "" : "No database keys found.";
  if (client) {
    let q = client.from("leads").select("*").order("created_at", { ascending: false }).limit(300);
    if (seg && seg in segments) q = q.eq("segment", seg);
    if (st && statuses.includes(st)) q = q.eq("status", st);
    const { data, error } = await q;
    if (error) {
      dbError = true;
      dbDetail = [error.code, error.message].filter(Boolean).join(": ");
    }
    leads = (data as Lead[]) || [];
    const all = await client.from("leads").select("status");
    counts = (all.data || []).reduce<Record<string, number>>((m, r: { status: string }) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
  }

  const filterLink = (k: string, v: string, label: string) => {
    const params = new URLSearchParams();
    if (k !== "segment" && seg) params.set("segment", seg);
    if (k !== "status" && st) params.set("status", st);
    if (v) params.set(k, v);
    const on = (k === "segment" ? seg : st) === v;
    return (
      <Link key={k + v} href={`/admin${params.size ? `?${params}` : ""}`} className={`rounded-full px-3 py-1.5 text-[14px] font-semibold ${on ? "bg-ink text-white" : "bg-white text-ink border border-line"}`}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <AdminNav active="leads" />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[34px] text-ink">Enquiries</h1>
            <p className="text-[15px] text-subtle">
              {statuses.map((s) => `${s}: ${counts[s] || 0}`).join(" · ")}
            </p>
          </div>
          <a href="/admin/export" className="btn bg-ink text-white">Download CSV</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterLink("segment", "", "All types")}
          {(Object.keys(segments) as Segment[]).map((s) => filterLink("segment", s, segments[s].label))}
          <span className="mx-2" />
          {filterLink("status", "", "Any status")}
          {statuses.map((s) => filterLink("status", s, s))}
        </div>

        {dbError && (
          <div role="alert" className="rounded-xl bg-[#FDECEA] p-4 text-[#9B1C1C]">
            <p className="font-semibold">Database not connected: new enquiries are NOT being saved.</p>
            <p className="text-[15px]">
              Check GHOOOMO_DB_URL and GHOOOMO_DB_SERVICE_KEY in Vercel (use the Supabase secret / service_role key, pasted with no spaces), then redeploy.
              {dbDetail ? ` Error: ${dbDetail}` : ""}
            </p>
          </div>
        )}
        {!Object.values(alertChannels()).some(Boolean) && (
          <p className="rounded-xl bg-[#FFF4DB] p-4 font-semibold text-[#7A4B00]">New-lead alerts are off. Add Telegram, email (Resend) or webhook settings in Vercel to get every enquiry on your phone.</p>
        )}
        {!turnstileConfigured() && (
          <p className="rounded-xl bg-[#FFF4DB] p-4 font-semibold text-[#7A4B00]">Spam check is off. Add the Cloudflare Turnstile keys in Vercel to turn it on.</p>
        )}
        {!dbError && leads.length === 0 && <p className="rounded-2xl border border-line bg-white p-8 text-muted">No enquiries yet.</p>}

        <ul className="flex flex-col gap-3">
          {leads.map((l) => {
            const pkg = l.package_slug ? getPackage(l.package_slug) : undefined;
            const details = [
              pkg ? `${pkg.title} (${pkg.nights}N/${pkg.days}D)` : l.destination,
              l.travel_month,
              l.travellers && `${l.travellers} pax`,
              l.group_type,
              l.occasion,
              l.budget,
            ].filter(Boolean);
            return (
              <li key={l.id} className="grid gap-4 rounded-[20px] border border-line bg-white p-5 lg:grid-cols-[1.2fr_1.4fr_1fr]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: segments[l.segment]?.color }} />
                    <span className="text-[13px] font-bold uppercase tracking-wider text-subtle">{segments[l.segment]?.label}</span>
                    <span className="text-[13px] text-subtle">· {new Date(l.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                  <span className="text-[19px] font-semibold text-ink">{l.name}</span>
                  <span className="flex flex-wrap gap-3 text-[15px] font-semibold">
                    <a className="text-wa underline" href={`https://wa.me/${l.phone.replace("+", "")}?text=${encodeURIComponent(`Hi ${l.name}, this is Ghooomo about your trip enquiry.`)}`} target="_blank" rel="noopener noreferrer">{l.phone}</a>
                    <a className="text-ink underline" href={`tel:${l.phone}`}>Call</a>
                    {l.email && <a className="text-ink underline" href={`mailto:${l.email}`}>{l.email}</a>}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-[15px] text-muted">
                  <span className="font-semibold text-text">{details.join(" · ") || "No trip details"}</span>
                  {l.message && <span className="whitespace-pre-wrap">“{l.message}”</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <form action={updateLead} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="field min-h-11" aria-label="Status">
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <textarea name="notes" defaultValue={l.notes || ""} maxLength={2000} rows={2} className="field min-h-0" placeholder="Notes" aria-label="Notes" />
                    <button className="btn min-h-10 bg-ink text-[14px] text-white">Save</button>
                  </form>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={l.id} />
                    <button className="text-[13px] font-semibold text-[#B42318] underline">Delete enquiry</button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
