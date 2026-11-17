import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { b as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as RASHIS, i as PORTRAIT_STUDIES, o as STATES, r as NAKSHATRAS, s as authMiddleware, t as CASTES } from "./constants-CEiF9P6h.mjs";
import { i as hasGateSessionMarker } from "./server-BqUDuCCT.mjs";
import { n as Lock } from "../_libs/lucide-react.mjs";
import { i as signOut, t as authClient } from "./client-IWHfIGH2.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-CoUdPSxA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clean(value, max) {
	return value.replace(/[\u0000-\u001F]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
function assertChoice(value, options, label) {
	if (!options.includes(value)) throw new Error(`Choose a ${label}.`);
}
function parseProfile(input) {
	const displayName = clean(input?.displayName ?? "", 60);
	const city = clean(input?.city ?? "", 40);
	const gender = input?.gender;
	const age = Number(input?.age);
	const state = input?.state ?? "";
	const caste = input?.caste ?? "";
	const rashi = input?.rashi ?? "";
	const nakshatra = input?.nakshatra ?? "";
	const photoKey = input?.photoKey ?? "";
	if (displayName.length < 2) throw new Error("Enter a name.");
	if (gender !== "woman" && gender !== "man") throw new Error("Choose woman or man.");
	if (!Number.isInteger(age) || age < 18 || age > 80) throw new Error("Age must be between 18 and 80.");
	if (city.length < 2) throw new Error("Enter a city.");
	assertChoice(state, STATES, "state");
	assertChoice(caste, CASTES, "caste");
	assertChoice(rashi, RASHIS, "rashi");
	assertChoice(nakshatra, NAKSHATRAS, "nakshatra");
	assertChoice(photoKey, PORTRAIT_STUDIES, "portrait");
	return {
		displayName,
		gender,
		age,
		city,
		state,
		caste,
		rashi,
		nakshatra,
		jataka: clean(input.jataka ?? "", 500),
		about: clean(input.about ?? "", 600),
		education: clean(input.education ?? "", 80),
		profession: clean(input.profession ?? "", 80),
		photoKey
	};
}
var warmRegistry = createServerFn({ method: "GET" }).handler(createSsrRpc("dda8aa3a58b5d2338b39f54335a08f908aecaf1b3129434e56e8020a1d2e4e5a"));
var enterLedger = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? "").slice(0, 80),
	password: String(input?.password ?? "").slice(0, 200)
})).handler(createSsrRpc("c2a1e11f30d22caee5ab0a3f201aae467b0fa288f607ef9aabd11d4184ed704a"));
var getViewer = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("81fb57051f88322d343e3add511a417ca39e6b0163f29ecd458dca9e9028f59e"));
var getFeed = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f0718dcd78da19d550ac3071106eca37478244191423215f659ea2622f0fdc15"));
var getProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	const next = String(id ?? "");
	if (!/^[A-Za-z0-9_-]{1,80}$/.test(next)) throw new Error("Unknown page.");
	return next;
}).handler(createSsrRpc("ac566a972d160a7499eaa78c2f73d71d1ae4cf360b101cca5e06c449dab9114d"));
var getMine = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8549887e268542662be2edcce123c87c09960aa88d85c599ca0be369f58ecd26"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => parseProfile(input)).handler(createSsrRpc("64b9c7cae7a33a7a151b3c8035cc31108808042ad64e5214fb8ca3909f997a87"));
var requestCircle = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("21d06261b73104c20d810e3a7dba5fa76b3e137d2aa9134f142c76876418939f"));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("73294c1244277f56a6afe7080bb178c4248da289cd32101e49d203b8145d6b02"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Shell({ children, width = "wide" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn("mx-auto w-full flex-1 px-4 py-8 sm:px-6", width === "narrow" ? "max-w-xl" : "max-w-6xl"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-8 text-sm text-mist sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg text-stone",
					children: "Kumkum"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "underline-offset-4 hover:text-ink hover:underline",
					children: "Privacy"
				})]
			})
		]
	});
}
function SiteHeader() {
	const { user, isPending } = useCurrentUserState();
	const [steward, setSteward] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		warmRegistry().catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let live = true;
		getViewer().then((viewer) => {
			if (live) setSteward(viewer.isSteward);
		}).catch(() => void 0);
		return () => {
			live = false;
		};
	}, [user?.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block size-2 bg-paper",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl leading-none",
						children: "Kumkum"
					})]
				}),
				user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/home",
							className: "hover:text-ink",
							children: "Register"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/me",
							className: "hover:text-ink",
							children: "Your page"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/circle",
							className: "hover:text-ink",
							children: "Circle"
						}),
						steward ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ledger",
							className: "hover:text-ink",
							children: "Ledger"
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto min-w-0",
					children: !isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-sm text-ink underline-offset-4 hover:underline",
						children: "Enter"
					})
				})
			]
		})
	});
}
function PanelSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-panel" });
}
function unauthorized(error) {
	if (!error || typeof error !== "object") return false;
	const message = "message" in error ? String(error.message) : "";
	return message === "Unauthorized" || message.includes("Unauthorized");
}
function pick(list, n) {
	return list[(n % list.length + list.length) % list.length];
}
function hash(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i += 1) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function mix(hex, toward, amount) {
	const parse = (value) => [
		Number.parseInt(value.slice(1, 3), 16),
		Number.parseInt(value.slice(3, 5), 16),
		Number.parseInt(value.slice(5, 7), 16)
	];
	const a = parse(hex);
	const b = parse(toward);
	const c = a.map((channel, i) => Math.round(channel + ((b[i] ?? channel) - channel) * amount));
	return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}
var SKINS = [
	"#c48a62",
	"#a56b45",
	"#8d5a3c",
	"#d1a27a",
	"#6e4432",
	"#b07d55"
];
var CLOTHS = [
	"#3e2a24",
	"#243038",
	"#3a3328",
	"#4a2c2c",
	"#2c3330",
	"#1f2a33",
	"#4a3a32",
	"#34302c"
];
var GROUNDS = [
	"#1a1412",
	"#14181a",
	"#1c1614",
	"#121410",
	"#181410",
	"#151311"
];
var HAIRS = [
	"#1a120e",
	"#24180f",
	"#120e0c",
	"#2a2118"
];
function Portrait({ seed, label }) {
	const h = hash(seed || "kumkum");
	const skin = pick(SKINS, h);
	const cloth = pick(CLOTHS, h >>> 3);
	const ground = pick(GROUNDS, h >>> 6);
	const hair = pick(HAIRS, h >>> 9);
	const style = h % 6;
	const id = `p${h.toString(36)}`;
	const cx = 150 + (h % 7 - 3);
	const highlight = mix(skin, "#f3efe8", .28);
	const shadow = mix(skin, "#100e0c", .28);
	const clothDeep = mix(cloth, "#100e0c", .35);
	const lip = mix(skin, "#6e2e2a", .35);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 300 400",
		className: "h-full w-full",
		role: label ? "img" : "presentation",
		"aria-label": label || void 0,
		"aria-hidden": label ? void 0 : true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: `${id}-face`,
					cx: "45%",
					cy: "38%",
					r: "68%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: highlight
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "62%",
							stopColor: skin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: shadow
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-cloth`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: cloth
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: clothDeep
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: `${id}-light`,
					cx: "50%",
					cy: "32%",
					r: "55%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#f3efe8",
						stopOpacity: "0.16"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#f3efe8",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
					id: `${id}-bangs`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y: "78",
						width: "144",
						height: style % 2 === 0 ? 46 : 28
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "300",
				height: "400",
				fill: ground
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "150",
				cy: "150",
				rx: "130",
				ry: "150",
				fill: `url(#${id}-light)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M36 400 Q48 286 150 274 Q252 286 264 400 Z",
				fill: `url(#${id}-cloth)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: cx - 16,
				y: "214",
				width: "32",
				height: "48",
				rx: "12",
				fill: shadow
			}),
			style !== 2 && style !== 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: "210",
				rx: style === 0 ? 78 : 70,
				ry: style === 0 ? 92 : 64,
				fill: hair
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: cx - 58,
				cy: "176",
				rx: "10",
				ry: "14",
				fill: shadow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: cx + 58,
				cy: "176",
				rx: "10",
				ry: "14",
				fill: shadow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: "168",
				rx: "58",
				ry: "72",
				fill: `url(#${id}-face)`
			}),
			style === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: cx + 24,
				cy: "92",
				r: "18",
				fill: hair
			}) : null,
			style === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: "108",
				rx: "54",
				ry: "28",
				fill: hair
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: style === 2 ? 112 : 124,
				rx: "60",
				ry: "42",
				fill: hair,
				clipPath: `url(#${id}-bangs)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: cx - 20,
				cy: "162",
				rx: "9",
				ry: "4",
				fill: shadow,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: cx + 20,
				cy: "162",
				rx: "9",
				ry: "4",
				fill: shadow,
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${cx} 168 L${cx - 4} 186 L${cx + 4} 186`,
				fill: "none",
				stroke: shadow,
				strokeWidth: "1.4",
				strokeLinejoin: "round",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: "200",
				rx: "11",
				ry: "4.5",
				fill: lip
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${cx - 34} 292 Q${cx} 276 ${cx + 34} 292`,
				fill: "none",
				stroke: clothDeep,
				strokeWidth: "8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "16",
				width: "268",
				height: "368",
				fill: "none",
				stroke: "#e7e1d6",
				strokeOpacity: "0.28"
			})
		]
	});
}
var buttonVariants = cva("inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[opacity,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper", {
	variants: { variant: {
		primary: "bg-paper text-ink-deep hover:opacity-90",
		quiet: "border border-line bg-transparent text-ink hover:bg-panel",
		ghost: "bg-transparent text-stone hover:text-ink"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
var controlClass = "h-11 w-full min-w-0 rounded-md border border-line bg-canvas px-3 text-base text-ink outline-none placeholder:text-mist focus-visible:border-paper";
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn(controlClass, props.className)
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn(controlClass, "h-auto min-h-28 py-3 leading-normal", props.className)
	});
}
function SelectInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn(controlClass, props.className)
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-2 text-sm text-stone",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), children]
	});
}
function PhotoFrame({ seed, name, revealed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[4/5] overflow-hidden bg-panel-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: revealed ? "h-full w-full" : "photo-veil h-full w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
				seed,
				label: revealed ? `Photograph of ${name}` : "Veiled photograph"
			})
		}), !revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "photo-scrim pointer-events-none absolute inset-0 flex items-end justify-center pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 text-xs text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					className: "size-3.5",
					"aria-hidden": true
				}), "Photograph veiled"]
			})
		}) : null]
	});
}
function ProfileCard({ profile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/people/$id",
		params: { id: profile.id },
		className: "flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-200 hover:border-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoFrame, {
			seed: profile.photoKey,
			name: profile.displayName,
			revealed: profile.revealed
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl leading-none text-ink",
					children: profile.displayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-stone",
					children: [
						profile.city,
						", ",
						profile.state
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-mist",
							children: "Nakshatra"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-ink",
							children: profile.nakshatra
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-mist",
							children: "Caste"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-ink",
							children: profile.caste
						})
					]
				})
			]
		})]
	});
}
function FactList({ profile, full }) {
	const rows = [
		["Locality", `${profile.city}, ${profile.state}`],
		["Nakshatra", profile.nakshatra],
		["Caste", profile.caste]
	];
	if (full) rows.push(["Rashi", profile.rashi], ["Age", String(profile.age)], ["Education", profile.education], ["Work", profile.profession]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "flex flex-col gap-2 text-sm",
		children: rows.map(([label, value]) => value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-mist",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "text-right text-ink",
				children: value
			})]
		}, label) : null)
	});
}
//#endregion
export { unauthorized as C, saveProfile as S, getLedger as _, PhotoFrame as a, getViewer as b, RedirectToSignIn as c, TextArea as d, TextInput as f, getFeed as g, enterLedger as h, PanelSkeleton as i, SelectInput as l, cn as m, FactList as n, Portrait as o, buttonVariants as p, Field as r, ProfileCard as s, Button as t, Shell as u, getMine as v, useCurrentUserState as w, requestCircle as x, getProfile as y };
