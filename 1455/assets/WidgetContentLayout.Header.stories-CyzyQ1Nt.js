import { j as jsxRuntimeExports } from "./iframe-D1d7Ek9N.js";
import { A as AppUiDecorator } from "./Decorators-BGd6oKdZ.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-CmCUFlL_.js";
import { a6 as WidgetContentLayout, w as StagePanelState, S as SvgPlaceholder } from "./appui-react-CPCdSJxc.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CecUmvm7.js";
import { B as Button } from "./Key.enum-Cu1f0CYO.js";
import "./blocks-BMXrFF8o.js";
import "./client-BaOf5Sgr.js";
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
const { fn } = __STORYBOOK_MODULE_TEST__;
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
        onClick: fn()
      }, {
        label: "Item 2",
        onClick: fn()
      }]
    },
    icons: [{
      label: "Icon 1",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: fn()
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: fn()
    }],
    iconSize: "small",
    toggle: {
      label: "Toggle",
      onChange: fn()
    },
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: fn(), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: fn(), children: "Secondary" }, "button-2")],
    onSearch: fn()
  },
  argTypes: {
    iconSize: {
      control: {
        type: "inline-radio"
      },
      options: ["small", void 0, "large"],
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: `'small' | undefined | 'large'`
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    }
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
        onClick: fn()
      }, {
        label: "Item 2",
        onClick: fn()
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
      onClick: fn()
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: fn()
    }],
    onSearch: fn()
  },
  argTypes: {
    iconSize: {
      control: {
        type: "inline-radio"
      },
      options: ["small", void 0, "large"]
    }
  }
};
const Buttons = {
  args: {
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: fn(), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: fn(), children: "Secondary" }, "button-2")],
    onSearch: fn()
  }
};
const Toggle = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: fn()
    }
  }
};
const CustomHeader = {
  args: {
    onSearch: fn(),
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
      originalSource: `{
  args: {
    title: "Title",
    menu: {
      title: "Select what is displayed below",
      items: [{
        label: "Item 1",
        onClick: fn()
      }, {
        label: "Item 2",
        onClick: fn()
      }]
    },
    icons: [{
      label: "Icon 1",
      icon: <SvgPlaceholder />,
      onClick: fn()
    }, {
      label: "Icon 2",
      icon: <SvgPlaceholder />,
      onClick: fn()
    }],
    iconSize: "small",
    toggle: {
      label: "Toggle",
      onChange: fn()
    },
    buttons: [<Button styleType="high-visibility" key="button-1" onClick={fn()}>
        Primary
      </Button>, <Button key="button-2" onClick={fn()}>
        Secondary
      </Button>],
    onSearch: fn()
  },
  argTypes: {
    iconSize: {
      control: {
        type: "inline-radio"
      },
      options: ["small", undefined, "large"],
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: \`'small' | undefined | 'large'\`
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    }
  }
}`,
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
      originalSource: '{\n  args: {\n    menu: {\n      title: "Dropdown Menu",\n      items: [{\n        label: "Item 1",\n        onClick: fn()\n      }, {\n        label: "Item 2",\n        onClick: fn()\n      }]\n    }\n  }\n}',
      ...Menu.parameters?.docs?.source
    }
  }
};
IconsAndSearch.parameters = {
  ...IconsAndSearch.parameters,
  docs: {
    ...IconsAndSearch.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Icons and Search",\n    icons: [{\n      label: "Icon 1",\n      icon: <SvgPlaceholder />,\n      onClick: fn()\n    }, {\n      label: "Icon 2",\n      icon: <SvgPlaceholder />,\n      onClick: fn()\n    }],\n    onSearch: fn()\n  },\n  argTypes: {\n    iconSize: {\n      control: {\n        type: "inline-radio"\n      },\n      options: ["small", undefined, "large"]\n    }\n  }\n}',
      ...IconsAndSearch.parameters?.docs?.source
    }
  }
};
Buttons.parameters = {
  ...Buttons.parameters,
  docs: {
    ...Buttons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    buttons: [<Button styleType="high-visibility" key="button-1" onClick={fn()}>\n        Primary\n      </Button>, <Button key="button-2" onClick={fn()}>\n        Secondary\n      </Button>],\n    onSearch: fn()\n  }\n}',
      ...Buttons.parameters?.docs?.source
    }
  }
};
Toggle.parameters = {
  ...Toggle.parameters,
  docs: {
    ...Toggle.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    toggle: {\n      label: "Toggle",\n      onChange: fn()\n    }\n  }\n}',
      ...Toggle.parameters?.docs?.source
    }
  }
};
CustomHeader.parameters = {
  ...CustomHeader.parameters,
  docs: {
    ...CustomHeader.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    onSearch: fn(),\n    children: <div style={{\n      padding: "8px",\n      fontWeight: "bold",\n      backgroundColor: "var(--iui-color-background-accent)"\n    }}>\n        Custom Header Content\n      </div>\n  }\n}',
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
