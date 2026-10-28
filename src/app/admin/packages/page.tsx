import Link from "next/link";
import AdminNav from "../AdminNav";
import { savePackage } from "../actions";
import { requireAdmin } from "@/lib/server/admin-auth";
import { getCatalog } from "@/lib/server/catalog";
import { segments } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminPackages() {
  await requireAdmin();
  const items = await getCatalog(true);

  return (
    <>
      <AdminNav active="packages" />
      <main className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-8">
        <div>
          <h1 className="text-[34px] text-ink">Packages</h1>
          <p className="text-[15px] text-subtle">Prices are not shown on the website: every trip is quoted for the traveller&apos;s dates. Use the switch to show or hide a package. Changes appear within a minute of saving.</p>
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((p) => (
            <li key={p.slug}>
              <form action={savePackage} className="flex flex-wrap items-center gap-4 rounded-[20px] border border-line bg-white p-5">
                <input type="hidden" name="slug" value={p.slug} />
                <div className="flex min-w-[240px] flex-1 flex-col">
                  <span className="text-[13px] font-bold uppercase tracking-wider" style={{ color: segments[p.segment].text }}>{segments[p.segment].label}</span>
                  <Link href={`/packages/${p.slug}`} target="_blank" className="text-[18px] font-semibold text-ink underline-offset-2 hover:underline">{p.title}</Link>
                  <span className="text-[14px] text-subtle">{p.nights}N/{p.days}D · {p.destination}</span>
                </div>
                <label className="flex items-center gap-2 text-[15px] font-semibold text-text">
                  <input type="checkbox" name="active" defaultChecked={p.active} className="h-5 w-5 accent-[#0F2B5B]" /> Show on site
                </label>
                <button className="btn min-h-11 bg-ink text-[14px] text-white">Save</button>
              </form>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
