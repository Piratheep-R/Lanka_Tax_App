export type DocCategory =
  | "acts"
  | "charts"
  | "apit"
  | "vat"
  | "wht"
  | "returns"
  | "guides";

export type TaxDocument = {
  id: string;
  title: string;
  summary: string;
  category: DocCategory;
  year: string;
  issuer: string;
  href: string;
  tags: string[];
};

export const DOC_CATEGORIES: { id: DocCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "acts", label: "Acts" },
  { id: "charts", label: "Tax charts" },
  { id: "apit", label: "APIT / PAYE" },
  { id: "vat", label: "VAT & SSCL" },
  { id: "wht", label: "WHT / AIT" },
  { id: "returns", label: "Returns" },
  { id: "guides", label: "Guides" },
];

export const TAX_DOCUMENTS: TaxDocument[] = [
  {
    id: "ira-2017",
    title: "Inland Revenue Act, No. 24 of 2017",
    summary:
      "The principal statute charging income tax on employment, business, investment and other income of persons in Sri Lanka.",
    category: "acts",
    year: "2017",
    issuer: "Parliament of Sri Lanka",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["income tax", "residency", "reliefs"],
  },
  {
    id: "ira-amend-2025",
    title: "Inland Revenue (Amendment) Act, No. 02 of 2025",
    summary:
      "Raises personal relief to Rs. 1,800,000 and resets the 6–36% individual bands from 1 April 2025.",
    category: "acts",
    year: "2025",
    issuer: "Parliament of Sri Lanka",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["relief", "bands", "YA 2025/26"],
  },
  {
    id: "ira-amend-2026",
    title: "Inland Revenue (Amendment) Act, No. 11 of 2026",
    summary:
      "Latest amendment certified 3 June 2026. Read alongside the consolidated 2017 Act for current charging provisions.",
    category: "acts",
    year: "2026",
    issuer: "Parliament of Sri Lanka",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["amendment", "2026"],
  },
  {
    id: "tax-chart-2526",
    title: "Tax Chart — Year of Assessment 2025/2026",
    summary:
      "IRD official chart covering individual, company, partnership, trust, WHT/AIT, APIT, VAT, SSCL and stamp duty rates.",
    category: "charts",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["rates", "official", "IRD"],
  },
  {
    id: "apit-tables-2526",
    title: "Advance Personal Income Tax Tables 2025/26",
    summary:
      "Monthly deduction tables for primary employment, lump sums, terminal benefits, secondary employment and non-residents.",
    category: "apit",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/sitepages/apit_tax_tables.aspx?menuid=1503",
    tags: ["PAYE", "employer", "tables"],
  },
  {
    id: "apit-guideline",
    title: "Guideline on Advance Personal Income Tax (APIT)",
    summary:
      "How employers withhold APIT on regular profits, non-cash benefits and once-and-for-all payments.",
    category: "apit",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/sitepages/apit_tax_tables.aspx?menuid=1503",
    tags: ["employer", "withholding"],
  },
  {
    id: "employer-paye",
    title: "Employer responsibilities (PAYE / APIT)",
    summary:
      "Registration, monthly remittance and reporting duties of employers deducting tax from employment income.",
    category: "apit",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["employer", "compliance"],
  },
  {
    id: "vat-act",
    title: "Value Added Tax — standard rate 18%",
    summary:
      "VAT on taxable supplies and imports. Registration typically required once annual turnover reaches Rs. 80 million.",
    category: "vat",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["VAT", "registration", "18%"],
  },
  {
    id: "svat",
    title: "Simplified Value Added Tax (SVAT) scheme",
    summary:
      "Deferral mechanism for eligible exporters and suppliers into export-oriented chains. Check current SVAT circulars before claiming.",
    category: "vat",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["export", "SVAT"],
  },
  {
    id: "sscl",
    title: "Social Security Contribution Levy (SSCL)",
    summary:
      "Turnover-based levy (currently 2.5%) on specified businesses above the prescribed threshold, in addition to VAT/income tax.",
    category: "vat",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["SSCL", "turnover"],
  },
  {
    id: "wht-ait",
    title: "Withholding Tax / Advanced Income Tax schedule",
    summary:
      "AIT on interest (10%), rent (10%), dividends (15%), royalties (14%) and specified service fees. Credits against final income tax unless marked final.",
    category: "wht",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["AIT", "interest", "dividends"],
  },
  {
    id: "cgt",
    title: "Capital Gains Tax on investment assets",
    summary:
      "Individuals are generally charged 10% on gains from the realisation of investment assets. Personal relief does not apply against CGT.",
    category: "guides",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["CGT", "investments"],
  },
  {
    id: "it-return",
    title: "Income Tax return & Statement of Estimated Tax",
    summary:
      "SET is due by 15 August of the current year of assessment. The income tax return is due by 30 November of the succeeding year, via IRD e-Services.",
    category: "returns",
    year: "Annual",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["SET", "e-Services", "filing"],
  },
  {
    id: "instalments",
    title: "Quarterly income-tax instalments",
    summary:
      "Instalment payers remit on 15 August, 15 November, 15 February and 15 May (the last falling in the next calendar year).",
    category: "returns",
    year: "Annual",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201",
    tags: ["self-assessment", "cash flow"],
  },
  {
    id: "tax-calendar",
    title: "IRD tax calendar",
    summary:
      "Upcoming due dates for income tax, VAT, SSCL, APIT remittances and other levies. Cross-check alerts on ird.gov.lk before filing.",
    category: "returns",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["deadlines", "calendar"],
  },
  {
    id: "otpp",
    title: "Online Tax Payment Platform (OTPP)",
    summary:
      "Pay IRD liabilities electronically and quote the Document Identification Number (DIN) on every payment.",
    category: "guides",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["payments", "DIN"],
  },
  {
    id: "vat-refund",
    title: "VAT refund procedure",
    summary:
      "How registered persons claim refunds of excess input tax, including documentation and processing notes from IRD.",
    category: "vat",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["refund", "input tax"],
  },
  {
    id: "partnerships",
    title: "Tax rates for partnerships",
    summary:
      "Partnerships are taxed under a separate schedule in the annual tax chart. Partners still return their share of income personally.",
    category: "charts",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["partnership", "pass-through"],
  },
  {
    id: "companies",
    title: "Corporate income tax rates",
    summary:
      "Standard CIT is 30%. Higher rates apply to betting, liquor and tobacco; certain concessions remain in the tax chart.",
    category: "charts",
    year: "2025/26",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["CIT", "company"],
  },
  {
    id: "dta",
    title: "Double tax avoidance treaties",
    summary:
      "Sri Lanka’s DTA network, Mutual Agreement Procedure and Advanced Pricing Agreements for cross-border income.",
    category: "guides",
    year: "Current",
    issuer: "Inland Revenue Department",
    href: "https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404",
    tags: ["DTA", "international"],
  },
];

export function getDocument(id: string) {
  return TAX_DOCUMENTS.find((d) => d.id === id);
}

export function documentsByCategory(category: DocCategory | "all") {
  if (category === "all") return TAX_DOCUMENTS;
  return TAX_DOCUMENTS.filter((d) => d.category === category);
}
