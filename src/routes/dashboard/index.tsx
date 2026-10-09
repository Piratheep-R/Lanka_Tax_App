import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { estimatePersonalTax, monthlyToAnnual } from "@/lib/tax/calculator";
import { daysUntil, nextDeadline, upcomingDeadlines } from "@/lib/tax/deadlines";
import { TAX_DOCUMENTS } from "@/lib/tax/documents";
import { CURRENT_YA } from "@/lib/tax/rates";
import { buildSuggestions } from "@/lib/tax/suggestions";
import { getProfile, type Profile } from "@/lib/server/profile";
import { listSavedDocumentIds } from "@/lib/server/documents";
import { formatLkr, formatPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const user = useCurrentUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getProfile(), listSavedDocumentIds()])
      .then(([p, ids]) => {
        if (cancelled) return;
        setProfile(p);
        setSaved(ids);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your workspace.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const estimate = useMemo(() => {
    if (!profile) return null;
    return estimatePersonalTax(
      monthlyToAnnual(profile.monthlyIncome) + profile.otherIncome,
    );
  }, [profile]);

  const suggestions = useMemo(() => {
    if (!profile) return [];
    return buildSuggestions({
      taxpayerType: profile.taxpayerType,
      monthlyIncome: profile.monthlyIncome,
      otherIncome: profile.otherIncome,
      hasRental: profile.hasRental,
      hasBusiness: profile.hasBusiness,
      hasInvestments: profile.hasInvestments,
      hasSolar: profile.hasSolar,
    });
  }, [profile]);

  const next = nextDeadline();
  const savedDocs = TAX_DOCUMENTS.filter((d) => saved.includes(d.id)).slice(0, 3);
  const greeting = profile?.displayName || user?.displayName || "there";

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!profile || !estimate) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  const needsSetup = profile.monthlyIncome === 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Year of assessment {CURRENT_YA}
          </p>
          <h1 className="font-display text-3xl tracking-tight">Good day, {greeting}</h1>
        </div>
        {needsSetup ? (
          <Button asChild>
            <Link to="/dashboard/profile">Set up your profile</Link>
          </Button>
        ) : null}
      </div>

      {needsSetup ? (
        <Card className="border-primary/30 bg-accent">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              Add your monthly income and taxpayer type so the dashboard can estimate APIT and pick the right reminders.
            </p>
            <Button asChild variant="ink" size="sm">
              <Link to="/dashboard/profile">Add income</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Estimated annual tax"
          value={formatLkr(estimate.annualTax)}
          hint={`${formatPercent(estimate.effectiveRate)} effective`}
        />
        <StatCard
          label="Monthly APIT (approx.)"
          value={formatLkr(estimate.monthlyTax)}
          hint={`Take-home ${formatLkr(estimate.monthlyTakeHome)}`}
        />
        <StatCard
          label="Next deadline"
          value={next ? next.title.replace(" — YA 2025/26", "") : "None listed"}
          hint={
            next
              ? `${next.due} · ${daysUntil(next.due) <= 0 ? "due" : `${daysUntil(next.due)} days`}`
              : "Calendar is clear"
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Suggested next steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((s) => (
              <div key={s.id} className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{s.title}</p>
                  <Badge variant={s.tone === "action" ? "default" : s.tone === "watch" ? "warn" : "outline"}>
                    {s.tone === "action" ? "Act" : s.tone === "watch" ? "Watch" : "Note"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                {s.href ? (
                  <Link
                    to={s.href}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Open
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : null}
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/advisor">Ask the tax advisor</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines(4).map((d) => {
                const days = daysUntil(d.due);
                return (
                  <div key={d.id} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium">{d.title}</p>
                      <p className="text-muted-foreground">{d.ya}</p>
                    </div>
                    <span className="tabular-nums text-muted-foreground">
                      {days < 0 ? "passed" : days === 0 ? "today" : `${days}d`}
                    </span>
                  </div>
                );
              })}
              <Button asChild variant="ghost" size="sm" className="px-0">
                <Link to="/dashboard/calendar">Full calendar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedDocs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nothing saved yet. Pin the tax chart and APIT tables from the library.
                </p>
              ) : (
                savedDocs.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm hover:underline"
                  >
                    {doc.title}
                  </a>
                ))
              )}
              <Button asChild variant="ghost" size="sm" className="px-0">
                <Link to="/dashboard/documents">Document library</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="mt-2 font-display text-2xl tracking-tight tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
