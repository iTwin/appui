import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Mr as init_esm, Vi as SvgPlaceholder } from "./components-react-2-ltnsUD.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-cZ7dbGZU.js";
import { Bn as CompassMode, Nn as init_core_frontend, Wn as IModelApp, at as FrameworkAccuDraw, rt as AccuDrawWidget, t as init_appui_react } from "./appui-react-p-O3mm3j.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-bQd6hcpG.js";
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
function init_AccuDrawWidget_stories() {
	return (init_AccuDrawWidget_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_AccuDrawWidget_stories();
export { Basic, __namedExportsOrder, meta as default };
