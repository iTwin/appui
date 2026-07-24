import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/core-react/src/core-react/button/UnderlinedButton.scss
var init_UnderlinedButton$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/button/UnderlinedButton.tsx
/** A React component that makes text clickable and underlined
* @public
* @deprecated in 4.13.0. Use {@link https://itwinui.bentley.com/docs/anchor iTwinUI anchor} or {@link https://itwinui.bentley.com/docs/button button} instead.
*/
function UnderlinedButton(props) {
	const handleKeyUp = import_react.useCallback((event) => {
		switch (event.key) {
			case import_Key_enum.Key.Enter.valueOf():
			case " ":
				props.onActivate && props.onActivate();
				break;
		}
	}, [props]);
	const handleClick = import_react.useCallback((e) => {
		props.onClick && props.onClick(e);
		props.onActivate && props.onActivate();
	}, [props]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: (0, import_classnames.default)("core-underlined-button", props.className ? props.className : void 0),
		title: props.title,
		onClick: handleClick,
		onKeyUp: handleKeyUp,
		tabIndex: 0,
		role: "link",
		children: props.children
	});
}
var import_classnames, import_react, import_Key_enum, import_jsx_runtime;
var init_UnderlinedButton = __esmMin((() => {
	init_UnderlinedButton$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_Key_enum = require_Key_enum();
	import_jsx_runtime = require_jsx_runtime();
	UnderlinedButton.__docgenInfo = {
		"description": "A React component that makes text clickable and underlined\n@public\n@deprecated in 4.13.0. Use {@link https://itwinui.bentley.com/docs/anchor iTwinUI anchor} or {@link https://itwinui.bentley.com/docs/button button} instead.",
		"methods": [],
		"displayName": "UnderlinedButton",
		"props": {
			"children": {
				"required": true,
				"tsType": {
					"name": "union",
					"raw": "string | React.ReactNode",
					"elements": [{ "name": "string" }, {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					}]
				},
				"description": "String that will be rendered by the button"
			},
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Additional className"
			},
			"title": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Title of the button"
			},
			"onClick": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.MouseEvent) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactMouseEvent",
								"raw": "React.MouseEvent"
							},
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback to onClick event"
			},
			"onActivate": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => void",
					"signature": {
						"arguments": [],
						"return": { "name": "void" }
					}
				},
				"description": "Callback to activate"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/UnderlinedButton.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_UnderlinedButton();
	meta = {
		title: "Deprecated/UnderlinedButton",
		component: UnderlinedButton,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: { children: "Underlined Button" }
	};
	Basic = {};
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
