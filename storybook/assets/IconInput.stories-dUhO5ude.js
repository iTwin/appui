import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { jt as require_classnames } from "./SvgCloseSmall-D4ZjyCAN.js";
import { Mr as init_esm, Uc as Input$1, Wc as init_Input$1, ys as Svg2D } from "./components-react-CHXB-2a9.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
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
		for (const ref of refs) if (ref) {
			if (isRefCallback(ref)) ref(instance);
			else ref.current = instance;
		}
	}, [...refs]);
}
var import_react$2;
function init_useRefs() {
	return (init_useRefs = __esmMin((() => {
		import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	})))();
}
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/Input.tsx
var import_classnames$1, import_react$1, import_jsx_runtime$2, ForwardRefInput, Input;
function init_Input() {
	return (init_Input = __esmMin((() => {
		import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Input$1();
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
	})))();
}
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/iconinput/IconInput.tsx
var import_classnames, import_react, import_jsx_runtime$1, ForwardRefIconInput, IconInput;
function init_IconInput$1() {
	return (init_IconInput$1 = __esmMin((() => {
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
	})))();
}
//#endregion
//#region src/deprecated/IconInput.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
function init_IconInput_stories() {
	return (init_IconInput_stories = __esmMin((() => {
		init_IconInput$1();
		init_esm();
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
	})))();
}
//#endregion
init_IconInput_stories();
export { Basic, __namedExportsOrder, meta as default };
