import { t as authClient } from "./client-IWHfIGH2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credentials-BVXvZwEf.js
var BEARER_KEY = "grok-auth.bearer-token";
function rememberSession(token) {
	if (typeof window === "undefined") return;
	try {
		if (token) window.sessionStorage.setItem(BEARER_KEY, token);
		else window.sessionStorage.removeItem(BEARER_KEY);
	} catch {}
}
async function signInWithEmail(email, password) {
	const result = await authClient.signIn.email({
		email,
		password
	});
	if (result.error) throw new Error(result.error.message ?? "Could not sign in");
	rememberSession(result.data?.token);
	await authClient.getSession();
}
async function registerWithEmail(email, password) {
	const name = email.split("@")[0]?.slice(0, 40) || "Member";
	const result = await authClient.signUp.email({
		email,
		password,
		name
	});
	if (result.error) throw new Error(result.error.message ?? "Could not create the account");
	rememberSession(result.data?.token);
	await authClient.getSession();
}
async function replaceSession(token) {
	try {
		await authClient.signOut();
	} catch {}
	rememberSession(null);
	rememberSession(token);
	await authClient.getSession();
}
//#endregion
export { replaceSession as n, signInWithEmail as r, registerWithEmail as t };
