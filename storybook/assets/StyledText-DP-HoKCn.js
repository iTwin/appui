import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
//#region ../../ui/core-react/src/core-react/text/StyledText.tsx
/** The base component for other text components that pass a main CSS class name.
* @public
* @deprecated in 4.0.0. Use \<Text /\> component from iTwinUI-react library.
*/
function StyledText(props) {
	const { mainClassName, className, style, children, ...spanProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		...spanProps,
		className: (0, import_classnames.default)(mainClassName, className),
		style,
		children
	});
}
var import_classnames, import_jsx_runtime;
var init_StyledText = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	require_react();
	import_jsx_runtime = require_jsx_runtime();
	StyledText.__docgenInfo = {
		"description": "The base component for other text components that pass a main CSS class name.\n@public\n@deprecated in 4.0.0. Use \\<Text /\\> component from iTwinUI-react library.",
		"methods": [],
		"displayName": "StyledText",
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
			},
			"mainClassName": {
				"required": true,
				"tsType": { "name": "string" },
				"description": "Main CSS class name"
			}
		}
	};
}));
//#endregion
export { init_StyledText as n, StyledText as t };
