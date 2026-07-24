import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, yt as ProgressRadial } from "./iframe-DrBiZGmV.js";
//#region ../../ui/core-react/src/core-react/loading/LoadingSpinner.scss
var init_LoadingSpinner$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/loading/LoadingSpinner.tsx
var import_react, import_jsx_runtime, LoadingSpinner;
var init_LoadingSpinner = __esmMin((() => {
	init_LoadingSpinner$1();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	LoadingSpinner = class extends import_react.PureComponent {
		static defaultProps = { messageOnTop: false };
		render() {
			const { message, messageOnTop, size, ...rest } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "core-ls",
				children: [
					message && messageOnTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ls-message-top",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRadial, {
						size,
						...rest,
						indeterminate: true
					}),
					message && !messageOnTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ls-message-bottom",
						children: message
					})
				]
			});
		}
	};
	LoadingSpinner.__docgenInfo = {
		"description": "A loading spinner component that optionally shows a text message.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-radial iTwinUI progress indicator} instead.",
		"methods": [],
		"displayName": "LoadingSpinner",
		"props": {
			"message": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Message (text) displayed"
			},
			"messageOnTop": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Position the message above or below the spinner (defaults to bottom)",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"size": {
				"required": false,
				"tsType": {
					"name": "ReactComponentPropsWithoutRef[\"size\"]",
					"raw": "ProgressRadialProps[\"size\"]"
				},
				"description": "Size of the progress indicator. Defaults to medium size.\n@default ''"
			}
		},
		"composes": ["Omit"]
	};
}));
//#endregion
export { init_LoadingSpinner as n, LoadingSpinner as t };
