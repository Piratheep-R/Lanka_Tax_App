export type TaxDeadline = {
  id: string;
  title: string;
  due: string;
  ya: string;
  kind: "return" | "instalment" | "estimate" | "apit" | "vat";
  detail: string;
};

export const TAX_DEADLINES: TaxDeadline[] = [
  {
    id: "set-2627",
    title: "Statement of Estimated Tax (SET)",
    due: "2026-08-15",
    ya: "2026/27",
    kind: "estimate",
    detail: "File the SET for the current year of assessment via IRD e-Services.",
  },
  {
    id: "inst-1-2627",
    title: "1st income-tax instalment",
    due: "2026-08-15",
    ya: "2026/27",
    kind: "instalment",
    detail: "First quarterly payment for instalment payers (self-employed, business, mixed).",
  },
  {
    id: "inst-2-2627",
    title: "2nd income-tax instalment",
    due: "2026-11-15",
    ya: "2026/27",
    kind: "instalment",
    detail: "Second quarterly payment. APIT already withheld may reduce the cash due.",
  },
  {
    id: "return-2526",
    title: "Income tax return — YA 2025/26",
    due: "2026-11-30",
    ya: "2025/26",
    kind: "return",
    detail: "Return of income for the year ended 31 March 2026. File online through e-Services.",
  },
  {
    id: "inst-3-2627",
    title: "3rd income-tax instalment",
    due: "2027-02-15",
    ya: "2026/27",
    kind: "instalment",
    detail: "Third quarterly payment of YA 2026/27.",
  },
  {
    id: "inst-4-2627",
    title: "4th income-tax instalment",
    due: "2027-05-15",
    ya: "2026/27",
    kind: "instalment",
    detail: "Final quarterly instalment, paid in the succeeding year of assessment.",
  },
  {
    id: "return-2627",
    title: "Income tax return — YA 2026/27",
    due: "2027-11-30",
    ya: "2026/27",
    kind: "return",
    detail: "Return of income for the year ending 31 March 2027.",
  },
];

export function parseDue(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`);
}

export function daysUntil(iso: string, now = new Date()) {
  const due = parseDue(iso);
  return Math.ceil((due.getTime() - now.getTime()) / 86_400_000);
}

export function upcomingDeadlines(limit = 4, now = new Date()) {
  return [...TAX_DEADLINES]
    .filter((d) => daysUntil(d.due, now) >= -14)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, limit);
}

export function nextDeadline(now = new Date()) {
  return (
    TAX_DEADLINES.filter((d) => daysUntil(d.due, now) >= 0).sort((a, b) =>
      a.due.localeCompare(b.due),
    )[0] ?? null
  );
}
