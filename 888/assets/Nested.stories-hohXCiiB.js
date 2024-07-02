var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-nqk_Q9zz.js";
import { ax as useTranslation, ay as SvgProgressBackwardCircular, U as UiFramework, ac as ToolbarItemUtilities, az as SvgPlaceholder, a5 as ToolbarOrientation, a6 as ToolbarUsage } from "./DefaultToolSettingsProvider-DIShliKp.js";
import "./Key.enum-BpJjJDFT.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { B as BackstageAppButton } from "./BackstageAppButton-8GGDWmHi.js";
import "./index-CUkxFfN0.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./index-B47T7vRo.js";
function NestedFrontstageAppButton({ icon, label, onClick }) {
  const { translate } = useTranslation();
  label = label ?? translate("commands.backToPreviousFrontstage");
  icon = icon ?? reactExports.createElement(SvgProgressBackwardCircular, null);
  return reactExports.createElement(BackstageAppButton, { label, icon, execute: () => {
    if (onClick) {
      onClick();
      return;
    }
    void UiFramework.frontstages.closeNestedFrontstage();
  } });
}
function createNestedFrontstage() {
  return createFrontstage({
    id: createNestedFrontstage.id,
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        style: {
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        },
        children: "Nested Content"
      }
    ),
    cornerButton: /* @__PURE__ */ jsxRuntimeExports.jsx(NestedFrontstageAppButton, {})
  });
}
createNestedFrontstage.id = "nested-frontstage";
function NestedFrontstageStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: () => [createFrontstage(), createNestedFrontstage()],
      itemProviders: [
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem(
              "open",
              10,
              /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
              "Open nested frontstage",
              async () => {
                const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
                  createNestedFrontstage.id
                );
                if (!frontstageDef)
                  return;
                UiFramework.frontstages.openNestedFrontstage(frontstageDef);
              },
              {
                layouts: {
                  standard: {
                    orientation: ToolbarOrientation.Horizontal,
                    usage: ToolbarUsage.ContentManipulation
                  }
                }
              }
            )
          ]
        }
      ],
      ...props
    }
  );
}
try {
  NestedFrontstageStory.displayName = "NestedFrontstageStory";
  NestedFrontstageStory.__docgenInfo = { "description": "[openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage.", "displayName": "NestedFrontstageStory", "props": { "frontstage": { "defaultValue": null, "description": "", "name": "frontstage", "required": false, "type": { "name": "Partial<StandardFrontstageProps>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Frontstage/NestedFrontstage",
  component: NestedFrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
