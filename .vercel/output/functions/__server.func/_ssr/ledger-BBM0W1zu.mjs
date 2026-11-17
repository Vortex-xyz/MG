import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as genderLabel } from "./constants-CEiF9P6h.mjs";
import { C as unauthorized, _ as getLedger, a as PhotoFrame, c as RedirectToSignIn, i as PanelSkeleton, n as FactList, p as buttonVariants, u as Shell, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-BBM0W1zu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function day(value) {
	return value.slice(0, 10);
}
function LedgerPage() {
	const { user, isPending } = useCurrentUserState();
	const [ledger, setLedger] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		getLedger().then((next) => {
			if (live) setLedger(next);
		}).catch((err) => {
			if (live) setError(err instanceof Error ? err.message : "Could not open the ledger.");
		});
		return () => {
			live = false;
		};
	}, [user?.id]);
	if (isPending || user && !ledger && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelSkeleton, {}) });
	if (!user || unauthorized(error)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!ledger) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
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
					children: "This page is not open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/home",
					className: buttonVariants({ variant: "quiet" }),
					children: "Back"
				})
			]
		})
	});
	const requests = ledger.accounts.filter((account) => account.circleRequested).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl text-ink",
					children: "Household ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-sm text-stone",
					children: "Every account and every page. Photographs are open here. The veil does not apply."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Accounts",
						value: ledger.accounts.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pages",
						value: ledger.profiles.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Circle notes",
						value: requests
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: ledger.accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 rounded-xl border border-line bg-panel p-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink",
							children: account.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-stone",
							children: account.email
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-y-1 text-sm sm:text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Joined"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums text-ink",
									children: day(account.createdAt)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Page"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-ink",
									children: account.hasProfile ? "Written" : "None"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Circle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-ink",
									children: account.circleRequested ? "Asked" : "No"
								}),
								account.isSteward ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-ink",
									children: "Ledger"
								})] }) : null
							]
						})]
					}, account.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-4 lg:grid-cols-2",
					children: ledger.profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "overflow-hidden rounded-xl border border-line bg-panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 p-4 sm:grid-cols-[140px_minmax(0,1fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-md border border-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrame, {
									seed: profile.photoKey,
									name: profile.displayName,
									revealed: true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-mist",
											children: profile.sample ? "Sample page" : "Member page"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-3xl text-ink",
											children: profile.displayName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-stone",
											children: genderLabel(profile.gender)
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactList, {
										profile,
										full: true
									}),
									profile.jataka ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-stone",
										children: profile.jataka
									}) : null,
									profile.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-mist",
										children: profile.about
									}) : null
								]
							})]
						})
					}, profile.id))
				})]
			})
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-panel p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-mist",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-4xl tabular-nums text-ink",
			children: value
		})]
	});
}
//#endregion
export { LedgerPage as component };
