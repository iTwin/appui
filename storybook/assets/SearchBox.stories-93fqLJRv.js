import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, qt as require_classnames, tt as Input } from "./iframe-DrBiZGmV.js";
import { t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { Si as SvgSearch, Vr as init_esm$1, mo as SvgClose } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_IconComponent, t as Icon } from "./IconComponent-C_9BlyPG.js";
import { n as useTranslation, t as init_useTranslation } from "./useTranslation-XlH0aG5I.js";
//#region ../../ui/core-react/src/core-react/searchbox/SearchBox.scss
var init_SearchBox$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/searchbox/SearchBox.tsx
function SearchBoxButton({ emptyString, ...props }) {
	const { translate } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		title: translate(emptyString ? "general.search" : "general.clear"),
		...props
	});
}
var import_classnames, import_react, import_Key_enum, import_jsx_runtime, SearchBox, SearchBoxInput;
var init_SearchBox = __esmMin((() => {
	init_SearchBox$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_Key_enum = require_Key_enum();
	init_esm();
	init_IconComponent();
	init_esm$1();
	init_useTranslation();
	import_jsx_runtime = require_jsx_runtime();
	SearchBox = class extends import_react.Component {
		_inputElement = null;
		_timeoutId = 0;
		state = { value: this.props.initialValue || "" };
		constructor(props) {
			super(props);
		}
		render() {
			const searchClassName = (0, import_classnames.default)("core-searchbox", this.props.className);
			const emptyString = this.state.value === "";
			const iconClassName = (0, import_classnames.default)("core-searchbox-icon", "icon");
			const iconSpec = emptyString ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSearch, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgClose, {});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: searchClassName,
				style: this.props.style,
				"data-testid": "core-searchbox-instance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBoxInput, {
					defaultValue: this.props.initialValue,
					ref: (el) => {
						this._inputElement = el;
					},
					onChange: this._trackChange,
					onKeyDown: this._handleKeyDown,
					onPaste: this._trackChange,
					onCut: this._trackChange,
					placeholder: this.props.placeholder,
					role: "searchbox",
					"data-testid": "core-searchbox-input"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBoxButton, {
					className: "core-searchbox-button",
					onClick: this._handleIconClick,
					role: "button",
					tabIndex: -1,
					emptyString,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: iconClassName,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { iconSpec })
					})
				})]
			});
		}
		/** Wrapper for onValueChanged to make sure we don't call search unless the new value is different from the previous value */
		_onValueChanged = (value, previousValue) => {
			if (value === previousValue) return;
			this.setState((_prevState) => {
				return { value };
			}, () => {
				this.props.onValueChanged(this.state.value);
			});
		};
		_trackChange = (_event) => {
			let value = "";
			const previousValue = this.state.value;
			if (this._inputElement) value = this._inputElement.value;
			if (this.props.valueChangedDelay) {
				this._unsetTimeout();
				this._timeoutId = window.setTimeout(() => {
					this._onValueChanged(value, previousValue);
				}, this.props.valueChangedDelay);
			} else this._onValueChanged(value, previousValue);
		};
		_handleKeyDown = (e) => {
			switch (e.key) {
				case import_Key_enum.Key.Escape.valueOf():
					if (this.props.onEscPressed) this.props.onEscPressed();
					break;
				case import_Key_enum.Key.Enter.valueOf():
					if (this.props.onEnterPressed) this.props.onEnterPressed();
					break;
			}
		};
		_handleIconClick = (_event) => {
			if (this._inputElement) {
				const clear = this.state.value !== "";
				this._inputElement.value = "";
				if (clear && this.props.onClear) this.props.onClear();
				this._inputElement.focus();
			}
			this._trackChange();
		};
		_unsetTimeout = () => {
			if (this._timeoutId) {
				window.clearTimeout(this._timeoutId);
				this._timeoutId = 0;
			}
		};
		componentWillUnmount() {
			this._unsetTimeout();
		}
		focus() {
			if (this._inputElement) this._inputElement.focus();
		}
	};
	SearchBoxInput = import_react.forwardRef(function SearchBoxInput({ placeholder, ...props }, ref) {
		const { translate } = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref,
			placeholder: placeholder || translate("general.search"),
			...props
		});
	});
	SearchBox.__docgenInfo = {
		"description": "Input box for entering text to search for.\nThe SearchBox has an icon right-justified and bounded by the box and shows a Search or Clear icon.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/searchbox iTwinUI SearchBox} instead.",
		"methods": [{
			"name": "focus",
			"docblock": null,
			"modifiers": [],
			"params": [],
			"returns": null
		}],
		"displayName": "SearchBox",
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
			"initialValue": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Value to set SearchBox to initially"
			},
			"placeholder": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Placeholder value to show in gray before anything is entered in"
			},
			"onValueChanged": {
				"required": true,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(value: string) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "value"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Triggered when the content of SearchBox is changed"
			},
			"valueChangedDelay": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Frequency to poll for changes in value, in milliseconds"
			},
			"onEnterPressed": {
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
				"description": "Listens for <Enter> keypress"
			},
			"onEscPressed": {
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
				"description": "Listens for <Esc> keypress"
			},
			"onClear": {
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
				"description": "Listens for onClick event for Clear (x) icon"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/SearchBox.stories.tsx
var action, meta, Basic, WithDelay, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_SearchBox();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Deprecated/SearchBox",
		component: SearchBox,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: {
			onValueChanged: action("onValueChanged"),
			onClear: action("onClear"),
			onEnterPressed: action("onEnterPressed"),
			onEscPressed: action("onEscPressed")
		}
	};
	Basic = {};
	WithDelay = { args: {
		...meta.args,
		valueChangedDelay: 1e3
	} };
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
	WithDelay.parameters = {
		...WithDelay.parameters,
		docs: {
			...WithDelay.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...meta.args,\n    valueChangedDelay: 1000\n  }\n}",
				...WithDelay.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic", "WithDelay"];
}))();
export { Basic, WithDelay, __namedExportsOrder, meta as default };
