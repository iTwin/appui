import { j as jsxRuntimeExports } from "./iframe-BxVIzreG.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-QJAbI6jH.js";
import { P as Page, S as SimpleAppUiStory } from "./AppUiStory-DdY_3lSg.js";
import { w as ConfigurableUiContent, r as StagePanelSection, s as StagePanelLocation, W as WidgetState } from "./appui-react-CvaqSdj1.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CwcTKaa4.js";
import "./Key.enum-D5EC_Md2.js";
import "./blocks-mHkI2uPk.js";
import "./client-DWlsoIYR.js";
function StoryComponent(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SimpleAppUiStory,
    {
      frontstages: [createFrontstage()],
      itemProviders: [{
        id: "widgets",
        getWidgets: () => {
          const layouts = {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start
            }
          };
          return [createWidget(1, {
            defaultState: WidgetState.Floating,
            canFloat: {
              defaultPosition: {
                x: 20,
                y: 50
              },
              defaultSize: {
                width: 300,
                height: 200
              },
              isResizable: true
            },
            layouts
          }), createWidget(2, {
            layouts
          }), createWidget(3, {
            layouts
          }), createWidget(4, {
            layouts
          })];
        }
      }],
      displayChildrenOnly: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableUiContent, { style: {
        height: "calc(100vh - 2rem)"
      }, widgetOpacity: props.widgetOpacity, toolbarOpacity: props.toolbarOpacity, widgetIcon: props.widgetIcon, showActiveWidgetLabel: props.showActiveWidgetLabel })
    }
  );
}
const meta = {
  title: "Frontstage/ConfigurableUiContent",
  component: StoryComponent,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, AppUiDecorator],
  argTypes: {
    widgetOpacity: {
      control: {
        type: "number",
        min: 0,
        max: 1,
        step: 0.1
      }
    }
  },
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  }
};
const Default = {
  args: {
    widgetIcon: true,
    showActiveWidgetLabel: false,
    widgetOpacity: 1
  }
};
const SemiTransparentWidgets = {
  args: {
    widgetOpacity: 0.5
  }
};
const ShowActiveWidgetLabel = {
  args: {
    showActiveWidgetLabel: true
  },
  argTypes: {
    widgetOpacity: {
      table: {
        disable: true
      }
    }
  }
};
const HideWidgetIcons = {
  args: {
    widgetIcon: false
  },
  argTypes: {
    widgetOpacity: {
      table: {
        disable: true
      }
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgetIcon: true,\n    showActiveWidgetLabel: false,\n    widgetOpacity: 1\n  }\n}",
      ...Default.parameters?.docs?.source
    }
  }
};
SemiTransparentWidgets.parameters = {
  ...SemiTransparentWidgets.parameters,
  docs: {
    ...SemiTransparentWidgets.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgetOpacity: 0.5\n  }\n}",
      ...SemiTransparentWidgets.parameters?.docs?.source
    }
  }
};
ShowActiveWidgetLabel.parameters = {
  ...ShowActiveWidgetLabel.parameters,
  docs: {
    ...ShowActiveWidgetLabel.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    showActiveWidgetLabel: true\n  },\n  argTypes: {\n    widgetOpacity: {\n      table: {\n        disable: true\n      }\n    }\n  }\n}",
      ...ShowActiveWidgetLabel.parameters?.docs?.source
    }
  }
};
HideWidgetIcons.parameters = {
  ...HideWidgetIcons.parameters,
  docs: {
    ...HideWidgetIcons.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgetIcon: false\n  },\n  argTypes: {\n    widgetOpacity: {\n      table: {\n        disable: true\n      }\n    }\n  }\n}",
      ...HideWidgetIcons.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "SemiTransparentWidgets", "ShowActiveWidgetLabel", "HideWidgetIcons"];
export {
  Default,
  HideWidgetIcons,
  SemiTransparentWidgets,
  ShowActiveWidgetLabel,
  __namedExportsOrder,
  meta as default
};
