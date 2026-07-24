import { j as jsxRuntimeExports } from "./iframe-CpRh-TYa.js";
import { U as UiFramework, W as WidgetState, m as ToolbarItemUtilities, n as ToolbarUsage, o as ToolbarOrientation, p as StagePanelState } from "./appui-react-BtU_mNFj.js";
import { S as SvgPlaceholder } from "./components-react-Dj8XcCyt.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-Be3BgbZq.js";
import { a as createWidget, c as createFrontstage } from "./Utils-BFxNE3WT.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DCghlnp9.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
import "./client-Cvp-1q-B.js";
import "./blocks-DE0lqga4.js";
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
