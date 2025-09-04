var _a, _b, _c;
import { r as reactExports, j as jsxRuntimeExports } from "./iframe-DQy1AcBq.js";
import { A as AppUiDecorator } from "./Decorators-HnNTMyPw.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BXOFIann.js";
import { L as useTranslation, aZ as SvgProgressBackwardCircular, U as UiFramework, x as ToolbarItemUtilities, y as ToolbarUsage, z as ToolbarOrientation, S as SvgPlaceholder } from "./appui-react-DY_MpVZu.js";
import { c as createFrontstage } from "./Utils-BD1aFGCE.js";
import { B as BackstageAppButton } from "./BackstageAppButton-eyfiBAOU.js";
import "./Key.enum-CmhcI3db.js";
import "./blocks-CQGsWLsF.js";
import "./client-G0M5LdjD.js";
function NestedFrontstageAppButton({ icon, label, onClick }) {
  const { translate } = useTranslation();
  label = label ?? translate("commands.backToPreviousFrontstage");
  icon = icon ?? reactExports.createElement(SvgProgressBackwardCircular, null);
  return reactExports.createElement(BackstageAppButton, { label, iconNode: icon, execute: () => {
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
function NestedFrontstageStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: () => [createFrontstage(), createNestedFrontstage()],
      itemProviders: [
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem({
              id: "open",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
              label: "Open nested frontstage",
              execute: async () => {
                const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
                  createNestedFrontstage.id
                );
                if (!frontstageDef) return;
                UiFramework.frontstages.openNestedFrontstage(frontstageDef);
              },
              layouts: {
                standard: {
                  orientation: ToolbarOrientation.Horizontal,
                  usage: ToolbarUsage.ContentManipulation
                }
              }
            })
          ]
        }
      ]
    }
  );
}
NestedFrontstageStory.__docgenInfo = { "description": "[openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage.", "methods": [], "displayName": "NestedFrontstageStory" };
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
