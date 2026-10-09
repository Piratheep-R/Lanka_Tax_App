import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  DOC_CATEGORIES,
  TAX_DOCUMENTS,
  type DocCategory,
  type TaxDocument,
} from "@/lib/tax/documents";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocumentLibrary({
  savedIds = [],
  onToggleSave,
  savingId,
  showSave = false,
}: {
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
  savingId?: string | null;
  showSave?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DocCategory | "all">("all");
  const saved = useMemo(() => new Set(savedIds), [savedIds]);

  const docs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TAX_DOCUMENTS.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search acts, charts, APIT, VAT…"
          className="sm:max-w-sm"
        />
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {DOC_CATEGORIES.map((c) => (
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

      <div className="grid gap-3">
        {docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
            saved={saved.has(doc.id)}
            showSave={showSave}
            busy={savingId === doc.id}
            onToggleSave={onToggleSave}
          />
        ))}
        {docs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            No documents match that search.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function DocumentRow({
  doc,
  saved,
  showSave,
  busy,
  onToggleSave,
}: {
  doc: TaxDocument;
  saved: boolean;
  showSave: boolean;
  busy: boolean;
  onToggleSave?: (id: string) => void;
}) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{doc.year}</Badge>
          <span className="text-xs text-muted-foreground">{doc.issuer}</span>
        </div>
        <h3 className="font-display text-lg leading-snug tracking-tight">{doc.title}</h3>
        <p className="text-sm text-muted-foreground">{doc.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {doc.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {showSave && onToggleSave ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={busy}
            aria-label={saved ? "Remove from library" : "Save to library"}
            onClick={() => onToggleSave(doc.id)}
          >
            {saved ? <BookmarkCheck /> : <Bookmark />}
          </Button>
        ) : null}
        <Button asChild variant="outline">
          <a href={doc.href} target="_blank" rel="noreferrer">
            Open
            <ExternalLink />
          </a>
        </Button>
      </div>
    </article>
  );
}
