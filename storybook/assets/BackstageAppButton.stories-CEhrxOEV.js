import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { A as BackstageAppButton, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, ns as SvgBentleySystems } from "./components-react-DigDa1CF.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/BackstageAppButton.stories.tsx
var import_jsx_runtime, action, meta, Default, Icon, IconSpec, __namedExportsOrder;
//#endregion
__esmMin((() => {
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
}))();
export { Default, Icon, IconSpec, __namedExportsOrder, meta as default };
