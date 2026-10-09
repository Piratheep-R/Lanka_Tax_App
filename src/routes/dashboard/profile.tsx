import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile, saveProfile } from "@/lib/server/profile";
import { TAXPAYER_TYPES, type TaxpayerType } from "@/lib/tax/rates";

export const Route = createFileRoute("/dashboard/profile")({
  component: DashboardProfile,
});

function DashboardProfile() {
  const [displayName, setDisplayName] = useState("");
  const [taxpayerType, setTaxpayerType] = useState<TaxpayerType>("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [hasRental, setHasRental] = useState(false);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [hasInvestments, setHasInvestments] = useState(false);
  const [hasSolar, setHasSolar] = useState(false);
  const [tin, setTin] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((p) => {
        setDisplayName(p.displayName ?? "");
        setTaxpayerType(p.taxpayerType);
        setMonthlyIncome(p.monthlyIncome);
        setOtherIncome(p.otherIncome);
        setHasRental(p.hasRental);
        setHasBusiness(p.hasBusiness);
        setHasInvestments(p.hasInvestments);
        setHasSolar(p.hasSolar);
        setTin(p.tin ?? "");
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile({
        data: {
          displayName,
          taxpayerType,
          monthlyIncome,
          otherIncome,
          hasRental,
          hasBusiness,
          hasInvestments,
          hasSolar,
          tin,
        },
      });
      toast.success("Profile saved");
    } catch {
      toast.error("Could not save the profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Account
        </p>
        <h1 className="font-display text-3xl tracking-tight">Taxpayer profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Used to estimate APIT and pick reminders. Nothing here is submitted to IRD.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Income mix</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="displayName">Preferred name</Label>
              <Input
                id="displayName"
                value={displayName}
                disabled={!loaded}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Taxpayer type</Label>
              <select
                id="type"
                value={taxpayerType}
                disabled={!loaded}
                onChange={(e) => setTaxpayerType(e.target.value as TaxpayerType)}
                className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
              >
                {TAXPAYER_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly employment (LKR)</Label>
                <Input
                  id="monthly"
                  inputMode="numeric"
                  disabled={!loaded}
                  value={monthlyIncome ? monthlyIncome.toLocaleString("en-LK") : ""}
                  onChange={(e) =>
                    setMonthlyIncome(Number(e.target.value.replace(/[^\d]/g, "")) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other">Other annual income (LKR)</Label>
                <Input
                  id="other"
                  inputMode="numeric"
                  disabled={!loaded}
                  value={otherIncome ? otherIncome.toLocaleString("en-LK") : ""}
                  onChange={(e) =>
                    setOtherIncome(Number(e.target.value.replace(/[^\d]/g, "")) || 0)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tin">TIN (optional)</Label>
              <Input
                id="tin"
                value={tin}
                disabled={!loaded}
                onChange={(e) => setTin(e.target.value)}
                placeholder="Inland Revenue TIN"
              />
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Also relevant</legend>
              <Check
                label="Rental income"
                checked={hasRental}
                onChange={setHasRental}
              />
              <Check
                label="Business / sole-proprietor income"
                checked={hasBusiness}
                onChange={setHasBusiness}
              />
              <Check
                label="Investment assets (CGT)"
                checked={hasInvestments}
                onChange={setHasInvestments}
              />
              <Check
                label="Qualifying solar expenditure"
                checked={hasSolar}
                onChange={setHasSolar}
              />
            </fieldset>
            <Button type="submit" disabled={!loaded || saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded-xs border-input accent-primary"
      />
      {label}
    </label>
  );
}
