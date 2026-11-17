import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  CASTES,
  NAKSHATRAS,
  PORTRAIT_STUDIES,
  RASHIS,
  STATES,
} from "./constants";
import type {
  AccountOverview,
  Ledger,
  ProfileInput,
  PublicProfile,
  Viewer,
} from "./types";

type ProfileRow = {
  id: string;
  user_id: string | null;
  display_name: string;
  gender: string;
  age: number;
  city: string;
  state: string;
  caste: string;
  rashi: string;
  nakshatra: string;
  jataka: string | null;
  jataka_file_name: string | null;
  jataka_file_type: string | null;
  jataka_file_data: string | null;
  about: string | null;
  education: string | null;
  profession: string | null;
  photo_key: string;
  photo_close: string | null;
  photo_full: string | null;
  sample: boolean;
};

function clean(value: string, max: number) {
  return value
    .replace(/[\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function assertChoice(value: string, options: readonly string[], label: string) {
  if (!options.includes(value)) throw new Error(`Choose a ${label}.`);
}

function parseShot(value: string, label: string) {
  const data = String(value ?? "").replace(/\s/g, "");
  if (!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(data) || data.length > 900_000) {
    throw new Error(`Upload a ${label} under 1 MB.`);
  }
  return data;
}
function parseJatakaFile(input: ProfileInput) {
  const data = String(input?.jatakaFileData ?? "").replace(/\s/g, "");
  if (!data) return { jatakaFileName: "", jatakaFileType: "", jatakaFileData: "" };
  const match = /^data:(image\/jpeg|image\/png|image\/webp|application\/pdf);base64,[A-Za-z0-9+/=]+$/.exec(
    data,
  );
  if (!match || data.length > 1_600_000) {
    throw new Error("Upload a photo or a PDF under 1 MB.");
  }
  return {
    jatakaFileName: clean(input.jatakaFileName || "jataka", 80) || "jataka",
    jatakaFileType: match[1],
    jatakaFileData: data,
  };
}

function parseProfile(input: ProfileInput): ProfileInput {
  const displayName = clean(input?.displayName ?? "", 60);
  const city = clean(input?.city ?? "", 40);
  const gender = input?.gender;
  const age = Number(input?.age);
  const state = input?.state ?? "";
  const caste = input?.caste ?? "";
  const rashi = input?.rashi ?? "";
  const nakshatra = input?.nakshatra ?? "";
  const photoKeyRaw = input?.photoKey ?? "";
  const photoKey = (PORTRAIT_STUDIES as readonly string[]).includes(photoKeyRaw) ? photoKeyRaw : "study-a";
  const photoClose = parseShot(input?.photoClose ?? "", "close-up");
  const photoFull = parseShot(input?.photoFull ?? "", "full shot");
  if (displayName.length < 2) throw new Error("Enter a name.");
  if (gender !== "woman" && gender !== "man") throw new Error("Choose woman or man.");
  if (!Number.isInteger(age) || age < 18 || age > 80) {
    throw new Error("Age must be between 18 and 80.");
  }
  if (city.length < 2) throw new Error("Enter a city.");
  assertChoice(state, STATES, "state");
  assertChoice(caste, CASTES, "caste");
  assertChoice(rashi, RASHIS, "rashi");
  assertChoice(nakshatra, NAKSHATRAS, "nakshatra");
  const education = clean(input.education ?? "", 80);
  const profession = clean(input.profession ?? "", 80);
  if (education.length < 2) throw new Error("Enter education.");
  if (profession.length < 2) throw new Error("Enter work.");
  const file = parseJatakaFile(input);
  return {
    displayName,
    gender,
    age,
    city,
    state,
    caste,
    rashi,
    nakshatra,
    jataka: clean(input.jataka ?? "", 500),
    ...file,
    about: clean(input.about ?? "", 600),
    education,
    profession,
    photoKey,
    photoClose,
    photoFull,
  };
}

function toProfile(row: ProfileRow, viewerId: string, open: boolean): PublicProfile {
  const isSelf = row.user_id === viewerId;
  return {
    id: row.id,
    displayName: row.display_name,
    gender: row.gender,
    age: Number(row.age),
    city: row.city,
    state: row.state,
    caste: row.caste,
    rashi: row.rashi,
    nakshatra: row.nakshatra,
    jataka: row.jataka,
    jatakaFileName: row.jataka_file_name ?? null,
    jatakaFileType: row.jataka_file_type ?? null,
    jatakaFileData: row.jataka_file_data ?? null,
    about: row.about,
    education: row.education,
    profession: row.profession,
    photoKey: row.photo_key,
    photoClose: row.photo_close ?? null,
    photoFull: row.photo_full ?? null,
    sample: Boolean(row.sample),
    isSelf,
    revealed: open || isSelf,
  };
}

async function db() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

async function stewardFlag(userId: string) {
  const { ensureSteward, isStewardUser } = await import("./steward.server");
  await ensureSteward();
  return isStewardUser(userId);
}

export const warmRegistry = createServerFn({ method: "GET" }).handler(async () => {
  const { ensureSteward } = await import("./steward.server");
  await ensureSteward();
  return { ok: true as const };
});

export const enterLedger = createServerFn({ method: "POST" })
  .validator((input: { username: string; password: string }) => ({
    username: String(input?.username ?? "").slice(0, 80),
    password: String(input?.password ?? "").slice(0, 200),
  }))
  .handler(async ({ data }) => {
    const { assertSameSiteRequest } = await import("@/lib/auth/isolation.server");
    assertSameSiteRequest();
    const { ensureSteward, STEWARD_EMAIL, STEWARD_PASSWORD, STEWARD_USERNAME } = await import(
      "./steward.server"
    );
    await ensureSteward();
    const username = data.username.trim().toLowerCase();
    if (username !== STEWARD_USERNAME || data.password !== STEWARD_PASSWORD) {
      return { ok: false as const, token: null };
    }
    const { auth } = await import("@/lib/auth/server");
    const result = await auth.api.signInEmail({
      body: { email: STEWARD_EMAIL, password: STEWARD_PASSWORD },
    });
    return { ok: true as const, token: result.token };
  });

async function canSeePhotos(userId: string, steward: boolean) {
  if (steward) return true;
  const sql = await db();
  const rows = await sql<{ user_id: string }>`
    select user_id from photo_grants where user_id = ${userId} limit 1
  `;
  return rows.length > 0;
}

export const getViewer = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Viewer> => {
    const steward = await stewardFlag(context.userId);
    const sql = await db();
    const profiles = await sql<{ display_name: string }>`
      select display_name from profiles where user_id = ${context.userId} limit 1
    `;
    const requests = await sql<{ user_id: string }>`
      select user_id from circle_requests where user_id = ${context.userId} limit 1
    `;
    return {
      isSteward: steward,
      hasProfile: profiles.length > 0,
      circleRequested: requests.length > 0,
      photosOpen: await canSeePhotos(context.userId, steward),
      displayName: profiles[0]?.display_name ?? null,
    };
  });

export const getFeed = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<PublicProfile[]> => {
    const steward = await stewardFlag(context.userId);
    const open = await canSeePhotos(context.userId, steward);
    const sql = await db();
    const rows = await sql<ProfileRow>`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, about, education, profession, photo_key, photo_close, photo_full, sample
      from profiles
      where user_id is distinct from ${context.userId}
      order by created_at desc
    `;
    return rows.map((row) => toProfile(row, context.userId, open));
  });

export const getProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    const next = String(id ?? "");
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(next)) throw new Error("Unknown page.");
    return next;
  })
  .handler(async ({ context, data: id }): Promise<PublicProfile | null> => {
    const steward = await stewardFlag(context.userId);
    const open = await canSeePhotos(context.userId, steward);
    const sql = await db();
    const rows = await sql<ProfileRow>`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, jataka_file_name, jataka_file_type, jataka_file_data, about, education, profession,
             photo_key, photo_close, photo_full, sample
      from profiles
      where id = ${id}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return toProfile(row, context.userId, open);
  });

export const getMine = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<PublicProfile | null> => {
    const sql = await db();
    const rows = await sql<ProfileRow>`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, jataka_file_name, jataka_file_type, jataka_file_data, about, education, profession,
             photo_key, photo_close, photo_full, sample
      from profiles
      where user_id = ${context.userId}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return toProfile(row, context.userId, true);
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: ProfileInput) => parseProfile(input))
  .handler(async ({ context, data }) => {
    const sql = await db();
    const jataka = data.jataka || null;
    const about = data.about || null;
    const fileName = data.jatakaFileName || null;
    const fileType = data.jatakaFileType || null;
    const fileData = data.jatakaFileData || null;
    await sql`
      insert into profiles (
        id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
        jataka, jataka_file_name, jataka_file_type, jataka_file_data, about, education, profession,
        photo_key, photo_close, photo_full, sample
      ) values (
        ${context.userId}, ${context.userId}, ${data.displayName}, ${data.gender}, ${data.age},
        ${data.city}, ${data.state}, ${data.caste}, ${data.rashi}, ${data.nakshatra},
        ${jataka}, ${fileName}, ${fileType}, ${fileData}, ${about}, ${data.education}, ${data.profession},
        ${data.photoKey}, ${data.photoClose}, ${data.photoFull}, false
      )
      on conflict (id) do update set
        display_name = excluded.display_name,
        gender = excluded.gender,
        age = excluded.age,
        city = excluded.city,
        state = excluded.state,
        caste = excluded.caste,
        rashi = excluded.rashi,
        nakshatra = excluded.nakshatra,
        jataka = excluded.jataka,
        jataka_file_name = excluded.jataka_file_name,
        jataka_file_type = excluded.jataka_file_type,
        jataka_file_data = excluded.jataka_file_data,
        about = excluded.about,
        education = excluded.education,
        profession = excluded.profession,
        photo_key = excluded.photo_key,
        photo_close = excluded.photo_close,
        photo_full = excluded.photo_full,
        updated_at = now()
    `;
    return { ok: true as const };
  });

export const requestCircle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await db();
    await sql`
      insert into circle_requests (user_id) values (${context.userId})
      on conflict (user_id) do nothing
    `;
    return { circleRequested: true as const };
  });

export const getLedger = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Ledger> => {
    const { ensureSteward, isStewardUser, STEWARD_EMAIL } = await import("./steward.server");
    await ensureSteward();
    if (!(await isStewardUser(context.userId))) throw new Error("Forbidden");
    const sql = await db();
    const accounts = await sql<{
      id: string;
      name: string;
      email: string;
      created_at: string;
      has_profile: boolean;
      circle_requested: boolean;
      photos_open: boolean;
    }>`
      select u.id,
             u.name,
             u.email,
             u."createdAt"::text as created_at,
             exists(select 1 from profiles p where p.user_id = u.id) as has_profile,
             exists(select 1 from circle_requests c where c.user_id = u.id) as circle_requested,
             exists(select 1 from photo_grants g where g.user_id = u.id) as photos_open
      from "user" u
      order by u."createdAt" desc
    `;
    const rows = await sql<ProfileRow>`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, jataka_file_name, jataka_file_type, jataka_file_data, about, education, profession,
             photo_key, photo_close, photo_full, sample
      from profiles
      order by sample asc, created_at desc
    `;
    const accountRows: AccountOverview[] = accounts.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: String(row.created_at),
      hasProfile: Boolean(row.has_profile),
      circleRequested: Boolean(row.circle_requested),
      photosOpen: Boolean(row.photos_open) || row.email.toLowerCase() === STEWARD_EMAIL,
      isSteward: row.email.toLowerCase() === STEWARD_EMAIL,
    }));
    return {
      accounts: accountRows,
      profiles: rows.map((row) => ({ ...toProfile(row, context.userId, true), revealed: true })),
    };
  });

export const setPhotoAccess = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { userId: string; open: boolean }) => {
    const userId = String(input?.userId ?? "");
    if (!/^[\w-]{1,128}$/.test(userId)) throw new Error("Unknown account.");
    return { userId, open: Boolean(input?.open) };
  })
  .handler(async ({ context, data }) => {
    const { ensureSteward, isStewardUser, STEWARD_EMAIL } = await import("./steward.server");
    await ensureSteward();
    if (!(await isStewardUser(context.userId))) throw new Error("Forbidden");
    const sql = await db();
    const accounts = await sql<{ email: string }>`
      select email from "user" where id = ${data.userId} limit 1
    `;
    const account = accounts[0];
    if (!account) throw new Error("Unknown account.");
    if (account.email.toLowerCase() === STEWARD_EMAIL) return { photosOpen: true as const };
    if (data.open) {
      await sql`
        insert into photo_grants (user_id) values (${data.userId})
        on conflict (user_id) do nothing
      `;
    } else {
      await sql`delete from photo_grants where user_id = ${data.userId}`;
    }
    return { photosOpen: data.open };
  });
