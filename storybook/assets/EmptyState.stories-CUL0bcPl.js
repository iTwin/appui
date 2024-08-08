var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { R as React } from "./index-DM9bPmif.js";
import { i as StagePanelState, V as useSpecificWidgetDef, W as WidgetState } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { B as Button } from "./Key.enum-BB2gw-WQ.js";
import "./index-EDRsojbr.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-oEM4RWbs.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
function EmptyStateStory(props) {
  const provider = {
    id: "widgets",
    provideWidgets: () => [
      {
        id: "w1",
        label: "Widget 1",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { hideOnEmptyState: props.hideOnEmptyState })
      }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      itemProviders: [provider],
      frontstages: [
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open
          }
        })
      ]
    }
  );
}
function Widget(props) {
  const [data, resetData] = useWidgetData();
  useHideWidget(props.hideOnEmptyState, data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0.5em" }, children: !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No data" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: resetData, styleType: "cta", size: "small", children: "Reset data" })
  ] }) });
}
function useHideWidget(enabled, data) {
  const widgetDef = useSpecificWidgetDef("w1");
  React.useEffect(() => {
    if (!enabled)
      return;
    widgetDef == null ? void 0 : widgetDef.setWidgetState(data ? WidgetState.Open : WidgetState.Hidden);
  }, [data, enabled, widgetDef]);
}
function useWidgetData() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    if (data)
      return;
    setTimeout(() => {
      setData("Widget data");
    }, 2e3);
  }, [data]);
  const reset = () => {
    setData(void 0);
  };
  return [data, reset];
}
try {
  EmptyStateStory.displayName = "EmptyStateStory";
  EmptyStateStory.__docgenInfo = { "description": "Showcases different strategies to display widgets in an empty state.\nA combination of [useSpecificWidgetDef](https://www.itwinjs.org/reference/appui-react/frontstage/usespecificwidgetdef/) and\n[setWidgetState](https://www.itwinjs.org/reference/appui-react/widget/widgetdef/#setwidgetstate) APIs can be used to\nhide widgets in an empty state.", "displayName": "EmptyStateStory", "props": { "hideOnEmptyState": { "defaultValue": null, "description": "Toggle this on to hide the widget when there is no data to display.", "name": "hideOnEmptyState", "required": true, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Widget/Empty State",
  component: EmptyStateStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    hideOnEmptyState: true
  }
};
const HideWidget = {};
const ShowEmptyState = {
  args: {
    hideOnEmptyState: false
  }
};
HideWidget.parameters = {
  ...HideWidget.parameters,
  docs: {
    ...(_a = HideWidget.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = HideWidget.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
ShowEmptyState.parameters = {
  ...ShowEmptyState.parameters,
  docs: {
    ...(_d = ShowEmptyState.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    hideOnEmptyState: false\n  }\n}",
      ...(_f = (_e = ShowEmptyState.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["HideWidget", "ShowEmptyState"];
export {
  HideWidget,
  ShowEmptyState,
  __namedExportsOrder,
  meta as default
};
