var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { R as React } from "./index-DM9bPmif.js";
import { v as StatusBarItemUtilities, w as StatusBarSection, x as ToolAssistanceField, I as IModelApp } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-EDRsojbr.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-oEM4RWbs.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
function NotificationsStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: [
        createFrontstage({
          hideStatusBar: false
        })
      ],
      itemProviders: [
        {
          id: "provider-1",
          getStatusBarItems: () => [
            StatusBarItemUtilities.createCustomItem(
              "uifw.ToolAssistance",
              StatusBarSection.Left,
              0,
              /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToolAssistanceField, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Prompt, {})
              ] })
            )
          ]
        }
      ]
    }
  );
}
function Prompt() {
  React.useEffect(() => {
    IModelApp.notifications.outputPrompt("Prompt message");
  }, []);
  return null;
}
try {
  NotificationsStory.displayName = "NotificationsStory";
  NotificationsStory.__docgenInfo = { "description": "[outputPrompt](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/outputprompt/) displays a prompt message in the status bar.", "displayName": "NotificationsStory", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Frontstage/Notifications/OutputPrompt",
  component: NotificationsStory,
  tags: ["autodocs"],
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
