import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { _t as Button, i as init_esm } from "./iframe-DrBiZGmV.js";
import { E as WidgetContentLayout, Ft as StagePanelState, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm$1, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, o as unionArgType, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/widget/WidgetContentLayout/WidgetContentLayout.Header.tsx
/**
* Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.
* The WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,
* scrollable content area, and footer actions.
*/
function WidgetContentLayoutHeader(props) {
	const widgetContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(WidgetContentLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Header, { ...props }),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Body, { children: "Body" }),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Footer, { children: "Footer" })
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [{
			id: "widget-layout-provider",
			getWidgets: () => [createWidget(1, {
				content: widgetContent,
				label: "Widget Layout Demo"
			})]
		}],
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })]
	});
}
var import_jsx_runtime$1;
var init_WidgetContentLayout_Header = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	WidgetContentLayoutHeader.__docgenInfo = {
		"description": "Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.",
		"methods": [],
		"displayName": "WidgetContentLayoutHeader"
	};
}));
//#endregion
//#region src/widget/WidgetContentLayout/WidgetContentLayout.Header.stories.tsx
var import_jsx_runtime, action, meta, Default, Title, Menu, IconsAndSearch, Buttons, Toggle, CustomHeader, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_WidgetContentLayout_Header();
	init_esm$1();
	init_esm();
	init_Utils();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Widget/Layout/Header",
		component: WidgetContentLayoutHeader,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } }
	};
	Default = {
		args: {
			title: "Title",
			menu: {
				title: "Select what is displayed below",
				items: [{
					label: "Item 1",
					onClick: action("Item 1 clicked")
				}, {
					label: "Item 2",
					onClick: action("Item 2 clicked")
				}]
			},
			icons: [{
				label: "Icon 1",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
				onClick: action("Icon 1 clicked")
			}, {
				label: "Icon 2",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
				onClick: action("Icon 2 clicked")
			}],
			iconSize: "small",
			toggle: {
				label: "Toggle",
				onChange: action("Toggle changed")
			},
			buttons: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				styleType: "high-visibility",
				onClick: action("Primary button clicked"),
				children: "Primary"
			}, "button-1"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: action("Secondary button clicked"),
				children: "Secondary"
			}, "button-2")],
			onSearch: action("Search performed")
		},
		argTypes: { iconSize: unionArgType([
			"small",
			void 0,
			"large"
		]) }
	};
	Title = { args: { title: "Title Only" } };
	Menu = { args: { menu: {
		title: "Dropdown Menu",
		items: [{
			label: "Item 1",
			onClick: action("Item 1 clicked")
		}, {
			label: "Item 2",
			onClick: action("Item 2 clicked")
		}]
	} } };
	IconsAndSearch = {
		args: {
			title: "Icons and Search",
			icons: [{
				label: "Icon 1",
				tooltipContent: "This is the content of the tooltip for Icon 1",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
				onClick: action("Icon 1 clicked")
			}, {
				label: "Icon 2",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
				onClick: action("Icon 2 clicked")
			}],
			onSearch: action("Search performed"),
			disableSearch: false
		},
		argTypes: { iconSize: unionArgType([
			"small",
			void 0,
			"large"
		]) }
	};
	Buttons = { args: {
		buttons: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			styleType: "high-visibility",
			onClick: action("Primary button clicked"),
			children: "Primary"
		}, "button-1"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: action("Secondary button clicked"),
			children: "Secondary"
		}, "button-2")],
		onSearch: action("Search performed")
	} };
	Toggle = { args: { toggle: {
		label: "Toggle",
		onChange: action("Toggle changed")
	} } };
	CustomHeader = { args: {
		onSearch: action("Search performed"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: "8px",
				fontWeight: "bold",
				backgroundColor: "var(--iui-color-background-accent)"
			},
			children: "Custom Header Content"
		})
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    title: \"Title\",\n    menu: {\n      title: \"Select what is displayed below\",\n      items: [{\n        label: \"Item 1\",\n        onClick: action(\"Item 1 clicked\")\n      }, {\n        label: \"Item 2\",\n        onClick: action(\"Item 2 clicked\")\n      }]\n    },\n    icons: [{\n      label: \"Icon 1\",\n      icon: <SvgPlaceholder />,\n      onClick: action(\"Icon 1 clicked\")\n    }, {\n      label: \"Icon 2\",\n      icon: <SvgPlaceholder />,\n      onClick: action(\"Icon 2 clicked\")\n    }],\n    iconSize: \"small\",\n    toggle: {\n      label: \"Toggle\",\n      onChange: action(\"Toggle changed\")\n    },\n    buttons: [<Button styleType=\"high-visibility\" key=\"button-1\" onClick={action(\"Primary button clicked\")}>\n        Primary\n      </Button>, <Button key=\"button-2\" onClick={action(\"Secondary button clicked\")}>\n        Secondary\n      </Button>],\n    onSearch: action(\"Search performed\")\n  },\n  argTypes: {\n    iconSize: unionArgType([\"small\", undefined, \"large\"])\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	Title.parameters = {
		...Title.parameters,
		docs: {
			...Title.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    title: \"Title Only\"\n  }\n}",
				...Title.parameters?.docs?.source
			}
		}
	};
	Menu.parameters = {
		...Menu.parameters,
		docs: {
			...Menu.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    menu: {\n      title: \"Dropdown Menu\",\n      items: [{\n        label: \"Item 1\",\n        onClick: action(\"Item 1 clicked\")\n      }, {\n        label: \"Item 2\",\n        onClick: action(\"Item 2 clicked\")\n      }]\n    }\n  }\n}",
				...Menu.parameters?.docs?.source
			}
		}
	};
	IconsAndSearch.parameters = {
		...IconsAndSearch.parameters,
		docs: {
			...IconsAndSearch.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    title: \"Icons and Search\",\n    icons: [{\n      label: \"Icon 1\",\n      tooltipContent: \"This is the content of the tooltip for Icon 1\",\n      icon: <SvgPlaceholder />,\n      onClick: action(\"Icon 1 clicked\")\n    }, {\n      label: \"Icon 2\",\n      icon: <SvgPlaceholder />,\n      onClick: action(\"Icon 2 clicked\")\n    }],\n    onSearch: action(\"Search performed\"),\n    disableSearch: false\n  },\n  argTypes: {\n    iconSize: unionArgType([\"small\", undefined, \"large\"])\n  }\n}",
				...IconsAndSearch.parameters?.docs?.source
			}
		}
	};
	Buttons.parameters = {
		...Buttons.parameters,
		docs: {
			...Buttons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    buttons: [<Button styleType=\"high-visibility\" key=\"button-1\" onClick={action(\"Primary button clicked\")}>\n        Primary\n      </Button>, <Button key=\"button-2\" onClick={action(\"Secondary button clicked\")}>\n        Secondary\n      </Button>],\n    onSearch: action(\"Search performed\")\n  }\n}",
				...Buttons.parameters?.docs?.source
			}
		}
	};
	Toggle.parameters = {
		...Toggle.parameters,
		docs: {
			...Toggle.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    toggle: {\n      label: \"Toggle\",\n      onChange: action(\"Toggle changed\")\n    }\n  }\n}",
				...Toggle.parameters?.docs?.source
			}
		}
	};
	CustomHeader.parameters = {
		...CustomHeader.parameters,
		docs: {
			...CustomHeader.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    onSearch: action(\"Search performed\"),\n    children: <div style={{\n      padding: \"8px\",\n      fontWeight: \"bold\",\n      backgroundColor: \"var(--iui-color-background-accent)\"\n    }}>\n        Custom Header Content\n      </div>\n  }\n}",
				...CustomHeader.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"Title",
		"Menu",
		"IconsAndSearch",
		"Buttons",
		"Toggle",
		"CustomHeader"
	];
}))();
export { Buttons, CustomHeader, Default, IconsAndSearch, Menu, Title, Toggle, __namedExportsOrder, meta as default };
