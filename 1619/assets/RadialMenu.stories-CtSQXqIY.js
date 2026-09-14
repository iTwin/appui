import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Ln as RadialButton, Mr as init_esm, Rn as RadialMenu, _s as Svg3D, hn as init_core_react, hs as SvgActivity, ys as Svg2D } from "./components-react-2-ltnsUD.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
//#region src/deprecated/RadialMenu.stories.tsx
var import_jsx_runtime, action, meta, Basic, __namedExportsOrder;
function init_RadialMenu_stories() {
	return (init_RadialMenu_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_RadialMenu_stories();
export { Basic, __namedExportsOrder, meta as default };
