import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/constants-CEiF9P6h.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-IWHfIGH2.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-C-K0Vn1K.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var CASTES = [
	"Brahmin",
	"Iyer",
	"Iyengar",
	"Lingayat",
	"Vokkaliga",
	"Gowda",
	"Bunt",
	"Reddy",
	"Kamma",
	"Nair",
	"Chettiar",
	"Maratha",
	"Kayastha"
];
var RASHIS = [
	"Mesha",
	"Vrishabha",
	"Mithuna",
	"Karka",
	"Simha",
	"Kanya",
	"Tula",
	"Vrishchika",
	"Dhanu",
	"Makara",
	"Kumbha",
	"Meena"
];
var NAKSHATRAS = [
	"Ashwini",
	"Bharani",
	"Krittika",
	"Rohini",
	"Mrigashira",
	"Ardra",
	"Punarvasu",
	"Pushya",
	"Ashlesha",
	"Magha",
	"Purva Phalguni",
	"Uttara Phalguni",
	"Hasta",
	"Chitra",
	"Swati",
	"Vishakha",
	"Anuradha",
	"Jyeshtha",
	"Mula",
	"Purva Ashadha",
	"Uttara Ashadha",
	"Shravana",
	"Dhanishta",
	"Shatabhisha",
	"Purva Bhadrapada",
	"Uttara Bhadrapada",
	"Revati"
];
var STATES = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Delhi",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal"
];
var PORTRAIT_STUDIES = [
	"study-a",
	"study-b",
	"study-c",
	"study-d",
	"study-e",
	"study-f"
];
var GENDERS = ["woman", "man"];
function genderLabel(gender) {
	if (gender === "woman") return "Woman";
	if (gender === "man") return "Man";
	return gender;
}
//#endregion
export { RASHIS as a, genderLabel as c, PORTRAIT_STUDIES as i, GENDERS as n, STATES as o, NAKSHATRAS as r, authMiddleware as s, CASTES as t };
