import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, qt as require_classnames, tt as Input$1 } from "./iframe-DrBiZGmV.js";
import { Vr as init_esm$1, gs as Svg2D } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/core-react/src/core-react/inputs/iconinput/IconInput.scss
var init_IconInput$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/utils/hooks/useRefs.tsx
/** Callback ref type guard. */
function isRefCallback(ref) {
	return typeof ref === "function";
}
/** Hook used to combine multiple refs.
* @internal
*/
function useRefs(...refs) {
	return import_react$2.useCallback((instance) => {
		for (const ref of refs) if (ref) if (isRefCallback(ref)) ref(instance);
		else ref.current = instance;
	}, [...refs]);
}
var import_react$2;
var init_useRefs = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/Input.tsx
var import_classnames$1, import_react$1, import_jsx_runtime$2, ForwardRefInput, Input;
var init_Input = __esmMin((() => {
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_useRefs();
	import_jsx_runtime$2 = require_jsx_runtime();
	ForwardRefInput = import_react$1.forwardRef(function ForwardRefInput(props, ref) {
		const { className, style, setFocus, nativeKeyHandler, size, ...otherProps } = props;
		const inputElementRef = import_react$1.useRef(null);
		const refs = useRefs(inputElementRef, ref);
		import_react$1.useEffect(() => {
			const currentElement = inputElementRef.current;
			const currentHandler = nativeKeyHandler;
			if (currentElement && currentHandler) currentElement.addEventListener("keydown", currentHandler);
			return () => {
				if (currentHandler && currentElement) currentElement.removeEventListener("keydown", currentHandler);
			};
		}, [nativeKeyHandler]);
		import_react$1.useEffect(() => {
			if (inputElementRef.current && setFocus) inputElementRef.current.focus();
		}, [setFocus]);
		const handleFocus = import_react$1.useCallback((event) => {
			event.currentTarget.select();
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Input$1, {
			ref: refs,
			type: "text",
			...otherProps,
			onFocus: handleFocus,
			className: (0, import_classnames$1.default)("uicore-inputs-input", className),
			style
		});
	});
	Input = ForwardRefInput;
	ForwardRefInput.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "ForwardRefInput",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			},
			"setFocus": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether to set focus to the input element"
			},
			"nativeKeyHandler": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: KeyboardEvent) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "KeyboardEvent" },
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Native keydown event handler"
			},
			"ref": {
				"required": false,
				"tsType": {
					"name": "ReactRef",
					"raw": "React.Ref<HTMLInputElement>",
					"elements": [{ "name": "HTMLInputElement" }]
				},
				"description": "Provides ability to return reference to HTMLInputElement"
			}
		}
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/iconinput/IconInput.tsx
var import_classnames, import_react, import_jsx_runtime$1, ForwardRefIconInput, IconInput;
var init_IconInput = __esmMin((() => {
	init_IconInput$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Input();
	import_jsx_runtime$1 = require_jsx_runtime();
	ForwardRefIconInput = import_react.forwardRef(function ForwardRefIconInput(props, ref) {
		const { className, icon, containerClassName, size, ...otherProps } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: (0, import_classnames.default)("core-iconInput-container", containerClassName),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
				ref,
				className: (0, import_classnames.default)("core-input", className),
				...otherProps
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "core-iconInput-icon",
				children: icon
			})]
		});
	});
	IconInput = ForwardRefIconInput;
	ForwardRefIconInput.__docgenInfo = {
		"description": "Input component with icon to the left of the input field\n@public",
		"methods": [],
		"displayName": "ForwardRefIconInput",
		"props": {
			"icon": {
				"required": true,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": "Icon displayed to the left of the Input field within the IconInput component"
			},
			"containerClassName": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "CSS class name for the IconInput component container div"
			},
			"ref": {
				"required": false,
				"tsType": {
					"name": "ReactRef",
					"raw": "React.Ref<HTMLInputElement>",
					"elements": [{ "name": "HTMLInputElement" }]
				},
				"description": "Provides ability to return reference to HTMLInputElement"
			},
			"size": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "\"small\" | \"large\"",
					"elements": [{
						"name": "literal",
						"value": "\"small\""
					}, {
						"name": "literal",
						"value": "\"large\""
					}]
				},
				"description": "Modify size of the input."
			}
		},
		"composes": ["Omit"]
	};
}));
//#endregion
//#region src/deprecated/IconInput.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_IconInput();
	init_esm$1();
	init_Decorators();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/IconInput",
		component: IconInput,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}) } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    icon: <Svg2D />\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
