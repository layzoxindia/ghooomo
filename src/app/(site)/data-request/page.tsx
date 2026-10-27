import type { Metadata } from "next";
import DataRequestForm from "@/components/DataRequestForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Access or Delete My Data",
  description: "Ask Ghooomo to show, correct or delete your personal data, withdraw consent, or raise a privacy grievance.",
  alternates: { canonical: "/data-request" },
};

export default function DataRequestPage() {
  return (
    <section className="wrap grid max-w-[1100px] gap-10 pb-24 pt-28 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-5">
        <p className="eyebrow text-solo-text">Your data, your call</p>
        <h1 className="text-[clamp(38px,5vw,62px)] font-extrabold leading-[0.98] text-ink">Access, correct or delete your data.</h1>
        <p className="text-[18px] text-muted">
          Use this form to exercise your rights under the DPDP Act. We’ll confirm it’s you by WhatsApp or a call to the number you give, then act on it and reply.
        </p>
        <p className="text-[16px] text-muted">
          Prefer email? Write to our Grievance Officer at <a className="font-semibold text-ink underline underline-offset-2" href={`mailto:${site.grievanceEmail}`}>{site.grievanceEmail}</a>.
        </p>
      </div>
      <DataRequestForm />
    </section>
  );
}
