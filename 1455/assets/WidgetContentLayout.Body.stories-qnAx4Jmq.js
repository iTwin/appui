import { j as jsxRuntimeExports } from "./iframe-B7Vu6-Nd.js";
import { A as AppUiDecorator } from "./Decorators-CSBItz6J.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Beo-UPAP.js";
import { a6 as WidgetContentLayout, w as StagePanelState } from "./appui-react-C03ZSW7W.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BJP4_Q3q.js";
import "./Key.enum-vvj7KXZL.js";
import "./blocks-IUZ6V50a.js";
import "./client-cEhHFPCd.js";
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
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}),
      source: {
        code: `<WidgetContentLayout>
    <WidgetContentLayout.Header title="Header" />
    <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
    <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
  </WidgetContentLayout>`
      }
    }
  }
};
const Full = {
  args: {
    isLoading: false,
    isNonBlockingLoading: false
  },
  argTypes: {
    isLoading: {
      description: "Renders a blocking loading overlay covering the content area when true.",
      control: {
        type: "boolean"
      },
      table: {
        category: "WidgetContentLayout.Body",
        type: {
          summary: "boolean"
        },
        defaultValue: {
          summary: "false"
        }
      }
    },
    isNonBlockingLoading: {
      description: "Shows a non-blocking loading indicator (does not prevent interaction) when true.",
      control: {
        type: "boolean"
      },
      table: {
        category: "WidgetContentLayout.Body",
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
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...Full.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    isLoading: false,\n    isNonBlockingLoading: false\n  },\n  argTypes: {\n    isLoading: {\n      description: "Renders a blocking loading overlay covering the content area when true.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout.Body",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    },\n    isNonBlockingLoading: {\n      description: "Shows a non-blocking loading indicator (does not prevent interaction) when true.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout.Body",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    }\n  }\n}',
      ...Full.parameters?.docs?.source
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
const __namedExportsOrder = ["Full", "BlockingLoading", "NonBlockingLoading"];
export {
  BlockingLoading,
  Full,
  NonBlockingLoading,
  __namedExportsOrder,
  meta as default
};
