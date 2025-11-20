import { j as jsxRuntimeExports } from "./iframe-BxVIzreG.js";
import { I as InitializerDecorator, C as ConsoleToActionsDecorator, A as AppUiDecorator } from "./Decorators-QJAbI6jH.js";
import { S as SimpleAppUiStory, P as Page } from "./AppUiStory-DdY_3lSg.js";
import { ae as WidgetContentLayout, G as StagePanelState } from "./appui-react-CvaqSdj1.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CwcTKaa4.js";
import "./Key.enum-D5EC_Md2.js";
import "./blocks-mHkI2uPk.js";
import "./client-DWlsoIYR.js";
function WidgetContentLayoutContent(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Header, { title: "Header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Content, { ...props, children: "Content" }),
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
WidgetContentLayoutContent.__docgenInfo = { "description": "Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.", "methods": [], "displayName": "WidgetContentLayoutContent" };
const meta = {
  title: "Widget/Widget Content Layout/WidgetContentLayout.Content",
  component: WidgetContentLayoutContent,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, ConsoleToActionsDecorator, AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}),
      source: {
        code: `<WidgetContentLayout>
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
    isLoading: false,
    isNonBlockingLoading: false,
    centerContent: false
  },
  argTypes: {
    isLoading: {
      description: "Renders a blocking loading overlay covering the content area when true.",
      control: {
        type: "boolean"
      },
      table: {
        category: "WidgetContentLayout.Content",
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
        category: "WidgetContentLayout.Content",
        type: {
          summary: "boolean"
        },
        defaultValue: {
          summary: "false"
        }
      }
    },
    centerContent: {
      description: "Centers the content both vertically and horizontally inside the content area when true.",
      control: {
        type: "boolean"
      },
      table: {
        category: "WidgetContentLayout.Content",
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
const CenteredContent = {
  args: {
    centerContent: true
  }
};
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...Full.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    isLoading: false,\n    isNonBlockingLoading: false,\n    centerContent: false\n  },\n  argTypes: {\n    isLoading: {\n      description: "Renders a blocking loading overlay covering the content area when true.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout.Content",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    },\n    isNonBlockingLoading: {\n      description: "Shows a non-blocking loading indicator (does not prevent interaction) when true.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout.Content",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    },\n    centerContent: {\n      description: "Centers the content both vertically and horizontally inside the content area when true.",\n      control: {\n        type: "boolean"\n      },\n      table: {\n        category: "WidgetContentLayout.Content",\n        type: {\n          summary: "boolean"\n        },\n        defaultValue: {\n          summary: "false"\n        }\n      }\n    }\n  }\n}',
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
CenteredContent.parameters = {
  ...CenteredContent.parameters,
  docs: {
    ...CenteredContent.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    centerContent: true\n  }\n}",
      ...CenteredContent.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Full", "BlockingLoading", "NonBlockingLoading", "CenteredContent"];
export {
  BlockingLoading,
  CenteredContent,
  Full,
  NonBlockingLoading,
  __namedExportsOrder,
  meta as default
};
