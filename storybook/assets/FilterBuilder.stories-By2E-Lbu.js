import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { _t as Button, i as init_esm } from "./iframe-DrBiZGmV.js";
import { An as IModelApp, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { I as PropertyValueFormat, R as StandardTypeNames, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { J as PropertyFilterBuilderRenderer, Q as PropertyFilterBuilderRuleValue, Z as usePropertyFilterBuilder, et as PropertyFilterRuleGroupOperator, t as init_components_react } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/FilterBuilder.tsx
function FilterBuilderStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initialized, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBuilderComponent, { ...props }) });
}
function FilterBuilderComponent({ initialFilter, editorSystem, ...props }) {
	const { rootGroup, actions, buildFilter } = usePropertyFilterBuilder({
		initialFilter,
		ruleValidator: ({ value }) => {
			if (value?.valueFormat === PropertyValueFormat.Primitive && value.value === "invalid") return "Invalid Value";
		}
	});
	import_react.useEffect(() => {
		console.log(buildFilter());
	}, [buildFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: "10px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFilterBuilderRenderer, {
			...props,
			actions,
			rootGroup,
			ruleValueRenderer: import_react.useCallback((valueProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFilterBuilderRuleValue, {
				...valueProps,
				editorSystem
			}), [editorSystem])
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => buildFilter(),
			children: "Validate"
		})]
	});
}
function Initialized({ children }) {
	const [initialized, setInitialized] = import_react.useState(false);
	import_react.useEffect(() => {
		(async function() {
			await IModelApp.startup();
			await UiFramework.initialize(void 0);
			setInitialized(true);
		})();
	}, []);
	if (!initialized) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var import_react, import_jsx_runtime;
var init_FilterBuilder = __esmMin((() => {
	init_appui_abstract();
	init_appui_react();
	init_components_react();
	init_core_frontend();
	init_esm();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime = require_jsx_runtime();
	FilterBuilderStory.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "FilterBuilderStory",
		"props": { "editorSystem": {
			"required": true,
			"tsType": {
				"name": "union",
				"raw": "\"new\" | \"legacy\"",
				"elements": [{
					"name": "literal",
					"value": "\"new\""
				}, {
					"name": "literal",
					"value": "\"legacy\""
				}]
			},
			"description": ""
		} }
	};
}));
//#endregion
//#region src/components/FilterBuilder.stories.tsx
function createProperties() {
	return [
		{
			name: "string-prop",
			displayLabel: "String Property",
			typename: StandardTypeNames.String
		},
		{
			name: "int-prop",
			displayLabel: "Integer Property",
			typename: StandardTypeNames.Integer
		},
		{
			name: "double-prop",
			displayLabel: "Double Property",
			typename: StandardTypeNames.Double
		},
		{
			name: "date-prop",
			displayLabel: "Date Property",
			typename: StandardTypeNames.DateTime
		},
		{
			name: "bool-prop",
			displayLabel: "Boolean Property",
			typename: StandardTypeNames.Boolean
		},
		{
			name: "enum-prop",
			displayLabel: "Enum Property",
			typename: StandardTypeNames.Enum,
			enum: { choices: [
				{
					label: "Choice 1",
					value: 1
				},
				{
					label: "Choice 2",
					value: 2
				},
				{
					label: "Choice 3",
					value: 3
				}
			] }
		}
	];
}
function createInitialFilter() {
	const properties = createProperties();
	return {
		operator: PropertyFilterRuleGroupOperator.Or,
		rules: [{
			property: properties[1],
			operator: "less",
			value: {
				valueFormat: PropertyValueFormat.Primitive,
				value: 123
			}
		}, {
			property: properties[0],
			operator: "like"
		}]
	};
}
var meta, Basic, WithInitialFilter, WithNewEditorSystem, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_abstract();
	init_components_react();
	init_Decorators();
	init_FilterBuilder();
	meta = {
		title: "Components/FilterBuilder",
		component: FilterBuilderStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { properties: createProperties() } };
	WithInitialFilter = { args: {
		initialFilter: createInitialFilter(),
		properties: createProperties()
	} };
	WithNewEditorSystem = { args: {
		initialFilter: createInitialFilter(),
		properties: createProperties(),
		editorSystem: "new"
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    properties: createProperties()\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	WithInitialFilter.parameters = {
		...WithInitialFilter.parameters,
		docs: {
			...WithInitialFilter.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    initialFilter: createInitialFilter(),\n    properties: createProperties()\n  }\n}",
				...WithInitialFilter.parameters?.docs?.source
			}
		}
	};
	WithNewEditorSystem.parameters = {
		...WithNewEditorSystem.parameters,
		docs: {
			...WithNewEditorSystem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    initialFilter: createInitialFilter(),\n    properties: createProperties(),\n    editorSystem: \"new\"\n  }\n}",
				...WithNewEditorSystem.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"WithInitialFilter",
		"WithNewEditorSystem"
	];
}))();
export { Basic, WithInitialFilter, WithNewEditorSystem, __namedExportsOrder, meta as default };
