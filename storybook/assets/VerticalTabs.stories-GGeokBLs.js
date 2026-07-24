import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Vr as init_esm, gs as Svg2D } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_Orientation, t as Orientation } from "./Orientation-BU7ZHVnF.js";
import { n as init_Tabs, t as Tabs } from "./Tabs-v2SDSIUv.js";
//#region ../../ui/core-react/src/core-react/tabs/VerticalTabs.tsx
/** Vertical tabs meant to represent the current position in a page/section
* @public
* @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs#vertical iTwinUI Tabs} instead.
*/
function VerticalTabs(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tabs, {
		mainClassName: "uicore-tabs-vertical",
		orientation: Orientation.Vertical,
		...props
	});
}
var import_jsx_runtime$1;
var init_VerticalTabs = __esmMin((() => {
	require_react();
	init_Tabs();
	init_Orientation();
	import_jsx_runtime$1 = require_jsx_runtime();
	VerticalTabs.__docgenInfo = {
		"description": "Vertical tabs meant to represent the current position in a page/section\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs#vertical iTwinUI Tabs} instead.",
		"methods": [],
		"displayName": "VerticalTabs",
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
			"labels": {
				"required": true,
				"tsType": {
					"name": "Array",
					"elements": [{
						"name": "union",
						"raw": "string | TabLabel",
						"elements": [{ "name": "string" }, { "name": "TabLabel" }]
					}],
					"raw": "Array<string | TabLabel>"
				},
				"description": "Text shown for each tab"
			},
			"onActivateTab": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(index: number) => any",
					"signature": {
						"arguments": [{
							"type": { "name": "number" },
							"name": "index"
						}],
						"return": { "name": "any" }
					}
				},
				"description": "Handler for activating a tab"
			},
			"activeIndex": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Index of the initial active tab"
			},
			"green": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether the bar on the active tab is green instead of the default blue"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/VerticalTabs.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_VerticalTabs();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/VerticalTabs",
		component: VerticalTabs,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: { labels: [
			{
				label: "Tab 1",
				tabId: "tab1",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}),
				subLabel: "Sublabel 1",
				tooltip: "Tooltip 1"
			},
			"Tab 2",
			"Tab 3"
		] }
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
