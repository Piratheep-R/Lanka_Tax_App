export type FaqCategory =
  | "start"
  | "income"
  | "apit"
  | "vat"
  | "filing"
  | "account";

export type Faq = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: { id: FaqCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "start", label: "Getting started" },
  { id: "income", label: "Income tax" },
  { id: "apit", label: "APIT" },
  { id: "vat", label: "VAT & SSCL" },
  { id: "filing", label: "Filing" },
  { id: "account", label: "Your account" },
];

export const FAQS: Faq[] = [
  {
    id: "what-is",
    category: "start",
    question: "What is LankaTax?",
    answer:
      "LankaTax is a companion for Sri Lankan tax. It keeps the IRD rate chart, official documents, an APIT estimate, filing dates and personal reminders in one place. It does not file a return for you and it is not an Inland Revenue ruling.",
  },
  {
    id: "not-advice",
    category: "start",
    question: "Is this licensed tax advice?",
    answer:
      "No. Figures follow the published IRD tax chart for year of assessment 2025/26, which we also use for YA 2026/27 until a new chart is issued. Confirm material filings on ird.gov.lk or with a licensed tax practitioner.",
  },
  {
    id: "tax-year",
    category: "start",
    question: "When does the Sri Lankan tax year run?",
    answer:
      "The year of assessment runs from 1 April to 31 March. YA 2025/26 ended on 31 March 2026. The current year, YA 2026/27, runs from 1 April 2026 to 31 March 2027.",
  },
  {
    id: "relief",
    category: "income",
    question: "What is the personal relief?",
    answer:
      "A resident individual, and a non-resident who is a Sri Lankan citizen, gets a personal relief of Rs. 1,800,000 for YA 2025/26 — about Rs. 150,000 a month. It is not deductible against capital gains on investment assets.",
  },
  {
    id: "bands",
    category: "income",
    question: "How are the income-tax bands applied?",
    answer:
      "After the relief, taxable income is charged at 6% on the first Rs. 1,000,000, 18% on the next Rs. 500,000, 24% on the next Rs. 500,000, 30% on the next Rs. 500,000, and 36% on the balance. The old 12% band was removed from 1 April 2025.",
  },
  {
    id: "rent",
    category: "income",
    question: "Can I claim relief on rent?",
    answer:
      "Resident individuals may deduct 25% of qualifying rental income, subject to the conditions in the Inland Revenue Act. Keep the lease, municipal rates receipts and repair invoices. Withholding tax of 10% on rent paid to a resident is generally creditable on the return.",
  },
  {
    id: "cgt",
    category: "income",
    question: "How are capital gains taxed?",
    answer:
      "Gains from the realisation of investment assets are generally taxed at 10% for individuals. The personal relief cannot be set against that charge. Keep the acquisition cost, date and sale documents.",
  },
  {
    id: "apit-what",
    category: "apit",
    question: "What is APIT?",
    answer:
      "Advance Personal Income Tax is the amount your employer withholds from employment income each month, using the IRD APIT tables. It is a credit against the tax on your annual return, not a separate extra tax.",
  },
  {
    id: "below-150",
    category: "apit",
    question: "Do I pay tax if I earn Rs. 150,000 a month?",
    answer:
      "Employment income of Rs. 150,000 a month is covered by the personal relief, so the estimate is nil — provided that is your only income and no non-cash benefits push you over. Check the payslip if APIT is still being deducted.",
  },
  {
    id: "calculator-limits",
    category: "apit",
    question: "What does the calculator leave out?",
    answer:
      "It estimates regular employment income only. Lump sums, terminal benefits, secondary employment and non-cash benefits use separate APIT tables. Rent relief, solar relief and approved donations are claimed on the return, not in this estimate.",
  },
  {
    id: "vat-rate",
    category: "vat",
    question: "What is the VAT rate and when do I register?",
    answer:
      "The standard rate is 18% on taxable supplies and imports. Registration is generally required once annual turnover reaches Rs. 80 million. Some supplies are exempt or zero-rated — check the current VAT schedule before you register.",
  },
  {
    id: "sscl",
    category: "vat",
    question: "What is SSCL?",
    answer:
      "The Social Security Contribution Levy is a 2.5% charge on the turnover of specified businesses above the prescribed threshold. It can apply in addition to income tax and VAT. Map your trailing twelve-month turnover before assuming you are outside it.",
  },
  {
    id: "wht",
    category: "vat",
    question: "Which withholding taxes can I credit?",
    answer:
      "Common rates on the 2025/26 chart are interest 10%, rent to a resident 10%, royalties 14%, and service fees paid to an individual 5%. Dividends are often a final tax at 15%. Keep the bank or payer certificate and claim the credit unless the chart marks the tax as final.",
  },
  {
    id: "return-due",
    category: "filing",
    question: "When is the income-tax return due?",
    answer:
      "The return is due on or before 30 November of the year after the year of assessment. The YA 2025/26 return (year ended 31 March 2026) is due on 30 November 2026. File it through IRD e-Services.",
  },
  {
    id: "instalments",
    category: "filing",
    question: "When are quarterly instalments due?",
    answer:
      "Instalment payers — typically people with business or other non-employment income — pay on 15 August, 15 November, 15 February and 15 May. The fourth date falls in the next calendar year. The Statement of Estimated Tax is due by 15 August of the current year of assessment.",
  },
  {
    id: "pay",
    category: "filing",
    question: "How do I pay the IRD?",
    answer:
      "Use the Online Tax Payment Platform and quote the Document Identification Number on every payment. Walk-in help is at the Customer Service units on the ground, first and second floors of the head office in Colombo 02.",
  },
  {
    id: "save-docs",
    category: "account",
    question: "How do I save a document?",
    answer:
      "Sign in, open Documents in the dashboard, and use the bookmark on any chart or guide. Saved items show on your overview. The public library can be browsed without an account, but bookmarks stay with your sign-in.",
  },
  {
    id: "profile",
    category: "account",
    question: "Why does the dashboard ask for my income?",
    answer:
      "The profile is only used inside LankaTax to estimate APIT and choose reminders (rent, business instalments, VAT thresholds). Nothing on that form is sent to the Inland Revenue Department.",
  },
  {
    id: "sign-in",
    category: "account",
    question: "Which sign-in methods work?",
    answer:
      "Email and password, Google, and X. Sign in with the same method you used to create the account. Password reset is not offered on this site.",
  },
];
