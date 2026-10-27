import { redirect } from "next/navigation";
import { Wordmark } from "@/components/Logo";
import LoginForm from "./LoginForm";
import { adminConfigured, isAdmin } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="flex min-h-dvh items-center justify-center p-5">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-[28px] bg-white p-8 shadow-[0_30px_60px_rgba(15,43,91,0.12)]">
        <Wordmark width={170} />
        <h1 className="text-2xl text-ink">Admin sign in</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="text-[15px] text-muted">Admin is not set up yet. Add ADMIN_PASSWORD (12+ characters) and ADMIN_SESSION_SECRET in the hosting settings.</p>
        )}
      </div>
    </div>
  );
}
