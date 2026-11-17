import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as RASHIS, i as PORTRAIT_STUDIES, o as STATES, r as NAKSHATRAS, s as authMiddleware, t as CASTES } from "./constants-CEiF9P6h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BroMTzsg.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clean(value, max) {
	return value.replace(/[\u0000-\u001F]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
function assertChoice(value, options, label) {
	if (!options.includes(value)) throw new Error(`Choose a ${label}.`);
}
function parseProfile(input) {
	const displayName = clean(input?.displayName ?? "", 60);
	const city = clean(input?.city ?? "", 40);
	const gender = input?.gender;
	const age = Number(input?.age);
	const state = input?.state ?? "";
	const caste = input?.caste ?? "";
	const rashi = input?.rashi ?? "";
	const nakshatra = input?.nakshatra ?? "";
	const photoKey = input?.photoKey ?? "";
	if (displayName.length < 2) throw new Error("Enter a name.");
	if (gender !== "woman" && gender !== "man") throw new Error("Choose woman or man.");
	if (!Number.isInteger(age) || age < 18 || age > 80) throw new Error("Age must be between 18 and 80.");
	if (city.length < 2) throw new Error("Enter a city.");
	assertChoice(state, STATES, "state");
	assertChoice(caste, CASTES, "caste");
	assertChoice(rashi, RASHIS, "rashi");
	assertChoice(nakshatra, NAKSHATRAS, "nakshatra");
	assertChoice(photoKey, PORTRAIT_STUDIES, "portrait");
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
		about: clean(input.about ?? "", 600),
		education: clean(input.education ?? "", 80),
		profession: clean(input.profession ?? "", 80),
		photoKey
	};
}
function toProfile(row, viewerId, steward) {
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
		about: row.about,
		education: row.education,
		profession: row.profession,
		photoKey: row.photo_key,
		sample: Boolean(row.sample),
		isSelf,
		revealed: steward || isSelf
	};
}
async function db() {
	const { getSql } = await import("./db-BIBRp3W6.mjs").then((n) => n.t).then((n) => n.t);
	return getSql();
}
async function stewardFlag(userId) {
	const { ensureSteward, isStewardUser } = await import("./steward.server-YnpjAXNs.mjs");
	await ensureSteward();
	return isStewardUser(userId);
}
var warmRegistry_createServerFn_handler = createServerRpc({
	id: "dda8aa3a58b5d2338b39f54335a08f908aecaf1b3129434e56e8020a1d2e4e5a",
	name: "warmRegistry",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => warmRegistry.__executeServer(opts));
var warmRegistry = createServerFn({ method: "GET" }).handler(warmRegistry_createServerFn_handler, async () => {
	const { ensureSteward } = await import("./steward.server-YnpjAXNs.mjs");
	await ensureSteward();
	return { ok: true };
});
var enterLedger_createServerFn_handler = createServerRpc({
	id: "c2a1e11f30d22caee5ab0a3f201aae467b0fa288f607ef9aabd11d4184ed704a",
	name: "enterLedger",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => enterLedger.__executeServer(opts));
var enterLedger = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? "").slice(0, 80),
	password: String(input?.password ?? "").slice(0, 200)
})).handler(enterLedger_createServerFn_handler, async ({ data }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	assertSameSiteRequest();
	const { ensureSteward, STEWARD_EMAIL, STEWARD_PASSWORD, STEWARD_USERNAME } = await import("./steward.server-YnpjAXNs.mjs");
	await ensureSteward();
	if (data.username.trim().toLowerCase() !== STEWARD_USERNAME || data.password !== STEWARD_PASSWORD) return {
		ok: false,
		token: null
	};
	const { auth } = await import("./server-BqUDuCCT.mjs").then((n) => n.r);
	return {
		ok: true,
		token: (await auth.api.signInEmail({ body: {
			email: STEWARD_EMAIL,
			password: STEWARD_PASSWORD
		} })).token
	};
});
var getViewer_createServerFn_handler = createServerRpc({
	id: "81fb57051f88322d343e3add511a417ca39e6b0163f29ecd458dca9e9028f59e",
	name: "getViewer",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => getViewer.__executeServer(opts));
var getViewer = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getViewer_createServerFn_handler, async ({ context }) => {
	const steward = await stewardFlag(context.userId);
	const sql = await db();
	const profiles = await sql`
      select display_name from profiles where user_id = ${context.userId} limit 1
    `;
	const requests = await sql`
      select user_id from circle_requests where user_id = ${context.userId} limit 1
    `;
	return {
		isSteward: steward,
		hasProfile: profiles.length > 0,
		circleRequested: requests.length > 0,
		displayName: profiles[0]?.display_name ?? null
	};
});
var getFeed_createServerFn_handler = createServerRpc({
	id: "f0718dcd78da19d550ac3071106eca37478244191423215f659ea2622f0fdc15",
	name: "getFeed",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => getFeed.__executeServer(opts));
var getFeed = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getFeed_createServerFn_handler, async ({ context }) => {
	const steward = await stewardFlag(context.userId);
	return (await (await db())`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, about, education, profession, photo_key, sample
      from profiles
      where user_id is distinct from ${context.userId}
      order by created_at desc
    `).map((row) => toProfile(row, context.userId, steward));
});
var getProfile_createServerFn_handler = createServerRpc({
	id: "ac566a972d160a7499eaa78c2f73d71d1ae4cf360b101cca5e06c449dab9114d",
	name: "getProfile",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	const next = String(id ?? "");
	if (!/^[A-Za-z0-9_-]{1,80}$/.test(next)) throw new Error("Unknown page.");
	return next;
}).handler(getProfile_createServerFn_handler, async ({ context, data: id }) => {
	const steward = await stewardFlag(context.userId);
	const row = (await (await db())`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, about, education, profession, photo_key, sample
      from profiles
      where id = ${id}
      limit 1
    `)[0];
	if (!row) return null;
	return toProfile(row, context.userId, steward);
});
var getMine_createServerFn_handler = createServerRpc({
	id: "8549887e268542662be2edcce123c87c09960aa88d85c599ca0be369f58ecd26",
	name: "getMine",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => getMine.__executeServer(opts));
var getMine = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMine_createServerFn_handler, async ({ context }) => {
	const row = (await (await db())`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, about, education, profession, photo_key, sample
      from profiles
      where user_id = ${context.userId}
      limit 1
    `)[0];
	if (!row) return null;
	return toProfile(row, context.userId, true);
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "64b9c7cae7a33a7a151b3c8035cc31108808042ad64e5214fb8ca3909f997a87",
	name: "saveProfile",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => parseProfile(input)).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	const jataka = data.jataka || null;
	const about = data.about || null;
	const education = data.education || null;
	const profession = data.profession || null;
	await sql`
      insert into profiles (
        id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
        jataka, about, education, profession, photo_key, sample
      ) values (
        ${context.userId}, ${context.userId}, ${data.displayName}, ${data.gender}, ${data.age},
        ${data.city}, ${data.state}, ${data.caste}, ${data.rashi}, ${data.nakshatra},
        ${jataka}, ${about}, ${education}, ${profession}, ${data.photoKey}, false
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
        about = excluded.about,
        education = excluded.education,
        profession = excluded.profession,
        photo_key = excluded.photo_key,
        updated_at = now()
    `;
	return { ok: true };
});
var requestCircle_createServerFn_handler = createServerRpc({
	id: "21d06261b73104c20d810e3a7dba5fa76b3e137d2aa9134f142c76876418939f",
	name: "requestCircle",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => requestCircle.__executeServer(opts));
var requestCircle = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(requestCircle_createServerFn_handler, async ({ context }) => {
	await (await db())`
      insert into circle_requests (user_id) values (${context.userId})
      on conflict (user_id) do nothing
    `;
	return { circleRequested: true };
});
var getLedger_createServerFn_handler = createServerRpc({
	id: "73294c1244277f56a6afe7080bb178c4248da289cd32101e49d203b8145d6b02",
	name: "getLedger",
	filename: "src/lib/matrimony/api.ts"
}, (opts) => getLedger.__executeServer(opts));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getLedger_createServerFn_handler, async ({ context }) => {
	const { ensureSteward, isStewardUser, STEWARD_EMAIL } = await import("./steward.server-YnpjAXNs.mjs");
	await ensureSteward();
	if (!await isStewardUser(context.userId)) throw new Error("Forbidden");
	const sql = await db();
	const accounts = await sql`
      select u.id,
             u.name,
             u.email,
             u."createdAt"::text as created_at,
             exists(select 1 from profiles p where p.user_id = u.id) as has_profile,
             exists(select 1 from circle_requests c where c.user_id = u.id) as circle_requested
      from "user" u
      order by u."createdAt" desc
    `;
	const rows = await sql`
      select id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
             jataka, about, education, profession, photo_key, sample
      from profiles
      order by sample asc, created_at desc
    `;
	return {
		accounts: accounts.map((row) => ({
			id: row.id,
			name: row.name,
			email: row.email,
			createdAt: String(row.created_at),
			hasProfile: Boolean(row.has_profile),
			circleRequested: Boolean(row.circle_requested),
			isSteward: row.email.toLowerCase() === STEWARD_EMAIL
		})),
		profiles: rows.map((row) => ({
			...toProfile(row, context.userId, true),
			revealed: true
		}))
	};
});
//#endregion
export { enterLedger_createServerFn_handler, getFeed_createServerFn_handler, getLedger_createServerFn_handler, getMine_createServerFn_handler, getProfile_createServerFn_handler, getViewer_createServerFn_handler, requestCircle_createServerFn_handler, saveProfile_createServerFn_handler, warmRegistry_createServerFn_handler };
