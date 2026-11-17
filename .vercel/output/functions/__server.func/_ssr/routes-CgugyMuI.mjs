import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PhotoFrame, p as buttonVariants, u as Shell, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgugyMuI.js
var import_jsx_runtime = require_jsx_runtime();
var NOTES = [
	{
		index: "01",
		title: "Place",
		body: "A city and a state. Never a street."
	},
	{
		index: "02",
		title: "Sky",
		body: "Rashi and nakshatra, written the way families still ask."
	},
	{
		index: "03",
		title: "Veil",
		body: "The photograph stays held until a circle membership."
	}
];
function Hero() {
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-center gap-10 py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,320px)] md:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: "A household register"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-xl font-display text-5xl leading-tight text-ink sm:text-6xl",
					children: "The stars, the city, and a name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-base text-stone",
					children: "Kumkum keeps a page for each person. Caste, rashi, and nakshatra are open on the register. A photograph stays veiled until someone asks, through a circle membership, to see it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: !isPending && user ? "/home" : "/login",
						className: buttonVariants(),
						children: !isPending && user ? "Continue" : "Enter the register"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: buttonVariants({ variant: "ghost" }),
						children: "Privacy"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrame, {
				seed: "hero-plate",
				name: "A page on the register",
				revealed: false
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-3",
		children: NOTES.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg tabular-nums text-mist",
					children: note.index
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: note.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: note.body
				})
			]
		}, note.index))
	})] });
}
//#endregion
export { Hero as component };
