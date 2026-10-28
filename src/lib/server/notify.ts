import "server-only";

/**
 * Alerts for the team when an enquiry or data request arrives.
 *
 * Any channel that has its settings in the environment is used; the rest are skipped.
 *   Telegram: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (free, instant on the phone)
 *   Email:    RESEND_API_KEY, LEAD_ALERT_EMAIL (comma-separated), optional LEAD_ALERT_FROM
 *   Webhook:  LEAD_WEBHOOK_URL (receives JSON; works with Make, Zapier, Google Sheets scripts)
 *
 * The alert carries the full details, so a lead is not lost even if the database insert failed.
 */

export type Alert = {
  /** Short headline, e.g. "New enquiry" or "LEAD NOT SAVED" */
  title: string;
  /** Label and value pairs shown in the message */
  fields: [string, string | null | undefined][];
  /** true when the database did not store the record */
  urgent?: boolean;
  /** extra machine-readable data for the webhook */
  data?: Record<string, unknown>;
};

const TIMEOUT = 5000;

export function alertChannels() {
  const env = process.env;
  return {
    telegram: Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID),
    email: Boolean(env.RESEND_API_KEY && env.LEAD_ALERT_EMAIL),
    webhook: Boolean(env.LEAD_WEBHOOK_URL),
  };
}

function asText(a: Alert) {
  const rows = a.fields.filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "").map(([k, v]) => `${k}: ${v}`);
  return [a.urgent ? `ALERT: ${a.title}` : a.title, "", ...rows].join("\n");
}

async function telegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    // Plain text on purpose: no parse mode, so visitor input cannot inject formatting or links.
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: text.slice(0, 4000), disable_web_page_preview: true }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
}

async function email(a: Alert, text: string) {
  const to = (process.env.LEAD_ALERT_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: process.env.LEAD_ALERT_FROM || "Ghooomo website <onboarding@resend.dev>",
      to,
      subject: (a.urgent ? `ALERT: ${a.title}` : a.title).slice(0, 150),
      text,
    }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

async function webhook(a: Alert) {
  const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: a.title, urgent: Boolean(a.urgent), fields: Object.fromEntries(a.fields), ...a.data, at: new Date().toISOString() }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

/** Sends the alert on every configured channel. Never throws. */
export async function sendAlert(a: Alert) {
  const on = alertChannels();
  const text = asText(a);
  const jobs: Promise<void>[] = [];
  if (on.telegram) jobs.push(telegram(text));
  if (on.email) jobs.push(email(a, text));
  if (on.webhook) jobs.push(webhook(a));
  if (jobs.length === 0) {
    if (a.urgent) console.error("ALERT with no channel configured:", a.title);
    return;
  }
  const results = await Promise.allSettled(jobs);
  for (const r of results) if (r.status === "rejected") console.error("Alert channel failed:", String(r.reason).slice(0, 200));
}
