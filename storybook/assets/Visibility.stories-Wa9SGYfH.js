var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { U as UiFramework, i as StagePanelState, T as ToolbarItemUtilities, S as SvgPlaceholder, j as ToolbarOrientation, k as ToolbarUsage, W as WidgetState } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { P as Page, A as AppUiStory, c as createFrontstage, a as createWidget } from "./AppUiStory-oEM4RWbs.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./DemoIModel-DuWsADYF.js";
function Component(_props) {
  return null;
}
const StoryDecorator = (_Story, context) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
    onInitialize: async () => {
      UiFramework.visibility.autoHideUi = context.args.autoHideUi;
      UiFramework.visibility.inactivityTime = context.args.inactivityTime;
    },
    frontstages: [createFrontstage({
      leftPanelProps: {
        pinned: true,
        defaultState: StagePanelState.Open
      }
    })],
    itemProviders: [{
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
    }]
  });
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
