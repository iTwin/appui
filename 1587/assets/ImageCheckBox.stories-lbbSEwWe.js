import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ai as require_classnames } from "./Key.enum-C3db3aye.js";
import { D as _2d_default, E as init__3d, O as init__2d, T as _3d_default, bo as Svg2D, vo as Svg3D, zi as init_esm } from "./iframe-CKDG0E56.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-B-VEjdoW.js";
import { n as init_StrataKitIcon, t as StrataKitIcon } from "./StrataKitIcon-DheVcvK5.js";
import { n as init_StrataKitIcon$1, t as StrataKitIcon$1 } from "./StrataKitIcon-DW9dwUUf.js";
//#region ../../ui/core-react/src/core-react/imagecheckbox/ImageCheckBox.scss
var init_ImageCheckBox$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/imagecheckbox/ImageCheckBox.tsx
var import_classnames, import_react, import_jsx_runtime$1, ImageCheckBox;
var init_ImageCheckBox = __esmMin((() => {
	init_ImageCheckBox$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_StrataKitIcon();
	import_jsx_runtime$1 = require_jsx_runtime();
	ImageCheckBox = class extends import_react.PureComponent {
		_onChange = (e) => {
			if (e && e.stopPropagation) e.stopPropagation();
			if (this.props.onClick) this.props.onClick(e.target.checked);
		};
		_onInputClick = (e) => {
			if (e && e.stopPropagation) e.stopPropagation();
		};
		_onLabelClick = (e) => {
			if (e && e.stopPropagation) e.stopPropagation();
		};
		render() {
			const checkBoxClass = (0, import_classnames.default)("core-image-checkbox", this.props.className);
			const imageClass = (0, import_classnames.default)("image", this.props.border && "image-checkbox-border");
			const iconSpec = this.props.checked ? this.props.imageOn : this.props.imageOff;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
				className: checkBoxClass,
				style: this.props.style,
				onClick: this._onLabelClick,
				title: this.props.tooltip,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
					type: "checkbox",
					id: this.props.id,
					className: this.props.inputClassName,
					style: this.props.inputStyle,
					checked: this.props.checked,
					disabled: this.props.disabled,
					onChange: this._onChange,
					onClick: this._onInputClick,
					ref: this.props.inputRef
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: imageClass,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StrataKitIcon, { iconSpec })
				})]
			});
		}
	};
	ImageCheckBox.__docgenInfo = {
		"description": "ImageCheckBox React component shows a checked or unchecked image\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/checkbox iTwinUI checkbox} instead (custom icons are not supported at the moment, but feel free to submit your use cases).",
		"methods": [],
		"displayName": "ImageCheckBox",
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
			"imageOn": {
				"required": true,
				"tsType": {
					"name": "union",
					"raw": "string | React.ReactNode",
					"elements": [{ "name": "string" }, {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					}]
				},
				"description": "Image for the \"checked\" state"
			},
			"imageOff": {
				"required": true,
				"tsType": {
					"name": "union",
					"raw": "string | React.ReactNode",
					"elements": [{ "name": "string" }, {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					}]
				},
				"description": "Image for the \"unchecked\" (default) state"
			},
			"checked": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Determine if the item is checked or not"
			},
			"disabled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Determine if the item is disabled or not"
			},
			"onClick": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(checked: boolean) => any",
					"signature": {
						"arguments": [{
							"type": { "name": "boolean" },
							"name": "checked"
						}],
						"return": { "name": "any" }
					}
				},
				"description": "Function called when item is clicked."
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
			"tooltip": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Tooltip to be displayed when mouse is hovered over the checkbox"
			},
			"border": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "If true, draw a border around the image checkbox"
			},
			"inputRef": {
				"required": false,
				"tsType": {
					"name": "ReactRef",
					"raw": "React.Ref<HTMLInputElement>",
					"elements": [{ "name": "HTMLInputElement" }]
				},
				"description": "Provides ability to return reference to HTMLInputElement"
			},
			"id": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "HTML id attribute for the checkbox input element"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/ImageCheckBox.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_ImageCheckBox();
	init_esm();
	init_StrataKitIcon$1();
	init__2d();
	init__3d();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/ImageCheckBox",
		component: ImageCheckBox,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: {
			imageOn: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIcon$1, {
				href: _2d_default,
				iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {})
			}),
			imageOff: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIcon$1, {
				href: _3d_default,
				iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {})
			}),
			checked: false
		}
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
