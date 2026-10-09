import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  askAdvisor,
  listAdvisorMessages,
  type AdvisorMessage,
} from "@/lib/server/advisor";
import { getProfile } from "@/lib/server/profile";
import { TAXPAYER_TYPES } from "@/lib/tax/rates";

export const Route = createFileRoute("/dashboard/advisor")({
  component: DashboardAdvisor,
});

const STARTERS = [
  "Do I pay APIT on a Rs. 220,000 salary?",
  "When is the YA 2025/26 income tax return due?",
  "How does the 25% rent relief work?",
  "What VAT rate and threshold apply in Sri Lanka?",
];

function DashboardAdvisor() {
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [profileNote, setProfileNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listAdvisorMessages()
      .then(setMessages)
      .catch(() => setMessages([]));
    getProfile()
      .then((p) => {
        const typeLabel =
          TAXPAYER_TYPES.find((t) => t.id === p.taxpayerType)?.label ?? p.taxpayerType;
        setProfileNote(
          `${typeLabel}; monthly employment Rs. ${p.monthlyIncome}; other annual income Rs. ${p.otherIncome}; rental=${p.hasRental}; business=${p.hasBusiness}; investments=${p.hasInvestments}; solar=${p.hasSolar}`,
        );
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    setQuestion("");
    const optimistic: AdvisorMessage = {
      id: Date.now(),
      role: "user",
      content: q,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);
    try {
      const result = await askAdvisor({ data: { question: q, profileNote } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const latest = await listAdvisorMessages();
      setMessages(latest);
    } catch {
      setError("The advisor could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Suggestions
        </p>
        <h1 className="font-display text-3xl tracking-tight">Tax advisor</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ask in plain language. Answers follow the IRD 2025/26 chart and are
          guidance — not a ruling.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STARTERS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="flex max-h-[28rem] flex-col gap-3 overflow-y-auto p-4">
          {messages.length === 0 && !busy ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Try a starter above, or describe your income and what you need to file.
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-8 rounded-lg bg-muted px-3 py-2 text-sm whitespace-pre-wrap"
                }
              >
                {m.content}
              </div>
            ))
          )}
          {busy ? (
            <p className="text-sm text-muted-foreground">Reading the chart…</p>
          ) : null}
          <div ref={endRef} />
        </CardContent>
      </Card>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(question);
        }}
      >
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. I earn Rs. 280,000 a month and rent a house in Colombo. What should I watch before 30 November?"
          maxLength={1200}
        />
        <Button type="submit" disabled={busy || !question.trim()} className="w-full sm:w-auto">
          {busy ? "Thinking…" : "Ask advisor"}
        </Button>
      </form>
    </div>
  );
}
