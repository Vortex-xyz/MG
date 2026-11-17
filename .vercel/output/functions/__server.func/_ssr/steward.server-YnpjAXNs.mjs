import { i as getSql } from "./db-BIBRp3W6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/steward.server-YnpjAXNs.js
var STEWARD_USERNAME = "archivist";
var STEWARD_EMAIL = "archivist@kumkum.house";
var STEWARD_PASSWORD = "house-ledger-1847";
var pending = null;
function ensureSteward() {
	if (!pending) pending = seedSteward().catch((err) => {
		pending = null;
		throw err;
	});
	return pending;
}
async function seedSteward() {
	const sql = await getSql();
	if ((await sql`
    select id from "user" where lower(email) = ${"archivist@kumkum.house"} limit 1
  `).length > 0) return;
	const { auth } = await import("./server-BqUDuCCT.mjs").then((n) => n.r);
	try {
		await auth.api.signUpEmail({ body: {
			name: "Archivist",
			email: STEWARD_EMAIL,
			password: STEWARD_PASSWORD
		} });
	} catch (err) {
		if ((await sql`
      select id from "user" where lower(email) = ${"archivist@kumkum.house"} limit 1
    `).length === 0) throw err;
	}
}
async function isStewardUser(userId) {
	return ((await (await getSql())`
    select email from "user" where id = ${userId} limit 1
  `)[0]?.email ?? "").toLowerCase() === STEWARD_EMAIL;
}
//#endregion
export { STEWARD_EMAIL, STEWARD_PASSWORD, STEWARD_USERNAME, ensureSteward, isStewardUser };
