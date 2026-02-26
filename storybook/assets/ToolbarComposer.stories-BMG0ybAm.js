import { r as reactExports, R as React, j as jsxRuntimeExports, F as withResizer } from "./iframe-BENp4d1r.js";
import "./Key.enum-CnwI7CFN.js";
import { U as UiFramework, bl as ToolbarComposer, t as ToolbarUsage, v as ToolbarOrientation, a0 as BadgeType, bm as ToolbarHelper, s as ToolbarItemUtilities, bn as SvgAdd, a_ as ConditionalIconItem, bj as ConditionalBooleanValue, aX as ConditionalStringValue, $ as CommandItemDef, bo as ToolItemDef, S as SvgPlaceholder, bp as useConditionalValue, bq as SvgRemove, br as IconHelper } from "./appui-react-CEufDDhs.js";
import { S as Svg2D } from "./2D-C9iH13g4.js";
import { S as Svg3D } from "./3D-CB0GvtTw.js";
import { S as SvgActivity } from "./Activity-q9e-ZcGz.js";
import { S as SvgAndroid, a as SvgAirplane } from "./Android-CSSpVtEw.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-DexZH3uj.js";
import { c as createBumpEvent } from "./createBumpEvent-BrmlRlyH.js";
import { e as enumArgType } from "./Utils-B8gUJSzA.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
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
const placeholderIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='M1,1v14h14V1H1z%20M14,2.7v10.6L8.7,8L14,2.7z%20M8,7.3L2.7,2h10.6L8,7.3z%20M7.3,8L2,13.3V2.7L7.3,8z%20M8,8.7l5.3,5.3H2.7L8,8.7z'/%3e%3c/svg%3e";
function ToolbarComposerStory(props) {
  const { activeToolId, ...rest } = props;
  React.useEffect(() => {
    if (!activeToolId) return;
    UiFramework.frontstages.setActiveToolId(activeToolId);
  }, [activeToolId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarComposer, { ...rest });
}
ToolbarComposerStory.__docgenInfo = { "description": "", "methods": [], "displayName": "ToolbarComposerStory", "props": { "activeToolId": { "required": false, "tsType": { "name": "string" }, "description": "Storybook only prop to simulate the active tool id." } } };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Components/ToolbarComposer",
  component: ToolbarComposerStory,
  tags: ["autodocs"],
  decorators: [withResizer, AppUiDecorator, InitializerDecorator],
  args: {
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
const items = createItems();
const Empty = {
  args: {
    items: []
  }
};
const ActionItem = {
  args: {
    items: [items.action1, items.action2, items.action3]
  }
};
const GroupItem = {
  args: {
    items: [items.group1, items.group2, items.group3]
  }
};
const CustomItem = {
  args: {
    items: [items.custom1, items.custom2, items.custom3]
  }
};
const Badge = {
  args: {
    items: [{
      ...items.action1,
      description: "TechnicalPreview badge",
      badge: BadgeType.TechnicalPreview
    }, {
      ...items.group1,
      description: "TechnicalPreview badge",
      badge: BadgeType.TechnicalPreview
    }, {
      ...items.custom1,
      description: "TechnicalPreview badge",
      badge: BadgeType.TechnicalPreview
    }, {
      ...items.action2,
      description: "New badge",
      badge: BadgeType.New
    }, {
      ...items.group2,
      description: "New badge",
      badge: BadgeType.New,
      items: items.group2.items.map((item, index) => {
        const badges = [BadgeType.New, BadgeType.TechnicalPreview, "deprecated"];
        const badgeIndex = index % badges.length;
        const badge = badges[badgeIndex];
        return {
          ...item,
          badge: typeof badge === "string" ? void 0 : badge,
          badgeKind: typeof badge === "string" ? badge : void 0
        };
      })
    }, {
      ...items.custom2,
      description: "New badge",
      badge: BadgeType.New
    }, {
      ...items.action3,
      description: "Deprecated badge",
      badgeKind: "deprecated"
    }, {
      ...items.group3,
      description: "Deprecated badge",
      badgeKind: "deprecated"
    }, {
      ...items.custom3,
      description: "Deprecated badge",
      badgeKind: "deprecated"
    }, {
      ...items.action4,
      description: "No badge",
      badge: BadgeType.None
    }]
  }
};
const Disabled = {
  args: {
    items: [{
      ...items.action1,
      isDisabled: true
    }, {
      ...items.group1,
      isDisabled: true
    }, {
      ...items.group2,
      items: items.group2.items.map((item) => ({
        ...item,
        isDisabled: true
      }))
    }, {
      ...items.custom1,
      isDisabled: true
    }]
  }
};
const Hidden = {
  args: {
    items: [items.action1, items.action2, {
      ...items.action3,
      isHidden: true
    }, items.group1, items.group2, {
      ...items.group3,
      isHidden: true
    }, items.custom1, items.custom2, {
      ...items.custom3,
      isHidden: true
    }]
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
      label: "Icon Node",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }), ToolbarItemUtilities.createActionItem("spec-node", 0, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), "Icon Spec Node", () => {
    }), ToolbarItemUtilities.createActionItem("svg-loader", 0, placeholderIcon, "SVG Loader", () => {
    }), ToolbarItemUtilities.createActionItem("font-icon", 0, "icon-placeholder", "Font Icon", () => {
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
    }), ToolbarItemUtilities.createGroupItem("group-spec-node", 0, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), "Icon Spec Node", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-svg-loader", 0, placeholderIcon, "SVG Loader", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-font-icon", 0, "icon-placeholder", "Font Icon", [...Icons.args.items])]
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
      const createItems2 = () => Array.from({
        length: 8
      }).map(() => factory.createActionItem());
      return [...createItems2(), factory.createGroupItem({
        items: [...createItems2(), factory.createGroupItem({
          items: [...createItems2(), factory.createGroupItem({
            items: [...createItems2(), ...createItems2()]
          }), ...createItems2()]
        }), ...createItems2()]
      }), ...createItems2()];
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
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
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
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      ...overrides
    });
  }
  return {
    createActionItem,
    createGroupItem
  };
}
function createItems() {
  const action1 = ToolbarItemUtilities.createActionItem("item1", 100, "", "Item 1", action("Item 1"), {
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {})
  });
  const action2 = ToolbarItemUtilities.createActionItem("item2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), "Item 2", action("Item 2"));
  const action3 = ToolbarItemUtilities.createActionItem("item3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAndroid, {}), "Item 3", action("Item 3"));
  const action4 = ToolbarItemUtilities.createActionItem("item4", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAdd, {}), "Item 4", action("Item 4"));
  const group1 = ToolbarItemUtilities.createGroupItem("group1", 100, "", "Group 1", [action1, action2], {
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {})
  });
  const group2_2 = ToolbarItemUtilities.createGroupItem("group2_2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAirplane, {}), "Group 2_2", [action2]);
  const group2_1 = ToolbarItemUtilities.createGroupItem("group2_1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAndroid, {}), "Group 2_1", [action1, group2_2]);
  const group2 = ToolbarItemUtilities.createGroupItem("group2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}), "Group 2", [action1, action2, group2_1]);
  const group3 = ToolbarItemUtilities.createGroupItem("group3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgExport, {}), "Group 3", Array.from({
    length: 10
  }, (_, i) => {
    const item = [action1, action2, action3][i % 3];
    return {
      ...item,
      id: `${item.id}_${i}`,
      label: `${item.label} (${i})`,
      itemPriority: i
    };
  }));
  const custom1 = ToolbarItemUtilities.createCustomItem("custom1", 100, "", "Custom 1", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Custom panel content 1" }), {
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {})
  });
  const custom2 = ToolbarItemUtilities.createCustomItem("custom2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), "Custom 2", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Custom panel content 2" }));
  const custom3 = ToolbarItemUtilities.createCustomItem("custom3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), "Custom 3", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Custom panel content 3" }));
  return {
    action1,
    action2,
    action3,
    action4,
    /** Group item. */
    group1,
    /** Group item with nested groups. */
    group2,
    /** Group item with multiple columns. */
    group3,
    custom1,
    custom2,
    custom3
  };
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
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3]\n  }\n}",
      ...ActionItem.parameters?.docs?.source
    }
  }
};
GroupItem.parameters = {
  ...GroupItem.parameters,
  docs: {
    ...GroupItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.group1, items.group2, items.group3]\n  }\n}",
      ...GroupItem.parameters?.docs?.source
    }
  }
};
CustomItem.parameters = {
  ...CustomItem.parameters,
  docs: {
    ...CustomItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.custom1, items.custom2, items.custom3]\n  }\n}",
      ...CustomItem.parameters?.docs?.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...Badge.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [{\n      ...items.action1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.group1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.custom1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.action2,\n      description: "New badge",\n      badge: BadgeType.New\n    }, {\n      ...items.group2,\n      description: "New badge",\n      badge: BadgeType.New,\n      items: items.group2.items.map((item, index) => {\n        const badges = [BadgeType.New, BadgeType.TechnicalPreview, "deprecated"];\n        const badgeIndex = index % badges.length;\n        const badge = badges[badgeIndex];\n        return {\n          ...item,\n          badge: typeof badge === "string" ? undefined : badge,\n          badgeKind: typeof badge === "string" ? badge : undefined\n        };\n      })\n    }, {\n      ...items.custom2,\n      description: "New badge",\n      badge: BadgeType.New\n    }, {\n      ...items.action3,\n      description: "Deprecated badge",\n      badgeKind: "deprecated"\n    }, {\n      ...items.group3,\n      description: "Deprecated badge",\n      badgeKind: "deprecated"\n    }, {\n      ...items.custom3,\n      description: "Deprecated badge",\n      badgeKind: "deprecated"\n    }, {\n      ...items.action4,\n      description: "No badge",\n      badge: BadgeType.None\n    }]\n  }\n}',
      ...Badge.parameters?.docs?.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...Disabled.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [{\n      ...items.action1,\n      isDisabled: true\n    }, {\n      ...items.group1,\n      isDisabled: true\n    }, {\n      ...items.group2,\n      items: items.group2.items.map(item => ({\n        ...item,\n        isDisabled: true\n      }))\n    }, {\n      ...items.custom1,\n      isDisabled: true\n    }]\n  }\n}",
      ...Disabled.parameters?.docs?.source
    }
  }
};
Hidden.parameters = {
  ...Hidden.parameters,
  docs: {
    ...Hidden.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, {\n      ...items.action3,\n      isHidden: true\n    }, items.group1, items.group2, {\n      ...items.group3,\n      isHidden: true\n    }, items.custom1, items.custom2, {\n      ...items.custom3,\n      isHidden: true\n    }]\n  }\n}",
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
      originalSource: '{\n  args: {\n    items: [ToolbarItemUtilities.createActionItem({\n      id: "node",\n      label: "Icon Node",\n      icon: <SvgPlaceholder />\n    }), ToolbarItemUtilities.createActionItem("spec-node", 0, <SvgPlaceholder />, "Icon Spec Node", () => {}), ToolbarItemUtilities.createActionItem("svg-loader", 0, placeholderIcon, "SVG Loader", () => {}), ToolbarItemUtilities.createActionItem("font-icon", 0, "icon-placeholder", "Font Icon", () => {})]\n  }\n} satisfies Story',
      ...Icons.parameters?.docs?.source
    }
  }
};
GroupIcons.parameters = {
  ...GroupIcons.parameters,
  docs: {
    ...GroupIcons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [ToolbarItemUtilities.createGroupItem({\n      id: "group-node",\n      label: "Icon Node",\n      icon: <SvgPlaceholder />,\n      items: [...Icons.args.items]\n    }), ToolbarItemUtilities.createGroupItem("group-spec-node", 0, <SvgPlaceholder />, "Icon Spec Node", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-svg-loader", 0, placeholderIcon, "SVG Loader", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem("group-font-icon", 0, "icon-placeholder", "Font Icon", [...Icons.args.items])]\n  }\n}',
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
