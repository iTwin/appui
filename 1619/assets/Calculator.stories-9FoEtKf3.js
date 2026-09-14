import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { dt as Calculator, t as init_appui_react } from "./appui-react-p-O3mm3j.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
//#region src/components/Calculator.stories.tsx
var action, meta, Default, __namedExportsOrder;
function init_Calculator_stories() {
	return (init_Calculator_stories = __esmMin((() => {
		init_appui_react();
		init_Decorators();
		({action} = __STORYBOOK_MODULE_ACTIONS__);
		meta = {
			title: "Components/Calculator",
			component: Calculator,
			tags: ["autodocs"],
			decorators: [AppUiDecorator]
		};
		Default = { args: {
			engine: void 0,
			onOk: action("onOk"),
			onCancel: action("onCancel")
		} };
		Default.parameters = {
			...Default.parameters,
			docs: {
				...Default.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    engine: undefined!,\n    // set via defaultProps\n    onOk: action(\"onOk\"),\n    onCancel: action(\"onCancel\")\n  }\n}",
					...Default.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Default"];
	})))();
}
//#endregion
init_Calculator_stories();
export { Default, __namedExportsOrder, meta as default };
