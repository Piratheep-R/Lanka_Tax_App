import { useMemo, useState } from "react";
import { estimatePersonalTax, monthlyToAnnual } from "@/lib/tax/calculator";
import { MONTHLY_RELIEF } from "@/lib/tax/rates";
import { formatLkr, formatPercent } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PRESETS = [100_000, 150_000, 200_000, 250_000, 350_000, 500_000];

export function TaxCalculator({
  initialMonthly = 250_000,
  compact = false,
}: {
  initialMonthly?: number;
  compact?: boolean;
}) {
  const [monthly, setMonthly] = useState(initialMonthly);
  const estimate = useMemo(
    () => estimatePersonalTax(monthlyToAnnual(monthly || 0)),
    [monthly],
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/40">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          APIT estimate · YA 2025/26
        </p>
        <CardTitle>What should leave the payslip?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="space-y-2">
          <Label htmlFor="monthly-income">Monthly employment income (LKR)</Label>
          <Input
            id="monthly-income"
            inputMode="numeric"
            value={monthly ? monthly.toLocaleString("en-LK") : ""}
            onChange={(e) => {
              const n = Number(e.target.value.replace(/[^\d]/g, ""));
              setMonthly(Number.isFinite(n) ? n : 0);
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setMonthly(p)}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
              >
                {formatLkr(p)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Monthly APIT" value={formatLkr(estimate.monthlyTax)} />
          <Stat label="Take-home / month" value={formatLkr(estimate.monthlyTakeHome)} />
          {!compact ? (
            <>
              <Stat label="Annual tax" value={formatLkr(estimate.annualTax)} />
              <Stat
                label="Effective rate"
                value={formatPercent(estimate.effectiveRate)}
              />
            </>
          ) : null}
        </div>

        {!compact ? (
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              After Rs. {MONTHLY_RELIEF.toLocaleString("en-LK")} monthly relief
            </p>
            {estimate.taxableIncome === 0 ? (
              <p className="text-sm text-muted-foreground">
                Covered by the personal relief — no income tax on this employment figure.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {estimate.bands.map((band) => (
                  <li
                    key={band.rate}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {band.label} · {Math.round(band.rate * 100)}%
                    </span>
                    <span className="tabular-nums">{formatLkr(band.tax)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        <p className="text-xs text-muted-foreground">
          Employment income only, before other reliefs or non-cash benefits. Confirm against IRD APIT tables.
        </p>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl tracking-tight tabular-nums">{value}</p>
    </div>
  );
}
