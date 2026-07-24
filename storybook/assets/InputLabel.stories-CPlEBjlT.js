import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, qt as require_classnames, tt as Input } from "./iframe-DrBiZGmV.js";
import { Vr as init_esm$1, bn as init_core_react, ci as SvgStatusWarning, fi as SvgStatusError, ir as InputStatus$1, ui as SvgStatusSuccess } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_IconComponent, t as Icon } from "./IconComponent-C_9BlyPG.js";
//#region ../../ui/core-react/src/core-react/inputs/InputStatus.ts
var InputStatus;
var init_InputStatus = __esmMin((() => {
	InputStatus = /* @__PURE__ */ function(InputStatus) {
		InputStatus["Success"] = "success";
		InputStatus["Warning"] = "warning";
		InputStatus["Error"] = "error";
		return InputStatus;
	}({});
}));
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/InputLabel.tsx
var import_classnames, import_react, import_jsx_runtime$1, inputLabelIconSpec, InputLabel;
var init_InputLabel = __esmMin((() => {
	init_esm$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_IconComponent();
	init_InputStatus();
	import_jsx_runtime$1 = require_jsx_runtime();
	inputLabelIconSpec = {
		[InputStatus.Error]: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgStatusError, {}),
		[InputStatus.Success]: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgStatusSuccess, {}),
		[InputStatus.Warning]: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgStatusWarning, {})
	};
	InputLabel = class extends import_react.PureComponent {
		render() {
			const { label, status, className, style, labelClassName, labelStyle, message, messageClassName, messageStyle } = this.props;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
				style,
				className: (0, import_classnames.default)("uicore-inputs-labeled-input", this.props.disabled && "uicore-disabled", status, className),
				children: [
					label && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: (0, import_classnames.default)("uicore-label", labelClassName),
						style: labelStyle,
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: (0, import_classnames.default)("input", { "with-icon": !!status }),
						children: [this.props.children, status && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, {
							className: "icon",
							iconSpec: inputLabelIconSpec[`{status}`]
						})]
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: (0, import_classnames.default)("uicore-message", messageClassName),
						style: messageStyle,
						children: message
					})
				]
			});
		}
	};
	InputLabel.__docgenInfo = {
		"description": "Text input wrapper that provides additional styling and labeling\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/input iTwinUI input} instead.",
		"methods": [],
		"displayName": "InputLabel",
		"props": {
			"label": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Text that will be shown next to or above the input."
			},
			"status": {
				"required": false,
				"tsType": { "name": "InputStatus" },
				"description": "Input status like: \"Success\", \"Warning\" or \"Error\""
			},
			"inputClassName": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name for the checkbox input element"
			},
			"inputStyle": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS Style for the checkbox input element"
			},
			"labelClassName": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name for the label"
			},
			"labelStyle": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS Style for the label"
			},
			"message": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional text shown below the input."
			},
			"messageClassName": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name for the message"
			},
			"messageStyle": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS Style for the message"
			},
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
			"disabled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": "Labeled content"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/InputLabel.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_InputLabel();
	init_esm();
	init_Decorators();
	init_core_react();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/InputLabel",
		component: InputLabel,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: {
		label: "Label",
		status: InputStatus$1.Success,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {})
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    label: \"Label\",\n    status: InputStatus.Success,\n    children: <Input />\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
