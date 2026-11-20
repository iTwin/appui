import { n as __esmMin } from "./rolldown-runtime-BdGkqNEt.js";
import { Yn as NumberInput, _n as init_core_react } from "./components-react-BquuN1qO.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-R107BvvB.js";
//#region src/deprecated/NumberInput.stories.tsx
var meta, Basic, __namedExportsOrder;
function init_NumberInput_stories() {
	return (init_NumberInput_stories = __esmMin((() => {
		init_core_react();
		init_Decorators();
		meta = {
			title: "Deprecated/NumberInput",
			component: NumberInput,
			tags: ["autodocs"],
			decorators: [AppUiDecorator]
		};
		Basic = { args: {} };
		Basic.parameters = {
			...Basic.parameters,
			docs: {
				...Basic.parameters?.docs,
				source: {
					originalSource: "{\n  args: {}\n}",
					...Basic.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic"];
	})))();
}
//#endregion
init_NumberInput_stories();
export { Basic, __namedExportsOrder, meta as default };
