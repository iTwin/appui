import { j as jsxRuntimeExports, R as React } from "./iframe-CmD0Hb4y.js";
import { e as StatusBarItemUtilities, _ as StatusBarSection, j as IModelApp } from "./appui-react-DgImBujK.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DV8mE_E8.js";
import { c as createFrontstage } from "./Utils-DGcn9Fj-.js";
import "./Key.enum-DiqAEzk8.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-fFgXm_FD.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-eTkMhgnB.js";
import "./index-CzRyVTiY.js";
import "./blocks-CqC2p7bk.js";
import "./Tabs-CG_s7oBV.js";
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
NotificationsStory.__docgenInfo = { "description": "[outputPrompt](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/outputprompt/) displays a prompt message in the status bar.", "methods": [], "displayName": "NotificationsStory" };
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
