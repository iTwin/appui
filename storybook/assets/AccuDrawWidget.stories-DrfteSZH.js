import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, En as CompassMode, rt as FrameworkAccuDraw, t as init_appui_react, tt as AccuDrawWidget, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/components/AccuDrawWidget.stories.tsx
function StoryWrapper(props) {
	import_react.useEffect(() => {
		IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
		FrameworkAccuDraw.uiStateStorage = {
			...FrameworkAccuDraw.uiStateStorage,
			xIcon: "icon-placeholder",
			xIconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {})
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.children });
}
var import_react, import_jsx_runtime, StoryDecorator, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	init_core_frontend();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	StoryDecorator = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, { frontstages: [createFrontstage({ content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) }) })] });
	};
	meta = {
		title: "Components/AccuDrawWidget",
		component: AccuDrawWidget,
		tags: ["autodocs"],
		decorators: [StoryDecorator]
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
