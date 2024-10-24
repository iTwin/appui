var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { A as AppUiDecorator } from "./Decorators-BS-6RJ4s.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-QAZmwpGN.js";
import { aG as useTranslation, aZ as SvgProgressBackwardCircular, U as UiFramework, T as ToolbarItemUtilities, S as SvgPlaceholder, n as ToolbarOrientation, o as ToolbarUsage } from "./appui-react-BA4WsKUV.js";
import { r as reactExports } from "./index-DDLqOySG.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Sd0w8KgR.js";
import "./Dialog-DB4_e5QV.js";
import "./iframe-F1GALOEI.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./inheritsLoose-HEqISCW8.js";
import "./index-DEPzondj.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
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
                if (!frontstageDef) return;
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
NestedFrontstageStory.__docgenInfo = { "description": "[openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage.", "methods": [], "displayName": "NestedFrontstageStory", "props": { "frontstage": { "required": false, "tsType": { "name": "Partial", "elements": [{ "name": "StandardFrontstageProps" }], "raw": "Partial<StandardFrontstageProps>" }, "description": "" } } };
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
