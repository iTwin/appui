import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Go as CompassMode, M as init_appui_react, Mt as AccuDrawWidget, Pt as FrameworkAccuDraw, Ro as init_core_frontend, Yo as IModelApp, va as SvgPlaceholder, zi as init_esm } from "./iframe-CKDG0E56.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-CwSDgRNO.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-gMkMQFsJ.js";
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
