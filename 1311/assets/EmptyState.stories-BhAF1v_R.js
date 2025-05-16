var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { R as React } from "./index-DVOlmhHI.js";
import { z as StagePanelState, ag as useSpecificWidgetDef, W as WidgetState } from "./appui-react-CshDS9F4.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BQKHRroc.js";
import { c as createFrontstage, a as createWidget } from "./Utils-C8WlYJ7Q.js";
import { B as Button } from "./Dialog-B4AlSohG.js";
import { A as AppUiDecorator } from "./Decorators-_fBFu_1E.js";
import "./index-CdGyBOBZ.js";
import "./iframe-CY2-t6FD.js";
import "./SvgCloseSmall-D3lYHYdV.js";
import "./client-DmvY241V.js";
import "./index-BkPtAnId.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
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
    widgetDef == null ? void 0 : widgetDef.setWidgetState(data ? WidgetState.Open : WidgetState.Hidden);
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
