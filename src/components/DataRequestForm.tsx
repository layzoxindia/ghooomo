"use client";

import { useCallback, useState, type FormEvent } from "react";
import Turnstile from "./Turnstile";
import { CheckIcon } from "./Icons";
import { site } from "@/lib/site";

export default function DataRequestForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch("/api/data-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          phone: get("phone"),
          email: get("email"),
          requestType: get("requestType"),
          details: get("details"),
          turnstileToken: token,
          website: get("website"),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error || `Something went wrong. Please email ${site.grievanceEmail}.`);
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setError(`Network problem. Please email ${site.grievanceEmail}.`);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[28px] bg-white p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wa text-white"><CheckIcon /></span>
        <h2 className="text-2xl text-ink">Request received</h2>
        <p className="text-muted">We’ll contact you on the number you gave to confirm it’s you, then act on your request.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-[28px] bg-white p-6 shadow-[0_30px_60px_rgba(15,43,91,0.10)] sm:grid-cols-2 sm:p-9">
      <div>
        <label className="label" htmlFor="dr-name">Your name</label>
        <input className="field" id="dr-name" name="name" autoComplete="name" required maxLength={80} />
      </div>
      <div>
        <label className="label" htmlFor="dr-phone">Mobile number you used</label>
        <input className="field" id="dr-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={16} placeholder="+91" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="dr-email">Email <span className="font-medium text-subtle">(optional)</span></label>
        <input className="field" id="dr-email" name="email" type="email" autoComplete="email" maxLength={120} />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="dr-type">What would you like to do?</label>
        <select className="field" id="dr-type" name="requestType" defaultValue="deletion">
          <option value="access">See what data you hold about me</option>
          <option value="correction">Correct my data</option>
          <option value="deletion">Delete my data</option>
          <option value="withdraw-consent">Withdraw my consent / stop contacting me</option>
          <option value="grievance">Raise a privacy complaint</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="dr-details">Details <span className="font-medium text-subtle">(optional)</span></label>
        <textarea className="field" id="dr-details" name="details" maxLength={1000} rows={4} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="dr-web">Website</label>
        <input id="dr-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="sm:col-span-2"><Turnstile onToken={onToken} /></div>
      {error && <p role="alert" className="sm:col-span-2 rounded-xl bg-[#FDECEA] px-4 py-3 text-[15px] font-semibold text-[#9B1C1C]">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="btn sm:col-span-2 min-h-14 bg-ink text-white hover:bg-ink-deep disabled:opacity-70">
        {state === "sending" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
