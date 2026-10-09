import { createFileRoute } from "@tanstack/react-router";
import { AuthAside, AuthForm } from "@/components/auth-form";
import { authEnabled } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="flex min-h-dvh bg-background">
      <AuthAside />
      <section className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        {authEnabled ? (
          <AuthForm mode="login" />
        ) : (
          <p className="text-sm text-muted-foreground">Sign-in is disabled.</p>
        )}
      </section>
    </main>
  );
}
