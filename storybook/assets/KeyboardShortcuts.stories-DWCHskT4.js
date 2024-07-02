var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { g as StagePanelState, U as UiFramework, h as Input, C as CommandItemDef } from "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./Key.enum-Nky5yUvk.js";
import { R as React } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-4-AayLg_.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./index-_WnuOxD8.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./DemoIModel-DuWsADYF.js";
function createProvider() {
  return {
    id: "widgets",
    provideWidgets: () => {
      return [
        createWidget(1, {
          content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Press ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "m" }),
              " to open a keyboard shortcut menu."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {})
          ] })
        })
      ];
    }
  };
}
function KeyboardShortcutsStory({
  processKeys,
  shortcutList
}) {
  const provider = createProvider();
  useDisableShortcuts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    processKeys && /* @__PURE__ */ jsxRuntimeExports.jsx(KeyboardShortcutHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppUiStory,
      {
        itemProviders: [provider],
        frontstages: [
          createFrontstage({
            leftPanelProps: {
              defaultState: StagePanelState.Open,
              pinned: true
            }
          })
        ],
        onInitialize: async () => {
          UiFramework.keyboardShortcuts.loadShortcuts(shortcutList);
        }
      }
    )
  ] });
}
function KeyboardShortcutHandler() {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement)
        return;
      UiFramework.keyboardShortcuts.processKey(
        e.key,
        e.altKey,
        e.ctrlKey,
        e.shiftKey
      );
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
  KeyboardShortcutsStory.__docgenInfo = { "description": "[KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions.", "displayName": "KeyboardShortcutsStory", "props": { "processKeys": { "defaultValue": null, "description": "If enabled adds additional key event processing to handle keyboard shortcuts.", "name": "processKeys", "required": true, "type": { "name": "boolean" } }, "shortcutList": { "defaultValue": null, "description": "List of keyboard shortcuts.", "name": "shortcutList", "required": true, "type": { "name": "KeyboardShortcutProps[]" } } } };
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
const Basic = {
  args: {
    shortcutList: [{
      key: "x",
      label: "Log to console",
      iconSpec: "icon-placeholder",
      execute: action("x")
    }, {
      key: "m",
      label: "Show shortcuts",
      iconSpec: "icon-placeholder",
      execute: () => {
        UiFramework.keyboardShortcuts.displayMenu();
      }
    }]
  }
};
const Nested = {
  args: {
    shortcutList: [{
      key: "l",
      label: "Logger",
      shortcuts: [{
        key: "x",
        label: "Log to console",
        iconSpec: "icon-placeholder",
        execute: action("x")
      }, {
        key: "y",
        label: "Log to console",
        iconSpec: "icon-placeholder",
        execute: action("y")
      }]
    }, {
      key: "m",
      label: "Show shortcuts",
      iconSpec: "icon-placeholder",
      execute: () => {
        UiFramework.keyboardShortcuts.displayMenu();
      }
    }]
  }
};
const KeyModifiers = {
  args: {
    shortcutList: [
      {
        key: "x",
        label: "Log to console",
        isCtrlKeyRequired: true,
        item: new CommandItemDef({
          commandId: "logToConsole",
          iconSpec: "icon-placeholder",
          execute: action("Ctrl + x")
        })
      },
      // TODO: modifier variants are not working
      // {
      //   key: "x",
      //   label: "Log to console",
      //   item: new CommandItemDef({
      //     commandId: "logToConsole",
      //     iconSpec: "icon-placeholder",
      //     execute: action("x"),
      //   }),
      // },
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
    ]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      key: "x",\n      label: "Log to console",\n      iconSpec: "icon-placeholder",\n      execute: action("x")\n    }, {\n      key: "m",\n      label: "Show shortcuts",\n      iconSpec: "icon-placeholder",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }]\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Nested.parameters = {
  ...Nested.parameters,
  docs: {
    ...(_d = Nested.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      key: "l",\n      label: "Logger",\n      shortcuts: [{\n        key: "x",\n        label: "Log to console",\n        iconSpec: "icon-placeholder",\n        execute: action("x")\n      }, {\n        key: "y",\n        label: "Log to console",\n        iconSpec: "icon-placeholder",\n        execute: action("y")\n      }]\n    }, {\n      key: "m",\n      label: "Show shortcuts",\n      iconSpec: "icon-placeholder",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }]\n  }\n}',
      ...(_f = (_e = Nested.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
KeyModifiers.parameters = {
  ...KeyModifiers.parameters,
  docs: {
    ...(_g = KeyModifiers.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      key: "x",\n      label: "Log to console",\n      isCtrlKeyRequired: true,\n      item: new CommandItemDef({\n        commandId: "logToConsole",\n        iconSpec: "icon-placeholder",\n        execute: action("Ctrl + x")\n      })\n    },\n    // TODO: modifier variants are not working\n    // {\n    //   key: "x",\n    //   label: "Log to console",\n    //   item: new CommandItemDef({\n    //     commandId: "logToConsole",\n    //     iconSpec: "icon-placeholder",\n    //     execute: action("x"),\n    //   }),\n    // },\n    {\n      key: "m",\n      label: "Show shortcuts",\n      item: new CommandItemDef({\n        commandId: "showShortcutsMenu",\n        iconSpec: "icon-placeholder",\n        execute: () => {\n          UiFramework.keyboardShortcuts.displayMenu();\n        }\n      })\n    }]\n  }\n}',
      ...(_i = (_h = KeyModifiers.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Nested", "KeyModifiers"];
export {
  Basic,
  KeyModifiers,
  Nested,
  __namedExportsOrder,
  meta as default
};
