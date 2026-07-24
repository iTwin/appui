import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { sn as MessageManager, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/frontstage/notifications/InputField.stories.tsx
function Component() {
	return null;
}
function Content() {
	const targetRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const target = targetRef.current;
		if (!target) return;
		MessageManager.displayInputFieldMessage(target, "My message", "My detailed message");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: (el) => {
			targetRef.current = el ?? void 0;
		},
		style: {
			position: "absolute",
			top: 200,
			left: 300
		},
		children: "Message target"
	});
}
var import_react, import_jsx_runtime, StoryDecorator, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_AppUiStory();
	init_appui_react();
	init_Utils();
	import_jsx_runtime = require_jsx_runtime();
	StoryDecorator = (_Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, { frontstages: [createFrontstage({ content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {}) })] });
	};
	meta = {
		title: "Frontstage/Notifications/InputField",
		component: Component,
		tags: ["autodocs"],
		decorators: [StoryDecorator]
	};
	Default = {};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
