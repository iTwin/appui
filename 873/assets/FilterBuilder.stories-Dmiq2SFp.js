var _a, _b, _c, _d, _e, _f;
import { B as Button, b as PropertyValueFormat, d as StandardTypeNames } from "./Key.enum-DfmWeVAv.js";
import { n as PropertyFilterBuilderRuleRenderingContext, o as PropertyFilterBuilderContext, p as PropertyFilterBuilderRuleGroupRenderer, q as usePropertyFilterBuilder, d as IModelApp, U as UiFramework, r as PropertyFilterRuleGroupOperator } from "./DefaultToolSettingsProvider-BJ7jnI_c.js";
import { r as reactExports, R as React } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { A as AppUiDecorator } from "./Decorators-DFtbw1Rc.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import "./iframe-WFPHwrkb.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
const ROOT_GROUP_PATH = [];
function PropertyFilterBuilderRenderer(props) {
  const { rootGroup, actions, properties, onRulePropertySelected, ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled, isGroupOperatorDisabled } = props;
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
      reactExports.createElement(PropertyFilterBuilderRuleGroupRenderer, { path: ROOT_GROUP_PATH, group: rootGroup, isGroupOperatorDisabled })
    )
  );
}
function FilterBuilderStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Initialized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBuilderComponent, { ...props }) });
}
function FilterBuilderComponent({
  initialFilter,
  ...props
}) {
  const { rootGroup, actions, buildFilter } = usePropertyFilterBuilder({
    initialFilter,
    ruleValidator: ({ value }) => {
      if ((value == null ? void 0 : value.valueFormat) === PropertyValueFormat.Primitive && value.value === "invalid") {
        return "Invalid Value";
      }
      return void 0;
    }
  });
  React.useEffect(() => {
    console.log(buildFilter());
  }, [buildFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderRenderer,
      {
        ...props,
        actions,
        rootGroup
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => buildFilter(), children: "Validate" })
  ] });
}
function Initialized({ children }) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void async function() {
      await IModelApp.startup();
      await UiFramework.initialize(void 0);
      setInitialized(true);
    }();
  }, []);
  if (!initialized)
    return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
try {
  FilterBuilderStory.displayName = "FilterBuilderStory";
  FilterBuilderStory.__docgenInfo = { "description": "", "displayName": "FilterBuilderStory", "props": { "properties": { "defaultValue": null, "description": "List of properties available to be used in filter rules.", "name": "properties", "required": true, "type": { "name": "PropertyDescription[]" } }, "initialFilter": { "defaultValue": null, "description": "Initial filter for [[PropertyFilterBuilder]]", "name": "initialFilter", "required": false, "type": { "name": "PropertyFilter" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    properties: createProperties()\n  }\n}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
WithInitialFilter.parameters = {
  ...WithInitialFilter.parameters,
  docs: {
    ...(_d = WithInitialFilter.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    initialFilter: createInitialFilter(),\n    properties: createProperties()\n  }\n}",
      ...(_f = (_e = WithInitialFilter.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Basic", "WithInitialFilter"];
export {
  Basic,
  WithInitialFilter,
  __namedExportsOrder,
  meta as default
};
