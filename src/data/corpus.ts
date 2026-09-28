export type SourceRecord = {
  id: string;
  scheme: string | null;
  topic: string[];
  title: string;
  snippet: string;
  url: string;
  domain: string;
  publisher: "HDFC Mutual Fund" | "SEBI" | "AMFI" | "CAMS / KFintech (RTA)";
  lastUpdated: string;
};

export const AMC = "HDFC Mutual Fund";

export const SCHEMES = [
  "HDFC Flexi Cap Fund",
  "HDFC Mid-Cap Opportunities Fund",
  "HDFC ELSS Tax Saver Fund",
  "HDFC Liquid Fund",
] as const;

export const CORPUS: SourceRecord[] = [
  {
    id: "S01",
    scheme: "HDFC Flexi Cap Fund",
    topic: ["identity", "objective", "category"],
    title: "HDFC Flexi Cap Fund — scheme page (objective & category)",
    snippet:
      "HDFC Flexi Cap Fund is an open-ended dynamic equity scheme investing across large cap, mid cap and small cap stocks. The scheme page states its investment objective, category and asset allocation as disclosed in the Scheme Information Document.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-flexi-cap-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S02",
    scheme: "HDFC Flexi Cap Fund",
    topic: ["exit load", "load"],
    title: "HDFC Flexi Cap Fund — load structure (KIM/SID)",
    snippet:
      "The load structure for the scheme is disclosed in its Key Information Memorandum and Scheme Information Document on the AMC website; equity schemes of the AMC typically carry an exit load on units redeemed within a specified period from allotment, with the exact rate and period stated in the KIM.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-flexi-cap-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S03",
    scheme: "HDFC Flexi Cap Fund",
    topic: ["benchmark"],
    title: "HDFC Flexi Cap Fund — benchmark index disclosure",
    snippet:
      "The benchmark index against which the scheme's performance is measured is disclosed on the scheme page and in the Scheme Information Document under 'Benchmark Index'.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-flexi-cap-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S04",
    scheme: "HDFC Mid-Cap Opportunities Fund",
    topic: ["identity", "objective", "category"],
    title: "HDFC Mid-Cap Opportunities Fund — scheme page",
    snippet:
      "HDFC Mid-Cap Opportunities Fund is an open-ended equity scheme predominantly investing in mid cap stocks, as stated in its investment objective and category on the AMC scheme page.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-mid-cap-opportunities-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S05",
    scheme: "HDFC Mid-Cap Opportunities Fund",
    topic: ["riskometer", "risk"],
    title: "HDFC Mid-Cap Opportunities Fund — riskometer disclosure",
    snippet:
      "The scheme's current riskometer level is displayed on the scheme page and in the monthly Riskometer disclosure published by the AMC, as required under SEBI's product labelling norms.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-mid-cap-opportunities-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S06",
    scheme: "HDFC Mid-Cap Opportunities Fund",
    topic: ["exit load", "load"],
    title: "HDFC Mid-Cap Opportunities Fund — load structure (KIM)",
    snippet:
      "The applicable exit load, including the holding period and any free-redemption limit, is stated in the scheme's Key Information Memorandum available on the AMC website.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-mid-cap-opportunities-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S07",
    scheme: "HDFC ELSS Tax Saver Fund",
    topic: ["identity", "objective", "elss", "category"],
    title: "HDFC ELSS Tax Saver Fund — scheme page",
    snippet:
      "HDFC ELSS Tax Saver Fund is an open-ended equity linked savings scheme with a statutory lock-in and tax benefit, as described in its investment objective on the AMC scheme page.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-elss-tax-saver",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S08",
    scheme: "HDFC ELSS Tax Saver Fund",
    topic: ["lock-in", "elss", "exit load"],
    title: "SEBI — ELSS statutory lock-in (Mutual Funds regulatory framework)",
    snippet:
      "Equity Linked Savings Schemes are governed by the ELSS notification and SEBI's mutual fund framework, under which units are subject to a statutory lock-in of three years from the date of allotment; no redemption is permitted during the lock-in period.",
    url: "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=12",
    domain: "sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S09",
    scheme: "HDFC ELSS Tax Saver Fund",
    topic: ["minimum", "sip", "investment"],
    title: "HDFC ELSS Tax Saver Fund — minimum application amount (KIM)",
    snippet:
      "The minimum application amount and minimum SIP instalment for the scheme are stated in its Key Information Memorandum on the AMC website under 'Minimum Application Amount'.",
    url: "https://www.hdfcfund.com/our-products/equity/hdfc-elss-tax-saver",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S10",
    scheme: "HDFC Liquid Fund",
    topic: ["identity", "objective", "category"],
    title: "HDFC Liquid Fund — scheme page",
    snippet:
      "HDFC Liquid Fund is an open-ended liquid scheme investing in debt and money market instruments with residual maturity up to 91 days, as stated in its objective and category on the AMC scheme page.",
    url: "https://www.hdfcfund.com/our-products/debt/hdfc-liquid-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S11",
    scheme: "HDFC Liquid Fund",
    topic: ["exit load", "load"],
    title: "HDFC Liquid Fund — graded exit load (KIM)",
    snippet:
      "Liquid schemes carry a graded exit load for redemptions made within seven days of allotment, as mandated by SEBI; the day-wise rates applicable to this scheme are disclosed in its Key Information Memorandum.",
    url: "https://www.hdfcfund.com/our-products/debt/hdfc-liquid-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S12",
    scheme: "HDFC Liquid Fund",
    topic: ["riskometer", "risk"],
    title: "HDFC Liquid Fund — riskometer and product labelling",
    snippet:
      "The scheme's riskometer level and product label are shown on the scheme page and in the AMC's monthly product labelling disclosure.",
    url: "https://www.hdfcfund.com/our-products/debt/hdfc-liquid-fund",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S13",
    scheme: null,
    topic: ["expense ratio", "ter"],
    title: "HDFC Mutual Fund — Total Expense Ratio (TER) disclosure",
    snippet:
      "The AMC publishes the scheme-wise Total Expense Ratio for regular and direct plans, including any change in TER, on its statutory disclosures page. The TER shown there is the authoritative, current figure for each scheme.",
    url: "https://www.hdfcfund.com/statutory-disclosure/total-expense-ratio",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S14",
    scheme: null,
    topic: ["expense ratio", "ter", "regulation"],
    title: "SEBI — limits on Total Expense Ratio for mutual fund schemes",
    snippet:
      "SEBI prescribes the maximum Total Expense Ratio that a mutual fund scheme may charge, on a slab basis linked to the scheme's daily net assets, and requires daily disclosure of TER on the AMC and AMFI websites.",
    url: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=3&smid=0",
    domain: "sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S15",
    scheme: null,
    topic: ["expense ratio", "ter", "industry"],
    title: "AMFI — scheme-wise TER of mutual fund schemes",
    snippet:
      "AMFI hosts the industry-wide scheme-level Total Expense Ratio disclosure, where the TER of each AMC's schemes can be looked up and compared against the AMC's own disclosure.",
    url: "https://www.amfiindia.com/research-information/other-data/ter-of-mutual-fund-schemes",
    domain: "amfiindia.com",
    publisher: "AMFI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S16",
    scheme: null,
    topic: ["statement", "account statement", "download"],
    title: "HDFC Mutual Fund — account statement request",
    snippet:
      "An investor can request a consolidated or scheme-wise account statement from the AMC's investor services section, which is delivered to the email address registered in the folio.",
    url: "https://www.hdfcfund.com/investor-corner/investor-services",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S17",
    scheme: null,
    topic: ["statement", "capital gains", "download", "tax"],
    title: "CAMS — Consolidated Account Statement and capital gains statement",
    snippet:
      "CAMS provides a Consolidated Account Statement and a capital gains / tax statement for mutual fund folios serviced by it, generated online against the folio's registered email address.",
    url: "https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement",
    domain: "camsonline.com",
    publisher: "CAMS / KFintech (RTA)",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S18",
    scheme: null,
    topic: ["statement", "capital gains", "download", "tax"],
    title: "KFintech — investor statement and capital gains download",
    snippet:
      "KFintech's investor services portal allows an investor to generate account statements and capital gains statements for folios serviced by KFintech.",
    url: "https://mfs.kfintech.com/investor/",
    domain: "kfintech.com",
    publisher: "CAMS / KFintech (RTA)",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S19",
    scheme: null,
    topic: ["riskometer", "risk", "regulation"],
    title: "SEBI — product labelling and Riskometer for mutual fund schemes",
    snippet:
      "SEBI requires every mutual fund scheme to disclose a Riskometer with six levels from Low to Very High, evaluated monthly and disclosed on the AMC and AMFI websites along with any change.",
    url: "https://www.sebi.gov.in/legal/circulars/oct-2020/product-labeling-in-mutual-fund-schemes-risk-o-meter_47796.html",
    domain: "sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S20",
    scheme: null,
    topic: ["benchmark", "regulation"],
    title: "SEBI — benchmarking of mutual fund schemes (two-tier structure)",
    snippet:
      "SEBI prescribes a two-tiered benchmark structure for mutual fund schemes, with a first-tier benchmark reflecting the scheme category and an optional second-tier benchmark reflecting the investment style.",
    url: "https://www.sebi.gov.in/legal/circulars/oct-2021/guiding-principles-for-bringing-uniformity-in-benchmarks-of-mutual-fund-schemes_53474.html",
    domain: "sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S21",
    scheme: null,
    topic: ["minimum", "sip", "investment"],
    title: "HDFC Mutual Fund — Systematic Investment Plan (SIP) details",
    snippet:
      "The AMC's SIP page sets out the available SIP frequencies, instalment dates and the minimum instalment amount applicable to each scheme, read together with the scheme's Key Information Memorandum.",
    url: "https://www.hdfcfund.com/investor-corner/systematic-investment-plan",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S22",
    scheme: null,
    topic: ["documents", "kim", "sid", "identity"],
    title: "HDFC Mutual Fund — scheme documents (SID, SAI and KIM)",
    snippet:
      "The AMC publishes the Scheme Information Document, Statement of Additional Information and Key Information Memorandum for every scheme; these are the authoritative source for objective, load, minimum amounts and benchmark.",
    url: "https://www.hdfcfund.com/statutory-disclosure/scheme-documents",
    domain: "hdfcfund.com",
    publisher: "HDFC Mutual Fund",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S23",
    scheme: null,
    topic: ["education", "advice", "investor"],
    title: "SEBI Investor Website — mutual fund investor education",
    snippet:
      "SEBI's investor education portal explains how mutual funds work, how to assess suitability and risk, and how to approach investment decisions; it does not recommend specific schemes.",
    url: "https://investor.sebi.gov.in/",
    domain: "investor.sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S24",
    scheme: null,
    topic: ["education", "advice", "investor", "nav"],
    title: "AMFI — investor awareness and scheme NAV / performance data",
    snippet:
      "AMFI publishes investor awareness material and official daily NAV and scheme performance data for all Indian mutual fund schemes; past performance does not indicate future returns.",
    url: "https://www.amfiindia.com/investor-corner/investor-center",
    domain: "amfiindia.com",
    publisher: "AMFI",
    lastUpdated: "2026-09-01",
  },
  {
    id: "S25",
    scheme: null,
    topic: ["grievance", "kyc", "investor"],
    title: "SEBI SCORES — investor grievance redressal",
    snippet:
      "SEBI's SCORES platform is the official channel for lodging and tracking complaints against mutual funds and other registered intermediaries.",
    url: "https://scores.sebi.gov.in/",
    domain: "scores.sebi.gov.in",
    publisher: "SEBI",
    lastUpdated: "2026-09-01",
  },
];

export const CORPUS_LAST_UPDATED = "2026-09-01";
