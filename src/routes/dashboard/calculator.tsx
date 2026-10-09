import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TaxCalculator } from "@/components/tax-calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile } from "@/lib/server/profile";
import { COMPANY_TAX, CGT_INDIVIDUAL, SSCL_RATE, VAT_RATE } from "@/lib/tax/rates";

export const Route = createFileRoute("/dashboard/calculator")({
  component: DashboardCalculator,
});

function DashboardCalculator() {
  const [monthly, setMonthly] = useState<number | null>(null);

  useEffect(() => {
    getProfile()
      .then((p) => setMonthly(p.monthlyIncome > 0 ? p.monthlyIncome : 250_000))
      .catch(() => setMonthly(250_000));
  }, []);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Employment income
          </p>
          <h1 className="font-display text-3xl tracking-tight">APIT calculator</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Progressive bands after the Rs. 1.8 million personal relief, using the IRD 2025/26 chart.
          </p>
        </div>
        {monthly === null ? (
          <div className="h-80 animate-pulse rounded-xl bg-muted" />
        ) : (
          <TaxCalculator key={monthly} initialMonthly={monthly} />
        )}
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Other headline rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="VAT" value={`${Math.round(VAT_RATE * 100)}%`} />
            <Row label="Company income tax" value={`${Math.round(COMPANY_TAX * 100)}%`} />
            <Row label="Capital gains (individuals)" value={`${Math.round(CGT_INDIVIDUAL * 100)}%`} />
            <Row label="SSCL" value={`${(SSCL_RATE * 100).toFixed(1)}%`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What this does not do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Non-cash benefits, terminal payments and secondary employment use separate APIT tables.</p>
            <p>Rent relief, solar relief and qualifying donations are not netted here — add them on the return.</p>
            <p>Always match the figure to your employer’s APIT certificate before you file.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
      <span>{label}</span>
      <span className="tabular-nums text-muted-foreground">{value}</span>
    </div>
  );
}
