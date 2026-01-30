import { j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-BbgzA-a2.js";
import { o as ConfigurableUiContent, p as StagePanelSection, q as StagePanelLocation, W as WidgetState } from "./appui-react-CxqBCL1K.js";
import { c as createFrontstage, a as createWidget } from "./Utils-65SDZWWd.js";
import "./Key.enum-BlUwKc_n.js";
import "./blocks-w2bBkgKV.js";
import "./client-CdcWlIUh.js";
function StoryComponent(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
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
  decorators: [AppUiDecorator],
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
  }
};
const HideWidgetIcons = {
  args: {
    widgetIcon: false
  }
};
const MixedStyles = {
  args: {
    widgetOpacity: 0.7,
    showActiveWidgetLabel: true,
    widgetIcon: true
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
      originalSource: "{\n  args: {\n    showActiveWidgetLabel: true\n  }\n}",
      ...ShowActiveWidgetLabel.parameters?.docs?.source
    }
  }
};
HideWidgetIcons.parameters = {
  ...HideWidgetIcons.parameters,
  docs: {
    ...HideWidgetIcons.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgetIcon: false\n  }\n}",
      ...HideWidgetIcons.parameters?.docs?.source
    }
  }
};
MixedStyles.parameters = {
  ...MixedStyles.parameters,
  docs: {
    ...MixedStyles.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgetOpacity: 0.7,\n    showActiveWidgetLabel: true,\n    widgetIcon: true\n  }\n}",
      ...MixedStyles.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "SemiTransparentWidgets", "ShowActiveWidgetLabel", "HideWidgetIcons", "MixedStyles"];
export {
  Default,
  HideWidgetIcons,
  MixedStyles,
  SemiTransparentWidgets,
  ShowActiveWidgetLabel,
  __namedExportsOrder,
  meta as default
};
