import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TAX_DEADLINES, daysUntil } from "@/lib/tax/deadlines";

export const Route = createFileRoute("/dashboard/calendar")({
  component: DashboardCalendar,
});

function DashboardCalendar() {
  const items = [...TAX_DEADLINES].sort((a, b) => a.due.localeCompare(b.due));

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Compliance
        </p>
        <h1 className="font-display text-3xl tracking-tight">Filing calendar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Income-tax instalments, SET and returns. VAT and APIT remittances
          follow their own monthly cycles on ird.gov.lk.
        </p>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const days = daysUntil(item.due);
          const status =
            days < -14 ? "passed" : days < 0 ? "just passed" : days === 0 ? "today" : `${days} days`;
          return (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{item.ya}</Badge>
                    <Badge variant={days >= 0 && days <= 21 ? "warn" : "outline"}>
                      {item.kind}
                    </Badge>
                  </div>
                  <h2 className="font-display text-xl tracking-tight">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="tabular-nums font-medium">{item.due}</p>
                  <p className="text-muted-foreground">{status}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
