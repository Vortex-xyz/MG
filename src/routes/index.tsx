import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui";
import { PhotoFrame } from "@/components/ui";
import { Shell } from "@/components/shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/")({
  component: Hero,
});

const NOTES = [
  { index: "01", title: "Place", body: "A city and a state. Never a street." },
  { index: "02", title: "Sky", body: "Rashi and nakshatra, written the way families still ask." },
  { index: "03", title: "Veil", body: "The photograph stays held until a circle membership." },
];

function Hero() {
  const { user, isPending } = useCurrentUserState();
  return (
    <Shell>
      <div className="grid items-center gap-10 py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,320px)] md:py-12">
        <div className="flex flex-col gap-6">
          <p className="text-sm text-stone">A household register</p>
          <h1 className="max-w-xl font-display text-5xl leading-tight text-ink sm:text-6xl">
            The stars, the city, and a name.
          </h1>
          <p className="max-w-xl text-base text-stone">
            Sri Mangalam keeps a page for each person. Caste, rashi, and nakshatra are open on the
            register. A photograph stays veiled until someone asks, through a circle membership, to see it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to={!isPending && user ? "/home" : "/login"} className={buttonVariants()}>
              {!isPending && user ? "Continue" : "Enter the register"}
            </Link>
            <Link to="/privacy" className={buttonVariants({ variant: "ghost" })}>
              Privacy
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-line">
          <PhotoFrame seed="hero-plate" name="A page on the register" revealed={false} />
        </div>
      </div>
      <ol className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
        {NOTES.map((note) => (
          <li key={note.index} className="flex flex-col gap-2">
            <span className="font-display text-lg tabular-nums text-mist">{note.index}</span>
            <h2 className="font-display text-3xl text-ink">{note.title}</h2>
            <p className="text-sm text-stone">{note.body}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
