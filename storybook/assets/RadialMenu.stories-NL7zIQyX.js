import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Gn as RadialMenu, Vr as init_esm, Wn as RadialButton, bn as init_core_react, fs as SvgActivity, gs as Svg2D, ms as Svg3D } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/deprecated/RadialMenu.stories.tsx
var import_jsx_runtime, action, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_core_react();
	init_esm();
	init_Decorators();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Deprecated/RadialMenu",
		component: RadialMenu,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: {
			opened: true,
			innerRadius: 150,
			outerRadius: 220,
			left: "50%",
			top: "50%",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialButton, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}),
					onSelect: action("Item 1"),
					children: "Item 1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialButton, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}),
					onSelect: action("Item 2"),
					children: "Item 2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialButton, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}),
					onSelect: action("Item 3"),
					children: "Item 3"
				})
			]
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
