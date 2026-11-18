import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getLedger, setPhotoAccess } from "@/lib/matrimony/api";
import type { Ledger } from "@/lib/matrimony/types";
import { PanelSkeleton, Shell, unauthorized } from "@/components/shell";
import { Button, FactList, JatakaChart, PhotoFrame, buttonVariants } from "@/components/ui";
import { genderLabel } from "@/lib/matrimony/constants";

export const Route = createFileRoute("/ledger")({
  head: () => ({ meta: [{ title: "Ledger · Sri Mangalam" }] }),
  component: LedgerPage,
});

function day(value: string) {
  return value.slice(0, 10);
}

function LedgerPage() {
  const { user, isPending } = useCurrentUserState();
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function togglePhotos(userId: string, open: boolean) {
    setBusy(userId);
    setError(null);
    try {
      const next = await setPhotoAccess({ data: { userId, open } });
      setLedger((current) =>
        current
          ? {
              ...current,
              accounts: current.accounts.map((account) =>
                account.id === userId ? { ...account, photosOpen: next.photosOpen } : account,
              ),
            }
          : current,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the veil.");
    } finally {
      setBusy(null);
    }
  }

  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    getLedger()
      .then((next) => {
        if (live) setLedger(next);
      })
      .catch((err: unknown) => {
        if (live) setError(err instanceof Error ? err.message : "Could not open the ledger.");
      });
    return () => {
      live = false;
    };
  }, [user?.id]);

  if (isPending || (user && !ledger && !error)) {
    return (
      <Shell>
        <PanelSkeleton />
      </Shell>
    );
  }
  if (!user || unauthorized(error)) return <RedirectToSignIn />;
  if (!ledger) {
    return (
      <Shell width="narrow">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-5xl text-ink">Not on the register</h1>
          <p className="text-sm text-stone">This page is not open.</p>
          <Link to="/home" className={buttonVariants({ variant: "quiet" })}>
            Back
          </Link>
        </div>
      </Shell>
    );
  }

  const requests = ledger.accounts.filter((account) => account.circleRequested).length;

  return (
    <Shell>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">Household ledger</h1>
          <p className="max-w-xl text-sm text-stone">
            Every account and every page. Photographs are open here. Open the veil for an account when they should see everyone else's photographs.
          </p>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
        </div>
        <dl className="grid grid-cols-3 gap-3">
          <Stat label="Accounts" value={ledger.accounts.length} />
          <Stat label="Pages" value={ledger.profiles.length} />
          <Stat label="Circle notes" value={requests} />
        </dl>
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-ink">Accounts</h2>
          <ul className="grid gap-3">
            {ledger.accounts.map((account) => (
              <li key={account.id} className="grid gap-2 rounded-xl border border-line bg-panel p-4 sm:grid-cols-2">
                <div>
                  <p className="text-ink">{account.name}</p>
                  <p className="text-sm text-stone">{account.email}</p>
                </div>
                <dl className="grid grid-cols-2 gap-y-1 text-sm sm:text-right">
                  <dt className="text-mist">Joined</dt>
                  <dd className="tabular-nums text-ink">{day(account.createdAt)}</dd>
                  <dt className="text-mist">Page</dt>
                  <dd className="text-ink">{account.hasProfile ? "Written" : "None"}</dd>
                  <dt className="text-mist">Circle</dt>
                  <dd className="text-ink">{account.circleRequested ? "Asked" : "No"}</dd>
                  <dt className="text-mist">Veil</dt>
                  <dd className="text-ink">{account.photosOpen ? "Open" : "Veiled"}</dd>
                  {account.isSteward ? (
                    <>
                      <dt className="text-mist">Role</dt>
                      <dd className="text-ink">Ledger</dd>
                    </>
                  ) : (
                    <dd className="col-span-2 sm:text-right">
                      <Button
                        type="button"
                        variant="quiet"
                        disabled={busy === account.id}
                        onClick={() => void togglePhotos(account.id, !account.photosOpen)}
                      >
                        {account.photosOpen ? "Close the veil" : "Open the veil"}
                      </Button>
                    </dd>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-ink">Pages</h2>
          <ul className="grid gap-4 lg:grid-cols-2">
            {ledger.profiles.map((profile) => (
              <li key={profile.id} className="overflow-hidden rounded-xl border border-line bg-panel">
                <div className="grid gap-4 p-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                  <div className="overflow-hidden rounded-md border border-line">
                    <PhotoFrame
                      seed={profile.photoKey}
                      name={profile.displayName}
                      revealed
                      close={profile.photoClose}
                      full={profile.photoFull}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <div>
                      <p className="text-xs text-mist">{profile.sample ? "Sample page" : "Member page"}</p>
                      <h3 className="font-display text-3xl text-ink">{profile.displayName}</h3>
                      <p className="text-sm text-stone">{genderLabel(profile.gender)}</p>
                    </div>
                    <FactList profile={profile} full />
                    {profile.jataka ? <p className="text-sm text-stone">{profile.jataka}</p> : null}
                    <JatakaChart name={profile.jatakaFileName} type={profile.jatakaFileType} data={profile.jatakaFileData} />
                    {profile.about ? <p className="text-sm text-mist">{profile.about}</p> : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <dt className="text-sm text-mist">{label}</dt>
      <dd className="font-display text-4xl tabular-nums text-ink">{value}</dd>
    </div>
  );
}
