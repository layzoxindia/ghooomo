import AdminNav from "../AdminNav";
import { eraseForRequest, updateRequest } from "../actions";
import { requireAdmin } from "@/lib/server/admin-auth";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

type Req = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  request_type: string;
  details: string | null;
  status: string;
  resolution_note: string | null;
};

const labels: Record<string, string> = {
  access: "See my data",
  correction: "Correct my data",
  deletion: "Delete my data",
  "withdraw-consent": "Withdraw consent",
  grievance: "Complaint",
};

export default async function AdminRequests() {
  await requireAdmin();
  const client = db();
  const { data } = client ? await client.from("data_requests").select("*").order("created_at", { ascending: false }).limit(200) : { data: [] };
  const rows = (data as Req[]) || [];

  return (
    <>
      <AdminNav active="requests" />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-8">
        <div>
          <h1 className="text-[34px] text-ink">Data requests (DPDP)</h1>
          <p className="max-w-[760px] text-[15px] text-subtle">
            First confirm the person by WhatsApp or call to the number given (mark “verified”). For deletion or withdrawal, use “Erase all enquiries”. It removes every enquiry with that number. Reply to the person once done.
          </p>
        </div>
        {rows.length === 0 && <p className="rounded-2xl border border-line bg-white p-8 text-muted">No requests.</p>}
        <ul className="flex flex-col gap-3">
          {rows.map((r) => (
            <li key={r.id} className="grid gap-4 rounded-[20px] border border-line bg-white p-5 lg:grid-cols-[1.2fr_1.2fr_1fr]">
              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-subtle">{new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</span>
                <span className="text-[19px] font-semibold text-ink">{r.name}</span>
                <span className="text-[15px] font-semibold"><a className="underline" href={`tel:${r.phone}`}>{r.phone}</a>{r.email ? ` · ${r.email}` : ""}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="w-fit rounded-full bg-paper px-3 py-1 text-[13px] font-bold text-ink">{labels[r.request_type] || r.request_type}</span>
                {r.details && <span className="whitespace-pre-wrap text-[15px] text-muted">{r.details}</span>}
                {r.resolution_note && <span className="text-[14px] text-subtle">Note: {r.resolution_note}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <form action={updateRequest} className="flex flex-col gap-2">
                  <input type="hidden" name="id" value={r.id} />
                  <select name="status" defaultValue={r.status} className="field min-h-11" aria-label="Status">
                    {["open", "verified", "done", "rejected"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <input name="note" defaultValue={r.resolution_note || ""} maxLength={500} className="field min-h-11" placeholder="Note" aria-label="Note" />
                  <button className="btn min-h-10 bg-ink text-[14px] text-white">Save</button>
                </form>
                {(r.request_type === "deletion" || r.request_type === "withdraw-consent") && r.status !== "done" && (
                  <form action={eraseForRequest}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="phone" value={r.phone} />
                    <button className="btn min-h-10 w-full bg-[#B42318] text-[14px] text-white">Erase all enquiries for {r.phone}</button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
