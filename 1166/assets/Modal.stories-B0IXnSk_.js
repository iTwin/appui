var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { A as AppUiDecorator } from "./Decorators-x8inxzPO.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-3D9ZashJ.js";
import { T as ToolbarItemUtilities, S as SvgPlaceholder, U as UiFramework, n as ToolbarOrientation, o as ToolbarUsage, Q as ModalFrontstageButton } from "./appui-react-CAF-EnJw.js";
import "./index-DDLqOySG.js";
import "./Dialog-DHi06CZF.js";
import "./index-BwI9SQDf.js";
import "./iframe-B2JFTSYG.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-Cq6eXiS7.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
import "./takeUntil-BNHFK4sB.js";
import "./share-CerbYeRM.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
function ModalFrontstageStory(props) {
  const { backButton } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: () => [createFrontstage()],
      itemProviders: [
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem({
              id: "open",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
              label: "Open modal frontstage",
              execute: () => {
                UiFramework.frontstages.openModalFrontstage({
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Modal frontstage content" }),
                  title: "My Modal Frontstage",
                  backButton
                });
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
ModalFrontstageStory.__docgenInfo = { "description": "[openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage.", "methods": [], "displayName": "ModalFrontstageStory" };
const meta = {
  title: "Frontstage/ModalFrontstage",
  component: ModalFrontstageStory,
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
const BackButton = {
  args: {
    backButton: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFrontstageButton, { onClick: () => {
      const result = confirm("Are you sure you want to go back?");
      if (!result) return;
      UiFramework.frontstages.closeModalFrontstage();
    } })
  }
};
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
BackButton.parameters = {
  ...BackButton.parameters,
  docs: {
    ...(_d = BackButton.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    backButton: <ModalFrontstageButton onClick={() => {\n      const result = confirm("Are you sure you want to go back?");\n      if (!result) return;\n      UiFramework.frontstages.closeModalFrontstage();\n    }} />\n  }\n}',
      ...(_f = (_e = BackButton.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Basic", "BackButton"];
export {
  BackButton,
  Basic,
  __namedExportsOrder,
  meta as default
};
