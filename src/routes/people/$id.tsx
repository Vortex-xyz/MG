import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProfile } from "@/lib/matrimony/api";
import { genderLabel } from "@/lib/matrimony/constants";
import type { PublicProfile } from "@/lib/matrimony/types";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";
import { FactList, JatakaChart, PhotoFrame, buttonVariants } from "@/components/ui";

export const Route = createFileRoute("/people/$id")({
  head: () => ({ meta: [{ title: "A page · Sri Mangalam" }] }),
  component: PersonPage,
});

function PersonPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<PublicProfile | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    setProfile(undefined);
    getProfile({ data: id })
      .then((next) => {
        if (live) setProfile(next);
      })
      .catch((err: unknown) => {
        if (!live) return;
        setError(err instanceof Error ? err.message : "Could not open this page.");
        setProfile(null);
      });
    return () => {
      live = false;
    };
  }, [user?.id, id]);

  if (isPending || (user && profile === undefined && !error)) {
    return (
      <Shell width="narrow">
        <PanelSkeleton />
      </Shell>
    );
  }
  if (!user || unauthorized(error)) return <RedirectToSignIn />;

  if (!profile) {
    return (
      <Shell width="narrow">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-5xl text-ink">Not on the register</h1>
          <p className="text-sm text-stone">{error ?? "This page is not here."}</p>
          <Link to="/home" className={buttonVariants({ variant: "quiet" })}>
            Back to the register
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start">
        <div className="overflow-hidden rounded-xl border border-line">
          <PhotoFrame
            seed={profile.photoKey}
            name={profile.displayName}
            revealed={profile.revealed}
            close={profile.photoClose}
            full={profile.photoFull}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-mist">{genderLabel(profile.gender)}</p>
            <h1 className="font-display text-5xl text-ink">{profile.displayName}</h1>
            <p className="text-stone">
              {profile.city}, {profile.state}
            </p>
          </div>
          <FactList profile={profile} full />
          {profile.about ? <p className="max-w-xl text-sm text-stone">{profile.about}</p> : null}
          {profile.jataka || profile.jatakaFileData ? (
            <div className="flex flex-col gap-3 rounded-md border border-line p-4">
              <p className="text-sm text-mist">Jataka</p>
              {profile.jataka ? <p className="text-sm text-ink">{profile.jataka}</p> : null}
              <JatakaChart name={profile.jatakaFileName} type={profile.jatakaFileType} data={profile.jatakaFileData} />
            </div>
          ) : null}
          {profile.revealed ? (
            <p className="text-sm text-stone">
              {profile.isSelf ? "This photograph is open because it is yours." : "Photographs are open for your account."}
            </p>
          ) : (
            <Link to="/circle" className={buttonVariants()}>
              View photograph
            </Link>
          )}
          {profile.isSelf ? (
            <Link to="/me" className={buttonVariants({ variant: "quiet" })}>
              Edit your page
            </Link>
          ) : (
            <Link to="/home" className={buttonVariants({ variant: "ghost" })}>
              Back to the register
            </Link>
          )}
        </div>
      </div>
    </Shell>
  );
}
