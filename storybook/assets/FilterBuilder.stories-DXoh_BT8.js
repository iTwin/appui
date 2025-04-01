var _a, _b, _c, _d, _e, _f;
import { B as Button, d as PropertyValueFormat, S as StandardTypeNames } from "./Dialog-BTC9-vGF.js";
import { ae as PropertyFilterBuilderRuleRenderingContext, af as PropertyFilterBuilderContext, ag as PropertyFilterBuilderRuleGroupRenderer, ah as usePropertyFilterBuilder, I as IModelApp, U as UiFramework, ai as PropertyFilterRuleGroupOperator } from "./appui-react-DeRnklYl.js";
import { A as AppUiDecorator } from "./Decorators-B9I4cguV.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { r as reactExports, R as React } from "./index-R26Bfrts.js";
import "./SvgCloseSmall-A2OtI3ac.js";
import "./index-CHBBkG1-.js";
import "./iframe-pbfpR55Y.js";
import "../sb-preview/runtime.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
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
  if (!initialized) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
FilterBuilderStory.__docgenInfo = { "description": "", "methods": [], "displayName": "FilterBuilderStory" };
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
