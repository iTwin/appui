import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { n as init_IconComponent, t as Icon } from "./IconComponent-B7Yc7qDw.js";
//#region ../../ui/core-react/src/core-react/StrataKitIcon.tsx
/** @internal */
function StrataKitIcon(props) {
	const StrataKitIconComponent = import_react.useContext(StrataKitIconContext);
	if (StrataKitIconComponent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIconComponent, { ...props });
	if (props.iconNode) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.iconNode });
	if (props.iconSpec) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { iconSpec: props.iconSpec });
}
var import_react, import_jsx_runtime, StrataKitIconContext;
var init_StrataKitIcon = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_IconComponent();
	import_jsx_runtime = require_jsx_runtime();
	StrataKitIconContext = import_react.createContext(void 0);
	StrataKitIcon.__docgenInfo = {
		"description": "@internal",
		"methods": [],
		"displayName": "StrataKitIcon",
		"props": {
			"module": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "| \"@stratakit/icons/add.svg\"\n| \"@stratakit/icons/caret-down.svg\"\n| \"@stratakit/icons/caret-left.svg\"\n| \"@stratakit/icons/caret-right.svg\"\n| \"@stratakit/icons/caret-up.svg\"\n| \"@stratakit/icons/calendar.svg\"\n| \"@stratakit/icons/checkmark.svg\"\n| \"@stratakit/icons/chevron-down.svg\"\n| \"@stratakit/icons/chevron-left.svg\"\n| \"@stratakit/icons/chevron-right.svg\"\n| \"@stratakit/icons/delete.svg\"\n| \"@stratakit/icons/dismiss.svg\"\n| \"@stratakit/icons/help.svg\"\n| \"@stratakit/icons/info.svg\"\n| \"@stratakit/icons/loop.svg\"\n| \"@stratakit/icons/moon.svg\"\n| \"@stratakit/icons/pause.svg\"\n| \"@stratakit/icons/placeholder.svg\"\n| \"@stratakit/icons/play.svg\"\n| \"@stratakit/icons/rotate-left.svg\"\n| \"@stratakit/icons/search.svg\"\n| \"@stratakit/icons/settings.svg\"\n| \"@stratakit/icons/sort-descending.svg\"\n| \"@stratakit/icons/status-error.svg\"\n| \"@stratakit/icons/status-rejected.svg\"\n| \"@stratakit/icons/status-success.svg\"\n| \"@stratakit/icons/status-warning.svg\"\n| \"@stratakit/icons/sun.svg\"",
					"elements": [
						{
							"name": "literal",
							"value": "\"@stratakit/icons/add.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/caret-down.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/caret-left.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/caret-right.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/caret-up.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/calendar.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/checkmark.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/chevron-down.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/chevron-left.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/chevron-right.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/delete.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/dismiss.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/help.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/info.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/loop.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/moon.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/pause.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/placeholder.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/play.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/rotate-left.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/search.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/settings.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/sort-descending.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/status-error.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/status-rejected.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/status-success.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/status-warning.svg\""
						},
						{
							"name": "literal",
							"value": "\"@stratakit/icons/sun.svg\""
						}
					]
				},
				"description": "`href` is resolved from the specified StrataKit icon module."
			},
			"iconNode": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": ""
			},
			"iconSpec": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "| string\n| ConditionalStringValue\n| React.ReactNode\n| ConditionalIconItem",
					"elements": [
						{ "name": "string" },
						{ "name": "ConditionalStringValue" },
						{
							"name": "ReactReactNode",
							"raw": "React.ReactNode"
						},
						{ "name": "ConditionalIconItem" }
					]
				},
				"description": ""
			}
		}
	};
}));
//#endregion
export { init_StrataKitIcon as n, StrataKitIcon as t };
