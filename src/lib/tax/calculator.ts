import { INCOME_TAX_BANDS, PERSONAL_RELIEF } from "./rates";

export type BandResult = {
  label: string;
  rate: number;
  amount: number;
  tax: number;
};

export type TaxEstimate = {
  annualIncome: number;
  personalRelief: number;
  taxableIncome: number;
  annualTax: number;
  monthlyTax: number;
  monthlyTakeHome: number;
  effectiveRate: number;
  marginalRate: number;
  bands: BandResult[];
};

export function estimatePersonalTax(annualIncome: number): TaxEstimate {
  const income = Math.max(0, annualIncome);
  const taxableIncome = Math.max(0, income - PERSONAL_RELIEF);
  let remaining = taxableIncome;
  let annualTax = 0;
  let marginalRate = 0;
  const bands: BandResult[] = [];

  for (const band of INCOME_TAX_BANDS) {
    const amount = Math.min(remaining, band.width);
    if (amount <= 0) continue;
    const tax = amount * band.rate;
    annualTax += tax;
    remaining -= amount;
    marginalRate = band.rate;
    bands.push({
      label: band.label,
      rate: band.rate,
      amount,
      tax,
    });
    if (remaining <= 0) break;
  }

  return {
    annualIncome: income,
    personalRelief: Math.min(PERSONAL_RELIEF, income),
    taxableIncome,
    annualTax,
    monthlyTax: annualTax / 12,
    monthlyTakeHome: (income - annualTax) / 12,
    effectiveRate: income > 0 ? annualTax / income : 0,
    marginalRate,
    bands,
  };
}

export function monthlyToAnnual(monthly: number) {
  return Math.max(0, monthly) * 12;
}
