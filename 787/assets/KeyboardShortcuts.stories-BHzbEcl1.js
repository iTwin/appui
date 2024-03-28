var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { A as AppUiDecorator } from "./Decorators-C3AIcKoW.js";
import { A as AppUiStory, c as createFrontstageProvider, P as Page } from "./AppUiStory-BtwpH1aH.js";
import { R as React } from "./index-DlkhCVTf.js";
import { S as StagePanelState, U as UiFramework, C as CommandItemDef, I as Input } from "./DefaultToolSettingsProvider-DnwPMY8p.js";
import "./index-Cm_5MPU1.js";
import "./index-Dr-11776.js";
import "./iframe-DDgUOPmj.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-BHflxGDg.js";
import "./DemoIModel-4Lmk67sy.js";
import "./index-B47T7vRo.js";
function createProvider() {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget1 = {
        id: "w1",
        label: "Widget 1",
        content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Press ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "m" }),
            " to open a keyboard shortcut menu."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {})
        ] })
      };
      return [widget1];
    }
  };
}
function createKeyboardShortcuts() {
  return [
    {
      key: "x",
      label: "Log to console",
      item: new CommandItemDef({
        commandId: "logToConsole",
        iconSpec: "icon-placeholder",
        execute: () => {
          console.log("x");
        }
      })
    },
    {
      key: "m",
      label: "Show shortcuts",
      item: new CommandItemDef({
        commandId: "showShortcutsMenu",
        iconSpec: "icon-placeholder",
        execute: () => {
          UiFramework.keyboardShortcuts.displayMenu();
        }
      })
    }
  ];
}
function KeyboardShortcutsStory(props) {
  const provider = createProvider();
  useDisableShortcuts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    props.processKeys && /* @__PURE__ */ jsxRuntimeExports.jsx(KeyboardShortcutHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppUiStory,
      {
        itemProviders: [provider],
        frontstageProviders: [
          createFrontstageProvider({
            leftPanelProps: {
              defaultState: StagePanelState.Open,
              pinned: true
            }
          })
        ],
        onInitialize: async () => {
          UiFramework.keyboardShortcuts.loadShortcuts(
            createKeyboardShortcuts()
          );
        }
      }
    )
  ] });
}
function KeyboardShortcutHandler() {
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target instanceof HTMLInputElement)
        return;
      UiFramework.keyboardShortcuts.processKey(
        e.key,
        e.altKey,
        e.ctrlKey,
        e.shiftKey
      );
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  return null;
}
function useDisableShortcuts() {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
}
try {
  KeyboardShortcutsStory.displayName = "KeyboardShortcutsStory";
  KeyboardShortcutsStory.__docgenInfo = { "description": "[KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions.", "displayName": "KeyboardShortcutsStory", "props": { "processKeys": { "defaultValue": null, "description": "If enabled adds additional key event processing to handle keyboard shortcuts.", "name": "processKeys", "required": true, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "KeyboardShortcuts",
  component: KeyboardShortcutsStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    processKeys: true
  }
};
const Default = {};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
