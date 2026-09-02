import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-line bg-surface p-8 shadow-[var(--shadow)]">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          santivilla
        </p>
        <h1 className="font-display mt-2 text-3xl text-ink">Anmelden</h1>
        <p className="mt-2 text-sm text-muted">
          Admin-Bereich oder Kundenportal.
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
