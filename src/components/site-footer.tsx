import { Logo } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            A Sri Lankan tax companion for rates, IRD documents and filing
            reminders. Guidance only — not an Inland Revenue ruling or licensed
            advice.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-foreground">Product</p>
            <a className="block text-muted-foreground hover:text-foreground" href="/documents">
              Document library
            </a>
            <a className="block text-muted-foreground hover:text-foreground" href="/calculator">
              APIT calculator
            </a>
            <a className="block text-muted-foreground hover:text-foreground" href="/dashboard">
              Dashboard
            </a>
            <a className="block text-muted-foreground hover:text-foreground" href="/help">
              Help & support
            </a>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Sources</p>
            <a
              className="block text-muted-foreground hover:text-foreground"
              href="https://www.ird.gov.lk"
              target="_blank"
              rel="noreferrer"
            >
              Inland Revenue Department
            </a>
            <a
              className="block text-muted-foreground hover:text-foreground"
              href="https://www.ird.gov.lk/en/publications/SitePages/tax_chart_2526.aspx?menuid=1404"
              target="_blank"
              rel="noreferrer"
            >
              Tax chart 2025/26
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
