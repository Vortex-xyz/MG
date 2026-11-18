import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getFeed, getViewer } from "@/lib/matrimony/api";
import { CASTES, GENDERS, NAKSHATRAS, RASHIS, STATES, genderLabel } from "@/lib/matrimony/constants";
import type { PublicProfile, Viewer } from "@/lib/matrimony/types";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";
import { Button, ProfileCard, SelectInput, TextInput } from "@/components/ui";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Register · Sri Mangalam" }] }),
  component: HomePage,
});

function HomePage() {
  const { user, isPending } = useCurrentUserState();
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [profiles, setProfiles] = useState<PublicProfile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [caste, setCaste] = useState("any");
  const [rashi, setRashi] = useState("any");
  const [nakshatra, setNakshatra] = useState("any");
  const [state, setState] = useState("any");
  const [gender, setGender] = useState("any");

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    setError(null);
    Promise.all([getViewer(), getFeed()])
      .then(([nextViewer, nextFeed]) => {
        if (!live) return;
        setViewer(nextViewer);
        setProfiles(nextFeed);
      })
      .catch((err: unknown) => {
        if (!live) return;
        setError(err instanceof Error ? err.message : "Could not open the register.");
      });
    return () => {
      live = false;
    };
  }, [user?.id]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (profiles ?? []).filter((profile) => {
      if (caste !== "any" && profile.caste !== caste) return false;
      if (rashi !== "any" && profile.rashi !== rashi) return false;
      if (nakshatra !== "any" && profile.nakshatra !== nakshatra) return false;
      if (state !== "any" && profile.state !== state) return false;
      if (gender !== "any" && profile.gender !== gender) return false;
      if (!needle) return true;
      const hay = [profile.displayName, profile.city, profile.state, profile.caste, profile.rashi, profile.nakshatra]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [profiles, query, caste, rashi, nakshatra, state, gender]);

  if (isPending || (user && !viewer && !error)) {
    return (
      <Shell>
        <PanelSkeleton />
      </Shell>
    );
  }
  if (!user || unauthorized(error)) return <RedirectToSignIn />;
  if (viewer && !viewer.hasProfile && !viewer.isSteward) return <Navigate to="/join" />;

  const filtersActive = query || caste !== "any" || rashi !== "any" || nakshatra !== "any" || state !== "any" || gender !== "any";

  return (
    <Shell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">The register</h1>
          <p className="max-w-xl text-sm text-stone">
            Names, a city, a nakshatra, a caste. Photographs stay veiled unless you are looking at your own page.
          </p>
        </div>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-panel p-4">
          <TextInput
            id="register-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, city, caste, rashi"
            aria-label="Search the register"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <SelectInput aria-label="Caste" value={caste} onChange={(event) => setCaste(event.target.value)}>
              <option value="any">Any caste</option>
              {CASTES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
            <SelectInput aria-label="Rashi" value={rashi} onChange={(event) => setRashi(event.target.value)}>
              <option value="any">Any rashi</option>
              {RASHIS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
            <SelectInput aria-label="Nakshatra" value={nakshatra} onChange={(event) => setNakshatra(event.target.value)}>
              <option value="any">Any nakshatra</option>
              {NAKSHATRAS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
            <SelectInput aria-label="State" value={state} onChange={(event) => setState(event.target.value)}>
              <option value="any">Any state</option>
              {STATES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
            <SelectInput aria-label="Gender" value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value="any">Anyone</option>
              {GENDERS.map((item) => (
                <option key={item} value={item}>
                  {genderLabel(item)}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>
        <p className="text-sm tabular-nums text-stone">
          {visible.length} {visible.length === 1 ? "person" : "people"}
        </p>
        {visible.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-line px-4 py-8">
            <p className="text-ink">No one matches.</p>
            {filtersActive ? (
              <Button
                variant="quiet"
                type="button"
                onClick={() => {
                  setQuery("");
                  setCaste("any");
                  setRashi("any");
                  setNakshatra("any");
                  setState("any");
                  setGender("any");
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((profile, index) => (
              <ProfileCard key={profile.id} profile={profile} delay={Math.min(index, 8) * 40} />
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
