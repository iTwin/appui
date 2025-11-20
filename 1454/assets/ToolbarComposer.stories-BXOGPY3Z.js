import { r as reactExports, i as e, j as jsxRuntimeExports, w as withResizer } from "./iframe-Dq7NZ5f-.js";
import "./Key.enum-C6kR_Rex.js";
import { U as UiFramework, K as PreviewFeaturesProvider, bp as ToolbarComposer, t as ToolbarUsage, v as ToolbarOrientation, bq as ToolbarHelper, s as ToolbarItemUtilities, aS as ConditionalIconItem, bi as ConditionalBooleanValue, aY as ConditionalStringValue, _ as CommandItemDef, br as ToolItemDef, S as SvgPlaceholder, bs as useConditionalValue, bt as SvgAdd, bu as SvgRemove, bv as IconHelper, bw as usePreviewFeatures, bx as useToolbarIcon, by as Icon } from "./appui-react-nLGuzzO4.js";
import { S as Svg2D } from "./2D-DHgy-ymB.js";
import { S as Svg3D } from "./3D-DMmnbekd.js";
import { S as SvgActivity } from "./Activity-btl726IO.js";
import { S as SvgAirplane } from "./Airplane-BjDJYYqL.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-DCdjo0Y2.js";
import { c as createBumpEvent } from "./createBumpEvent-BNF8aPmX.js";
import { e as enumArgType } from "./Utils-CAHEPdek.js";
import "./client-Tq8JgO2o.js";
const SvgClipboard = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M11.1 1.5v-.2c0-.1 0-.1-.1-.1H9.4V0h-3v1.2H4.8c-.1 0-.1 0-.1.1v.2H2V16h12V1.5zM13 15H3V2h1.7v.6c0 .1 0 .1.1.1H11c.1 0 .1 0 .1-.1V2H13z" })
  );
};
const SvgExport = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M12 12H2V5h2.2l2.5-2H0v11h14V8.4L12 10z" }),
    reactExports.createElement("path", { d: "M4 10c1.7-1.7 3.7-3.1 7-3v2l5-4-5-4v2c-3.5 0-7 3.1-7 7" })
  );
};
const genericPlaceholderIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='M1,1v14h14V1H1z%20M14,2.7v10.6L8.7,8L14,2.7z%20M8,7.3L2.7,2h10.6L8,7.3z%20M7.3,8L2,13.3V2.7L7.3,8z%20M8,8.7l5.3,5.3H2.7L8,8.7z'/%3e%3c/svg%3e";
const placeholderIcon = "" + new URL("placeholder-DKNetxeO.svg", import.meta.url).href;
function ToolbarComposerStory(props) {
  const { activeToolId, useStrataKit, ...rest } = props;
  e.useEffect(() => {
    if (!activeToolId) return;
    UiFramework.frontstages.setActiveToolId(activeToolId);
  }, [activeToolId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewFeaturesProvider, { features: { useStrataKit }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarComposer, { ...rest }) });
}
ToolbarComposerStory.__docgenInfo = { "description": "", "methods": [], "displayName": "ToolbarComposerStory", "props": { "activeToolId": { "required": false, "tsType": { "name": "string" }, "description": "Storybook only prop to simulate the active tool id." } }, "composes": ["Pick"] };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Components/ToolbarComposer",
  component: ToolbarComposerStory,
  tags: ["autodocs"],
  decorators: [withResizer, AppUiDecorator, InitializerDecorator],
  args: {
    useStrataKit: false,
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation
  },
  argTypes: {
    orientation: enumArgType(ToolbarOrientation),
    usage: enumArgType(ToolbarUsage)
  },
  parameters: {
    layout: "centered"
  }
};
const Empty = {
  args: {
    items: []
  }
};
const ActionItem = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem(), factory.createActionItem(), factory.createActionItem()];
    })()
  }
};
const GroupItem = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createGroupItem({
        items: [factory.createActionItem(), factory.createActionItem()]
      }), factory.createGroupItem({
        items: [factory.createActionItem(), factory.createActionItem(), factory.createGroupItem({
          items: [factory.createActionItem(), factory.createGroupItem({
            items: [factory.createActionItem()]
          })]
        })]
      }), factory.createGroupItem({
        items: Array.from({
          length: 10
        }, () => factory.createActionItem())
      })];
    })()
  }
};
const CustomItem = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createCustomItem(), factory.createCustomItem(), factory.createCustomItem()];
    })()
  }
};
const Badge = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      const badges = ["technical-preview", "new", "deprecated"];
      return [...badges.flatMap((badgeKind) => {
        return [factory.createActionItem({
          description: `${badgeKind} badge`,
          badgeKind
        }), factory.createGroupItem({
          description: `${badgeKind} badge`,
          badgeKind
        }), factory.createCustomItem({
          description: `${badgeKind} badge`,
          badgeKind
        })];
      })];
    })()
  }
};
const Disabled = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem({
        isDisabled: true
      }), factory.createGroupItem({
        isDisabled: true
      }), factory.createGroupItem({
        items: [factory.createActionItem({
          isDisabled: true
        }), factory.createActionItem({
          isDisabled: true
        }), factory.createGroupItem({
          isDisabled: true
        })]
      }), factory.createCustomItem({
        isDisabled: true
      })];
    })()
  }
};
const Hidden = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem(), factory.createActionItem(), factory.createActionItem({
        isHidden: true
      }), factory.createGroupItem({
        items: [factory.createActionItem()]
      }), factory.createGroupItem({
        items: [factory.createActionItem()]
      }), factory.createGroupItem({
        items: [factory.createActionItem()],
        isHidden: true
      }), factory.createCustomItem(), factory.createCustomItem(), factory.createCustomItem({
        isHidden: true
      })];
    })()
  }
};
const {
  getVal,
  bump,
  eventId
} = createBumpEvent();
const Conditional = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem({
        isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),
        execute: () => {
          bump();
        }
      }), {
        ...factory.createActionItem({
          label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),
          isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),
          description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])
        }),
        iconNode: void 0,
        icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), [eventId])
      }, factory.createActionItem({
        iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalReactIcon, {})
      }), factory.createGroupItem({
        items: [factory.createActionItem({
          label: new ConditionalStringValue(() => `Item 4 (${getVal()})`, [eventId])
        }), factory.createGroupItem({
          items: [factory.createActionItem({
            isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 0, [eventId])
          })]
        })]
      })];
    })()
  }
};
function ConditionalReactIcon() {
  const val = useConditionalValue(getVal, [eventId]);
  return val % 2 === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAdd, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgRemove, {});
}
const ItemDef = {
  args: {
    items: [ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}),
      label: "Item 1",
      execute: () => {
        bump();
        action("Item 1")();
      }
    })), ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}),
      label: "Item 2",
      execute: action("Item 2")
    }), {
      ...createAbstractReactIcon()
    }), ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAirplane, {}),
      label: "Item 3",
      execute: action("Item 3")
    }), {
      description: "Conditional icon overrides.",
      isDisabled: true,
      ...createAbstractConditionalIcon()
    }), ...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}),
      label: "Item 4",
      execute: action("Item 4")
    }), new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}),
      label: "Item 5",
      execute: action("Item 5")
    })], 200), ToolbarHelper.createToolbarItemFromItemDef(250, new ToolItemDef({
      toolId: "item6",
      execute: action("Item 6"),
      iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), [eventId])
    }))]
  }
};
const Icons = {
  args: {
    items: [ToolbarItemUtilities.createActionItem({
      id: "node",
      label: "Icon node",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }), ToolbarItemUtilities.createActionItem("spec-node", 0, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), "Icon spec node", () => {
    }), ToolbarItemUtilities.createActionItem("svg-loader", 0, genericPlaceholderIcon, "SVG loader", () => {
    }), ToolbarItemUtilities.createActionItem("font-icon", 0, "icon-placeholder", "Font icon", () => {
    }), ToolbarItemUtilities.createActionItem({
      id: "dynamic-icon",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, {}),
      label: "Dynamic icon"
    })]
  }
};
const GroupIcons = {
  args: {
    items: [ToolbarItemUtilities.createGroupItem({
      id: "group-node",
      label: "Icon Node",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      items: [...Icons.args.items]
    }), ToolbarItemUtilities.createGroupItem("group-spec-node", 0, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), "Icon Spec Node", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-svg-loader", 0, genericPlaceholderIcon, "SVG Loader", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-font-icon", 0, "icon-placeholder", "Font Icon", [...Icons.args.items])]
  }
};
const Separators = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      let groupPriority = 0;
      return [
        // All items of first group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true
        }),
        // Single item in a group
        factory.createActionItem({
          groupPriority: ++groupPriority
        }),
        // Single item in a group
        factory.createActionItem({
          groupPriority: ++groupPriority
        }),
        // Multiple items in a group
        factory.createActionItem({
          groupPriority: ++groupPriority
        }),
        factory.createActionItem({
          groupPriority
        }),
        // All items in a group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true
        }),
        // Last item of a group is hidden
        factory.createActionItem({
          groupPriority: ++groupPriority
        }),
        factory.createActionItem({
          groupPriority,
          isHidden: true
        }),
        // All items in a group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true
        }),
        // All items of last group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true
        })
      ];
    })()
  }
};
const ActiveToolId = {
  args: {
    activeToolId: "item3",
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem(), factory.createGroupItem({
        items: [factory.createActionItem(), factory.createGroupItem({
          items: [factory.createActionItem(), factory.createGroupItem({
            items: [factory.createActionItem()]
          })]
        }), factory.createActionItem()]
      }), factory.createActionItem()];
    })()
  }
};
const ActiveItemIds = {
  args: {
    activeItemIds: ["item3", "item10"],
    items: (() => {
      const factory = createItemFactory();
      return [factory.createActionItem(), factory.createGroupItem({
        items: [factory.createActionItem(), factory.createGroupItem({
          items: [factory.createActionItem(), factory.createGroupItem({
            items: [factory.createActionItem()]
          })]
        }), factory.createActionItem()]
      }), factory.createActionItem(), factory.createActionItem()];
    })()
  }
};
const Overflow = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      const createItems = () => Array.from({
        length: 8
      }).map(() => factory.createActionItem());
      return [...createItems(), factory.createGroupItem({
        items: [...createItems(), factory.createGroupItem({
          items: [...createItems(), factory.createGroupItem({
            items: [...createItems(), ...createItems()]
          }), ...createItems()]
        }), ...createItems()]
      }), ...createItems()];
    })()
  }
};
function createAbstractReactIcon() {
  const internalData = /* @__PURE__ */ new Map();
  const icon = IconHelper.getIconData(/* @__PURE__ */ jsxRuntimeExports.jsx(SvgExport, {}), internalData);
  return {
    internalData,
    icon
  };
}
function createAbstractConditionalIcon() {
  const internalData = /* @__PURE__ */ new Map();
  const icon = IconHelper.getIconData(new ConditionalIconItem(() => /* @__PURE__ */ jsxRuntimeExports.jsx(SvgExport, {}), [], /* @__PURE__ */ jsxRuntimeExports.jsx(SvgExport, {})), internalData);
  return {
    internalData,
    icon
  };
}
function createItemFactory() {
  let i = 0;
  function createActionItem(overrides) {
    const id = `item${++i}`;
    const label = `Item ${i}`;
    return ToolbarItemUtilities.createActionItem({
      id,
      label,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, {}),
      execute: () => action(label)(),
      ...overrides
    });
  }
  function createGroupItem(overrides) {
    const id = `group${++i}`;
    const label = `Group ${i}`;
    return ToolbarItemUtilities.createGroupItem({
      id,
      label,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, {}),
      ...overrides
    });
  }
  function createCustomItem(overrides) {
    const id = `custom${++i}`;
    const label = `Custom ${i}`;
    return ToolbarItemUtilities.createCustomItem({
      id,
      label,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, {}),
      panelContent: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Custom panel content ",
        i
      ] }),
      ...overrides
    });
  }
  return {
    createActionItem,
    createGroupItem,
    createCustomItem
  };
}
function DynamicIcon(props) {
  const {
    useStrataKit
  } = usePreviewFeatures();
  const {
    size
  } = useToolbarIcon();
  if (useStrataKit) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { href: `${placeholderIcon}#icon${size === "regular" ? "" : `-${size}`}`, size, ...props });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {});
}
Empty.parameters = {
  ...Empty.parameters,
  docs: {
    ...Empty.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: []\n  }\n}",
      ...Empty.parameters?.docs?.source
    }
  }
};
ActionItem.parameters = {
  ...ActionItem.parameters,
  docs: {
    ...ActionItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createActionItem(), factory.createActionItem()];\n    })()\n  }\n}",
      ...ActionItem.parameters?.docs?.source
    }
  }
};
GroupItem.parameters = {
  ...GroupItem.parameters,
  docs: {
    ...GroupItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createActionItem()]\n      }), factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createActionItem(), factory.createGroupItem({\n          items: [factory.createActionItem(), factory.createGroupItem({\n            items: [factory.createActionItem()]\n          })]\n        })]\n      }), factory.createGroupItem({\n        items: Array.from({\n          length: 10\n        }, () => factory.createActionItem())\n      })];\n    })()\n  }\n}",
      ...GroupItem.parameters?.docs?.source
    }
  }
};
CustomItem.parameters = {
  ...CustomItem.parameters,
  docs: {
    ...CustomItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createCustomItem(), factory.createCustomItem(), factory.createCustomItem()];\n    })()\n  }\n}",
      ...CustomItem.parameters?.docs?.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...Badge.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      const badges: ToolbarItem["badgeKind"][] = ["technical-preview", "new", "deprecated"];\n      return [...badges.flatMap(badgeKind => {\n        return [factory.createActionItem({\n          description: `${badgeKind} badge`,\n          badgeKind\n        }), factory.createGroupItem({\n          description: `${badgeKind} badge`,\n          badgeKind\n        }), factory.createCustomItem({\n          description: `${badgeKind} badge`,\n          badgeKind\n        })];\n      })];\n    })()\n  }\n}',
      ...Badge.parameters?.docs?.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...Disabled.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem({\n        isDisabled: true\n      }), factory.createGroupItem({\n        isDisabled: true\n      }), factory.createGroupItem({\n        items: [factory.createActionItem({\n          isDisabled: true\n        }), factory.createActionItem({\n          isDisabled: true\n        }), factory.createGroupItem({\n          isDisabled: true\n        })]\n      }), factory.createCustomItem({\n        isDisabled: true\n      })];\n    })()\n  }\n}",
      ...Disabled.parameters?.docs?.source
    }
  }
};
Hidden.parameters = {
  ...Hidden.parameters,
  docs: {
    ...Hidden.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createActionItem(), factory.createActionItem({\n        isHidden: true\n      }), factory.createGroupItem({\n        items: [factory.createActionItem()]\n      }), factory.createGroupItem({\n        items: [factory.createActionItem()]\n      }), factory.createGroupItem({\n        items: [factory.createActionItem()],\n        isHidden: true\n      }), factory.createCustomItem(), factory.createCustomItem(), factory.createCustomItem({\n        isHidden: true\n      })];\n    })()\n  }\n}",
      ...Hidden.parameters?.docs?.source
    }
  }
};
Conditional.parameters = {
  ...Conditional.parameters,
  docs: {
    ...Conditional.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem({\n        isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),\n        execute: () => {\n          bump();\n        }\n      }), {\n        ...factory.createActionItem({\n          label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),\n          isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),\n          description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])\n        }),\n        iconNode: undefined,\n        icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />, [eventId])\n      }, factory.createActionItem({\n        iconNode: <ConditionalReactIcon />\n      }), factory.createGroupItem({\n        items: [factory.createActionItem({\n          label: new ConditionalStringValue(() => `Item 4 (${getVal()})`, [eventId])\n        }), factory.createGroupItem({\n          items: [factory.createActionItem({\n            isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 0, [eventId])\n          })]\n        })]\n      })];\n    })()\n  }\n}",
      ...Conditional.parameters?.docs?.source
    }
  }
};
ItemDef.parameters = {
  ...ItemDef.parameters,
  docs: {
    ...ItemDef.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: "Item 1",\n      execute: () => {\n        bump();\n        action("Item 1")();\n      }\n    })), ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: "Item 2",\n      execute: action("Item 2")\n    }), {\n      ...createAbstractReactIcon()\n    }), ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({\n      iconSpec: <SvgAirplane />,\n      label: "Item 3",\n      execute: action("Item 3")\n    }), {\n      description: "Conditional icon overrides.",\n      isDisabled: true,\n      ...createAbstractConditionalIcon()\n    }), ...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: "Item 4",\n      execute: action("Item 4")\n    }), new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: "Item 5",\n      execute: action("Item 5")\n    })], 200), ToolbarHelper.createToolbarItemFromItemDef(250, new ToolItemDef({\n      toolId: "item6",\n      execute: action("Item 6"),\n      iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />, [eventId])\n    }))]\n  }\n}',
      ...ItemDef.parameters?.docs?.source
    }
  }
};
Icons.parameters = {
  ...Icons.parameters,
  docs: {
    ...Icons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [ToolbarItemUtilities.createActionItem({\n      id: "node",\n      label: "Icon node",\n      icon: <SvgPlaceholder />\n    }), ToolbarItemUtilities.createActionItem("spec-node", 0, <SvgPlaceholder />, "Icon spec node", () => {}), ToolbarItemUtilities.createActionItem("svg-loader", 0, genericPlaceholderIcon, "SVG loader", () => {}), ToolbarItemUtilities.createActionItem("font-icon", 0, "icon-placeholder", "Font icon", () => {}), ToolbarItemUtilities.createActionItem({\n      id: "dynamic-icon",\n      icon: <DynamicIcon />,\n      label: "Dynamic icon"\n    })]\n  }\n} satisfies Story',
      ...Icons.parameters?.docs?.source
    }
  }
};
GroupIcons.parameters = {
  ...GroupIcons.parameters,
  docs: {
    ...GroupIcons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [ToolbarItemUtilities.createGroupItem({\n      id: "group-node",\n      label: "Icon Node",\n      icon: <SvgPlaceholder />,\n      items: [...Icons.args.items]\n    }), ToolbarItemUtilities.createGroupItem("group-spec-node", 0, <SvgPlaceholder />, "Icon Spec Node", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-svg-loader", 0, genericPlaceholderIcon, "SVG Loader", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-font-icon", 0, "icon-placeholder", "Font Icon", [...Icons.args.items])]\n  }\n}',
      ...GroupIcons.parameters?.docs?.source
    }
  }
};
Separators.parameters = {
  ...Separators.parameters,
  docs: {
    ...Separators.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      let groupPriority = 0;\n      return [\n      // All items of first group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // Single item in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }),\n      // Single item in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }),\n      // Multiple items in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }), factory.createActionItem({\n        groupPriority: groupPriority\n      }),\n      // All items in a group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // Last item of a group is hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }), factory.createActionItem({\n        groupPriority: groupPriority,\n        isHidden: true\n      }),\n      // All items in a group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // All items of last group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      })];\n    })()\n  }\n}",
      ...Separators.parameters?.docs?.source
    }
  }
};
ActiveToolId.parameters = {
  ...ActiveToolId.parameters,
  docs: {
    ...ActiveToolId.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    activeToolId: "item3",\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createGroupItem({\n          items: [factory.createActionItem(), factory.createGroupItem({\n            items: [factory.createActionItem()]\n          })]\n        }), factory.createActionItem()]\n      }), factory.createActionItem()];\n    })()\n  }\n}',
      ...ActiveToolId.parameters?.docs?.source
    }
  }
};
ActiveItemIds.parameters = {
  ...ActiveItemIds.parameters,
  docs: {
    ...ActiveItemIds.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    activeItemIds: ["item3", "item10"],\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createGroupItem({\n          items: [factory.createActionItem(), factory.createGroupItem({\n            items: [factory.createActionItem()]\n          })]\n        }), factory.createActionItem()]\n      }), factory.createActionItem(), factory.createActionItem()];\n    })()\n  }\n}',
      ...ActiveItemIds.parameters?.docs?.source
    }
  }
};
Overflow.parameters = {
  ...Overflow.parameters,
  docs: {
    ...Overflow.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      const createItems = () => Array.from({\n        length: 8\n      }).map(() => factory.createActionItem());\n      return [...createItems(), factory.createGroupItem({\n        items: [...createItems(), factory.createGroupItem({\n          items: [...createItems(), factory.createGroupItem({\n            items: [...createItems(), ...createItems()]\n          }), ...createItems()]\n        }), ...createItems()]\n      }), ...createItems()];\n    })()\n  }\n}",
      ...Overflow.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Empty", "ActionItem", "GroupItem", "CustomItem", "Badge", "Disabled", "Hidden", "Conditional", "ItemDef", "Icons", "GroupIcons", "Separators", "ActiveToolId", "ActiveItemIds", "Overflow"];
export {
  ActionItem,
  ActiveItemIds,
  ActiveToolId,
  Badge,
  Conditional,
  CustomItem,
  Disabled,
  Empty,
  GroupIcons,
  GroupItem,
  Hidden,
  Icons,
  ItemDef,
  Overflow,
  Separators,
  __namedExportsOrder,
  meta as default
};
