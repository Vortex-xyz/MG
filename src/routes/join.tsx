import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getViewer } from "@/lib/matrimony/api";
import { EMPTY_PROFILE, type Viewer } from "@/lib/matrimony/types";
import { ProfileForm } from "@/components/profile-form";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";

export const Route = createFileRoute("/join")({
  head: () => ({ meta: [{ title: "Your page · Sri Mangalam" }] }),
  component: JoinPage,
});

function JoinPage() {
  const { user, isPending } = useCurrentUserState();
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    getViewer()
      .then((next) => {
        if (live) setViewer(next);
      })
      .catch((err: unknown) => {
        if (live) setError(err instanceof Error ? err.message : "Could not open this page.");
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
  if (viewer?.hasProfile) return <Navigate to="/home" />;

  return (
    <Shell width="narrow">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">Write your page</h1>
          <p className="text-sm text-stone">
            Name, caste, rashi, and nakshatra go on the register for other households. Education and work are required. Upload a close-up and a full shot. A written jataka is optional, and you can attach a photo or PDF of the chart. The photographs stay veiled for them.
          </p>
        </div>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <ProfileForm
          initial={EMPTY_PROFILE}
          onDone={() => window.location.assign("/home")}
        />
      </div>
    </Shell>
  );
}
