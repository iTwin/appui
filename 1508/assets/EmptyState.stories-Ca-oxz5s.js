import { j as jsxRuntimeExports, R as React } from "./iframe-BnF7kxuI.js";
import { w as StagePanelState, a6 as useSpecificWidgetDef, W as WidgetState } from "./appui-react-B7iNJbV5.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C8_Xb5kX.js";
import { c as createFrontstage, a as createWidget } from "./Utils-IR3EMk7M.js";
import { B as Button } from "./Key.enum-B3pThNWo.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
import "./blocks-BPELq9PS.js";
function EmptyStateStory(props) {
  const provider = {
    id: "widgets",
    getWidgets: () => [
      createWidget(1, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { hideOnEmptyState: props.hideOnEmptyState })
      })
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
    if (!enabled) return;
    widgetDef?.setWidgetState(data ? WidgetState.Open : WidgetState.Hidden);
  }, [data, enabled, widgetDef]);
}
function useWidgetData() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    if (data) return;
    setTimeout(() => {
      setData("Widget data");
    }, 2e3);
  }, [data]);
  const reset = () => {
    setData(void 0);
  };
  return [data, reset];
}
EmptyStateStory.__docgenInfo = { "description": "Showcases different strategies to display widgets in an empty state.\nA combination of [useSpecificWidgetDef](https://www.itwinjs.org/reference/appui-react/frontstage/usespecificwidgetdef/) and\n[setWidgetState](https://www.itwinjs.org/reference/appui-react/widget/widgetdef/#setwidgetstate) APIs can be used to\nhide widgets in an empty state.", "methods": [], "displayName": "EmptyStateStory", "props": { "hideOnEmptyState": { "required": true, "tsType": { "name": "boolean" }, "description": "Toggle this on to hide the widget when there is no data to display." } } };
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
    ...HideWidget.parameters?.docs,
    source: {
      originalSource: "{}",
      ...HideWidget.parameters?.docs?.source
    }
  }
};
ShowEmptyState.parameters = {
  ...ShowEmptyState.parameters,
  docs: {
    ...ShowEmptyState.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    hideOnEmptyState: false\n  }\n}",
      ...ShowEmptyState.parameters?.docs?.source
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
