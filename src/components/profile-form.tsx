import { useState, type FormEvent } from "react";
import { saveProfile } from "@/lib/matrimony/api";
import { CASTES, GENDERS, NAKSHATRAS, RASHIS, STATES, genderLabel } from "@/lib/matrimony/constants";
import type { ProfileInput } from "@/lib/matrimony/types";
import { Button, Field, JatakaChart, SelectInput, Spinner, TextArea, TextInput } from "./ui";

function readDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not read that photo.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const data = canvas.toDataURL("image/jpeg", 0.82);
  if (data.length > 1_400_000) throw new Error("That photo is still too large.");
  return data;
}

async function readJatakaFile(file: File) {
  const name = file.name.replace(/[^\w.\- ()]/g, "").slice(0, 80) || "jataka";
  if (file.type.startsWith("image/")) {
    return { jatakaFileName: name, jatakaFileType: "image/jpeg", jatakaFileData: await compressImage(file) };
  }
  if (file.type === "application/pdf") {
    if (file.size > 1_100_000) throw new Error("Use a PDF under 1 MB.");
    return { jatakaFileName: name, jatakaFileType: "application/pdf", jatakaFileData: await readDataUrl(file) };
  }
  throw new Error("Upload a photo or a PDF.");
}

export function ProfileForm({
  initial,
  onDone,
}: {
  initial: ProfileInput;
  onDone: () => void;
}) {
  const [form, setForm] = useState<ProfileInput>(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [reading, setReading] = useState(false);

  function set<K extends keyof ProfileInput>(key: K, value: ProfileInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setReading(true);
    setError(null);
    try {
      const next = await readJatakaFile(file);
      setForm((current) => ({ ...current, ...next }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that file.");
    } finally {
      setReading(false);
    }
  }

  async function onShot(kind: "photoClose" | "photoFull", file: File | undefined) {
    if (!file) return;
    setReading(true);
    setError(null);
    try {
      if (!file.type.startsWith("image/")) throw new Error("Upload a photo.");
      const data = await compressImage(file);
      set(kind, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that photo.");
    } finally {
      setReading(false);
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await saveProfile({ data: form });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the page.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4">
      <Field label="Name" required>
        <TextInput
          id="display-name"
          value={form.displayName}
          onChange={(event) => set("displayName", event.target.value)}
          autoComplete="name"
          required
        />
      </Field>
      <Field label="Gender" required>
        <SelectInput
          id="gender"
          value={form.gender}
          onChange={(event) => set("gender", event.target.value as ProfileInput["gender"])}
          required
        >
          <option value="">Select</option>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {genderLabel(gender)}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Age" required>
        <TextInput
          id="age"
          inputMode="numeric"
          value={form.age || ""}
          onChange={(event) => set("age", Number(event.target.value.replace(/\D/g, "").slice(0, 2)))}
          required
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City" required>
          <TextInput
            id="city"
            value={form.city}
            onChange={(event) => set("city", event.target.value)}
            placeholder="Bengaluru"
            required
          />
        </Field>
        <Field label="State" required>
          <SelectInput
            id="state"
            value={form.state}
            onChange={(event) => set("state", event.target.value)}
            required
          >
            <option value="">Select</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field label="Caste" required>
        <SelectInput id="caste" value={form.caste} onChange={(event) => set("caste", event.target.value)} required>
          <option value="">Select</option>
          {CASTES.map((caste) => (
            <option key={caste} value={caste}>
              {caste}
            </option>
          ))}
        </SelectInput>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Rashi" required>
          <SelectInput id="rashi" value={form.rashi} onChange={(event) => set("rashi", event.target.value)} required>
            <option value="">Select</option>
            {RASHIS.map((rashi) => (
              <option key={rashi} value={rashi}>
                {rashi}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Nakshatra" required>
          <SelectInput
            id="nakshatra"
            value={form.nakshatra}
            onChange={(event) => set("nakshatra", event.target.value)}
            required
          >
            <option value="">Select</option>
            {NAKSHATRAS.map((nakshatra) => (
              <option key={nakshatra} value={nakshatra}>
                {nakshatra}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field label="Jataka">
        <TextArea
          id="jataka"
          value={form.jataka}
          onChange={(event) => set("jataka", event.target.value)}
          placeholder="Birth time and place, if you want it written out."
        />
      </Field>
      <div className="flex flex-col gap-2 text-sm text-stone">
        <span>Jataka chart</span>
        <input
          id="jataka-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="block w-full text-sm text-stone file:mr-3 file:h-9 file:rounded-full file:border-0 file:bg-paper file:px-4 file:text-sm file:text-ink-deep"
          onChange={(event) => void onFile(event.target.files?.[0])}
        />
        <p className="text-mist">A photo or a PDF. Optional.</p>
        {reading ? (
          <p className="inline-flex items-center gap-2 text-mist">
            <Spinner /> Reading the file
          </p>
        ) : null}
        {form.jatakaFileData ? (
          <div className="flex flex-col gap-2">
            <JatakaChart name={form.jatakaFileName} type={form.jatakaFileType} data={form.jatakaFileData} />
            <button
              type="button"
              className="self-start text-sm text-stone underline underline-offset-4"
              onClick={() => setForm((current) => ({ ...current, jatakaFileName: "", jatakaFileType: "", jatakaFileData: "" }))}
            >
              Remove chart
            </button>
          </div>
        ) : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Education" required>
          <TextInput
            id="education"
            value={form.education}
            onChange={(event) => set("education", event.target.value)}
            required
          />
        </Field>
        <Field label="Work" required>
          <TextInput
            id="profession"
            value={form.profession}
            onChange={(event) => set("profession", event.target.value)}
            required
          />
        </Field>
      </div>
      <Field label="Bio">
        <TextArea id="about" value={form.about} onChange={(event) => set("about", event.target.value)} />
      </Field>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm text-stone">
          Photographs<span className="text-danger"> *</span>
        </legend>
        <p className="text-sm text-mist">
          A close-up and a full shot. You can see both. Everyone else sees them veiled until the ledger opens them.
        </p>
        <ShotUpload
          id="photo-close"
          label="Portrait, close-up"
          src={form.photoClose}
          onFile={(file) => void onShot("photoClose", file)}
        />
        <ShotUpload
          id="photo-full"
          label="Full shot"
          src={form.photoFull}
          onFile={(file) => void onShot("photoFull", file)}
        />
      </fieldset>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending || reading}>
        {pending ? <Spinner /> : null}
        {pending ? "Saving" : "Submit"}
      </Button>
    </form>
  );
}

function ShotUpload({
  id,
  label,
  src,
  onFile,
}: {
  id: string;
  label: string;
  src: string;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-stone">
        {label}
        <span className="text-danger"> *</span>
      </span>
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="block w-full text-sm text-stone file:mr-3 file:h-9 file:rounded-full file:border-0 file:bg-paper file:px-4 file:text-sm file:text-ink-deep"
        onChange={(event) => onFile(event.target.files?.[0])}
      />
      {src ? <img src={src} alt="" className="aspect-[4/5] w-full rounded-md object-cover" /> : null}
    </div>
  );
}
