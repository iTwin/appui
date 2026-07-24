import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, Kt as StatusBarSection, c as ToolAssistanceField, g as StatusBarItemUtilities, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/frontstage/notifications/OutputPrompt.tsx
/** [outputPrompt](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/outputprompt/) displays a prompt message in the status bar. */
function NotificationsStory() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		layout: "fullscreen",
		frontstages: [createFrontstage({ hideStatusBar: false })],
		itemProviders: [{
			id: "provider-1",
			getStatusBarItems: () => [StatusBarItemUtilities.createCustomItem("uifw.ToolAssistance", StatusBarSection.Left, 0, /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolAssistanceField, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Prompt, {})] }))]
		}]
	});
}
function Prompt() {
	import_react.useEffect(() => {
		IModelApp.notifications.outputPrompt("Prompt message");
	}, []);
	return null;
}
var import_react, import_jsx_runtime$1;
var init_OutputPrompt = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	init_core_frontend();
	import_jsx_runtime$1 = require_jsx_runtime();
	NotificationsStory.__docgenInfo = {
		"description": "[outputPrompt](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/outputprompt/) displays a prompt message in the status bar.",
		"methods": [],
		"displayName": "NotificationsStory"
	};
}));
//#endregion
//#region src/frontstage/notifications/OutputPrompt.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_OutputPrompt();
	init_AppUiStory();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/Notifications/OutputPrompt",
		component: NotificationsStory,
		tags: ["autodocs"],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
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
