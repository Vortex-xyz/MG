import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getViewer, warmRegistry } from "@/lib/matrimony/api";
import { Spinner } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Shell({
  children,
  width = "wide",
}: {
  children: ReactNode;
  width?: "wide" | "narrow";
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main
        className={cn(
          "page-enter mx-auto w-full flex-1 px-4 py-8 sm:px-6",
          width === "narrow" ? "max-w-xl" : "max-w-6xl",
        )}
      >
        {children}
      </main>
      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-8 text-sm text-mist sm:px-6">
        <span className="font-display text-lg text-stone">Kumkum</span>
        <Link to="/privacy" className="underline-offset-4 hover:text-ink hover:underline">
          Privacy
        </Link>
      </footer>
    </div>
  );
}

function SiteHeader() {
  const { user, isPending } = useCurrentUserState();
  const [steward, setSteward] = useState(false);

  useEffect(() => {
    void warmRegistry().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    getViewer()
      .then((viewer) => {
        if (live) setSteward(viewer.isSteward);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [user?.id]);

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-ink">
          <span className="inline-block size-2 bg-paper" aria-hidden />
          <span className="font-display text-2xl leading-none">Kumkum</span>
        </Link>
        {user ? (
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone">
            <Link to="/home" className="hover:text-ink">
              Register
            </Link>
            <Link to="/me" className="hover:text-ink">
              Your page
            </Link>
            <Link to="/circle" className="hover:text-ink">
              Circle
            </Link>
            {steward ? (
              <Link to="/ledger" className="hover:text-ink">
                Ledger
              </Link>
            ) : null}
          </nav>
        ) : null}
        <div className="ml-auto min-w-0">
          {!isPending && user ? (
            <UserButton />
          ) : (
            <Link to="/login" className="text-sm text-ink underline-offset-4 hover:underline">
              Enter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function PanelSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 py-20" role="status" aria-live="polite">
      <Spinner className="size-5 text-stone" />
      <p className="text-sm text-mist">Opening</p>
    </div>
  );
}

export function unauthorized(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error ? String(error.message) : "";
  return message === "Unauthorized" || message.includes("Unauthorized");
}
