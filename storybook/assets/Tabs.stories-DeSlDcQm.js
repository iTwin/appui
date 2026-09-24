import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Mr as init_esm, ys as Svg2D } from "./components-react-CHXB-2a9.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
import { n as init_Tabs, t as Tabs } from "./Tabs-CApR5W9s.js";
//#region src/deprecated/Tabs.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
function init_Tabs_stories() {
	return (init_Tabs_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_Tabs_stories();
export { Basic, __namedExportsOrder, meta as default };
