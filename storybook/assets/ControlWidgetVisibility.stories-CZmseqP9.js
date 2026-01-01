import { j as jsxRuntimeExports } from "./iframe-BMMt6Qh8.js";
import { A as AppUiDecorator } from "./Decorators-dFT355_j.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Dny5S618.js";
import { K as PreviewFeaturesProvider, w as StagePanelState, W as WidgetState } from "./appui-react-Cz4Q9cY4.js";
import { c as createFrontstage, a as createWidget } from "./Utils-7SBuMPvL.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DpqfsKm8.js";
import "./blocks-KaRYsgKH.js";
import "./index-B0PW13ef.js";
import "./client-BZ3qZmlJ.js";
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
NoDropdown.parameters = {
  ...NoDropdown.parameters,
  docs: {
    ...NoDropdown.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    dropdownThreshold: 10\n  }\n}",
      ...NoDropdown.parameters?.docs?.source
    }
  }
};
AllHidden.parameters = {
  ...AllHidden.parameters,
  docs: {
    ...AllHidden.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    visibleWidgets: 0\n  }\n}",
      ...AllHidden.parameters?.docs?.source
    }
  }
};
SpecifiedIds.parameters = {
  ...SpecifiedIds.parameters,
  docs: {
    ...SpecifiedIds.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    controlWidgetVisibility: ["w1", "w2"],\n    visibleWidgets: 5\n  }\n}',
      ...SpecifiedIds.parameters?.docs?.source
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
