import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarClock, Landmark, Scale } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TaxCalculator } from "@/components/tax-calculator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { INCOME_TAX_BANDS, PERSONAL_RELIEF, RATE_SNAPSHOT, WHT_RATES } from "@/lib/tax/rates";
import { TAX_DOCUMENTS } from "@/lib/tax/documents";
import { nextDeadline, daysUntil } from "@/lib/tax/deadlines";
import { formatLkr } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const next = nextDeadline();
  const days = next ? daysUntil(next.due) : null;

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="space-y-6">
            <Badge variant="outline">IRD-aligned · YA 2025/26 rates</Badge>
            <h1 className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Sri Lankan tax, without the fog.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              LankaTax keeps the Inland Revenue chart, APIT maths and filing
              dates in one ledger — then suggests what to do next for your
              income mix.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/signup">
                  Create a free account
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/documents">Browse documents</Link>
              </Button>
            </div>
            {next && days !== null ? (
              <p className="text-sm text-muted-foreground">
                Next date: <span className="text-foreground">{next.title}</span>
                {" · "}
                {days <= 0 ? "due now" : `${days} days`} ({next.due})
              </p>
            ) : null}
          </div>
          <TaxCalculator compact />
        </section>

        <section id="rates" className="border-y border-border bg-card">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {RATE_SNAPSHOT.map((item) => (
              <div key={item.label} className="bg-card px-5 py-6">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl tracking-tight">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Individual income tax
              </p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">
                Bands after {formatLkr(PERSONAL_RELIEF)} relief
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/calculator">Open calculator</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Taxable income</th>
                  <th className="px-4 py-3 font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {INCOME_TAX_BANDS.map((band) => (
                  <tr key={band.rate} className="border-t border-border">
                    <td className="px-4 py-3">{band.label}</td>
                    <td className="px-4 py-3 tabular-nums">{Math.round(band.rate * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              How it works
            </p>
            <h2 className="mt-1 font-display text-3xl tracking-tight">
              A desk for the Sri Lankan tax year
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={Scale}
              title="Estimate APIT"
              body="Monthly employment in, tax and take-home out — using the 2025/26 bands."
            />
            <Feature
              icon={BookOpen}
              title="IRD documents"
              body="Acts, tax charts, APIT tables and return notes, linked to ird.gov.lk."
            />
            <Feature
              icon={CalendarClock}
              title="Filing calendar"
              body="SET, quarterly instalments and the 30 November return, in one list."
            />
            <Feature
              icon={Landmark}
              title="Personal suggestions"
              body="Rule-based reminders plus an advisor that knows Sri Lankan rates."
            />
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Withholding
              </p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">
                AIT / WHT at a glance
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Credits against the annual return unless the tax chart marks them as final.
              </p>
              <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
                {WHT_RATES.map((row) => (
                  <li
                    key={row.category}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <span>{row.category}</span>
                    <span className="tabular-nums text-muted-foreground">{row.rate}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Library
              </p>
              <h2 className="mt-1 font-display text-3xl tracking-tight">Start with the official chart</h2>
              <div className="mt-6 grid gap-3">
                {TAX_DOCUMENTS.slice(0, 4).map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="flex items-start justify-between gap-3 p-4">
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{doc.summary}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button asChild variant="outline">
                  <Link to="/documents">
                    Open the full library
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Scale;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <Icon className="size-5 text-primary" />
      <h3 className="mt-4 font-display text-lg tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
