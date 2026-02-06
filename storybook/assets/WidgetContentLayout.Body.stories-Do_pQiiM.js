import { j as jsxRuntimeExports } from "./iframe-CmD0Hb4y.js";
import { A as AppUiDecorator } from "./Decorators-D_pKkwMC.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DV8mE_E8.js";
import { a7 as WidgetContentLayout, w as StagePanelState } from "./appui-react-DgImBujK.js";
import { c as createFrontstage, a as createWidget } from "./Utils-DGcn9Fj-.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DiqAEzk8.js";
import "./blocks-CqC2p7bk.js";
import "./index-CzRyVTiY.js";
import "./client-eTkMhgnB.js";
function WidgetContentLayoutBody(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Header, { title: "Header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Body, { ...props, children: "Body" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Footer, { children: "Footer" })
  ] });
  const provider = {
    id: "widget-layout-provider",
    getWidgets: () => [
      createWidget(1, {
        content: widgetContent,
        label: "Widget Layout Demo"
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
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ]
    }
  );
}
WidgetContentLayoutBody.__docgenInfo = { "description": "Showcases the WidgetContentLayout component with its Header, Body, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.", "methods": [], "displayName": "WidgetContentLayoutBody" };
const meta = {
  title: "Widget/Layout/Body",
  component: WidgetContentLayoutBody,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  }
};
const Default = {
  args: {
    isLoading: false,
    isNonBlockingLoading: false
  }
};
const BlockingLoading = {
  args: {
    isLoading: true
  }
};
const NonBlockingLoading = {
  args: {
    isNonBlockingLoading: true
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isLoading: false,\n    isNonBlockingLoading: false\n  }\n}",
      ...Default.parameters?.docs?.source
    }
  }
};
BlockingLoading.parameters = {
  ...BlockingLoading.parameters,
  docs: {
    ...BlockingLoading.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isLoading: true\n  }\n}",
      ...BlockingLoading.parameters?.docs?.source
    }
  }
};
NonBlockingLoading.parameters = {
  ...NonBlockingLoading.parameters,
  docs: {
    ...NonBlockingLoading.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isNonBlockingLoading: true\n  }\n}",
      ...NonBlockingLoading.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "BlockingLoading", "NonBlockingLoading"];
export {
  BlockingLoading,
  Default,
  NonBlockingLoading,
  __namedExportsOrder,
  meta as default
};
