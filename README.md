# FactSource Assistant

Build a polished submission-ready React + TypeScript + Tailwind/shadcn app called "Facts-Only MF Assistant" for an academic RAG assignment. Use a static local curated corpus and lightweight keyword retrieval, no API keys, no auth, no PII storage. Scope to one AMC (prefer HDFC Mutual Fund) and 4 schemes, with 15–25 official AMC/SEBI/AMFI source records. UI: professional financial research aesthetic; header with title and RAG/Official Sources badge; welcome line; 3 example questions; chat; reset chat; visible disclaimer "Facts-only. No investment advice. Do not share PAN, Aadhaar, account numbers, OTPs, email addresses, or phone numbers." Support factual intents: expense ratio, exit load, minimum SIP/investment, ELSS lock-in, riskometer, benchmark, statement/capital-gains statement download, scheme identity/objective. Every factual answer <=3 sentences, grounded only in retrieved corpus, with exactly one clear official source link and "Last updated from sources: [date]". Advice questions (buy/sell, best fund, portfolio allocation, return comparisons/predictions) must be politely refused with an educational official link. PII input must be blocked/not echoed. If confidence is insufficient, say the fact cannot be verified from the current official corpus and provide a relevant official source. Add Sources panel with 15–25 records and domains; About/README-style section with setup, scope, architecture, known limits, safety rules, submission checklist; Sample Q&A with 8 examples; disclaimer snippet; architecture card User -> Intent/PII Gate -> Retriever -> Grounded Answer -> Citation. Make it immediately usable after deployment and optimize for traceability and citation accuracy. Populate the corpus with clearly identified official source URLs and fact snippets; do not use third-party blogs or fabricated citations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed376022-0b56-41d4-8d20-9911006c98f3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
