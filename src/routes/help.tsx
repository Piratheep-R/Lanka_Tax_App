import { Link, createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, LifeBuoy, Phone, Scale } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FAQ_CATEGORIES, FAQS, type FaqCategory } from "@/lib/tax/faqs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  component: HelpPage,
  head: () => ({
    meta: [
      { title: "Help & support · LankaTax" },
      {
        name: "description",
        content:
          "Answers on Sri Lankan income tax, APIT, VAT, filing dates, and how to use LankaTax.",
      },
    ],
  }),
});

function HelpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Help & support
        </p>
        <h1 className="mt-1 max-w-2xl font-display text-4xl tracking-tight">
          Answers before you file.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Short notes on Sri Lankan rates, APIT, VAT and how LankaTax works.
          For a filing that turns on your own facts, confirm it with the IRD.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search relief, APIT, VAT, returns…"
            className="sm:max-w-sm"
            aria-label="Search FAQs"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {FAQ_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "h-9 shrink-0 rounded-full border px-3 text-xs font-medium",
                  category === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-soft"
        >
          {items.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium">
                  {item.question}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-muted-foreground data-[state=closed]:hidden">
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        {items.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            No answers match that search.
          </p>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-3xl tracking-tight">Still stuck?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            LankaTax cannot lodge a return or issue a TIN. Use the advisor for
            a worked explanation, or the IRD call centre for an official reply.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3 p-5">
                <LifeBuoy className="size-5 text-primary" />
                <h3 className="font-display text-lg tracking-tight">Ask the advisor</h3>
                <p className="text-sm text-muted-foreground">
                  Describe your income mix. Answers stay inside your account and follow the 2025/26 chart.
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard/advisor">Open advisor</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <Scale className="size-5 text-primary" />
                <h3 className="font-display text-lg tracking-tight">Check a document</h3>
                <p className="text-sm text-muted-foreground">
                  The tax chart, APIT tables and return notes each link out to ird.gov.lk.
                </p>
                <Button asChild variant="outline">
                  <Link to="/documents">Document library</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <Phone className="size-5 text-primary" />
                <h3 className="font-display text-lg tracking-tight">IRD call centre</h3>
                <p className="text-sm text-muted-foreground">
                  Short code 1944 · callcentreservice@ird.gov.lk
                </p>
                <p className="text-sm text-muted-foreground">
                  Weekdays 9:00–19:00, Saturdays 9:00–13:00. Head office: Sir Chittampalam A. Gardiner Mawatha, Colombo 02. General line 011 213 5135.
                </p>
                <Button asChild variant="outline">
                  <a
                    href="https://www.ird.gov.lk/en/publications/SitePages/Contact%20Us.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IRD contacts
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
