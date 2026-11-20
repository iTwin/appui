import { j as jsxRuntimeExports, R as React } from "./iframe-D8NJimLr.js";
import { f as StatusBarItemUtilities, X as StatusBarSection, l as IModelApp } from "./appui-react-D6ABwSZ-.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-CSwfECLM.js";
import { c as createFrontstage } from "./Utils-Djyde08H.js";
import "./Key.enum-BiZltsZP.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-BD8yH7I2.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-D3QKcxNP.js";
import "./index-50wz-xKp.js";
import "./blocks-Bj0mf2N-.js";
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
