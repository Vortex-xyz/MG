import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collapsible+[...].mjs";
import { a as RASHIS, c as genderLabel, i as PORTRAIT_STUDIES, n as GENDERS, o as STATES, r as NAKSHATRAS, t as CASTES } from "./constants-CEiF9P6h.mjs";
import { S as saveProfile, d as TextArea, f as TextInput, l as SelectInput, m as cn, o as Portrait, r as Field, t as Button } from "./ui-CoUdPSxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-form-BhAvhd9F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileForm({ initial, submitLabel, onDone }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	function set(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			await saveProfile({ data: form });
			onDone();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not save the page.");
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "flex flex-col gap-5 rounded-xl border border-line bg-panel p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					id: "display-name",
					value: form.displayName,
					onChange: (event) => set("displayName", event.target.value),
					autoComplete: "name",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm text-stone",
					children: "Gender"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3",
					children: GENDERS.map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("flex h-11 items-center justify-center rounded-md border text-sm", form.gender === gender ? "border-paper bg-paper text-ink-deep" : "border-line text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "gender",
							className: "sr-only",
							value: gender,
							checked: form.gender === gender,
							onChange: () => set("gender", gender)
						}), genderLabel(gender)]
					}, gender))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Age",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					id: "age",
					inputMode: "numeric",
					value: form.age || "",
					onChange: (event) => set("age", Number(event.target.value.replace(/\D/g, "").slice(0, 2))),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "City",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "city",
						value: form.city,
						onChange: (event) => set("city", event.target.value),
						placeholder: "Bengaluru",
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "State",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
						id: "state",
						value: form.state,
						onChange: (event) => set("state", event.target.value),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select"
						}), STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: state,
							children: state
						}, state))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Caste",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
					id: "caste",
					value: form.caste,
					onChange: (event) => set("caste", event.target.value),
					required: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select"
					}), CASTES.map((caste) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: caste,
						children: caste
					}, caste))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Rashi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
						id: "rashi",
						value: form.rashi,
						onChange: (event) => set("rashi", event.target.value),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select"
						}), RASHIS.map((rashi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: rashi,
							children: rashi
						}, rashi))]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nakshatra",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
						id: "nakshatra",
						value: form.nakshatra,
						onChange: (event) => set("nakshatra", event.target.value),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select"
						}), NAKSHATRAS.map((nakshatra) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: nakshatra,
							children: nakshatra
						}, nakshatra))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Jataka (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "jataka",
					value: form.jataka,
					onChange: (event) => set("jataka", event.target.value),
					placeholder: "Birth time and place, if you want it on the page."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Education (optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: form.education,
						onChange: (event) => set("education", event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Work (optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: form.profession,
						onChange: (event) => set("profession", event.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "A few lines (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: form.about,
					onChange: (event) => set("about", event.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm text-stone",
						children: "Photograph"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Choose a study. You can see it. Everyone else sees it veiled until a circle membership."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-3",
						children: PORTRAIT_STUDIES.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": form.photoKey === key,
							"aria-label": `Portrait ${key}`,
							onClick: () => set("photoKey", key),
							className: cn("overflow-hidden rounded-md border", form.photoKey === key ? "border-paper" : "border-line"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[3/4]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									seed: key,
									label: ""
								})
							})
						}, key))
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: pending,
				children: pending ? "Saving…" : submitLabel
			})
		]
	});
}
//#endregion
export { ProfileForm as t };
