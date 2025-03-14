var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { A as AppUiDecorator } from "./Decorators-CY7-4byT.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-B_qbUMp3.js";
import { E as useTranslation, a_ as SvgProgressBackwardCircular, U as UiFramework, v as ToolbarItemUtilities, S as SvgPlaceholder, w as ToolbarOrientation, x as ToolbarUsage } from "./appui-react-NJEdfdgZ.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { c as createFrontstage } from "./Utils-FnF0C2xB.js";
import { B as BackstageAppButton } from "./BackstageAppButton-CtkqcmT-.js";
import "./Dialog-DD-cRevJ.js";
import "./SvgCloseSmall-BizRFSWZ.js";
import "./index-CHBBkG1-.js";
import "./iframe-CVbTZ5MX.js";
import "../sb-preview/runtime.js";
import "./index-qX-VSfMD.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
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
