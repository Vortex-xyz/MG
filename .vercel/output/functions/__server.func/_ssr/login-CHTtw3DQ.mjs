import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { b as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as GROK_PROVIDERS } from "./server-BqUDuCCT.mjs";
import { r as signIn } from "./client-IWHfIGH2.mjs";
import { f as TextInput, p as buttonVariants, r as Field, t as Button, u as Shell, w as useCurrentUserState } from "./ui-CoUdPSxA.mjs";
import { r as signInWithEmail, t as registerWithEmail } from "./credentials-BVXvZwEf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CHTtw3DQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("enter");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-panel" })
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/home" });
	async function onSubmit(event) {
		event.preventDefault();
		setError(null);
		if (!email.includes("@") || password.length < 8) {
			setError("Use a real email and a password of at least 8 characters.");
			return;
		}
		setPending(true);
		try {
			if (mode === "create") await registerWithEmail(email.trim(), password);
			else await signInWithEmail(email.trim(), password);
			window.location.assign(mode === "create" ? "/join" : "/home");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not enter.");
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		width: "narrow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-ink",
						children: mode === "create" ? "Create an account" : "Enter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: mode === "create" ? "After this, you write your page. It appears on the register for others." : "Sign in to open the register."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "flex flex-col gap-4 rounded-xl border border-line bg-panel p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								id: "email",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								id: "password",
								type: "password",
								autoComplete: mode === "create" ? "new-password" : "current-password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								required: true
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: pending,
							children: pending ? "Please wait…" : mode === "create" ? "Create account" : "Sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 text-sm text-stone underline-offset-4 hover:text-ink hover:underline",
							onClick: () => {
								setMode(mode === "create" ? "enter" : "create");
								setError(null);
							},
							children: mode === "create" ? "I already have an account" : "Create an account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: buttonVariants({ variant: "quiet" }),
						onClick: () => {
							signIn(provider.providerId, { callbackURL: "/home" }).catch((err) => {
								setError(err instanceof Error ? err.message : "Could not continue.");
							});
						},
						children: ["Continue with ", provider.label]
					}, provider.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-mist underline-offset-4 hover:text-ink hover:underline",
					children: "Back to the front"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
