var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { a as action } from "./index-6lyHBX71.js";
import { U as UiFramework, W as WidgetState, x as ToolbarItemUtilities, S as SvgPlaceholder, y as ToolbarUsage, z as ToolbarOrientation, E as StagePanelState } from "./appui-react-BkfSqS8X.js";
import "./index-DVOlmhHI.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-GBbbQo2J.js";
import { a as createWidget, c as createFrontstage } from "./Utils-B1WGcpM1.js";
import "./index-CdGyBOBZ.js";
import "./v4-CjlX8hrF.js";
import "./Dialog-DgXpX9Dj.js";
import "./SvgCloseSmall-XFYEkVPL.js";
import "./iframe-C1WTrjKK.js";
import "./client-DmvY241V.js";
import "./index-CXp8466e.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
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
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
AutoHideUI.parameters = {
  ...AutoHideUI.parameters,
  docs: {
    ...(_d = AutoHideUI.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    autoHideUi: true\n  }\n}",
      ...(_f = (_e = AutoHideUI.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
InactivityTime.parameters = {
  ...InactivityTime.parameters,
  docs: {
    ...(_g = InactivityTime.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    autoHideUi: true,\n    inactivityTime: 1000\n  }\n}",
      ...(_i = (_h = InactivityTime.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
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
