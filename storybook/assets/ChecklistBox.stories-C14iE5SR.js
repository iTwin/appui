import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { dt as Checkbox, i as init_esm, qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/core-react/src/core-react/checklistbox/CheckListBox.scss
var init_CheckListBox$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/checklistbox/CheckListBox.tsx
/** Separator added to a [[CheckListBox]].
* @public
* @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.
*/
function CheckListBoxSeparator() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "core-chk-listbox-separator" });
}
var import_classnames, import_react, import_jsx_runtime$1, CheckListBoxItem, CheckListBox;
var init_CheckListBox = __esmMin((() => {
	init_CheckListBox$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	import_jsx_runtime$1 = require_jsx_runtime();
	CheckListBoxItem = class extends import_react.PureComponent {
		render() {
			const className = (0, import_classnames.default)("core-chk-listboxitem-checkbox", this.props.className);
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Checkbox, {
				checked: this.props.checked,
				disabled: this.props.disabled,
				label: this.props.label,
				onClick: this.props.onClick,
				onChange: this.props.onChange,
				"data-testid": "core-chk-listboxitem-checkbox",
				wrapperProps: {
					className,
					style: this.props.style
				}
			}) });
		}
	};
	CheckListBox = class extends import_react.PureComponent {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
				className: (0, import_classnames.default)("core-chk-listbox", this.props.className),
				style: this.props.style,
				children: this.props.children
			});
		}
	};
	CheckListBoxItem.__docgenInfo = {
		"description": "Item with a checkbox added to a [[CheckListBox]].\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.",
		"methods": [],
		"displayName": "CheckListBoxItem",
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
			"label": {
				"required": true,
				"tsType": { "name": "string" },
				"description": "Label"
			},
			"checked": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether the item is checked or not"
			},
			"disabled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether the item is disabled or not"
			},
			"onClick": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => any",
					"signature": {
						"arguments": [],
						"return": { "name": "any" }
					}
				},
				"description": "Function called when item is clicked."
			},
			"onChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.ChangeEvent<HTMLInputElement>) => any",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactChangeEvent",
								"raw": "React.ChangeEvent<HTMLInputElement>",
								"elements": [{ "name": "HTMLInputElement" }]
							},
							"name": "e"
						}],
						"return": { "name": "any" }
					}
				},
				"description": "Function called when item is changed."
			}
		}
	};
	CheckListBoxSeparator.__docgenInfo = {
		"description": "Separator added to a [[CheckListBox]].\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.",
		"methods": [],
		"displayName": "CheckListBoxSeparator"
	};
	CheckListBox.__docgenInfo = {
		"description": "React component showing a list of Checkbox items.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.",
		"methods": [],
		"displayName": "CheckListBox",
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
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": "Content"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/ChecklistBox.stories.tsx
var import_jsx_runtime, meta, Basic, Checked, Separator, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_CheckListBox();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/CheckListBox",
		component: CheckListBox,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 1" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 2" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 3" })
	] }) } };
	Checked = { args: { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 1" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, {
			label: "Item 2",
			checked: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 3" })
	] }) } };
	Separator = { args: { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 1" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 2" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckListBoxItem, { label: "Item 3" })
	] }) } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    children: <>\n        <CheckListBoxItem label=\"Item 1\" />\n        <CheckListBoxItem label=\"Item 2\" />\n        <CheckListBoxItem label=\"Item 3\" />\n      </>\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	Checked.parameters = {
		...Checked.parameters,
		docs: {
			...Checked.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    children: <>\n        <CheckListBoxItem label=\"Item 1\" />\n        <CheckListBoxItem label=\"Item 2\" checked />\n        <CheckListBoxItem label=\"Item 3\" />\n      </>\n  }\n}",
				...Checked.parameters?.docs?.source
			}
		}
	};
	Separator.parameters = {
		...Separator.parameters,
		docs: {
			...Separator.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    children: <>\n        <CheckListBoxItem label=\"Item 1\" />\n        <CheckListBoxSeparator />\n        <CheckListBoxItem label=\"Item 2\" />\n        <CheckListBoxItem label=\"Item 3\" />\n      </>\n  }\n}",
				...Separator.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"Checked",
		"Separator"
	];
}))();
export { Basic, Checked, Separator, __namedExportsOrder, meta as default };
