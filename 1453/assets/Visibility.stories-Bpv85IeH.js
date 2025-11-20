import { j as jsxRuntimeExports } from "./iframe-DIqrB2BT.js";
import { U as UiFramework, W as WidgetState, s as ToolbarItemUtilities, S as SvgPlaceholder, t as ToolbarUsage, v as ToolbarOrientation, w as StagePanelState } from "./appui-react-CmcDt8M8.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-Ls3ZC5D9.js";
import { a as createWidget, c as createFrontstage } from "./Utils-B5tHSU7P.js";
import "./Key.enum-q6sQ_7Ej.js";
import "./client-BHE0PJ4Z.js";
import "./blocks-B5aShZ5Q.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function Component(_props) {
  return null;
}
const StoryDecorator = (_Story, context) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { onInitialize: async () => {
    UiFramework.visibility.autoHideUi = context.args.autoHideUi;
    UiFramework.visibility.inactivityTime = context.args.inactivityTime;
  }, frontstages: [createFrontstage({
    leftPanelProps: {
      pinned: true,
      defaultState: StagePanelState.Open
    }
  })], itemProviders: [{
    id: "p1",
    getToolbarItems: () => {
      const item = ToolbarItemUtilities.createActionItem("item1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), "Item", action("Item"), {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation
          }
        }
      });
      return [item, {
        ...item,
        id: "item2",
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ViewNavigation
          }
        }
      }];
    },
    getWidgets: () => [createWidget(1), createWidget(2, {
      defaultState: WidgetState.Floating
    })]
  }] });
};
const meta = {
  title: "Frontstage/Visibility",
  component: Component,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    autoHideUi: UiFramework.visibility.autoHideUi,
    inactivityTime: UiFramework.visibility.inactivityTime
  }
};
const Default = {};
const AutoHideUI = {
  args: {
    autoHideUi: true
  }
};
const InactivityTime = {
  args: {
    autoHideUi: true,
    inactivityTime: 1e3
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
AutoHideUI.parameters = {
  ...AutoHideUI.parameters,
  docs: {
    ...AutoHideUI.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    autoHideUi: true\n  }\n}",
      ...AutoHideUI.parameters?.docs?.source
    }
  }
};
InactivityTime.parameters = {
  ...InactivityTime.parameters,
  docs: {
    ...InactivityTime.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    autoHideUi: true,\n    inactivityTime: 1000\n  }\n}",
      ...InactivityTime.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "AutoHideUI", "InactivityTime"];
export {
  AutoHideUI,
  Default,
  InactivityTime,
  __namedExportsOrder,
  meta as default
};
