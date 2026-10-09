import { daysUntil, nextDeadline } from "./deadlines";
import { PERSONAL_RELIEF } from "./rates";
import type { TaxpayerType } from "./rates";

export type Suggestion = {
  id: string;
  title: string;
  body: string;
  tone: "info" | "action" | "watch";
  href?:
    | "/dashboard/calendar"
    | "/dashboard/calculator"
    | "/dashboard/documents"
    | "/dashboard/advisor"
    | "/dashboard/profile";
};

export type ProfileInput = {
  taxpayerType: TaxpayerType;
  monthlyIncome: number;
  otherIncome: number;
  hasRental: boolean;
  hasBusiness: boolean;
  hasInvestments: boolean;
  hasSolar: boolean;
};

export function buildSuggestions(profile: ProfileInput): Suggestion[] {
  const out: Suggestion[] = [];
  const annual = profile.monthlyIncome * 12 + profile.otherIncome;
  const next = nextDeadline();

  if (next) {
    const days = daysUntil(next.due);
    out.push({
      id: "next-deadline",
      title:
        days <= 0
          ? `${next.title} is due today`
          : `${next.title} in ${days} day${days === 1 ? "" : "s"}`,
      body: next.detail,
      tone: days <= 21 ? "action" : "info",
      href: "/dashboard/calendar",
    });
  }

  if (annual <= PERSONAL_RELIEF && profile.monthlyIncome > 0) {
    out.push({
      id: "below-relief",
      title: "You sit inside the personal relief",
      body: "Employment income of Rs. 150,000 a month or less is covered by the Rs. 1.8 million personal relief. Confirm APIT is not being over-withheld on your payslip.",
      tone: "info",
    });
  } else if (profile.monthlyIncome > 150_000) {
    out.push({
      id: "apit-check",
      title: "Cross-check monthly APIT",
      body: "Your employer should withhold APIT using the 2025/26 tables. Keep Form P / the APIT certificate — you will credit it against the annual return.",
      tone: "action",
      href: "/dashboard/calculator",
    });
  }

  if (
    profile.taxpayerType === "self_employed" ||
    profile.hasBusiness ||
    profile.taxpayerType === "business"
  ) {
    out.push({
      id: "instalments",
      title: "Diary the four instalments",
      body: "Instalment payers remit on 15 Aug, 15 Nov, 15 Feb and 15 May. Under-estimating SET can attract penalty interest — update the estimate if profits move.",
      tone: "action",
      href: "/dashboard/calendar",
    });
  }

  if (profile.hasRental || profile.taxpayerType === "landlord") {
    out.push({
      id: "rent-relief",
      title: "Claim the 25% rent relief",
      body: "Resident individuals may deduct 25% of qualifying rental income. Keep lease agreements, rates receipts and repair invoices. WHT of 10% on rent is creditable.",
      tone: "info",
    });
  }

  if (profile.hasInvestments) {
    out.push({
      id: "cgt",
      title: "Capital gains are a separate charge",
      body: "Gains on investment assets are generally taxed at 10% for individuals. The personal relief cannot be set against CGT — keep acquisition costs and dates.",
      tone: "watch",
    });
  }

  if (profile.hasSolar) {
    out.push({
      id: "solar",
      title: "Solar-panel relief may still apply",
      body: "Qualifying expenditure on solar panels can reduce taxable income, subject to the conditions in the Inland Revenue Act. Keep CEB/LECO documents and invoices.",
      tone: "info",
    });
  }

  if (profile.hasBusiness) {
    out.push({
      id: "vat-sscl",
      title: "Watch VAT and SSCL thresholds",
      body: "VAT registration is generally required at Rs. 80 million turnover (18%). SSCL at 2.5% can apply earlier on specified businesses. Map your trailing 12-month turnover.",
      tone: "watch",
    });
  }

  if (profile.otherIncome > 0) {
    out.push({
      id: "ait-credit",
      title: "Credit AIT already withheld",
      body: "Interest (10%) and other AIT should appear on bank certificates. Those amounts reduce the balance payable on the return unless the tax is specified as final.",
      tone: "info",
    });
  }

  if (out.length < 3) {
    out.push({
      id: "library",
      title: "Start with the official tax chart",
      body: "The IRD tax chart for YA 2025/26 is the fastest way to confirm a rate before you file. Save it to your library and check ird.gov.lk for circulars.",
      tone: "info",
      href: "/dashboard/documents",
    });
  }

  return out.slice(0, 5);
}
