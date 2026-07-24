import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { a as EditorExampleComponent, i as init_appui_test_providers, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
//#region src/components/Editors.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_test_providers();
	init_AppUiStory();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Components/Editors",
		component: EditorExampleComponent,
		tags: ["autodocs"]
	};
	Basic = { render: () => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			displayChildrenOnly: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: 20,
					position: "relative"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorExampleComponent, {})
			})
		});
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  render: () => {\n    return <AppUiStory displayChildrenOnly>\n        <div style={{\n        padding: 20,\n        position: \"relative\"\n      }}>\n          <EditorExampleComponent />\n        </div>\n      </AppUiStory>;\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
