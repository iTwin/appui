var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { A as AppUiDecorator } from "./Decorators-BpxewssG.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-DaycIAhE.js";
import { a2 as PreviewFeaturesProvider, m as StagePanelState, W as WidgetState } from "./appui-react-DGYRwXUL.js";
import "./index-DDLqOySG.js";
import "./Dialog-NGxTPZW5.js";
import "./iframe-BaKlUN2f.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./inheritsLoose-HEqISCW8.js";
import "./index-C5tpWVnr.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
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
PreviewStory.__docgenInfo = { "description": '`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button.', "methods": [], "displayName": "PreviewStory", "props": { "visibleWidgets": { "required": true, "tsType": { "name": "number" }, "description": "Number of non-hidden widgets." }, "dropdownThreshold": { "required": true, "tsType": { "name": "number" }, "description": "Threshold of `widgetActionDropdown`." } }, "composes": ["Pick"] };
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
