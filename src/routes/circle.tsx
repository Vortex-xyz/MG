import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getViewer, requestCircle } from "@/lib/matrimony/api";
import type { Viewer } from "@/lib/matrimony/types";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";
import { Button, buttonVariants } from "@/components/ui";

export const Route = createFileRoute("/circle")({
  head: () => ({ meta: [{ title: "Circle · Sri Mangalam" }] }),
  component: CirclePage,
});

function CirclePage() {
  const { user, isPending } = useCurrentUserState();
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    getViewer()
      .then((next) => {
        if (live) setViewer(next);
      })
      .catch((err: unknown) => {
        if (live) setError(err instanceof Error ? err.message : "Could not open the circle.");
      });
    return () => {
      live = false;
    };
  }, [user?.id]);

  if (isPending || (user && !viewer && !error)) {
    return (
      <Shell width="narrow">
        <PanelSkeleton />
      </Shell>
    );
  }
  if (!user || unauthorized(error)) return <RedirectToSignIn />;

  async function ask() {
    setPending(true);
    setError(null);
    try {
      await requestCircle();
      setViewer((current) => (current ? { ...current, circleRequested: true } : current));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not note the request.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell width="narrow">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone">Circle membership</p>
          <h1 className="font-display text-5xl text-ink">The photograph stays veiled.</h1>
          <p className="text-sm text-stone">
            A circle membership is how a household asks to see photographs on the register. It is ₹499 a month when billing opens. This preview does not charge.
          </p>
        </div>
        <ul className="flex flex-col gap-3 border-y border-line py-4 text-sm text-ink">
          <li>Unveiled photographs across the register</li>
          <li>Your own page stays editable either way</li>
          <li>Locality remains a city and a state</li>
        </ul>
        {viewer?.photosOpen ? (
          <p className="text-sm text-stone">Photographs are open for this account.</p>
        ) : viewer?.circleRequested ? (
          <p className="text-sm text-stone">
            Your request is noted. Photographs stay veiled until the ledger opens them.
          </p>
        ) : (
          <Button type="button" onClick={() => void ask()} disabled={pending}>
            {pending ? "Noting…" : "Request membership"}
          </Button>
        )}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Link to="/home" className={buttonVariants({ variant: "ghost" })}>
          Return to the register
        </Link>
      </div>
    </Shell>
  );
}
