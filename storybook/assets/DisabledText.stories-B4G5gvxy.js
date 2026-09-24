import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
import { n as init_StyledText, t as StyledText } from "./StyledText-Beke7yOZ.js";
//#region ../../ui/core-react/src/core-react/text/DisabledText.tsx
/** Styled disabled text React functional component
* @public
* @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.
*/
function DisabledText(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledText, {
		...props,
		mainClassName: "uicore-text-disabled"
	});
}
var import_jsx_runtime;
function init_DisabledText() {
	return (init_DisabledText = __esmMin((() => {
		require_react();
		init_StyledText();
		import_jsx_runtime = require_jsx_runtime();
		DisabledText.__docgenInfo = {
			"description": "Styled disabled text React functional component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.",
			"methods": [],
			"displayName": "DisabledText",
			"props": {
				"className": {
					"required": false,
					"tsType": { "name": "string" },
					"description": "Custom CSS class name"
				},
				"style": {
					"required": false,
					"tsType": {
						"name": "ReactCSSProperties",
						"raw": "React.CSSProperties"
					},
					"description": "Custom CSS style properties"
				},
				"itemId": {
					"required": false,
					"tsType": { "name": "string" },
					"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
				}
			}
		};
	})))();
}
//#endregion
//#region src/deprecated/DisabledText.stories.tsx
var meta, Basic, __namedExportsOrder;
function init_DisabledText_stories() {
	return (init_DisabledText_stories = __esmMin((() => {
		init_Decorators();
		init_DisabledText();
		meta = {
			title: "Deprecated/DisabledText",
			component: DisabledText,
			tags: ["autodocs"],
			decorators: [AppUiDecorator]
		};
		Basic = { args: { children: "This is a disabled text" } };
		Basic.parameters = {
			...Basic.parameters,
			docs: {
				...Basic.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    children: \"This is a disabled text\"\n  }\n}",
					...Basic.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic"];
	})))();
}
//#endregion
init_DisabledText_stories();
export { Basic, __namedExportsOrder, meta as default };
