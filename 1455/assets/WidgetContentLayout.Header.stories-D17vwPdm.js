import { j as jsxRuntimeExports } from "./iframe-B7Vu6-Nd.js";
import { A as AppUiDecorator } from "./Decorators-CSBItz6J.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Beo-UPAP.js";
import { a6 as WidgetContentLayout, w as StagePanelState, S as SvgPlaceholder } from "./appui-react-C03ZSW7W.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BJP4_Q3q.js";
import { B as Button } from "./Key.enum-vvj7KXZL.js";
import "./blocks-IUZ6V50a.js";
import "./client-cEhHFPCd.js";
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
const meta = {
  title: "Widget/Layout/Header",
  component: WidgetContentLayoutHeader,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}),
      source: {
        code: `<WidgetContentLayout id="header-widget">
    <WidgetContentLayout.Header
      title="Title"
      menu={{
        title: "Dropdown Menu",
        items: [
          { label: "Item 1", onClick: () => console.log("Item 1 clicked") },
          { label: "Item 2", onClick: () => console.log("Item 2 clicked") },
        ],
      }}
      icons={[
        { label: "Icon 1", icon: <SvgPlaceholder />, onClick: () => console.log("Icon 1 clicked") },
        { label: "Icon 2", icon: <SvgPlaceholder />, onClick: () => console.log("Icon 2 clicked") },
      ]}
      buttons={[
        <Button>Button 1</Button>,
        <Button>Button 2</Button>
      ]}
    />
    <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
    <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
  </WidgetContentLayout>`
      }
    }
  }
};
const Full = {
  args: {
    title: "Title",
    menu: {
      title: "Select what is displayed below",
      items: [{
        label: "Item 1",
        onClick: () => console.log("Item 1 clicked")
      }, {
        label: "Item 2",
        onClick: () => console.log("Item 2 clicked")
      }]
    },
    icons: [{
      label: "Icon 1",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: () => console.log("Icon 1 clicked")
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: () => console.log("Icon 2 clicked")
    }],
    iconSize: "small",
    toggle: {
      label: "Toggle"
    },
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: () => console.log("Primary button clicked"), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => console.log("Secondary button clicked"), children: "Secondary" }, "button-2")],
    onSearch: (value) => console.log(`Search for: ${value}`)
  },
  argTypes: {
    title: {
      description: "Primary header title text shown in the header area.",
      control: {
        type: "text"
      },
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: "string"
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    },
    menu: {
      description: "Optional dropdown menu configuration. Provide { title, items } where items is an array of { label, onClick }.",
      control: {
        type: "object"
      },
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: "object"
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    },
    icons: {
      description: "Array of icon definitions displayed in the header (label, icon, onClick).",
      control: {
        type: "object"
      },
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: "Array"
        },
        defaultValue: {
          summary: "[]"
        }
      }
    },
    buttons: {
      description: "Array of JSX Buttons to render in the header actions area.",
      control: {
        type: "object"
      },
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: "Array<JSX.Element>"
        },
        defaultValue: {
          summary: "[]"
        }
      }
    },
    onSearch: {
      description: "Optional search callback function called with the search input value when the user submits a search.",
      table: {
        category: "WidgetContentLayout.Header",
        type: {
          summary: "(value: string) => void"
        },
        defaultValue: {
          summary: "undefined"
        }
      }
    },
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
        onClick: () => console.log("Item 1 clicked")
      }, {
        label: "Item 2",
        onClick: () => console.log("Item 2 clicked")
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
      onClick: () => console.log("Icon 1 clicked")
    }, {
      label: "Icon 2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      onClick: () => console.log("Icon 2 clicked")
    }],
    onSearch: (value) => console.log(`Search for: ${value}`)
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
    buttons: [/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { styleType: "high-visibility", onClick: () => console.log("Primary button clicked"), children: "Primary" }, "button-1"), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => console.log("Secondary button clicked"), children: "Secondary" }, "button-2")],
    onSearch: (value) => console.log(`Search for: ${value}`)
  }
};
const Toggle = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: (e) => console.log(`Toggle is now ${e.target.checked}`)
    }
  }
};
const CustomHeader = {
  args: {
    onSearch: (value) => console.log(`Search for: ${value}`),
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "8px",
      fontWeight: "bold",
      backgroundColor: "red"
    }, children: "Custom Header Content" })
  }
};
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...Full.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Title",\n    menu: {\n      title: "Select what is displayed below",\n      items: [{\n        label: "Item 1",\n        onClick: () => console.log("Item 1 clicked")\n      }, {\n        label: "Item 2",\n        onClick: () => console.log("Item 2 clicked")\n      }]\n    },\n    icons: [{\n      label: "Icon 1",\n      icon: <SvgPlaceholder />,\n      onClick: () => console.log("Icon 1 clicked")\n    }, {\n      label: "Icon 2",\n      icon: <SvgPlaceholder />,\n      onClick: () => console.log("Icon 2 clicked")\n    }],\n    iconSize: "small",\n    toggle: {\n      label: "Toggle"\n    },\n    buttons: [<Button styleType="high-visibility" key="button-1" onClick={() => console.log("Primary button clicked")}>\n        Primary\n      </Button>, <Button key="button-2" onClick={() => console.log("Secondary button clicked")}>\n        Secondary\n      </Button>],\n    onSearch: (value: string) => console.log(`Search for: ${value}`)\n  },\n  argTypes: {\n    title: {\n      description: "Primary header title text shown in the header area.",\n      control: {\n        type: "text"\n      },\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: "string"\n        },\n        defaultValue: {\n          summary: "undefined"\n        }\n      }\n    },\n    menu: {\n      description: "Optional dropdown menu configuration. Provide { title, items } where items is an array of { label, onClick }.",\n      control: {\n        type: "object"\n      },\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: "object"\n        },\n        defaultValue: {\n          summary: "undefined"\n        }\n      }\n    },\n    icons: {\n      description: "Array of icon definitions displayed in the header (label, icon, onClick).",\n      control: {\n        type: "object"\n      },\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: "Array"\n        },\n        defaultValue: {\n          summary: "[]"\n        }\n      }\n    },\n    buttons: {\n      description: "Array of JSX Buttons to render in the header actions area.",\n      control: {\n        type: "object"\n      },\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: "Array<JSX.Element>"\n        },\n        defaultValue: {\n          summary: "[]"\n        }\n      }\n    },\n    onSearch: {\n      description: "Optional search callback function called with the search input value when the user submits a search.",\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: "(value: string) => void"\n        },\n        defaultValue: {\n          summary: "undefined"\n        }\n      }\n    },\n    iconSize: {\n      control: {\n        type: "inline-radio"\n      },\n      options: ["small", undefined, "large"],\n      table: {\n        category: "WidgetContentLayout.Header",\n        type: {\n          summary: `\'small\' | undefined | \'large\'`\n        },\n        defaultValue: {\n          summary: "undefined"\n        }\n      }\n    }\n  }\n}',
      ...Full.parameters?.docs?.source
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
      originalSource: '{\n  args: {\n    menu: {\n      title: "Dropdown Menu",\n      items: [{\n        label: "Item 1",\n        onClick: () => console.log("Item 1 clicked")\n      }, {\n        label: "Item 2",\n        onClick: () => console.log("Item 2 clicked")\n      }]\n    }\n  }\n}',
      ...Menu.parameters?.docs?.source
    }
  }
};
IconsAndSearch.parameters = {
  ...IconsAndSearch.parameters,
  docs: {
    ...IconsAndSearch.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    title: "Icons and Search",\n    icons: [{\n      label: "Icon 1",\n      icon: <SvgPlaceholder />,\n      onClick: () => console.log("Icon 1 clicked")\n    }, {\n      label: "Icon 2",\n      icon: <SvgPlaceholder />,\n      onClick: () => console.log("Icon 2 clicked")\n    }],\n    onSearch: (value: string) => console.log(`Search for: ${value}`)\n  },\n  argTypes: {\n    iconSize: {\n      control: {\n        type: "inline-radio"\n      },\n      options: ["small", undefined, "large"]\n    }\n  }\n}',
      ...IconsAndSearch.parameters?.docs?.source
    }
  }
};
Buttons.parameters = {
  ...Buttons.parameters,
  docs: {
    ...Buttons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    buttons: [<Button styleType="high-visibility" key="button-1" onClick={() => console.log("Primary button clicked")}>\n        Primary\n      </Button>, <Button key="button-2" onClick={() => console.log("Secondary button clicked")}>\n        Secondary\n      </Button>],\n    onSearch: (value: string) => console.log(`Search for: ${value}`)\n  }\n}',
      ...Buttons.parameters?.docs?.source
    }
  }
};
Toggle.parameters = {
  ...Toggle.parameters,
  docs: {
    ...Toggle.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    toggle: {\n      label: "Toggle",\n      onChange: e => console.log(`Toggle is now ${e.target.checked}`)\n    }\n  }\n}',
      ...Toggle.parameters?.docs?.source
    }
  }
};
CustomHeader.parameters = {
  ...CustomHeader.parameters,
  docs: {
    ...CustomHeader.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    onSearch: (value: string) => console.log(`Search for: ${value}`),\n    children: <div style={{\n      padding: "8px",\n      fontWeight: "bold",\n      backgroundColor: "red"\n    }}>\n        Custom Header Content\n      </div>\n  }\n}',
      ...CustomHeader.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Full", "Title", "Menu", "IconsAndSearch", "Buttons", "Toggle", "CustomHeader"];
export {
  Buttons,
  CustomHeader,
  Full,
  IconsAndSearch,
  Menu,
  Title,
  Toggle,
  __namedExportsOrder,
  meta as default
};
