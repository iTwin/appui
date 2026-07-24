import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, tt as Input } from "./iframe-DrBiZGmV.js";
import { Ft as StagePanelState, mn as CommandItemDef, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Hs as BadgeType, Vr as init_esm$1, Wi as SvgPlaceholder, bn as init_core_react } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/keyboard/KeyboardShortcuts.tsx
function createProvider() {
	return {
		id: "widgets",
		getWidgets: () => {
			return [createWidget(1, { content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
				"Press ",
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("code", { children: "m" }),
				" to open a keyboard shortcut menu."
			] }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {})] }) })];
		}
	};
}
/** [KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions. */
function KeyboardShortcutsStory({ processKeys, shortcutList }) {
	const provider = createProvider();
	useDisableShortcuts();
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [processKeys && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(KeyboardShortcutHandler, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [provider],
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })],
		onInitialize: async () => {
			UiFramework.keyboardShortcuts.loadShortcuts(shortcutList);
		}
	})] });
}
function KeyboardShortcutHandler() {
	import_react.useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.target instanceof HTMLInputElement) return;
			UiFramework.keyboardShortcuts.processKey(e.key, e.altKey, e.ctrlKey, e.shiftKey);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	return null;
}
/** Disables storybook shortcuts. */
function useDisableShortcuts() {
	import_react.useEffect(() => {
		const handleKeyDown = (e) => {
			e.stopPropagation();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});
}
var import_react, import_jsx_runtime$1;
var init_KeyboardShortcuts = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	KeyboardShortcutsStory.__docgenInfo = {
		"description": "[KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions.",
		"methods": [],
		"displayName": "KeyboardShortcutsStory",
		"props": {
			"processKeys": {
				"required": true,
				"tsType": { "name": "boolean" },
				"description": "If enabled adds additional key event processing to handle keyboard shortcuts."
			},
			"shortcutList": {
				"required": true,
				"tsType": {
					"name": "Array",
					"elements": [{ "name": "KeyboardShortcutProps" }],
					"raw": "KeyboardShortcutProps[]"
				},
				"description": "List of keyboard shortcuts."
			}
		}
	};
}));
//#endregion
//#region src/keyboard/KeyboardShortcuts.stories.tsx
var import_jsx_runtime, action, meta, Basic, Nested, KeyModifiers, Badge, Icons, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_Decorators();
	init_AppUiStory();
	init_KeyboardShortcuts();
	init_core_react();
	init_esm$1();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "KeyboardShortcuts",
		component: KeyboardShortcutsStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		args: { processKeys: true }
	};
	Basic = { args: { shortcutList: [{
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
	}] } };
	Nested = { args: { shortcutList: [{
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
	}] } };
	KeyModifiers = { args: { shortcutList: [{
		key: "x",
		label: "Log to console",
		isCtrlKeyRequired: true,
		item: new CommandItemDef({
			commandId: "logToConsole",
			iconSpec: "icon-placeholder",
			execute: action("Ctrl + x")
		})
	}, {
		key: "m",
		label: "Show shortcuts",
		item: new CommandItemDef({
			commandId: "showShortcutsMenu",
			iconSpec: "icon-placeholder",
			execute: () => {
				UiFramework.keyboardShortcuts.displayMenu();
			}
		})
	}] } };
	Badge = { args: { shortcutList: [{
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
	}] } };
	Icons = { args: { shortcutList: [
		{
			key: "m",
			label: "Show shortcuts",
			iconSpec: "icon-placeholder",
			execute: () => {
				UiFramework.keyboardShortcuts.displayMenu();
			}
		},
		{
			key: "a",
			label: "`iconSpec` property CSS icon (deprecated)",
			iconSpec: "icon-placeholder",
			execute: action("a")
		},
		{
			key: "b",
			label: "`iconSpec` property SVG (deprecated)",
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			execute: action("b")
		},
		{
			key: "c",
			label: "`icon` property (deprecated)",
			icon: "icon-placeholder",
			execute: action("c")
		},
		{
			key: "d",
			label: "`iconNode` property",
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			execute: action("d")
		}
	] } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    shortcutList: [{\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: \"x\",\n      label: \"Log to console\",\n      iconSpec: \"icon-placeholder\",\n      execute: action(\"x\")\n    }, {\n      key: \"m\",\n      label: \"Show shortcuts\",\n      iconSpec: \"icon-placeholder\",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }]\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	Nested.parameters = {
		...Nested.parameters,
		docs: {
			...Nested.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    shortcutList: [{\n      key: \"l\",\n      label: \"Logger\",\n      shortcuts: [{\n        key: \"x\",\n        label: \"Log to console\",\n        iconSpec: \"icon-placeholder\",\n        execute: action(\"x\")\n      }, {\n        key: \"y\",\n        label: \"Log to console\",\n        iconSpec: \"icon-placeholder\",\n        execute: action(\"y\")\n      }]\n    }, {\n      key: \"m\",\n      label: \"Show shortcuts\",\n      iconSpec: \"icon-placeholder\",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }]\n  }\n}",
				...Nested.parameters?.docs?.source
			}
		}
	};
	KeyModifiers.parameters = {
		...KeyModifiers.parameters,
		docs: {
			...KeyModifiers.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    shortcutList: [{\n      key: \"x\",\n      label: \"Log to console\",\n      isCtrlKeyRequired: true,\n      item: new CommandItemDef({\n        commandId: \"logToConsole\",\n        iconSpec: \"icon-placeholder\",\n        execute: action(\"Ctrl + x\")\n      })\n    },\n    // TODO: modifier variants are not working\n    // {\n    //   key: \"x\",\n    //   label: \"Log to console\",\n    //   item: new CommandItemDef({\n    //     commandId: \"logToConsole\",\n    //     iconSpec: \"icon-placeholder\",\n    //     execute: action(\"x\"),\n    //   }),\n    // },\n    {\n      key: \"m\",\n      label: \"Show shortcuts\",\n      item: new CommandItemDef({\n        commandId: \"showShortcutsMenu\",\n        iconSpec: \"icon-placeholder\",\n        execute: () => {\n          UiFramework.keyboardShortcuts.displayMenu();\n        }\n      })\n    }]\n  }\n}",
				...KeyModifiers.parameters?.docs?.source
			}
		}
	};
	Badge.parameters = {
		...Badge.parameters,
		docs: {
			...Badge.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    shortcutList: [{\n      key: \"x\",\n      label: \"Log to console\",\n      iconSpec: \"icon-placeholder\",\n      execute: action(\"x\"),\n      badgeType: BadgeType.TechnicalPreview\n    }, {\n      key: \"m\",\n      label: \"Show shortcuts\",\n      iconSpec: \"icon-placeholder\",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      },\n      badgeKind: \"deprecated\"\n    }]\n  }\n}",
				...Badge.parameters?.docs?.source
			}
		}
	};
	Icons.parameters = {
		...Icons.parameters,
		docs: {
			...Icons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    shortcutList: [{\n      key: \"m\",\n      label: \"Show shortcuts\",\n      iconSpec: \"icon-placeholder\",\n      execute: () => {\n        UiFramework.keyboardShortcuts.displayMenu();\n      }\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: \"a\",\n      label: \"`iconSpec` property CSS icon (deprecated)\",\n      iconSpec: \"icon-placeholder\",\n      execute: action(\"a\")\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: \"b\",\n      label: \"`iconSpec` property SVG (deprecated)\",\n      iconSpec: <SvgPlaceholder />,\n      execute: action(\"b\")\n    }, {\n      // TODO: this is called twice when `m` is pressed and menu is displayed.\n      key: \"c\",\n      label: \"`icon` property (deprecated)\",\n      icon: \"icon-placeholder\",\n      execute: action(\"c\")\n    }, {\n      key: \"d\",\n      label: \"`iconNode` property\",\n      iconNode: <SvgPlaceholder />,\n      execute: action(\"d\")\n    }]\n  }\n}",
				...Icons.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"Nested",
		"KeyModifiers",
		"Badge",
		"Icons"
	];
}))();
export { Badge, Basic, Icons, KeyModifiers, Nested, __namedExportsOrder, meta as default };
