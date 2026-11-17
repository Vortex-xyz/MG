import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RASHIS, c as genderLabel, n as GENDERS, o as STATES, r as NAKSHATRAS, t as CASTES } from "./constants-CEiF9P6h.mjs";
import { C as unauthorized, b as getViewer, c as RedirectToSignIn, f as TextInput, g as getFeed, i as PanelSkeleton, l as SelectInput, s as ProfileCard, t as Button, u as Shell, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-CW_JbZ3j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { user, isPending } = useCurrentUserState();
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [profiles, setProfiles] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [caste, setCaste] = (0, import_react.useState)("any");
	const [rashi, setRashi] = (0, import_react.useState)("any");
	const [nakshatra, setNakshatra] = (0, import_react.useState)("any");
	const [state, setState] = (0, import_react.useState)("any");
	const [gender, setGender] = (0, import_react.useState)("any");
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		setError(null);
		Promise.all([getViewer(), getFeed()]).then(([nextViewer, nextFeed]) => {
			if (!live) return;
			setViewer(nextViewer);
			setProfiles(nextFeed);
		}).catch((err) => {
			if (!live) return;
			setError(err instanceof Error ? err.message : "Could not open the register.");
		});
		return () => {
			live = false;
		};
	}, [user?.id]);
	const visible = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return (profiles ?? []).filter((profile) => {
			if (caste !== "any" && profile.caste !== caste) return false;
			if (rashi !== "any" && profile.rashi !== rashi) return false;
			if (nakshatra !== "any" && profile.nakshatra !== nakshatra) return false;
			if (state !== "any" && profile.state !== state) return false;
			if (gender !== "any" && profile.gender !== gender) return false;
			if (!needle) return true;
			return [
				profile.displayName,
				profile.city,
				profile.state,
				profile.caste,
				profile.rashi,
				profile.nakshatra
			].join(" ").toLowerCase().includes(needle);
		});
	}, [
		profiles,
		query,
		caste,
		rashi,
		nakshatra,
		state,
		gender
	]);
	if (isPending || user && !viewer && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelSkeleton, {}) });
	if (!user || unauthorized(error)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (viewer && !viewer.hasProfile && !viewer.isSteward) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/join" });
	const filtersActive = query || caste !== "any" || rashi !== "any" || nakshatra !== "any" || state !== "any" || gender !== "any";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl text-ink",
					children: "The register"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-sm text-stone",
					children: "Names, a city, a nakshatra, a caste. Photographs stay veiled unless you are looking at your own page."
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-line bg-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					id: "register-search",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search name, city, caste, rashi",
					"aria-label": "Search the register"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							"aria-label": "Caste",
							value: caste,
							onChange: (event) => setCaste(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "any",
								children: "Any caste"
							}), CASTES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							"aria-label": "Rashi",
							value: rashi,
							onChange: (event) => setRashi(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "any",
								children: "Any rashi"
							}), RASHIS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							"aria-label": "Nakshatra",
							value: nakshatra,
							onChange: (event) => setNakshatra(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "any",
								children: "Any nakshatra"
							}), NAKSHATRAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							"aria-label": "State",
							value: state,
							onChange: (event) => setState(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "any",
								children: "Any state"
							}), STATES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							"aria-label": "Gender",
							value: gender,
							onChange: (event) => setGender(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "any",
								children: "Anyone"
							}), GENDERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: genderLabel(item)
							}, item))]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-stone",
				children: [
					visible.length,
					" ",
					visible.length === 1 ? "person" : "people"
				]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-3 rounded-xl border border-line px-4 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink",
					children: "No one matches."
				}), filtersActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					type: "button",
					onClick: () => {
						setQuery("");
						setCaste("any");
						setRashi("any");
						setNakshatra("any");
						setState("any");
						setGender("any");
					},
					children: "Clear filters"
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: visible.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, { profile }, profile.id))
			})
		]
	}) });
}
//#endregion
export { HomePage as component };
