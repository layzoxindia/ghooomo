"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import Turnstile from "./Turnstile";
import { ChatIcon, CheckIcon } from "./Icons";
import { site, type Segment } from "@/lib/site";

type Variant = "general" | Segment | "package";

type Props = {
  variant?: Variant;
  segment?: Segment;
  packageSlug?: string;
  packageTitle?: string;
  submitLabel?: string;
  compact?: boolean;
};

const budgets = ["Under ₹15k", "₹15k – ₹30k", "₹30k – ₹60k", "₹60k+"];

export default function EnquiryForm({ variant = "general", segment, packageSlug, packageTitle, submitLabel, compact }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<{ msg: string; field?: string } | null>(null);
  const [wa, setWa] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const onToken = useCallback((t: string) => setToken(t), []);
  const uid = packageSlug || variant;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      segment: (get("segment") || segment || "solo") as Segment,
      destination: get("destination"),
      packageSlug: packageSlug || "",
      travelMonth: get("travelMonth"),
      travellers: get("travellers"),
      budget: get("budget"),
      occasion: get("occasion"),
      groupType: get("groupType"),
      message: get("message"),
      consent: fd.get("consent") === "on",
      noticeVersion: site.privacyNoticeVersion,
      turnstileToken: token,
      website: get("website"),
    };
    if (!payload.consent) {
      setError({ msg: "Please tick the consent box so we can contact you about this enquiry.", field: "consent" });
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; whatsapp?: string; error?: string; field?: string };
      if (!res.ok || !data.whatsapp) {
        setError({ msg: data.error || "Something went wrong. Please try again or call us.", field: data.field });
        setState("idle");
        setResetKey((k) => k + 1);
        return;
      }
      setWa(data.whatsapp);
      setState("done");
      const w = window.open(data.whatsapp, "_blank", "noopener,noreferrer");
      if (!w) window.location.assign(data.whatsapp);
    } catch {
      setError({ msg: "Network problem. Please check your connection or call us." });
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[28px] bg-white p-7 shadow-[0_30px_60px_rgba(15,43,91,0.12)] sm:p-9">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wa text-white"><CheckIcon /></span>
        <h3 className="text-2xl text-ink">Enquiry received</h3>
        <p className="text-muted">
          Send the WhatsApp message that just opened so a planner can reply. If it didn’t open, use the button below or call {site.phoneDisplay}.
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-wa text-white hover:bg-wa-deep">
          <ChatIcon /> Open WhatsApp
        </a>
      </div>
    );
  }

  const err = (f: string) => (error?.field === f ? `err-${uid}` : undefined);
  const showSegmentPicker = variant === "general";

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`grid gap-4 rounded-[28px] bg-white shadow-[0_30px_60px_rgba(15,43,91,0.12)] sm:grid-cols-2 ${compact ? "p-6" : "p-6 sm:p-9"}`}
    >
      {packageTitle && (
        <p className="sm:col-span-2 text-[15px] font-semibold text-ink">Enquiring about: {packageTitle}</p>
      )}
      <div>
        <label className="label" htmlFor={`name-${uid}`}>Your name</label>
        <input className="field" id={`name-${uid}`} name="name" autoComplete="name" required maxLength={80} aria-invalid={error?.field === "name"} aria-describedby={err("name")} />
      </div>
      <div>
        <label className="label" htmlFor={`phone-${uid}`}>WhatsApp number</label>
        <input className="field" id={`phone-${uid}`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98xxxxxxxx" required maxLength={16} aria-invalid={error?.field === "phone"} aria-describedby={err("phone")} />
      </div>

      {showSegmentPicker ? (
        <div>
          <label className="label" htmlFor={`segment-${uid}`}>Travelling as</label>
          <select className="field" id={`segment-${uid}`} name="segment" defaultValue="couple">
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="group">Group</option>
          </select>
        </div>
      ) : (
        <input type="hidden" name="segment" value={segment} />
      )}

      {variant !== "package" && (
        <div>
          <label className="label" htmlFor={`dest-${uid}`}>Destination</label>
          <input className="field" id={`dest-${uid}`} name="destination" maxLength={120} placeholder={variant === "group" ? "Goa, Manali, Thailand…" : variant === "solo" ? "Spiti, Ladakh, Meghalaya…" : "Bali, Kerala, Maldives…"} />
        </div>
      )}

      {variant === "couple" && (
        <div>
          <label className="label" htmlFor={`occ-${uid}`}>Occasion</label>
          <select className="field" id={`occ-${uid}`} name="occasion" defaultValue="Honeymoon">
            <option>Honeymoon</option><option>Anniversary</option><option>Babymoon</option><option>Proposal trip</option><option>Long weekend</option>
          </select>
        </div>
      )}

      {variant === "group" && (
        <>
          <div>
            <label className="label" htmlFor={`gt-${uid}`}>Group type</label>
            <select className="field" id={`gt-${uid}`} name="groupType" defaultValue="Friends">
              <option>Friends</option><option>Family</option><option>College</option><option>Corporate offsite</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor={`trav-${uid}`}>Number of people</label>
            <input className="field" id={`trav-${uid}`} name="travellers" inputMode="numeric" maxLength={20} placeholder="e.g. 12" />
          </div>
        </>
      )}

      {variant === "package" && (
        <div>
          <label className="label" htmlFor={`trav-${uid}`}>Travellers</label>
          <select className="field" id={`trav-${uid}`} name="travellers" defaultValue="2">
            {["1", "2", "3", "4", "5–8", "9–15", "16+"].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="label" htmlFor={`month-${uid}`}>Travel month</label>
        <input className="field" id={`month-${uid}`} name="travelMonth" maxLength={40} placeholder="e.g. Jan 2027" />
      </div>

      {(variant === "general" || variant === "solo") && (
        <div>
          <label className="label" htmlFor={`budget-${uid}`}>Budget per person</label>
          <select className="field" id={`budget-${uid}`} name="budget" defaultValue="">
            <option value="">Not sure yet</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      )}

      {!compact && (
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`msg-${uid}`}>Anything else? <span className="font-medium text-subtle">(optional)</span></label>
          <textarea className="field" id={`msg-${uid}`} name="message" maxLength={600} rows={3} />
        </div>
      )}

      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`web-${uid}`}>Website</label>
        <input id={`web-${uid}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-muted">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-[#0F2B5B]" aria-describedby={err("consent")} />
          <span>
            I agree that {site.legalName} may use my name, number and trip details to reply to this enquiry on WhatsApp, phone or email.
            Kept for up to {site.retentionMonths} months, never sold. I can withdraw anytime.{" "}
            <Link href="/privacy" className="font-semibold text-ink underline underline-offset-2">Privacy notice</Link>
          </span>
        </label>
      </div>

      <div className="sm:col-span-2">
        <Turnstile onToken={onToken} resetKey={resetKey} />
      </div>

      {error && (
        <p id={`err-${uid}`} role="alert" className="sm:col-span-2 rounded-xl bg-[#FDECEA] px-4 py-3 text-[15px] font-semibold text-[#9B1C1C]">
          {error.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn sm:col-span-2 min-h-14 bg-wa text-[17px] text-white hover:bg-wa-deep disabled:opacity-70"
      >
        <ChatIcon />
        {state === "sending" ? "Sending…" : submitLabel || "Send enquiry on WhatsApp"}
      </button>
    </form>
  );
}
