import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { A as Icon, k as init_dist, n as init_ThemeBridge, t as ThemeBridgeContext, va as SvgPlaceholder, zi as init_esm } from "./iframe-CKDG0E56.js";
//#region .storybook/addons/theme-bridge/StrataKitIcon.tsx
function StrataKitIcon(props) {
	if (!(import_react.useContext(ThemeBridgeContext) === "useStrataKit")) return props.iconNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.iconNode }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { href: props.href });
}
var import_react, import_jsx_runtime;
var init_StrataKitIcon = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_dist();
	init_ThemeBridge();
	import_jsx_runtime = require_jsx_runtime();
	StrataKitIcon.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "StrataKitIcon",
		"props": {
			"href": {
				"required": true,
				"tsType": { "name": "string" },
				"description": ""
			},
			"iconNode": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": ""
			}
		}
	};
}));
//#endregion
export { init_StrataKitIcon as n, StrataKitIcon as t };
