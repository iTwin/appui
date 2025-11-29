import { j as jsxRuntimeExports } from "./iframe-B7Vu6-Nd.js";
import { A as AppUiDecorator } from "./Decorators-CSBItz6J.js";
import { a6 as WidgetContentLayout$1, w as StagePanelState } from "./appui-react-C03ZSW7W.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Beo-UPAP.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BJP4_Q3q.js";
import "./Key.enum-vvj7KXZL.js";
import "./client-cEhHFPCd.js";
import "./blocks-IUZ6V50a.js";
function WidgetContentLayout(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout$1, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout$1.Header, { title: "Header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout$1.Body, { children: "Body" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout$1.Footer, { children: "Footer" })
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
WidgetContentLayout.__docgenInfo = { "description": "Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.", "methods": [], "displayName": "WidgetContentLayout" };
const meta = {
  title: "Widget/Layout",
  component: WidgetContentLayout,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}),
      source: {
        code: `<WidgetContentLayout id="basic-widget" isLoading={false}>
          <WidgetContentLayout.Header title="Header" />
          <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
          <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
        </WidgetContentLayout>`
      }
    }
  }
};
const LoadingOverlay = {
  args: {
    isLoading: false
  },
  argTypes: {
    isLoading: {
      description: "When true, renders a blocking loading overlay covering the content area.",
      control: {
        type: "boolean"
      },
      table: {
        category: "WidgetContentLayout",
        type: {
          summary: "boolean"
        },
        defaultValue: {
          summary: "false"
        }
      }
    }
  }
};
LoadingOverlay.parameters = {
  ...LoadingOverlay.parameters,
  docs: {
    ...LoadingOverlay.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    isLoading: false\n  },\n  argTypes: {\n    isLoading: {\n      description: "When true, renders a blocking loading overlay covering the content area.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    }\n  }\n}',
      ...LoadingOverlay.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["LoadingOverlay"];
export {
  LoadingOverlay,
  __namedExportsOrder,
  meta as default
};
