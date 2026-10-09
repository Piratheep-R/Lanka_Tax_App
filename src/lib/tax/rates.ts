/** Year of Assessment 2025/26 (1 Apr 2025 – 31 Mar 2026), applied as the
 *  working schedule for YA 2026/27 until IRD publishes a new chart. */

export const CURRENT_YA = "2026/27";
export const REFERENCE_YA = "2025/26";
export const PERSONAL_RELIEF = 1_800_000;
export const MONTHLY_RELIEF = 150_000;
export const VAT_RATE = 0.18;
export const VAT_THRESHOLD = 80_000_000;
export const COMPANY_TAX = 0.3;
export const CGT_INDIVIDUAL = 0.1;
export const SSCL_RATE = 0.025;

export type TaxBand = {
  label: string;
  width: number;
  rate: number;
};

/** Progressive bands applied AFTER the personal relief. */
export const INCOME_TAX_BANDS: TaxBand[] = [
  { label: "First Rs. 1,000,000", width: 1_000_000, rate: 0.06 },
  { label: "Next Rs. 500,000", width: 500_000, rate: 0.18 },
  { label: "Next Rs. 500,000", width: 500_000, rate: 0.24 },
  { label: "Next Rs. 500,000", width: 500_000, rate: 0.3 },
  { label: "Balance", width: Number.POSITIVE_INFINITY, rate: 0.36 },
];

export const RATE_SNAPSHOT = [
  { label: "Personal relief", value: "Rs. 1.8M", hint: "Rs. 150,000 / month" },
  { label: "Individual PIT", value: "6–36%", hint: "Five progressive bands" },
  { label: "VAT", value: "18%", hint: "Turnover ≥ Rs. 80M" },
  { label: "Company tax", value: "30%", hint: "Standard CIT" },
] as const;

export const WHT_RATES = [
  { category: "Interest / discount (AIT)", rate: "10%" },
  { category: "Rent (resident)", rate: "10%" },
  { category: "Dividends (final)", rate: "15%" },
  { category: "Royalty / charge / premium", rate: "14%" },
  { category: "Service fee (individual)", rate: "5%" },
  { category: "Lottery / betting winnings", rate: "14%" },
] as const;

export const TAXPAYER_TYPES = [
  { id: "salaried", label: "Salaried employee", hint: "APIT deducted by employer" },
  { id: "self_employed", label: "Self-employed / professional", hint: "Quarterly instalments" },
  { id: "business", label: "Sole proprietor", hint: "Business income + SSCL/VAT if due" },
  { id: "company", label: "Company director / owner", hint: "CIT plus personal income" },
  { id: "landlord", label: "Landlord / investor", hint: "Rent relief and CGT" },
  { id: "mixed", label: "Mixed sources", hint: "Employment plus other income" },
] as const;

export type TaxpayerType = (typeof TAXPAYER_TYPES)[number]["id"];
