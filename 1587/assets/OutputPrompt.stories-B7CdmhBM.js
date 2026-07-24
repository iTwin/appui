import { j as jsxRuntimeExports, R as React } from "./iframe-CpRh-TYa.js";
import { S as StatusBarItemUtilities, H as StatusBarSection, i as IModelApp } from "./appui-react-BtU_mNFj.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Be3BgbZq.js";
import { c as createFrontstage } from "./Utils-BFxNE3WT.js";
import "./Key.enum-DCghlnp9.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-C55R_lNc.js";
import "./preload-helper-UZRgTS1n.js";
import "./components-react-Dj8XcCyt.js";
import "./client-Cvp-1q-B.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
import "./blocks-DE0lqga4.js";
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
