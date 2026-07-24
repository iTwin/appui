import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Vr as init_esm, gs as Svg2D } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_Tabs, t as Tabs } from "./Tabs-v2SDSIUv.js";
//#region src/deprecated/Tabs.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_Tabs();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/Tabs",
		component: Tabs,
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
