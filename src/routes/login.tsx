import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { registerWithEmail, signInWithEmail } from "@/lib/matrimony/credentials";
import { Shell } from "@/components/shell";
import { Button, Field, Spinner, TextInput, buttonVariants } from "@/components/ui";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Enter · Sri Mangalam" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"enter" | "create">("enter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (isPending) {
    return (
      <Shell width="narrow">
        <div className="flex flex-col items-center gap-3 py-20" role="status">
          <Spinner className="size-5 text-stone" />
          <p className="text-sm text-mist">Opening</p>
        </div>
      </Shell>
    );
  }
  if (user) return <Navigate to="/home" />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 8) {
      setError("Use a real email and a password of at least 8 characters.");
      return;
    }
    setPending(true);
    try {
      if (mode === "create") await registerWithEmail(email.trim(), password);
      else await signInWithEmail(email.trim(), password);
      window.location.assign(mode === "create" ? "/join" : "/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not enter.");
      setPending(false);
    }
  }

  return (
    <Shell width="narrow">
      <div className="flex flex-col gap-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">{mode === "create" ? "Create an account" : "Enter"}</h1>
          <p className="text-sm text-stone">
            {mode === "create"
              ? "After this, you write your page. It appears on the register for others."
              : "Sign in to open the register."}
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4">
          <Field label="Email" required>
            <TextInput
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Field>
          <Field label="Password" required>
            <TextInput
              id="password"
              type="password"
              autoComplete={mode === "create" ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Field>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={pending}>
            {pending ? <Spinner /> : null}
            {pending ? "Please wait" : mode === "create" ? "Create account" : "Sign in"}
          </Button>
          <button
            type="button"
            className="h-11 text-sm text-stone underline-offset-4 hover:text-ink hover:underline"
            onClick={() => {
              setMode(mode === "create" ? "enter" : "create");
              setError(null);
            }}
          >
            {mode === "create" ? "I already have an account" : "Create an account"}
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {GROK_PROVIDERS.map((provider) => (
            <button
              key={provider.providerId}
              type="button"
              className={buttonVariants({ variant: "quiet" })}
              onClick={() => {
                void signIn(provider.providerId, { callbackURL: "/home" }).catch((err: unknown) => {
                  setError(err instanceof Error ? err.message : "Could not continue.");
                });
              }}
            >
              Continue with {provider.label}
            </button>
          ))}
        </div>
        <Link to="/" className="text-sm text-mist underline-offset-4 hover:text-ink hover:underline">
          Back to the front
        </Link>
      </div>
    </Shell>
  );
}
