import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Mr as init_esm, as as SvgBentleySystems } from "./components-react-CHXB-2a9.js";
import { A as BackstageAppButton, t as init_appui_react } from "./appui-react-B4bFXMth.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
//#region src/components/BackstageAppButton.stories.tsx
var import_jsx_runtime, action, meta, Default, Icon, IconSpec, __namedExportsOrder;
function init_BackstageAppButton_stories() {
	return (init_BackstageAppButton_stories = __esmMin((() => {
		init_appui_react();
		init_esm();
		init_Decorators();
		import_jsx_runtime = require_jsx_runtime();
		({action} = __STORYBOOK_MODULE_ACTIONS__);
		meta = {
			title: "Components/BackstageAppButton",
			component: BackstageAppButton,
			tags: ["autodocs"],
			decorators: [AppUiDecorator, InitializerDecorator],
			args: { execute: action("execute") }
		};
		Default = {};
		Icon = { args: { iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgBentleySystems, {}) } };
		IconSpec = {
			name: "Icon Spec (deprecated)",
			args: { icon: "icon-bentley-systems" }
		};
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
		Icon.parameters = {
			...Icon.parameters,
			docs: {
				...Icon.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    iconNode: <SvgBentleySystems />\n  }\n}",
					...Icon.parameters?.docs?.source
				}
			}
		};
		IconSpec.parameters = {
			...IconSpec.parameters,
			docs: {
				...IconSpec.parameters?.docs,
				source: {
					originalSource: "{\n  name: \"Icon Spec (deprecated)\",\n  args: {\n    icon: \"icon-bentley-systems\"\n  }\n}",
					...IconSpec.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = [
			"Default",
			"Icon",
			"IconSpec"
		];
	})))();
}
//#endregion
init_BackstageAppButton_stories();
export { Default, Icon, IconSpec, __namedExportsOrder, meta as default };
