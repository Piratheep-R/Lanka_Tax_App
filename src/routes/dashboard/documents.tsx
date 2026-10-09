import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { DocumentLibrary } from "@/components/document-library";
import { listSavedDocumentIds, toggleSavedDocument } from "@/lib/server/documents";

export const Route = createFileRoute("/dashboard/documents")({
  component: DashboardDocuments,
});

function DashboardDocuments() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    listSavedDocumentIds()
      .then(setSavedIds)
      .catch(() => setSavedIds([]));
  }, []);

  const onToggleSave = useCallback(async (id: string) => {
    setSavingId(id);
    try {
      const result = await toggleSavedDocument({ data: id });
      setSavedIds((prev) =>
        result.saved ? [...prev, id] : prev.filter((x) => x !== id),
      );
    } finally {
      setSavingId(null);
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Library
        </p>
        <h1 className="font-display text-3xl tracking-tight">Tax documents</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Official IRD charts, APIT tables, VAT notes and return guidance. Save
          the ones you file against.
        </p>
      </div>
      <DocumentLibrary
        savedIds={savedIds}
        onToggleSave={onToggleSave}
        savingId={savingId}
        showSave
      />
    </div>
  );
}
