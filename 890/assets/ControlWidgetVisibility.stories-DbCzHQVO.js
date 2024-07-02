var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-DcOwcMQU.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-fnrsMa4G.js";
import { P as PreviewFeaturesProvider, g as StagePanelState, W as WidgetState } from "./DefaultToolSettingsProvider-CLwhashG.js";
import "./Key.enum-B7uESc6p.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import "./index-Cbc5TaX5.js";
import "./iframe-C9wXFbML.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./index-B47T7vRo.js";
function createProvider(visibleWidgets) {
  return {
    id: "widgets",
    getWidgets: () => {
      const count = Math.max(5, visibleWidgets + 3);
      return [...Array(count)].map((_, index) => {
        const id = index + 1;
        return createWidget(id, {
          defaultState: index < visibleWidgets ? void 0 : WidgetState.Hidden
        });
      });
    }
  };
}
function PreviewStory({
  controlWidgetVisibility,
  dropdownThreshold,
  visibleWidgets
}) {
  const provider = createProvider(visibleWidgets);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        controlWidgetVisibility,
        widgetActionDropdown: { threshold: dropdownThreshold }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      )
    }
  );
}
try {
  PreviewStory.displayName = "PreviewStory";
  PreviewStory.__docgenInfo = { "description": '`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button.', "displayName": "PreviewStory", "props": { "visibleWidgets": { "defaultValue": null, "description": "Number of non-hidden widgets.", "name": "visibleWidgets", "required": true, "type": { "name": "number" } }, "dropdownThreshold": { "defaultValue": null, "description": "Threshold of `widgetActionDropdown`.", "name": "dropdownThreshold", "required": true, "type": { "name": "number" } }, "controlWidgetVisibility": { "defaultValue": null, "description": "If `true`, additional UI elements are rendered to allow the end user of the layout to control widget visibility.\nAlternatively, an array of widget ids can be specified to only control specific widgets.\n@note Use {@link UiItemsManager } APIs to manage what widgets are available to the end-user.", "name": "controlWidgetVisibility", "required": true, "type": { "name": "boolean | string[]" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "PreviewFeatures/ControlWidgetVisibility",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    controlWidgetVisibility: true,
    visibleWidgets: 1,
    dropdownThreshold: 0
  }
};
const Default = {};
const NoDropdown = {
  args: {
    dropdownThreshold: 10
  }
};
const AllHidden = {
  args: {
    visibleWidgets: 0
  }
};
const SpecifiedIds = {
  args: {
    controlWidgetVisibility: ["w1", "w2"],
    visibleWidgets: 5
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
NoDropdown.parameters = {
  ...NoDropdown.parameters,
  docs: {
    ...(_d = NoDropdown.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    dropdownThreshold: 10\n  }\n}",
      ...(_f = (_e = NoDropdown.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
AllHidden.parameters = {
  ...AllHidden.parameters,
  docs: {
    ...(_g = AllHidden.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    visibleWidgets: 0\n  }\n}",
      ...(_i = (_h = AllHidden.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
SpecifiedIds.parameters = {
  ...SpecifiedIds.parameters,
  docs: {
    ...(_j = SpecifiedIds.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    controlWidgetVisibility: ["w1", "w2"],\n    visibleWidgets: 5\n  }\n}',
      ...(_l = (_k = SpecifiedIds.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["Default", "NoDropdown", "AllHidden", "SpecifiedIds"];
export {
  AllHidden,
  Default,
  NoDropdown,
  SpecifiedIds,
  __namedExportsOrder,
  meta as default
};
