import { j as jsxRuntimeExports } from "./iframe-BxVIzreG.js";
import { I as InitializerDecorator, C as ConsoleToActionsDecorator, A as AppUiDecorator } from "./Decorators-QJAbI6jH.js";
import { ae as WidgetContentLayout$1, G as StagePanelState } from "./appui-react-CvaqSdj1.js";
import { S as SimpleAppUiStory, P as Page } from "./AppUiStory-DdY_3lSg.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CwcTKaa4.js";
import "./Key.enum-D5EC_Md2.js";
import "./client-DWlsoIYR.js";
import "./blocks-mHkI2uPk.js";
function WidgetContentLayout(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout$1, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout$1.Header, { title: "Header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout$1.Content, { children: "Content" }),
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
    SimpleAppUiStory,
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
  title: "Widget/Widget Content Layout",
  component: WidgetContentLayout,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, ConsoleToActionsDecorator, AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}),
      source: {
        code: `<WidgetContentLayout id="basic-widget" isLoading={false}>
          <WidgetContentLayout.Header title="Header" />
          <WidgetContentLayout.Content>Content</WidgetContentLayout.Content>
          <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
        </WidgetContentLayout>`
      }
    }
  }
};
const Full = {
  args: {
    id: "basic-widget",
    isLoading: false
  },
  argTypes: {
    id: {
      description: "Widget identifier used to determine layout padding and responsive gaps. If omitted, default spacing is applied.",
      control: {
        type: "text"
      },
      table: {
        category: "WidgetContentLayout",
        type: {
          summary: "string"
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    },
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
const LoadingOverlay = {
  args: {
    isLoading: true
  }
};
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...Full.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    id: "basic-widget",\n    isLoading: false\n  },\n  argTypes: {\n    id: {\n      description: "Widget identifier used to determine layout padding and responsive gaps. If omitted, default spacing is applied.",\n      control: {\n        type: "text"\n      },\n      table: {\n        category: "WidgetContentLayout",\n        type: {\n          summary: "string"\n        },\n        defaultValue: {\n          summary: "undefined"\n        }\n      }\n    },\n    isLoading: {\n      description: "When true, renders a blocking loading overlay covering the content area.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    }\n  }\n}',
      ...Full.parameters?.docs?.source
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
const __namedExportsOrder = ["Full", "LoadingOverlay"];
export {
  Full,
  LoadingOverlay,
  __namedExportsOrder,
  meta as default
};
