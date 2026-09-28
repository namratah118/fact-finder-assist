import { CORPUS, SCHEMES, type SourceRecord } from "@/data/corpus";

export type AnswerKind = "fact" | "refusal" | "pii" | "unverified";

export type Answer = {
  kind: AnswerKind;
  text: string;
  source: SourceRecord | null;
};

/* ---------------- PII gate ---------------- */

const PII_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "PAN", re: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/i },
  { label: "Aadhaar", re: /\b\d{4}\s?\d{4}\s?\d{4}\b/ },
  { label: "email address", re: /\b[\w.+-]+@[\w-]+\.[\w.]{2,}\b/ },
  { label: "phone number", re: /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/ },
  { label: "OTP", re: /\botp\b[^\d]{0,12}\d{4,8}\b/i },
  { label: "account number", re: /\b(?:a\/c|acc(?:ount)?|folio)\b[^\d]{0,12}\d{6,}\b/i },
  { label: "card number", re: /\b(?:\d[ -]?){13,19}\b/ },
];

export function detectPII(input: string): string[] {
  return PII_PATTERNS.filter((p) => p.re.test(input)).map((p) => p.label);
}

/* ---------------- Advice gate ---------------- */

const ADVICE_PATTERNS: RegExp[] = [
  /\b(should i|shall i|can i expect|worth it|is it good|good time)\b/i,
  /\b(buy|sell|switch|redeem now|invest in)\b.*\?/i,
  /\bbest (fund|scheme|mutual fund|sip|option)\b/i,
  /\bwhich (fund|scheme|one) (is|should|to)\b/i,
  /\b(recommend|suggestion|advice|advise)\b/i,
  /\b(portfolio|asset) allocation\b/i,
  /\bhow much (should|do) i\b/i,
  /\b(predict|forecast|future returns?|expected returns?|will it (grow|rise|fall))\b/i,
  /\b(compare|better|outperform|vs\.?|versus)\b.*\b(returns?|performance)\b/i,
  /\b(returns?|performance)\b.*\b(compare|better|vs\.?|versus)\b/i,
  /\bmultibagger|guaranteed\b/i,
];

export function isAdvice(input: string): boolean {
  return ADVICE_PATTERNS.some((r) => r.test(input));
}

/* ---------------- Intent + retrieval ---------------- */

const STOP = new Set([
  "the","a","an","is","are","of","for","to","in","on","what","whats","how","do","does","i",
  "my","me","can","and","it","this","that","with","from","about","please","tell","you",
]);

const INTENT_TERMS: Record<string, string[]> = {
  "expense ratio": ["expense", "ratio", "ter", "charges", "cost", "fees"],
  "exit load": ["exit", "load", "redeem", "redemption", "penalty"],
  minimum: ["minimum", "min", "sip", "amount", "invest", "instalment", "installment"],
  "lock-in": ["lock", "lockin", "lock-in", "elss", "tax", "saver", "80c"],
  riskometer: ["riskometer", "risk", "label", "labelling"],
  benchmark: ["benchmark", "index", "nifty", "bse"],
  statement: ["statement", "cas", "download", "capital", "gains", "account"],
  identity: ["objective", "category", "about", "scheme", "type", "what"],
};

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

function detectScheme(q: string): string | null {
  const l = q.toLowerCase();
  if (/flexi\s*-?\s*cap/.test(l)) return "HDFC Flexi Cap Fund";
  if (/mid\s*-?\s*cap/.test(l)) return "HDFC Mid-Cap Opportunities Fund";
  if (/elss|tax\s*saver|80c/.test(l)) return "HDFC ELSS Tax Saver Fund";
  if (/liquid/.test(l)) return "HDFC Liquid Fund";
  return null;
}

export function detectIntent(q: string): string | null {
  const toks = new Set(tokenize(q));
  let best: string | null = null;
  let bestScore = 0;
  for (const [intent, terms] of Object.entries(INTENT_TERMS)) {
    const score = terms.reduce((s, t) => s + (toks.has(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore > 0 ? best : null;
}

export type Scored = { record: SourceRecord; score: number };

export function retrieve(q: string, k = 4): Scored[] {
  const toks = tokenize(q);
  const scheme = detectScheme(q);
  const intent = detectIntent(q);

  const scored: Scored[] = CORPUS.map((record) => {
    const hay = `${record.title} ${record.snippet} ${record.topic.join(" ")} ${record.scheme ?? ""}`.toLowerCase();
    let score = 0;
    for (const t of toks) if (hay.includes(t)) score += t.length > 4 ? 2 : 1;
    if (intent && record.topic.some((tp) => tp.includes(intent) || intent.includes(tp))) score += 5;
    if (scheme) {
      if (record.scheme === scheme) score += 6;
      else if (record.scheme) score -= 4;
    } else if (!record.scheme) score += 1;
    return { record, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

/* ---------------- Answer composition ---------------- */

const EDU_LINK = CORPUS.find((c) => c.id === "S23")!;
const FALLBACK = CORPUS.find((c) => c.id === "S22")!;

const CONFIDENCE_THRESHOLD = 6;

function firstSentences(text: string, n: number): string {
  const parts = text.match(/[^.]+\./g) ?? [text];
  return parts.slice(0, n).join(" ").trim();
}

export function answerQuestion(input: string): Answer & { top: Scored[] } {
  const q = input.trim();

  const pii = detectPII(q);
  if (pii.length) {
    return {
      kind: "pii",
      text: `I've blocked this message because it appears to contain personal information (${pii.join(", ")}), and I do not store or repeat it. Please re-ask the question without any personal or account details. For anything folio-specific, use the official investor services channel.`,
      source: CORPUS.find((c) => c.id === "S16")!,
      top: [],
    };
  }

  if (isAdvice(q)) {
    return {
      kind: "refusal",
      text: "I can't help with buy, sell, selection, allocation or return-expectation questions — this assistant only states published facts and gives no investment advice. For how to evaluate schemes yourself, the official investor education material below is a good starting point.",
      source: EDU_LINK,
      top: [],
    };
  }

  const top = retrieve(q);
  const best = top[0];

  if (!best || best.score < CONFIDENCE_THRESHOLD) {
    return {
      kind: "unverified",
      text: "I can't verify that fact from the current official corpus, so I won't guess. The scheme documents page below carries the authoritative disclosure for scheme objective, load, minimum amounts and benchmark.",
      source: best?.record ?? FALLBACK,
      top,
    };
  }

  const r = best.record;
  const scheme = detectScheme(q);
  const lead = scheme && r.scheme === scheme ? `For ${scheme}: ` : "";
  const text = `${lead}${firstSentences(r.snippet, 2)} This is stated in ${r.publisher}'s "${r.title}".`;

  return { kind: "fact", text, source: r, top };
}

export const EXAMPLE_QUESTIONS = [
  "What is the exit load on HDFC Mid-Cap Opportunities Fund?",
  "What is the lock-in period for HDFC ELSS Tax Saver Fund?",
  "Where can I download my capital gains statement?",
];

export const SAMPLE_QA: { q: string; kind: AnswerKind }[] = [
  { q: "Where is the expense ratio of HDFC Flexi Cap Fund published?", kind: "fact" },
  { q: "What is the exit load on HDFC Liquid Fund?", kind: "fact" },
  { q: "What is the minimum SIP amount for HDFC ELSS Tax Saver Fund?", kind: "fact" },
  { q: "What is the ELSS lock-in period?", kind: "fact" },
  { q: "What is the riskometer of HDFC Mid-Cap Opportunities Fund?", kind: "fact" },
  { q: "What is the benchmark of HDFC Flexi Cap Fund?", kind: "fact" },
  { q: "Which is the best HDFC fund to buy now?", kind: "refusal" },
  { q: "My PAN is ABCDE1234F, show my folio", kind: "pii" },
];

export { SCHEMES };
