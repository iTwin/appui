import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { O as DialogButtonType, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_Dialog, t as Dialog } from "./Dialog-CiiFSvBH.js";
//#region src/deprecated/Dialog.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Dialog();
	init_Decorators();
	init_appui_abstract();
	meta = {
		title: "Deprecated/Dialog",
		component: Dialog,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: {
		opened: true,
		title: "Title",
		children: "Content",
		buttonCluster: [{
			type: DialogButtonType.Cancel,
			onClick: () => void 0,
			label: "Cancel"
		}, {
			type: DialogButtonType.OK,
			onClick: () => void 0,
			label: "OK"
		}]
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    opened: true,\n    title: \"Title\",\n    children: \"Content\",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: \"Cancel\"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: \"OK\"\n    }]\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
