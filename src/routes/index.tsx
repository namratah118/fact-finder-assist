import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { CORPUS, CORPUS_LAST_UPDATED, AMC, SCHEMES } from "@/data/corpus";
import { answerQuestion, EXAMPLE_QUESTIONS, SAMPLE_QA, type Answer } from "@/lib/rag";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Facts-Only MF Assistant — HDFC Mutual Fund RAG Demo" },
      {
        name: "description",
        content:
          "A facts-only retrieval assistant answering HDFC Mutual Fund scheme questions strictly from official AMC, SEBI and AMFI sources, with one citation per answer.",
      },
      { property: "og:title", content: "Facts-Only MF Assistant — HDFC Mutual Fund RAG Demo" },
      {
        property: "og:description",
        content:
          "Grounded answers on expense ratio, exit load, minimum SIP, ELSS lock-in, riskometer and benchmark — cited to official sources only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DISCLAIMER =
  "Facts-only. No investment advice. Do not share PAN, Aadhaar, account numbers, OTPs, email addresses, or phone numbers.";

type Msg = { role: "user" | "assistant"; text: string; answer?: Answer };

const TABS = ["Chat", "Sources", "Sample Q&A", "About"] as const;
type Tab = (typeof TABS)[number];

function Index() {
  const [tab, setTab] = useState<Tab>("Chat");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl gap-1 px-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === "Chat" && <Chat />}
        {tab === "Sources" && <Sources />}
        {tab === "Sample Q&A" && <SampleQA />}
        {tab === "About" && <About />}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-5 text-xs leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">{DISCLAIMER}</p>
          <p className="mt-2">
            Academic demonstration project. Corpus of {CORPUS.length} official records, last updated{" "}
            {CORPUS_LAST_UPDATED}. Not affiliated with {AMC}, SEBI or AMFI.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Facts-Only MF Assistant</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {AMC} · 4 schemes · grounded in official disclosures
          </p>
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          RAG · Official Sources
        </span>
      </div>
    </header>
  );
}

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function ask(raw: string) {
    const q = raw.trim();
    if (!q) return;
    const a = answerQuestion(q);
    const safeEcho = a.kind === "pii" ? "[message hidden — personal information detected]" : q;
    setMessages((m) => [
      ...m,
      { role: "user", text: safeEcho },
      { role: "assistant", text: a.text, answer: a },
    ]);
    setInput("");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm">
          Welcome. Ask a factual question about {AMC} schemes — I answer only from official
          disclosures and always cite one source.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-accent"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-xs font-medium text-foreground">
        {DISCLAIMER}
      </div>

      <div className="min-h-[320px] space-y-3 rounded-lg border border-border bg-card p-4">
        {messages.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No messages yet. Pick an example above or type a question.
          </p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about expense ratio, exit load, minimum SIP, lock-in, riskometer, benchmark…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ask
        </button>
        <button
          type="button"
          onClick={() => setMessages([])}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Reset chat
        </button>
      </form>
    </div>
  );
}

const KIND_LABEL: Record<string, string> = {
  fact: "Grounded fact",
  refusal: "Advice refused",
  pii: "Personal information blocked",
  unverified: "Not verifiable from corpus",
};

function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
          {msg.text}
        </div>
      </div>
    );
  }
  const a = msg.answer!;
  return (
    <div className="max-w-[90%] space-y-2 rounded-lg border border-border bg-secondary/50 px-3 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {KIND_LABEL[a.kind]}
      </span>
      <p className="text-sm leading-relaxed">{a.text}</p>
      {a.source && (
        <div className="border-t border-border pt-2 text-xs">
          <a
            href={a.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2"
          >
            {a.source.publisher} — {a.source.title}
          </a>
          <p className="mt-1 text-muted-foreground">
            {a.source.domain} · Last updated from sources: {a.source.lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}

function Sources() {
  const domains = useMemo(
    () => Array.from(new Set(CORPUS.map((c) => c.domain))).sort(),
    [],
  );
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-base font-semibold">Corpus ({CORPUS.length} official records)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Domains: {domains.join(" · ")}. Only AMC, SEBI, AMFI and RTA sources — no blogs or
          aggregators.
        </p>
      </div>
      <div className="space-y-2">
        {CORPUS.map((c) => (
          <div key={c.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground">
                {c.id}
              </span>
              <span>{c.publisher}</span>
              <span>· {c.scheme ?? "All schemes"}</span>
              <span>· {c.topic.join(", ")}</span>
            </div>
            <h3 className="mt-2 text-sm font-medium">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.snippet}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block break-all text-xs text-primary underline underline-offset-2"
            >
              {c.url}
            </a>
            <p className="mt-1 text-xs text-muted-foreground">
              Last updated from sources: {c.lastUpdated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SampleQA() {
  return (
    <div className="space-y-3">
      {SAMPLE_QA.map((s) => {
        const a = answerQuestion(s.q);
        return (
          <div key={s.q} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium">Q. {s.q}</p>
            <p className="mt-2 text-sm text-muted-foreground">A. {a.text}</p>
            {a.source && (
              <a
                href={a.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-primary underline underline-offset-2"
              >
                {a.source.publisher} — {a.source.title} ({a.source.domain}) · Last updated from
                sources: {a.source.lastUpdated}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-2 space-y-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function About() {
  return (
    <div className="space-y-4">
      <Card title="Architecture">
        <pre className="overflow-x-auto rounded-md bg-secondary p-3 text-xs text-secondary-foreground">{`User question
   -> Intent / PII Gate      (block PII, refuse advice intents)
   -> Retriever              (keyword + intent + scheme scoring over local corpus)
   -> Grounded Answer        (<= 3 sentences, corpus text only)
   -> Citation               (exactly one official source + last-updated date)`}</pre>
      </Card>
      <Card title="Setup">
        <p>No API keys, no backend, no auth. Install dependencies and run the dev server; the
          corpus is a static TypeScript module bundled with the app, so it works immediately after
          deployment.</p>
      </Card>
      <Card title="Scope">
        <p>
          One AMC ({AMC}) and four schemes: {SCHEMES.join(", ")}. Supported intents: expense ratio,
          exit load, minimum SIP / investment, ELSS lock-in, riskometer, benchmark, statement and
          capital-gains statement download, and scheme identity / objective.
        </p>
      </Card>
      <Card title="Safety rules">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every factual answer is at most three sentences and taken only from retrieved corpus text.</li>
          <li>Exactly one official source link plus a "Last updated from sources" date per answer.</li>
          <li>Advice questions (buy / sell / best fund / allocation / return prediction) are refused with an educational official link.</li>
          <li>PII in input is detected, blocked and never echoed back or stored.</li>
          <li>Below the confidence threshold the assistant states the fact cannot be verified from the current official corpus.</li>
        </ul>
      </Card>
      <Card title="Known limits">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keyword retrieval, not embeddings — paraphrases far from corpus wording may fall back to "not verifiable".</li>
          <li>Corpus is a static snapshot; live figures such as TER, NAV and riskometer must be read on the linked official page.</li>
          <li>Single AMC and four schemes only; other funds are out of scope by design.</li>
          <li>No folio-level or personalised information of any kind.</li>
        </ul>
      </Card>
      <Card title="Submission checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Curated corpus of {CORPUS.length} official records with URLs and dates</li>
          <li>Keyword retriever with intent and scheme boosting</li>
          <li>PII gate and advice-refusal gate</li>
          <li>Three-sentence grounded answers with one citation each</li>
          <li>Sources panel, Sample Q&amp;A (8 examples), About section, architecture card</li>
          <li>Visible disclaimer in header area and footer</li>
        </ul>
      </Card>
      <Card title="Disclaimer snippet">
        <p className="rounded-md border border-border bg-secondary p-3 text-xs text-secondary-foreground">
          {DISCLAIMER}
        </p>
      </Card>
    </div>
  );
}
