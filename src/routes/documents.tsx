import { createFileRoute } from "@tanstack/react-router";
import { DocumentLibrary } from "@/components/document-library";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Inland Revenue
        </p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">Document library</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Acts, the YA 2025/26 tax chart, APIT tables, VAT/SSCL notes and filing
          guidance — each entry points at ird.gov.lk.
        </p>
        <div className="mt-8">
          <DocumentLibrary />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
