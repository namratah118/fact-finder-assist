export interface Source {
  id: string;
  title: string;
  scheme: string;
  type: "AMC" | "PDF";
  url: string;
  lastUpdated: string;
}

export const sources: Source[] = [
  {
    id: "hdfc-flexi-cap-page",
    title: "HDFC Flexi Cap Fund – Direct Plan",
    scheme: "HDFC Flexi Cap Fund",
    type: "AMC",
    url: "https://www.hdfcfund.com/explore/mutual-funds/hdfc-flexi-cap-fund/direct",
    lastUpdated: "2026-07",
  },
  {
    id: "hdfc-large-cap-page",
    title: "HDFC Large Cap Fund – Direct Plan",
    scheme: "HDFC Large Cap Fund",
    type: "AMC",
    url: "https://www.hdfcfund.com/explore/mutual-funds/hdfc-large-cap-fund/direct",
    lastUpdated: "2026-08",
  },
  {
    id: "hdfc-balanced-advantage-page",
    title: "HDFC Balanced Advantage Fund – Direct Plan",
    scheme: "HDFC Balanced Advantage Fund",
    type: "AMC",
    url: "https://www.hdfcfund.com/explore/mutual-funds/hdfc-balanced-advantage-fund/direct",
    lastUpdated: "2026-09",
  },
  {
    id: "hdfc-elss-page",
    title: "HDFC ELSS Tax Saver Fund – Direct Plan",
    scheme: "HDFC ELSS Tax Saver Fund",
    type: "AMC",
    url: "https://www.hdfcfund.com/explore/mutual-funds/hdfc-elss-tax-saver-fund/direct",
    lastUpdated: "2026-07",
  },
  {
    id: "hdfc-cas",
    title: "HDFC Mutual Fund – Consolidated Account Statement",
    scheme: "HDFC Mutual Fund",
    type: "AMC",
    url: "https://www.hdfcfund.com/services/consolidated-account-statement",
    lastUpdated: "2026-09",
  },

  // Flexi Cap
  {
    id: "flexi-sid",
    title: "HDFC Flexi Cap Fund – SID",
    scheme: "HDFC Flexi Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/SID/2025-11/SID%20-%20HDFC%20Flexi%20Cap%20Fund%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "flexi-kim",
    title: "HDFC Flexi Cap Fund – KIM",
    scheme: "HDFC Flexi Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/KIM/2025-11/KIM%20-%20HDFC%20Flexi%20Cap%20Fund%20dated%20November%2021,%202025_1.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "flexi-facts",
    title: "HDFC Flexi Cap Fund – Fund Facts",
    scheme: "HDFC Flexi Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/Others/2026-07/Fund%20Facts%20-%20HDFC%20Flexi%20Cap%20Fund_July%2026.pdf",
    lastUpdated: "2026-07",
  },

  // Large Cap
  {
    id: "large-sid",
    title: "HDFC Large Cap Fund – SID",
    scheme: "HDFC Large Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/SID/2025-11/SID%20-%20HDFC%20Large%20Cap%20Fund%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "large-kim",
    title: "HDFC Large Cap Fund – KIM",
    scheme: "HDFC Large Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/KIM/2025-11/KIM%20-%20HDFC%20Large%20Cap%20Fund%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "large-facts",
    title: "HDFC Large Cap Fund – Fund Facts",
    scheme: "HDFC Large Cap Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/Others/2026-08/Fund%20Facts%20-%20HDFC%20Large%20Cap%20Fund_Aug%2026.pdf",
    lastUpdated: "2026-08",
  },

  // Balanced Advantage
  {
    id: "balanced-sid",
    title: "HDFC Balanced Advantage Fund – SID",
    scheme: "HDFC Balanced Advantage Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/SID/2025-11/SID%20-%20HDFC%20Balanced%20Advantage%20Fund%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "balanced-kim",
    title: "HDFC Balanced Advantage Fund – KIM",
    scheme: "HDFC Balanced Advantage Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/KIM/2025-11/KIM%20-%20HDFC%20Balanced%20Advantage%20Fund%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "balanced-facts",
    title: "HDFC Balanced Advantage Fund – Fund Facts",
    scheme: "HDFC Balanced Advantage Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/Others/2026-09/Fund%20Facts%20-%20HDFC%20Balanced%20Advantage%20Fund_Aug%2026.pdf",
    lastUpdated: "2026-09",
  },

  // ELSS
  {
    id: "elss-sid",
    title: "HDFC ELSS Tax Saver – SID",
    scheme: "HDFC ELSS Tax Saver Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/SID/2025-11/SID%20-%20HDFC%20ELSS%20Tax%20Saver%20dated%20November%2021,%202025.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "elss-kim",
    title: "HDFC ELSS Tax Saver – KIM",
    scheme: "HDFC ELSS Tax Saver Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/KIM/2025-11/KIM%20-%20HDFC%20ELSS%20Tax%20Saver%20dated%20November%2021,%202025_0.pdf",
    lastUpdated: "2025-11-21",
  },
  {
    id: "elss-facts",
    title: "HDFC ELSS Tax Saver – Fund Facts",
    scheme: "HDFC ELSS Tax Saver Fund",
    type: "PDF",
    url: "https://files.hdfcfund.com/s3fs-public/Others/2026-07/Fund%20Facts%20-%20HDFC%20TaxSaver%20Fund_July%2026.pdf",
    lastUpdated: "2026-07",
  },
];