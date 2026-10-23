import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { n as init_IconComponent, t as Icon } from "./IconComponent-XEho2TdN.js";
//#region ../../ui/core-react/src/core-react/StrataKitIcon.tsx
/** @internal */
function StrataKitIcon(props) {
	const StrataKitIconComponent = import_react.useContext(StrataKitIconContext);
	if (StrataKitIconComponent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIconComponent, { ...props });
	if (props.iconNode) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.iconNode });
	if (props.iconSpec) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { iconSpec: props.iconSpec });
}
var import_react, import_jsx_runtime, StrataKitIconContext;
function init_StrataKitIcon() {
	return (init_StrataKitIcon = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_IconComponent();
		import_jsx_runtime = require_jsx_runtime();
		StrataKitIconContext = import_react.createContext(void 0);
		StrataKitIcon.__docgenInfo = {
			"description": "@internal",
			"methods": [],
			"displayName": "StrataKitIcon",
			"props": {
				"href": {
					"required": false,
					"tsType": {
						"name": "signature",
						"type": "function",
						"raw": "(\n  importIcon: <M extends keyof StrataKitIconModules>(\n    path: M\n  ) => StrataKitIconModules[M]\n) => string | undefined",
						"signature": {
							"arguments": [{
								"type": {
									"name": "signature",
									"type": "function",
									"raw": "<M extends keyof StrataKitIconModules>(\n  path: M\n) => StrataKitIconModules[M]",
									"signature": {
										"arguments": [{
											"type": { "name": "M" },
											"name": "path"
										}],
										"return": {
											"name": "StrataKitIconModules[M]",
											"raw": "StrataKitIconModules[M]"
										}
									}
								},
								"name": "importIcon"
							}],
							"return": {
								"name": "union",
								"raw": "string | undefined",
								"elements": [{ "name": "string" }, { "name": "undefined" }]
							}
						}
					},
					"description": "Function to resolve the href for the StrataKit icon.\n`importIcon` argument is used to look up the StrataKit icon module exposed via `useStrataKit` subpath export."
				},
				"iconNode": {
					"required": false,
					"tsType": {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					},
					"description": ""
				},
				"iconSpec": {
					"required": false,
					"tsType": {
						"name": "union",
						"raw": "| string\n| ConditionalStringValue\n| React.ReactNode\n| ConditionalIconItem",
						"elements": [
							{ "name": "string" },
							{ "name": "ConditionalStringValue" },
							{
								"name": "ReactReactNode",
								"raw": "React.ReactNode"
							},
							{ "name": "ConditionalIconItem" }
						]
					},
					"description": ""
				},
				"size": {
					"required": false,
					"tsType": {
						"name": "union",
						"raw": "\"regular\" | \"large\"",
						"elements": [{
							"name": "literal",
							"value": "\"regular\""
						}, {
							"name": "literal",
							"value": "\"large\""
						}]
					},
					"description": ""
				}
			},
			"composes": ["Omit"]
		};
	})))();
}
//#endregion
export { init_StrataKitIcon as n, StrataKitIcon as t };
