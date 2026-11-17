import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMine, getViewer } from "@/lib/matrimony/api";
import type { ProfileInput, PublicProfile, Viewer } from "@/lib/matrimony/types";
import { ProfileForm } from "@/components/profile-form";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";
import { PhotoFrame } from "@/components/ui";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Your page · Kumkum" }] }),
  component: MePage,
});

function toInput(profile: PublicProfile): ProfileInput {
  return {
    displayName: profile.displayName,
    gender: profile.gender === "man" || profile.gender === "woman" ? profile.gender : "",
    age: profile.age,
    city: profile.city,
    state: profile.state,
    caste: profile.caste,
    rashi: profile.rashi,
    nakshatra: profile.nakshatra,
    jataka: profile.jataka ?? "",
    jatakaFileName: profile.jatakaFileName ?? "",
    jatakaFileType: profile.jatakaFileType ?? "",
    jatakaFileData: profile.jatakaFileData ?? "",
    about: profile.about ?? "",
    education: profile.education ?? "",
    profession: profile.profession ?? "",
    photoKey: profile.photoKey,
    photoClose: profile.photoClose ?? "",
    photoFull: profile.photoFull ?? "",
  };
}

function MePage() {
  const { user, isPending } = useCurrentUserState();
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    Promise.all([getViewer(), getMine()])
      .then(([nextViewer, nextProfile]) => {
        if (!live) return;
        setViewer(nextViewer);
        setProfile(nextProfile);
      })
      .catch((err: unknown) => {
        if (live) setError(err instanceof Error ? err.message : "Could not open your page.");
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
  if (viewer && !viewer.hasProfile) return <Navigate to="/join" />;
  if (!profile) {
    return (
      <Shell width="narrow">
        <PanelSkeleton />
      </Shell>
    );
  }

  return (
    <Shell width="narrow">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">Your page</h1>
          <p className="text-sm text-stone">
            Changes appear for everyone else on the register. They still cannot see the photograph.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-line">
          <PhotoFrame
            seed={profile.photoKey}
            name={profile.displayName}
            revealed
            close={profile.photoClose}
            full={profile.photoFull}
          />
        </div>
        {saved ? <p className="text-sm text-stone">Saved. The register has the new page.</p> : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <ProfileForm
          initial={toInput(profile)}
          onDone={() => {
            setSaved(true);
            window.location.assign("/me");
          }}
        />
      </div>
    </Shell>
  );
}
