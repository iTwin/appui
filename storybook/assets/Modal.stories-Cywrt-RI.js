import { j as jsxRuntimeExports, r as reactExports } from "./iframe-D6etZYKx.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cke2SHqr.js";
import { m as ToolbarItemUtilities, n as ToolbarUsage, o as ToolbarOrientation, U as UiFramework, w as ModalFrontstageButton } from "./appui-react-DQPnIqIU.js";
import { S as SvgPlaceholder } from "./components-react-CcAoSHHf.js";
import { c as createFrontstage } from "./Utils-WX8e-cwd.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DxiaZ4K2.js";
import "./blocks-C98UqoJ1.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
import "./client-8d8O9vwT.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function ModalFrontstageStory(props) {
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
                  id: "my-modal-frontstage",
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Modal frontstage content" }),
                  title: "My Modal Frontstage",
                  ...props
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
      ],
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFrontstageEvents, {})
    }
  );
}
function ModalFrontstageEvents() {
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
      action("onModalFrontstageChangedEvent")
    );
  }, []);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.addListener(
      (args) => {
        action("onCloseModalFrontstageRequestedEvent (close after 2s)")(args);
        setTimeout(args.stageCloseFunc, 2e3);
      }
    );
  }, []);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
      action("onModalFrontstageClosedEvent")
    );
  }, []);
  return null;
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
  },
  args: {
    notifyCloseRequest: false
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
const AppBarRight = {
  args: {
    appBarRight: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "appBarRight" })
  }
};
const NotifyCloseRequest = {
  args: {
    notifyCloseRequest: true
  }
};
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
BackButton.parameters = {
  ...BackButton.parameters,
  docs: {
    ...BackButton.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    backButton: <ModalFrontstageButton onClick={() => {\n      const result = confirm("Are you sure you want to go back?");\n      if (!result) return;\n      UiFramework.frontstages.closeModalFrontstage();\n    }} />\n  }\n}',
      ...BackButton.parameters?.docs?.source
    }
  }
};
AppBarRight.parameters = {
  ...AppBarRight.parameters,
  docs: {
    ...AppBarRight.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    appBarRight: <>appBarRight</>\n  }\n}",
      ...AppBarRight.parameters?.docs?.source
    }
  }
};
NotifyCloseRequest.parameters = {
  ...NotifyCloseRequest.parameters,
  docs: {
    ...NotifyCloseRequest.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    notifyCloseRequest: true\n  }\n}",
      ...NotifyCloseRequest.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "BackButton", "AppBarRight", "NotifyCloseRequest"];
export {
  AppBarRight,
  BackButton,
  Basic,
  NotifyCloseRequest,
  __namedExportsOrder,
  meta as default
};
