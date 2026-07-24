import { j as jsxRuntimeExports, r as reactExports } from "./iframe-CpRh-TYa.js";
import { A as AppUiDecorator } from "./Decorators-Bz_dH9pg.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Be3BgbZq.js";
import { m as ToolbarItemUtilities, n as ToolbarUsage, o as ToolbarOrientation, U as UiFramework, w as ModalFrontstageButton, x as ModalFrontstage } from "./appui-react-BtU_mNFj.js";
import { S as SvgPlaceholder } from "./components-react-Dj8XcCyt.js";
import { c as createFrontstage } from "./Utils-BFxNE3WT.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DCghlnp9.js";
import "./blocks-DE0lqga4.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
import "./client-Cvp-1q-B.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function ModalFrontstageStory(props) {
  const { renderModalFrontstage, hideHeader, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      onInitialize: async () => {
        UiFramework.visibility.autoHideUi = false;
      },
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
                  ...rest
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
      renderModalFrontstage: renderModalFrontstage ? (args) => {
        return renderModalFrontstage(args, props);
      } : void 0,
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
ModalFrontstageStory.__docgenInfo = { "description": "[openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage.", "methods": [], "displayName": "ModalFrontstageStory", "props": { "renderModalFrontstage": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: RenderModalFrontstageArgs,\n  storyProps: ModalFrontstageStoryProps\n) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "Parameters[0]", "raw": 'Parameters<\n  NonNullable<AppUiStoryProps["renderModalFrontstage"]>\n>[0]' }, "name": "args" }, { "type": { "name": "ModalFrontstageStoryProps" }, "name": "storyProps" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "" } }, "composes": ["Pick"] };
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
const CustomLayout = {
  args: {
    renderModalFrontstage: ({
      info,
      isOpen
    }, storyProps) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalFrontstage, { isOpen, title: info.title, navigateBack: () => {
      UiFramework.frontstages.closeModalFrontstage();
    }, style: {
      backgroundColor: "var(--background-3)"
    }, hideHeader: storyProps.hideHeader, children: [
      info.content,
      " (custom layout)"
    ] }),
    hideHeader: false
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
CustomLayout.parameters = {
  ...CustomLayout.parameters,
  docs: {
    ...CustomLayout.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    renderModalFrontstage: ({\n      info,\n      isOpen\n    }, storyProps) => <ModalFrontstage isOpen={isOpen} title={info.title} navigateBack={() => {\n      UiFramework.frontstages.closeModalFrontstage();\n    }} style={{\n      backgroundColor: "var(--background-3)"\n    }} hideHeader={storyProps.hideHeader}>\n        {info.content} (custom layout)\n      </ModalFrontstage>,\n    hideHeader: false\n  }\n}',
      ...CustomLayout.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "BackButton", "AppBarRight", "NotifyCloseRequest", "CustomLayout"];
export {
  AppBarRight,
  BackButton,
  Basic,
  CustomLayout,
  NotifyCloseRequest,
  __namedExportsOrder,
  meta as default
};
