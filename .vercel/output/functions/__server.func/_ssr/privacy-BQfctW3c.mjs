import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as CollapsibleContent, o as require_react, r as CollapsibleTrigger, t as Collapsible } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { r as ChevronDown } from "../_libs/lucide-react.mjs";
import { f as TextInput, h as enterLedger, m as cn, r as Field, t as Button, u as Shell } from "./ui-CoUdPSxA.mjs";
import { n as replaceSession } from "./credentials-BVXvZwEf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-BQfctW3c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onLedger(event) {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			const result = await enterLedger({ data: {
				username,
				password
			} });
			if (!result.ok || !result.token) {
				setError("Those details were not recognized.");
				setPending(false);
				return;
			}
			await replaceSession(result.token);
			window.location.assign("/ledger");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not open the ledger.");
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-ink",
						children: "Privacy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: "How a page on Kumkum is kept, and who can read it."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-ink",
						children: "What is stored"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: "An account holds an email and a session. A page holds the name, gender, age, city, state, caste, rashi, nakshatra, and any jataka, education, work, or note you choose to write. The portrait is a study you pick. Kumkum does not ask for a street address."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-ink",
						children: "Who can see it"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: "Signed-in households can read the register. They see your name, locality, nakshatra, and caste on a card, and the rest of the page when they open it. The photograph is veiled. You can see your own photograph. A circle membership is the intended way to ask for everyone else's. Billing is not open in this preview."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
					open,
					onOpenChange: setOpen,
					className: "border-t border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
						className: "flex h-14 w-full items-center justify-between text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-3xl text-ink",
							children: "Records retention"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 text-stone transition-transform duration-200", open && "rotate-180") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleContent, {
						className: "flex flex-col gap-4 pb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-stone",
								children: "A page stays on the register until you change it or the account is removed. Circle requests are kept as a note that someone asked. They do not unveil a photograph by themselves."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-stone",
								children: "Session records expire on their own. Writing to the household is the way to ask for a page to be taken down. Sample pages shipped with the register are not personal accounts."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: onLedger,
								className: "mt-2 flex flex-col gap-4 border-t border-line pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl text-ink",
											children: "Ledger access"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-mist",
											children: "For the household that keeps the books."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											id: "ledger-username",
											autoComplete: "username",
											value: username,
											onChange: (event) => setUsername(event.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Passphrase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											id: "ledger-password",
											type: "password",
											autoComplete: "current-password",
											value: password,
											onChange: (event) => setPassword(event.target.value)
										})
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-danger",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										variant: "quiet",
										disabled: pending,
										children: pending ? "Opening…" : "Open"
									})
								]
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { PrivacyPage as component };
