import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TaxCalculator } from "@/components/tax-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { INCOME_TAX_BANDS, PERSONAL_RELIEF } from "@/lib/tax/rates";
import { formatLkr } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            YA 2025/26
          </p>
          <h1 className="font-display text-4xl tracking-tight">APIT calculator</h1>
          <p className="max-w-xl text-muted-foreground">
            Estimate monthly withholding on employment income after the{" "}
            {formatLkr(PERSONAL_RELIEF)} personal relief.
          </p>
          <TaxCalculator />
        </div>
        <Card className="h-fit">
          <CardContent className="p-5">
            <h2 className="font-display text-xl tracking-tight">Bands</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {INCOME_TAX_BANDS.map((band) => (
                <li key={band.rate} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{band.label}</span>
                  <span className="tabular-nums">{Math.round(band.rate * 100)}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
