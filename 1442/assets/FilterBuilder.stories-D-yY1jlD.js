import { B as Button, g as PropertyValueFormat, S as StandardTypeNames } from "./Key.enum-B-WhjwuV.js";
import { ac as PropertyFilterBuilderRuleRenderingContext, ad as PropertyFilterBuilderContext, ae as PropertyFilterBuilderRuleGroupRenderer, I as IModelApp, U as UiFramework, af as usePropertyFilterBuilder, ag as PropertyFilterBuilderRuleValue, ah as PropertyFilterRuleGroupOperator } from "./appui-react-CNLcJNb9.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { r as reactExports, j as jsxRuntimeExports, e } from "./iframe-BIXwoC80.js";
import "./client-dvjUKoP6.js";
const ROOT_GROUP_PATH = [];
function PropertyFilterBuilderRenderer(props) {
  const { rootGroup, actions, properties, onRulePropertySelected, ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled, isGroupOperatorDisabled, allowLastRuleDelete } = props;
  const contextValue = reactExports.useMemo(() => ({
    actions,
    properties,
    onRulePropertySelected
  }), [actions, properties, onRulePropertySelected]);
  const renderingContextValue = reactExports.useMemo(() => ({
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled
  }), [ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled]);
  return reactExports.createElement(
    PropertyFilterBuilderRuleRenderingContext.Provider,
    { value: renderingContextValue },
    reactExports.createElement(
      PropertyFilterBuilderContext.Provider,
      { value: contextValue },
      reactExports.createElement(PropertyFilterBuilderRuleGroupRenderer, { path: ROOT_GROUP_PATH, group: rootGroup, isGroupOperatorDisabled, allowLastRuleDelete })
    )
  );
}
function FilterBuilderStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Initialized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBuilderComponent, { ...props }) });
}
function FilterBuilderComponent({
  initialFilter,
  editorSystem,
  ...props
}) {
  const { rootGroup, actions, buildFilter } = usePropertyFilterBuilder({
    initialFilter,
    ruleValidator: ({ value }) => {
      if (value?.valueFormat === PropertyValueFormat.Primitive && value.value === "invalid") {
        return "Invalid Value";
      }
      return void 0;
    }
  });
  e.useEffect(() => {
    console.log(buildFilter());
  }, [buildFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderRenderer,
      {
        ...props,
        actions,
        rootGroup,
        ruleValueRenderer: e.useCallback(
          (valueProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyFilterBuilderRuleValue,
            {
              ...valueProps,
              editorSystem
            }
          ),
          [editorSystem]
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => buildFilter(), children: "Validate" })
  ] });
}
function Initialized({ children }) {
  const [initialized, setInitialized] = e.useState(false);
  e.useEffect(() => {
    void async function() {
      await IModelApp.startup();
      await UiFramework.initialize(void 0);
      setInitialized(true);
    }();
  }, []);
  if (!initialized) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
FilterBuilderStory.__docgenInfo = { "description": "", "methods": [], "displayName": "FilterBuilderStory", "props": { "editorSystem": { "required": true, "tsType": { "name": "union", "raw": '"new" | "legacy"', "elements": [{ "name": "literal", "value": '"new"' }, { "name": "literal", "value": '"legacy"' }] }, "description": "" } } };
const meta = {
  title: "Components/FilterBuilder",
  component: FilterBuilderStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    properties: createProperties()
  }
};
const WithInitialFilter = {
  args: {
    initialFilter: createInitialFilter(),
    properties: createProperties()
  }
};
const WithNewEditorSystem = {
  args: {
    initialFilter: createInitialFilter(),
    properties: createProperties(),
    editorSystem: "new"
  }
};
function createProperties() {
  return [{
    name: "string-prop",
    displayLabel: "String Property",
    typename: StandardTypeNames.String
  }, {
    name: "int-prop",
    displayLabel: "Integer Property",
    typename: StandardTypeNames.Integer
  }, {
    name: "double-prop",
    displayLabel: "Double Property",
    typename: StandardTypeNames.Double
  }, {
    name: "date-prop",
    displayLabel: "Date Property",
    typename: StandardTypeNames.DateTime
  }, {
    name: "bool-prop",
    displayLabel: "Boolean Property",
    typename: StandardTypeNames.Boolean
  }, {
    name: "enum-prop",
    displayLabel: "Enum Property",
    typename: StandardTypeNames.Enum,
    enum: {
      choices: [{
        label: "Choice 1",
        value: 1
      }, {
        label: "Choice 2",
        value: 2
      }, {
        label: "Choice 3",
        value: 3
      }]
    }
  }];
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
      originalSource: '{\n  args: {\n    initialFilter: createInitialFilter(),\n    properties: createProperties(),\n    editorSystem: "new"\n  }\n}',
      ...WithNewEditorSystem.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "WithInitialFilter", "WithNewEditorSystem"];
export {
  Basic,
  WithInitialFilter,
  WithNewEditorSystem,
  __namedExportsOrder,
  meta as default
};
