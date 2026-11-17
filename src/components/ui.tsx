import { useRef, useState, type ButtonHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes, type InputHTMLAttributes, type PointerEvent, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Portrait } from "./portrait";
import type { PublicProfile } from "@/lib/matrimony/types";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[opacity,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
  {
    variants: {
      variant: {
        primary: "bg-paper text-ink-deep hover:opacity-90",
        quiet: "border border-line bg-transparent text-ink hover:bg-panel",
        ghost: "bg-transparent text-stone hover:text-ink",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function Button({
  className,
  variant,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { buttonVariants };

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-4 animate-spin", className)} aria-hidden />;
}

export const controlClass =
  "h-11 w-full min-w-0 rounded-md border border-line bg-canvas px-3 text-base text-ink outline-none placeholder:text-mist focus-visible:border-paper";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(controlClass, "h-auto min-h-28 py-3 leading-normal", props.className)}
    />
  );
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(controlClass, props.className)} />;
}

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-sm text-stone">
      <span>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function PhotoFrame({
  seed,
  name,
  revealed,
  close = null,
  full = null,
}: {
  seed: string;
  name: string;
  revealed: boolean;
  close?: string | null;
  full?: string | null;
}) {
  const shots = [
    close ? { src: close, label: "Close-up" } : null,
    full ? { src: full, label: "Full shot" } : null,
  ].filter((shot): shot is { src: string; label: string } => shot !== null);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);
  const count = shots.length;
  const safeIndex = count === 0 ? 0 : Math.min(index, count - 1);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (count < 2) return;
    startX.current = event.clientX;
    dragged.current = false;
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    if (Math.abs(event.clientX - startX.current) > 8) dragged.current = true;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    const dx = event.clientX - startX.current;
    if (dx <= -36) setIndex((current) => Math.min(count - 1, current + 1));
    if (dx >= 36) setIndex((current) => Math.max(0, current - 1));
    startX.current = null;
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (!dragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragged.current = false;
  }

  return (
    <div
      className="relative aspect-[4/5] touch-pan-y overflow-hidden bg-panel-2"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null;
      }}
      onClick={onClick}
    >
      <div className={revealed ? "h-full w-full" : "photo-veil h-full w-full"}>
        {count === 0 ? (
          <Portrait seed={seed} label={revealed ? `Photograph of ${name}` : "Veiled photograph"} />
        ) : (
          <div
            className="flex h-full transition-transform duration-200 ease-out"
            style={{ width: `${count * 100}%`, transform: `translateX(-${(safeIndex * 100) / count}%)` }}
          >
            {shots.map((shot) => (
              <img
                key={shot.label}
                src={shot.src}
                alt={revealed ? `${shot.label} of ${name}` : "Veiled photograph"}
                draggable={false}
                className="h-full object-cover"
                style={{ width: `${100 / count}%` }}
              />
            ))}
          </div>
        )}
      </div>
      {count > 1 ? (
        <div className="absolute inset-x-2 bottom-2 z-10 flex justify-between gap-2">
          <button
            type="button"
            className="rounded-full bg-canvas/90 px-2.5 py-1 text-xs text-ink"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIndex(0);
            }}
          >
            Close-up
          </button>
          <button
            type="button"
            className="rounded-full bg-canvas/90 px-2.5 py-1 text-xs text-ink"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIndex(1);
            }}
          >
            Full shot
          </button>
        </div>
      ) : null}
      {!revealed ? (
        <div className="photo-scrim pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 text-xs text-ink">
            <Lock className="size-3.5" aria-hidden />
            Photograph veiled
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function ProfileCard({ profile, delay = 0 }: { profile: PublicProfile; delay?: number }) {
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="card-rise flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-stone"
    >
      <PhotoFrame
        seed={profile.photoKey}
        name={profile.displayName}
        revealed={profile.revealed}
        close={profile.photoClose}
        full={profile.photoFull}
      />
      <Link
        to="/people/$id"
        params={{ id: profile.id }}
        className="flex flex-col gap-3 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
        <h2 className="font-display text-3xl leading-none text-ink">{profile.displayName}</h2>
        <p className="text-sm text-stone">
          {profile.city}, {profile.state}
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-mist">Nakshatra</dt>
          <dd className="text-right text-ink">{profile.nakshatra}</dd>
          <dt className="text-mist">Caste</dt>
          <dd className="text-right text-ink">{profile.caste}</dd>
        </dl>
      </Link>
    </article>
  );
}

export function FactList({ profile, full }: { profile: PublicProfile; full?: boolean }) {
  const rows: Array<[string, string | null]> = [
    ["Locality", `${profile.city}, ${profile.state}`],
    ["Nakshatra", profile.nakshatra],
    ["Caste", profile.caste],
  ];
  if (full) {
    rows.push(
      ["Rashi", profile.rashi],
      ["Age", String(profile.age)],
      ["Education", profile.education],
      ["Work", profile.profession],
    );
  }
  return (
    <dl className="flex flex-col gap-2 text-sm">
      {rows.map(([label, value]) =>
        value ? (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt className="text-mist">{label}</dt>
            <dd className="text-right text-ink">{value}</dd>
          </div>
        ) : null,
      )}
    </dl>
  );
}

export function JatakaChart({
  name,
  type,
  data,
}: {
  name: string | null;
  type: string | null;
  data: string | null;
}) {
  if (!data || !type) return null;
  if (type.startsWith("image/")) {
    return (
      <img src={data} alt={name || "Jataka"} className="max-h-80 w-full rounded-md bg-panel-2 object-contain" />
    );
  }
  return (
    <a href={data} download={name || "jataka.pdf"} className="text-sm text-ink underline underline-offset-4">
      {name || "Jataka document"}
    </a>
  );
}
