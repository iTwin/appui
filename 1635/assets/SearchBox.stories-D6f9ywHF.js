import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { Ln as SearchBox, _n as init_core_react } from "./components-react-DvtW35c_.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-Bt2xyOFQ.js";
//#region src/deprecated/SearchBox.stories.tsx
var action, meta, Basic, WithDelay, __namedExportsOrder;
function init_SearchBox_stories() {
	return (init_SearchBox_stories = __esmMin((() => {
		init_Decorators();
		init_core_react();
		({action} = __STORYBOOK_MODULE_ACTIONS__);
		meta = {
			title: "Deprecated/SearchBox",
			component: SearchBox,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			args: {
				onValueChanged: action("onValueChanged"),
				onClear: action("onClear"),
				onEnterPressed: action("onEnterPressed"),
				onEscPressed: action("onEscPressed")
			}
		};
		Basic = {};
		WithDelay = { args: {
			...meta.args,
			valueChangedDelay: 1e3
		} };
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
		WithDelay.parameters = {
			...WithDelay.parameters,
			docs: {
				...WithDelay.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    ...meta.args,\n    valueChangedDelay: 1000\n  }\n}",
					...WithDelay.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic", "WithDelay"];
	})))();
}
//#endregion
init_SearchBox_stories();
export { Basic, WithDelay, __namedExportsOrder, meta as default };
