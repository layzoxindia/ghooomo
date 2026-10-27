// Understands plain sentences like "₹80k budget, 2 log, December mein"
// and turns them into a budget, number of travellers and a month.

export type Intent = {
  budget: number | null; // in rupees
  perPerson: boolean; // budget given per person rather than for everyone
  people: number | null;
  month: number | null; // 1 to 12
};

const MONTHS: [RegExp, string[], number][] = [
  [/\bjan(uary)?\b/i, ["जनवरी"], 1],
  [/\bfeb(ruary)?\b/i, ["फरवरी", "फ़रवरी"], 2],
  [/\bmar(ch)?\b/i, ["मार्च"], 3],
  [/\bapr(il)?\b/i, ["अप्रैल"], 4],
  [/\bmay\b/i, ["मई"], 5],
  [/\bjune?\b/i, ["जून"], 6],
  [/\bjuly?\b/i, ["जुलाई"], 7],
  [/\baug(ust)?\b/i, ["अगस्त"], 8],
  [/\bsep(t(ember)?)?\b/i, ["सितंबर", "सितम्बर"], 9],
  [/\boct(ober)?\b/i, ["अक्टूबर", "अक्तूबर"], 10],
  [/\bnov(ember)?\b/i, ["नवंबर", "नवम्बर"], 11],
  [/\b(dec(ember)?|disambar)\b/i, ["दिसंबर", "दिसम्बर"], 12],
];

const WORD_NUM: Record<string, number> = {
  ek: 1, one: 1, do: 2, two: 2, teen: 3, three: 3, char: 4, chaar: 4, four: 4, paanch: 5, panch: 5, five: 5,
  chhe: 6, six: 6, saat: 7, seven: 7, aath: 8, eight: 8, nau: 9, nine: 9, das: 10, ten: 10,
};

function parseMoney(text: string): number | null {
  const t = text.toLowerCase().replace(/,/g, "");
  const re = /(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(lakh|lac|lakhs|l\b|k\b|thousand|hazaar|hazar|हज़ार|हजार|लाख)?/g;
  let best: number | null = null;
  for (const m of t.matchAll(re)) {
    const n = parseFloat(m[1]);
    const unit = m[2] || "";
    let v = n;
    if (/lakh|lac|l$|लाख/.test(unit)) v = n * 100000;
    else if (/k$|thousand|hazaar|hazar|हज़ार|हजार/.test(unit)) v = n * 1000;
    const hasRupee = /₹|rs|inr/.test(m[0]);
    if (!unit && !hasRupee && v < 1000) continue; // a small bare number is probably people or a date
    if (best === null || v > best) best = v;
  }
  return best !== null && best >= 1000 ? Math.round(best) : null;
}

function parsePeople(text: string): number | null {
  const t = text.toLowerCase();
  const m = t.match(/(\d{1,3})\s*(log|logon|people|persons?|pax|adults?|travell?ers|friends|dost|members|jan|लोग)/);
  if (m) return Math.max(1, parseInt(m[1], 10));
  const w = t.match(/\b(ek|one|do|two|teen|three|char|chaar|four|paanch|panch|five|chhe|six|saat|seven|aath|eight|nau|nine|das|ten)\s*(log|logon|people|persons?|friends|dost|jan)\b/);
  if (w) return WORD_NUM[w[1]];
  if (/\b(solo|alone|akela|akeli|just me)\b/.test(t) || /अकेला|अकेली/.test(t)) return 1;
  if (/\b(couple|hum dono|we two|honeymoon|wife|husband|partner|girlfriend|boyfriend)\b/.test(t) || /पत्नी|हनीमून|हम दोनों/.test(t)) return 2;
  if (/\b(family|parivar)\b/.test(t) || /परिवार/.test(t)) return 4;
  return null;
}

function parseMonth(text: string): number | null {
  for (const [re, hindi, n] of MONTHS) if (re.test(text) || hindi.some((h) => text.includes(h))) return n;
  return null;
}

export function parseIntent(text: string): Intent {
  const perPerson = /(per person|per head|each|har ek|ek aadmi|pp\b|प्रति व्यक्ति)/i.test(text);
  return { budget: parseMoney(text), perPerson, people: parsePeople(text), month: parseMonth(text) };
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Months a package is in season, read from text like "October to May" or "All year". */
export function seasonMonths(bestTime: string): Set<number> {
  if (/all year/i.test(bestTime)) return new Set(MONTH_NAMES.map((_, i) => i + 1));
  const m = bestTime.match(/([A-Za-z]+)\s+to\s+([A-Za-z]+)/);
  if (!m) return new Set(MONTH_NAMES.map((_, i) => i + 1));
  const idx = (s: string) => MONTH_NAMES.findIndex((n) => n.toLowerCase().startsWith(s.toLowerCase().slice(0, 3))) + 1;
  const a = idx(m[1]);
  const b = idx(m[2]);
  const out = new Set<number>();
  if (!a || !b) return new Set(MONTH_NAMES.map((_, i) => i + 1));
  for (let k = a; ; k = (k % 12) + 1) {
    out.add(k);
    if (k === b) break;
  }
  return out;
}
