import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { logout } from "./actions";

export default function AdminNav({ active }: { active: "leads" | "requests" | "packages" }) {
  const tab = (key: string, href: string, label: string) => (
    <Link
      href={href}
      className={`flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold ${active === key ? "bg-ink text-white" : "text-ink hover:bg-ink/6"}`}
    >
      {label}
    </Link>
  );
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-4">
          <Wordmark width={130} bg="#FFFFFF" id="adm" />
          <span className="rounded-full bg-paper px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-subtle">Admin</span>
        </div>
        <nav className="flex flex-wrap gap-1">
          {tab("leads", "/admin", "Enquiries")}
          {tab("requests", "/admin/requests", "Data requests")}
          {tab("packages", "/admin/packages", "Packages & prices")}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[14px] font-semibold text-subtle hover:text-ink">View site</Link>
          <form action={logout}><button className="btn min-h-10 border-2 border-ink px-4 text-[14px] text-ink">Sign out</button></form>
        </div>
      </div>
    </header>
  );
}
