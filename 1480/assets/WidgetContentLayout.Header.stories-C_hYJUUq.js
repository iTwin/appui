import { j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BWJJvhLI.js";
import { a8 as WidgetContentLayout, w as StagePanelState, S as SvgPlaceholder } from "./appui-react-glMK-yaN.js";
import { c as createFrontstage, a as createWidget, u as unionArgType } from "./Utils-CtqzyU6g.js";
import { B as Button } from "./Key.enum-YmMvjtrc.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-C7SkmsIk.js";
import "./index-C9p5eh_j.js";
import "./client-7SU87-Ux.js";
function WidgetContentLayoutHeader(props) {
  const widgetContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Header, { ...props }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Body, { children: "Body" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContentLayout.Footer, { children: "Footer" })
  ] });
  const provider = {
    id: "widget-layout-provider",
    getWidgets: () => [
      createWidget(1, {
        content: widgetContent,
        label: "Widget Layout Demo"
      })
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      ]
    }
  );
}
WidgetContentLayoutHeader.__docgenInfo = { "description": "Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.", "methods": [], "displayName": "WidgetContentLayoutHeader" };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Widget/Layout/Header",
  component: WidgetContentLayoutHeader,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  }
};
const Default = {
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
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: action("Icon 1 clicked")
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: action("Icon 2 clicked")
    }],
    iconSize: "small",
    toggle: {
      label: "Toggle",
      onChange: action("Toggle changed")
    },
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: action("Primary button clicked"), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action("Secondary button clicked"), children: "Secondary" }, "button-2")],
    onSearch: action("Search performed")
  },
  argTypes: {
    iconSize: unionArgType(["small", void 0, "large"])
  }
};
const Title = {
  args: {
    title: "Title Only"
  }
};
const Menu = {
  args: {
    menu: {
      title: "Dropdown Menu",
      items: [{
        label: "Item 1",
        onClick: action("Item 1 clicked")
      }, {
        label: "Item 2",
        onClick: action("Item 2 clicked")
      }]
    }
  }
};
const IconsAndSearch = {
  args: {
    title: "Icons and Search",
    icons: [{
      label: "Icon 1",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: action("Icon 1 clicked")
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: action("Icon 2 clicked")
    }],
    onSearch: action("Search performed")
  },
  argTypes: {
    iconSize: unionArgType(["small", void 0, "large"])
  }
};
const Buttons = {
  args: {
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: action("Primary button clicked"), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action("Secondary button clicked"), children: "Secondary" }, "button-2")],
    onSearch: action("Search performed")
  }
};
const Toggle = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: action("Toggle changed")
    }
  }
};
const CustomHeader = {
  args: {
    onSearch: action("Search performed"),
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "8px",
      fontWeight: "bold",
      backgroundColor: "var(--iui-color-background-accent)"
    }, children: "Custom Header Content" })
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Title",\n    menu: {\n      title: "Select what is displayed below",\n      items: [{\n        label: "Item 1",\n        onClick: action("Item 1 clicked")\n      }, {\n        label: "Item 2",\n        onClick: action("Item 2 clicked")\n      }]\n    },\n    icons: [{\n      label: "Icon 1",\n      icon: <SvgPlaceholder />,\n      onClick: action("Icon 1 clicked")\n    }, {\n      label: "Icon 2",\n      icon: <SvgPlaceholder />,\n      onClick: action("Icon 2 clicked")\n    }],\n    iconSize: "small",\n    toggle: {\n      label: "Toggle",\n      onChange: action("Toggle changed")\n    },\n    buttons: [<Button styleType="high-visibility" key="button-1" onClick={action("Primary button clicked")}>\n        Primary\n      </Button>, <Button key="button-2" onClick={action("Secondary button clicked")}>\n        Secondary\n      </Button>],\n    onSearch: action("Search performed")\n  },\n  argTypes: {\n    iconSize: unionArgType(["small", undefined, "large"])\n  }\n}',
      ...Default.parameters?.docs?.source
    }
  }
};
Title.parameters = {
  ...Title.parameters,
  docs: {
    ...Title.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Title Only"\n  }\n}',
      ...Title.parameters?.docs?.source
    }
  }
};
Menu.parameters = {
  ...Menu.parameters,
  docs: {
    ...Menu.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    menu: {\n      title: "Dropdown Menu",\n      items: [{\n        label: "Item 1",\n        onClick: action("Item 1 clicked")\n      }, {\n        label: "Item 2",\n        onClick: action("Item 2 clicked")\n      }]\n    }\n  }\n}',
      ...Menu.parameters?.docs?.source
    }
  }
};
IconsAndSearch.parameters = {
  ...IconsAndSearch.parameters,
  docs: {
    ...IconsAndSearch.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Icons and Search",\n    icons: [{\n      label: "Icon 1",\n      icon: <SvgPlaceholder />,\n      onClick: action("Icon 1 clicked")\n    }, {\n      label: "Icon 2",\n      icon: <SvgPlaceholder />,\n      onClick: action("Icon 2 clicked")\n    }],\n    onSearch: action("Search performed")\n  },\n  argTypes: {\n    iconSize: unionArgType(["small", undefined, "large"])\n  }\n}',
      ...IconsAndSearch.parameters?.docs?.source
    }
  }
};
Buttons.parameters = {
  ...Buttons.parameters,
  docs: {
    ...Buttons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    buttons: [<Button styleType="high-visibility" key="button-1" onClick={action("Primary button clicked")}>\n        Primary\n      </Button>, <Button key="button-2" onClick={action("Secondary button clicked")}>\n        Secondary\n      </Button>],\n    onSearch: action("Search performed")\n  }\n}',
      ...Buttons.parameters?.docs?.source
    }
  }
};
Toggle.parameters = {
  ...Toggle.parameters,
  docs: {
    ...Toggle.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    toggle: {\n      label: "Toggle",\n      onChange: action("Toggle changed")\n    }\n  }\n}',
      ...Toggle.parameters?.docs?.source
    }
  }
};
CustomHeader.parameters = {
  ...CustomHeader.parameters,
  docs: {
    ...CustomHeader.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    onSearch: action("Search performed"),\n    children: <div style={{\n      padding: "8px",\n      fontWeight: "bold",\n      backgroundColor: "var(--iui-color-background-accent)"\n    }}>\n        Custom Header Content\n      </div>\n  }\n}',
      ...CustomHeader.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "Title", "Menu", "IconsAndSearch", "Buttons", "Toggle", "CustomHeader"];
export {
  Buttons,
  CustomHeader,
  Default,
  IconsAndSearch,
  Menu,
  Title,
  Toggle,
  __namedExportsOrder,
  meta as default
};
