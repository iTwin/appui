var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { m as StagePanelState, U as UiFramework, Z as Input, E as CommandItemDef, r as BadgeType, S as SvgPlaceholder } from "./appui-react-CGyWeAly.js";
import { a as action } from "./chunk-D5ZWXAHU-CHda0_Q5.js";
import { A as AppUiDecorator } from "./Decorators-Bcyip9-g.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-CAnkot57.js";
import { R as React } from "./index-DDLqOySG.js";
import "./Dialog-9BWhrN4d.js";
import "./index-BwI9SQDf.js";
import "./iframe-Fr9Z2WEJ.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./v4-BL5qiJc1.js";
import "./index-B9CpaEkv.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
function createProvider() {
  return {
    id: "widgets",
    getWidgets: () => {
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
      if (e.target instanceof HTMLInputElement) return;
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
KeyboardShortcutsStory.__docgenInfo = { "description": "[KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions.", "methods": [], "displayName": "KeyboardShortcutsStory", "props": { "processKeys": { "required": true, "tsType": { "name": "boolean" }, "description": "If enabled adds additional key event processing to handle keyboard shortcuts." }, "shortcutList": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "KeyboardShortcutProps" }], "raw": "KeyboardShortcutProps[]" }, "description": "List of keyboard shortcuts." } } };
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
      // TODO: this is called twice when `m` is pressed and menu is displayed.
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
const Badge = {
  args: {
    shortcutList: [{
      key: "x",
      label: "Log to console",
      iconSpec: "icon-placeholder",
      execute: action("x"),
      badgeType: BadgeType.TechnicalPreview
    }, {
      key: "m",
      label: "Show shortcuts",
      iconSpec: "icon-placeholder",
      execute: () => {
        UiFramework.keyboardShortcuts.displayMenu();
      },
      badgeKind: "deprecated"
    }]
  }
};
const Icons = {
  args: {
    shortcutList: [{
      key: "m",
      label: "Show shortcuts",
      iconSpec: "icon-placeholder",
      execute: () => {
        UiFramework.keyboardShortcuts.displayMenu();
      }
    }, {
      // TODO: this is called twice when `m` is pressed and menu is displayed.
      key: "a",
      label: "`iconSpec` property CSS icon (deprecated)",
      iconSpec: "icon-placeholder",
      execute: action("a")
    }, {
      // TODO: this is called twice when `m` is pressed and menu is displayed.
      key: "b",
      label: "`iconSpec` property SVG (deprecated)",
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      execute: action("b")
    }, {
      // TODO: this is called twice when `m` is pressed and menu is displayed.
      key: "c",
      label: "`icon` property (deprecated)",
      icon: "icon-placeholder",
      execute: action("c")
    }, {
      key: "d",
      label: "`iconNode` property",
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      execute: action("d")
    }]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: "x",\n      label: "Log to console",\n      iconSpec: "icon-placeholder",\n      execute: action("x")\n    }, {\n      key: "m",\n      label: "Show shortcuts",\n      iconSpec: "icon-placeholder",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }]\n  }\n}',
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
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...(_j = Badge.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      key: "x",\n      label: "Log to console",\n      iconSpec: "icon-placeholder",\n      execute: action("x"),\n      badgeType: BadgeType.TechnicalPreview\n    }, {\n      key: "m",\n      label: "Show shortcuts",\n      iconSpec: "icon-placeholder",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      },\n      badgeKind: "deprecated"\n    }]\n  }\n}',
      ...(_l = (_k = Badge.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Icons.parameters = {
  ...Icons.parameters,
  docs: {
    ...(_m = Icons.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    shortcutList: [{\n      key: "m",\n      label: "Show shortcuts",\n      iconSpec: "icon-placeholder",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: "a",\n      label: "`iconSpec` property CSS icon (deprecated)",\n      iconSpec: "icon-placeholder",\n      execute: action("a")\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: "b",\n      label: "`iconSpec` property SVG (deprecated)",\n      iconSpec: <SvgPlaceholder />,\n      execute: action("b")\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: "c",\n      label: "`icon` property (deprecated)",\n      icon: "icon-placeholder",\n      execute: action("c")\n    }, {\n      key: "d",\n      label: "`iconNode` property",\n      iconNode: <SvgPlaceholder />,\n      execute: action("d")\n    }]\n  }\n}',
      ...(_o = (_n = Icons.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Nested", "KeyModifiers", "Badge", "Icons"];
export {
  Badge,
  Basic,
  Icons,
  KeyModifiers,
  Nested,
  __namedExportsOrder,
  meta as default
};
