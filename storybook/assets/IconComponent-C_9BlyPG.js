import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { S as ConditionalStringValue, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { Ds as purify, Es as init_purify_es } from "./components-react-DigDa1CF.js";
//#region ../../ui/core-react/src/core-react/icons/IconComponent.scss
var init_IconComponent$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/icons/ConditionalIconItem.tsx
var ConditionalIconItem;
var init_ConditionalIconItem = __esmMin((() => {
	ConditionalIconItem = class ConditionalIconItem {
		iconGetter;
		syncEventIds;
		_value;
		/** Constructor for ConditionalIconItem
		* @param iconGetter Function to retrieve the icon that matches the condition. Returns an IconSpec.
		* @param syncEventIds The array of event ids to be monitored. These events are triggered when the condition(s) that control the icon change.
		* @param value The default IconSpec. If this is not specified, the function is run to get the initial value.
		*/
		constructor(iconGetter, syncEventIds, value) {
			this.iconGetter = iconGetter;
			this.syncEventIds = syncEventIds;
			this._value = value;
		}
		/** The current IconSpec according to conditions */
		get value() {
			if (void 0 !== this._value) return this._value;
			this._value = this.iconGetter();
			return this._value;
		}
		/** Called to update the value by running the iconGetter */
		refresh() {
			const newValue = this.iconGetter();
			if (newValue !== this._value) {
				this._value = newValue;
				return true;
			}
			return false;
		}
		/** A helper function that updates the IconSpec value when the specified events are triggered */
		static refreshValue(conditionalValue, eventIds) {
			if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalIconItem)) return false;
			const iconItem = conditionalValue;
			if (iconItem.syncEventIds.some((value) => eventIds.has(value.toLowerCase()))) return iconItem.refresh();
			return false;
		}
		/** helper function to get the iconSpec from a ConditionIconItem as IconSpec | undefined*/
		static getValue(conditionalValue) {
			if (void 0 === conditionalValue) return void 0;
			if (conditionalValue instanceof ConditionalIconItem) return conditionalValue.value;
			return conditionalValue;
		}
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/icons/IconComponent.tsx
/** Get the SVG Source from an svg-loader IconSpec */
function getWebComponentSource(iconSpec) {
	if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) return iconSpec.slice(7);
}
/** Icon Functional component displays an icon based on an [[IconSpec]].
* @public
* @deprecated in 4.16.0. Used to render a deprecated {@link IconSpec} type. Use {@link https://itwinui.bentley.com/ iTwinUI Icon} instead.
*/
function Icon(props) {
	if (!props.iconSpec) return null;
	const iconSpecValue = getIconSpecValue(props.iconSpec);
	if (typeof iconSpecValue === "string") {
		const iconString = iconSpecValue;
		const webComponentString = getWebComponentSource(iconString);
		if (iconString.startsWith("data:") || iconString.endsWith(".svg") || webComponentString) {
			const definitiveIconString = webComponentString ? webComponentString : iconString;
			const svgDiv = `<div>${`<svg-loader src="${definitiveIconString}"></svg-loader>`}</div>`;
			const sanitizerConfig = {
				ALLOWED_TAGS: ["svg-loader"],
				ADD_URI_SAFE_ATTR: definitiveIconString.startsWith("data:") ? ["src"] : []
			};
			const webComponentNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(svgDiv, sanitizerConfig) } });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: (0, import_classnames.default)("icon", "core-svg-icon", props.className),
				children: webComponentNode
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
			className: (0, import_classnames.default)("icon", "core-css-icon", iconString, props.className),
			style: props.style
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
		className: (0, import_classnames.default)("icon", "core-svg-icon", props.className),
		style: props.style,
		children: iconSpecValue
	});
}
function getIconSpecValue(iconSpec) {
	let value = iconSpec;
	while (true) {
		if (value instanceof ConditionalIconItem) {
			value = ConditionalIconItem.getValue(value);
			continue;
		}
		if (value instanceof ConditionalStringValue) {
			value = ConditionalStringValue.getValue(value);
			break;
		}
		break;
	}
	return value;
}
var import_classnames, import_jsx_runtime;
var init_IconComponent = __esmMin((() => {
	init_IconComponent$1();
	require_react();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_appui_abstract();
	init_purify_es();
	init_ConditionalIconItem();
	import_jsx_runtime = require_jsx_runtime();
	Icon.__docgenInfo = {
		"description": "Icon Functional component displays an icon based on an [[IconSpec]].\n@public\n@deprecated in 4.16.0. Used to render a deprecated {@link IconSpec} type. Use {@link https://itwinui.bentley.com/ iTwinUI Icon} instead.",
		"methods": [],
		"displayName": "Icon",
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
				"description": "CSS class name or SvgPath for icon. This is optional because it is improperly\nused to extend other interfaces and changing it would break existing API."
			}
		}
	};
}));
//#endregion
export { init_ConditionalIconItem as i, init_IconComponent as n, ConditionalIconItem as r, Icon as t };
