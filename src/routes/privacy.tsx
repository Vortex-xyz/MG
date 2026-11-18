import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { enterLedger } from "@/lib/matrimony/api";
import { replaceSession } from "@/lib/matrimony/credentials";
import { Shell } from "@/components/shell";
import { Button, Field, TextInput } from "@/components/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · Sri Mangalam" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onLedger(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await enterLedger({ data: { username, password } });
      if (!result.ok || !result.token) {
        setError("Those details were not recognized.");
        setPending(false);
        return;
      }
      await replaceSession(result.token);
      window.location.assign("/ledger");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open the ledger.");
      setPending(false);
    }
  }

  return (
    <Shell width="narrow">
      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-display text-5xl text-ink">Privacy</h1>
          <p className="text-sm text-stone">How a page on Sri Mangalam is kept, and who can read it.</p>
        </header>
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-ink">What is stored</h2>
          <p className="text-sm text-stone">
            An account holds an email and a session. A page holds the name, gender, age, city, state, caste, rashi, nakshatra, education, work, and any jataka note, chart photo or PDF, or bio you choose to add. The portrait is a study you pick. Sri Mangalam does not ask for a street address.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-ink">Who can see it</h2>
          <p className="text-sm text-stone">
            Signed-in households can read the register. They see your name, locality, nakshatra, and caste on a card, and the rest of the page when they open it. The photograph is veiled. You can see your own photograph. A circle membership is the intended way to ask for everyone else's. Billing is not open in this preview.
          </p>
        </section>
        <Collapsible.Root open={open} onOpenChange={setOpen} className="border-t border-line">
          <Collapsible.Trigger className="flex h-14 w-full items-center justify-between text-left">
            <span className="font-display text-3xl text-ink">Records retention</span>
            <ChevronDown className={cn("size-4 text-stone transition-transform duration-200", open && "rotate-180")} />
          </Collapsible.Trigger>
          <Collapsible.Content className="flex flex-col gap-4 pb-6">
            <p className="text-sm text-stone">
              A page stays on the register until you change it or the account is removed. Circle requests are kept as a note that someone asked. They do not unveil a photograph by themselves. The ledger can open photographs for an account.
            </p>
            <p className="text-sm text-stone">
              Session records expire on their own. Writing to the household is the way to ask for a page to be taken down. Sample pages shipped with the register are not personal accounts.
            </p>
            <form onSubmit={onLedger} className="mt-2 flex flex-col gap-4 border-t border-line pt-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl text-ink">Ledger access</h3>
                <p className="text-sm text-mist">For the household that keeps the books.</p>
              </div>
              <Field label="Name">
                <TextInput
                  id="ledger-username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Field>
              <Field label="Passphrase">
                <TextInput
                  id="ledger-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Field>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" variant="quiet" disabled={pending}>
                {pending ? "Opening…" : "Open"}
              </Button>
            </form>
          </Collapsible.Content>
        </Collapsible.Root>
      </article>
    </Shell>
  );
}
