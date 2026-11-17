import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as unauthorized, b as getViewer, c as RedirectToSignIn, i as PanelSkeleton, p as buttonVariants, t as Button, u as Shell, w as useCurrentUserState, x as requestCircle } from "./ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/circle-BH3mKGkb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CirclePage() {
	const { user, isPending } = useCurrentUserState();
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		getViewer().then((next) => {
			if (live) setViewer(next);
		}).catch((err) => {
			if (live) setError(err instanceof Error ? err.message : "Could not open the circle.");
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
	async function ask() {
		setPending(true);
		setError(null);
		try {
			await requestCircle();
			setViewer((current) => current ? {
				...current,
				circleRequested: true
			} : current);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not note the request.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-stone",
							children: "Circle membership"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl text-ink",
							children: "The photograph stays veiled."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-stone",
							children: "A circle membership is how a household asks to see photographs on the register. It is ₹499 a month when billing opens. This preview does not charge."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-3 border-y border-line py-4 text-sm text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Unveiled photographs across the register" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your own page stays editable either way" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Locality remains a city and a state" })
					]
				}),
				viewer?.circleRequested ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: "Your request is noted. Billing is not open, so the veil stays."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => void ask(),
					disabled: pending,
					children: pending ? "Noting…" : "Request membership"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: buttonVariants({ variant: "ghost" }),
					children: "Return to the register"
				})
			]
		})
	});
}
//#endregion
export { CirclePage as component };
