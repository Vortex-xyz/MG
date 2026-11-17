import { o as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "./_libs/@radix-ui/react-collapsible+[...].mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as genderLabel } from "./_ssr/constants-CEiF9P6h.mjs";
import { n as Route$1 } from "./_ssr/router-BlQ7HmJz.mjs";
import { C as unauthorized, a as PhotoFrame, c as RedirectToSignIn, i as PanelSkeleton, n as FactList, p as buttonVariants, u as Shell, w as useCurrentUserState, y as getProfile } from "./_ssr/ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BktDFMjM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonPage() {
	const { id } = Route$1.useParams();
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(void 0);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		setProfile(void 0);
		getProfile({ data: id }).then((next) => {
			if (live) setProfile(next);
		}).catch((err) => {
			if (!live) return;
			setError(err instanceof Error ? err.message : "Could not open this page.");
			setProfile(null);
		});
		return () => {
			live = false;
		};
	}, [user?.id, id]);
	if (isPending || user && profile === void 0 && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelSkeleton, {})
	});
	if (!user || unauthorized(error)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl text-ink",
					children: "Not on the register"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: error ?? "This page is not here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: buttonVariants({ variant: "quiet" }),
					children: "Back to the register"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrame, {
				seed: profile.photoKey,
				name: profile.displayName,
				revealed: profile.revealed
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: genderLabel(profile.gender)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl text-ink",
							children: profile.displayName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-stone",
							children: [
								profile.city,
								", ",
								profile.state
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactList, {
					profile,
					full: true
				}),
				profile.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-sm text-stone",
					children: profile.about
				}) : null,
				profile.jataka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Jataka"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink",
						children: profile.jataka
					})]
				}) : null,
				profile.revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: profile.isSelf ? "This photograph is open because it is yours." : "This photograph is open on the ledger."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circle",
					className: buttonVariants(),
					children: "View photograph"
				}),
				profile.isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me",
					className: buttonVariants({ variant: "quiet" }),
					children: "Edit your page"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: buttonVariants({ variant: "ghost" }),
					children: "Back to the register"
				})
			]
		})]
	}) });
}
//#endregion
export { PersonPage as component };
