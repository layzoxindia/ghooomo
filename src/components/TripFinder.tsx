"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { MONTH_NAMES, parseIntent } from "@/lib/intent";
import { formatINR } from "@/lib/site";

const examples = ["₹80k for 2 of us in December", "Solo, ₹25,000, March", "5 friends, 40k each, October"];

/** Budget-first search: type a sentence or fill the three fields. */
export default function TripFinder({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [people, setPeople] = useState<string>("2");
  const [month, setMonth] = useState<string>("");
  const [perPerson, setPerPerson] = useState(false);
  const dark = tone === "dark";

  function onText(v: string) {
    setText(v);
    const i = parseIntent(v);
    if (i.budget) setBudget(String(i.budget));
    if (i.people) setPeople(String(i.people));
    if (i.month) setMonth(String(i.month));
    setPerPerson(i.perPerson);
  }

  const summary = useMemo(() => {
    const b = Number(budget);
    const n = Math.max(1, Number(people) || 1);
    if (!b) return "";
    const each = perPerson ? b : Math.floor(b / n);
    return `${formatINR(each)} per person${month ? ` in ${MONTH_NAMES[Number(month) - 1]}` : ""}`;
  }, [budget, people, month, perPerson]);

  function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new URLSearchParams();
    const b = Number(budget);
    const n = Math.max(1, Number(people) || 1);
    if (b) q.set("budget", String(perPerson ? b * n : b));
    q.set("people", String(n));
    if (month) q.set("month", month);
    router.push(`/packages?${q}#results`);
  }

  const label = dark ? "label !text-white" : "label";
  return (
    <form onSubmit={go} className={`grid max-w-[1080px] gap-4 rounded-[28px] p-4 sm:p-5 ${dark ? "glass" : "border border-line bg-white"}`} aria-label="Find trips by budget">
      <div>
        <label htmlFor="tf-text" className={label}>Describe your trip in one line</label>
        <input
          id="tf-text"
          className="field !min-h-[56px] text-[17px]"
          value={text}
          onChange={(e) => onText(e.target.value)}
          placeholder="e.g. ₹80k for 2 of us in December"
          autoComplete="off"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => onText(ex)}
              className={`min-h-9 rounded-full px-3 text-[13px] font-semibold transition-colors ${dark ? "bg-white/12 text-white hover:bg-white/22" : "bg-paper text-ink hover:bg-paper-2"}`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.3fr_1fr_1fr_auto] sm:items-end">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="tf-budget" className={label}>Budget {perPerson ? "per person" : "for everyone"} (₹)</label>
          <input id="tf-budget" className="field" inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))} placeholder="e.g. 80000" />
        </div>
        <div>
          <label htmlFor="tf-people" className={label}>Travellers</label>
          <select id="tf-people" className="field" value={people} onChange={(e) => setPeople(e.target.value)}>
            {Array.from({ length: 20 }, (_, i) => String(i + 1)).map((n) => <option key={n} value={n}>{n === "1" ? "Just me" : `${n} people`}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tf-month" className={label}>Month</label>
          <select id="tf-month" className="field" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Any month</option>
            {MONTH_NAMES.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
          </select>
        </div>
        <button type="submit" className="btn col-span-2 min-h-[52px] bg-sun text-ink hover:bg-[#F2B13A] sm:col-span-1">Show matching trips</button>
      </div>
      <p className={`text-[14px] font-medium ${dark ? "text-[#DCE4EC]" : "text-subtle"}`} aria-live="polite">
        {summary ? <>Looking for trips around <strong className={dark ? "text-white" : "text-ink"}>{summary}</strong>, taxes included.</> : "Prices are compared with taxes included."}
      </p>
    </form>
  );
}
