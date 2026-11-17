import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as unauthorized, b as getViewer, c as RedirectToSignIn, i as PanelSkeleton, u as Shell, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
import { t as ProfileForm } from "./profile-form-BhAvhd9F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-ClrQ0p3I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_PROFILE = {
	displayName: "",
	gender: "",
	age: 0,
	city: "",
	state: "",
	caste: "",
	rashi: "",
	nakshatra: "",
	jataka: "",
	about: "",
	education: "",
	profession: "",
	photoKey: "study-a"
};
function JoinPage() {
	const { user, isPending } = useCurrentUserState();
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		getViewer().then((next) => {
			if (live) setViewer(next);
		}).catch((err) => {
			if (live) setError(err instanceof Error ? err.message : "Could not open this page.");
		});
		return () => {
			live = false;
		};
	}, [user?.id]);
	if (isPending || user && !viewer && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelSkeleton, {})
	});
	if (!user || unauthorized(error)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (viewer?.hasProfile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/home" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-ink",
						children: "Write your page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: "Name, caste, rashi, and nakshatra go on the register for other households. Jataka is optional. The photograph stays veiled for them."
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
					initial: EMPTY_PROFILE,
					submitLabel: "Enter the register",
					onDone: () => window.location.assign("/home")
				})
			]
		})
	});
}
//#endregion
export { JoinPage as component };
