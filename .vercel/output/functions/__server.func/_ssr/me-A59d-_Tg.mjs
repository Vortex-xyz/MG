import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as unauthorized, a as PhotoFrame, b as getViewer, c as RedirectToSignIn, i as PanelSkeleton, u as Shell, v as getMine, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
import { t as ProfileForm } from "./profile-form-BhAvhd9F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-A59d-_Tg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toInput(profile) {
	return {
		displayName: profile.displayName,
		gender: profile.gender === "man" || profile.gender === "woman" ? profile.gender : "",
		age: profile.age,
		city: profile.city,
		state: profile.state,
		caste: profile.caste,
		rashi: profile.rashi,
		nakshatra: profile.nakshatra,
		jataka: profile.jataka ?? "",
		about: profile.about ?? "",
		education: profile.education ?? "",
		profession: profile.profession ?? "",
		photoKey: profile.photoKey
	};
}
function MePage() {
	const { user, isPending } = useCurrentUserState();
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		Promise.all([getViewer(), getMine()]).then(([nextViewer, nextProfile]) => {
			if (!live) return;
			setViewer(nextViewer);
			setProfile(nextProfile);
		}).catch((err) => {
			if (live) setError(err instanceof Error ? err.message : "Could not open your page.");
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
	if (viewer && !viewer.hasProfile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/join" });
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelSkeleton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-ink",
						children: "Your page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: "Changes appear for everyone else on the register. They still cannot see the photograph."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrame, {
						seed: profile.photoKey,
						name: profile.displayName,
						revealed: true
					})
				}),
				saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: "Saved. The register has the new page."
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
					initial: toInput(profile),
					submitLabel: "Save page",
					onDone: () => {
						setSaved(true);
						window.location.assign("/me");
					}
				})
			]
		})
	});
}
//#endregion
export { MePage as component };
