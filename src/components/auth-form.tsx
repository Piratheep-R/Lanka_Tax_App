import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.74-.06-1.28-.2-1.84H12v3.34h5.48c-.11.9-.71 2.26-2.05 3.18l-.02.1 2.98 2.26.2.02c1.9-1.72 3-4.25 3-7.06Z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.96-.87 6.62-2.37l-3.16-2.38c-.85.58-1.99 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15l-.09.01-3.09 2.34-.04.08C4.77 19.99 8.13 22 12 22Z"
      />
      <path
        fill="currentColor"
        d="M6.32 13.1A6.04 6.04 0 0 1 6 12c0-.38.04-.75.1-1.1l-.01-.08-3.13-2.38-.07.03A9.98 9.98 0 0 0 2 12c0 1.61.4 3.13 1.09 4.47l3.23-2.37Z"
      />
      <path
        fill="currentColor"
        d="M12 5.75c1.88 0 3.15.8 3.87 1.47l2.83-2.7C16.95 2.9 14.7 2 12 2 8.13 2 4.77 4.01 3.09 7.53l3.22 2.38C7.12 7.5 9.36 5.75 12 5.75Z"
      />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 21.2 3h-1.9l-5.6 6.4L9.2 3H3.5l6.9 10L3.5 21h1.9l6-6.9 4.8 6.9h5.7l-7.2-10.7Zm-2.1 2.4-.7-1-5.6-7.9h2.4l4.5 6.4.7 1 5.9 8.3h-2.4l-4.8-6.8Z"
      />
    </svg>
  );
}

function ProviderIcon({ id }: { id: string }) {
  if (id === "google") return <GoogleGlyph />;
  if (id === "x") return <XGlyph />;
  return null;
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (isSignup) {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Taxpayer",
        });
        if (err) {
          setError(err.message ?? "Could not create the account.");
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) {
          setError(err.message ?? "Could not sign in.");
          return;
        }
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-3">
        <Logo />
        <h1 className="font-display text-3xl tracking-tight">
          {isSignup ? "Open your tax file" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignup
            ? "Create an account to save documents, estimate APIT and keep filing dates in one place."
            : "Sign in to your LankaTax dashboard — documents, calculator and advisor."}
        </p>
      </div>

      <div className="grid gap-2">
        {GROK_PROVIDERS.map((p) => (
          <Button
            key={p.providerId}
            type="button"
            variant="outline"
            onClick={() => signIn(p.providerId, { callbackURL: "/dashboard" })}
          >
            <ProviderIcon id={p.providerId} />
            Continue with {p.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          or email
        </span>
        <Separator className="flex-1" />
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {isSignup ? (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nimal Perera"
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending
            ? isSignup
              ? "Creating account…"
              : "Signing in…"
            : isSignup
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to LankaTax?{" "}
            <Link to="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export function AuthAside() {
  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-sidebar px-10 py-12 text-sidebar-foreground lg:flex lg:w-[44%]">
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, color-mix(in oklab, black 35%, transparent)), radial-gradient(circle at 20% 10%, color-mix(in oklab, var(--color-leaf) 55%, transparent), transparent 42%)",
        }}
      />
      <p className="relative font-display text-sm tracking-wide text-sidebar-muted">
        Inland Revenue · YA 2025/26
      </p>
      <div className="relative space-y-6">
        <h2 className="max-w-sm font-display text-4xl leading-tight tracking-tight">
          Sri Lankan tax, kept in one quiet ledger.
        </h2>
        <ul className="space-y-3 text-sm text-sidebar-muted">
          <li>Personal relief Rs. 1.8 million · bands 6%–36%</li>
          <li>APIT tables, VAT 18%, WHT/AIT schedules</li>
          <li>Filing dates for SET, instalments and the annual return</li>
        </ul>
      </div>
      <p className="relative text-xs text-sidebar-muted">
        Figures follow the IRD tax chart. Always confirm on ird.gov.lk before you file.
      </p>
    </aside>
  );
}
