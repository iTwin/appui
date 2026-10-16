import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Rr as init_esm, Yi as SvgPlaceholder } from "./components-react-Bzk1Y7nP.js";
import { A as Icon, j as init_Icon, n as ThemeBridgeContext, r as init_ThemeBridge } from "./iframe-BhLx2-Dc.js";
//#region .storybook/addons/theme-bridge/StrataKitIcon.tsx
function StrataKitIcon(props) {
	if (!(import_react.useContext(ThemeBridgeContext) === "useStrataKit")) return props.iconNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.iconNode }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { href: props.href });
}
var import_react, import_jsx_runtime;
function init_StrataKitIcon() {
	return (init_StrataKitIcon = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_esm();
		init_Icon();
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
	})))();
}
//#endregion
export { init_StrataKitIcon as n, StrataKitIcon as t };
