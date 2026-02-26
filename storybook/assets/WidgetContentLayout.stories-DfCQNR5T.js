import { j as jsxRuntimeExports } from "./iframe-BENp4d1r.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { a7 as WidgetContentLayout, w as StagePanelState } from "./appui-react-CEufDDhs.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-1k4NCfid.js";
import { c as createFrontstage, a as createWidget } from "./Utils-B8gUJSzA.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-CnwI7CFN.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
import "./blocks-DFQpQ9rY.js";
function WidgetContentLayoutStory(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Header, { title: "Header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Body, { children: "Body" }),
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
WidgetContentLayoutStory.__docgenInfo = { "description": "Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.", "methods": [], "displayName": "WidgetContentLayoutStory" };
const meta = {
  title: "Widget/Layout",
  component: WidgetContentLayoutStory,
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
    hideDividers: false
  }
};
const LoadingOverlay = {
  args: {
    isLoading: true
  }
};
const HideDivider = {
  args: {
    hideDividers: true
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isLoading: false,\n    hideDividers: false\n  }\n}",
      ...Default.parameters?.docs?.source
    }
  }
};
LoadingOverlay.parameters = {
  ...LoadingOverlay.parameters,
  docs: {
    ...LoadingOverlay.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isLoading: true\n  }\n}",
      ...LoadingOverlay.parameters?.docs?.source
    }
  }
};
HideDivider.parameters = {
  ...HideDivider.parameters,
  docs: {
    ...HideDivider.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    hideDividers: true\n  }\n}",
      ...HideDivider.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "LoadingOverlay", "HideDivider"];
export {
  Default,
  HideDivider,
  LoadingOverlay,
  __namedExportsOrder,
  meta as default
};
