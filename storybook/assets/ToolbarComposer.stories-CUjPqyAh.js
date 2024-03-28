var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { v as ConditionalStringValue, az as IconHelper, C as CommandItemDef, aA as CustomItemDef, aB as GroupItemDef, ay as isToolbarActionItem, ax as isToolbarGroupItem, P as PreviewFeaturesProvider, ap as ToolbarOrientation, as as ToolbarUsage, d as BadgeType, ai as ConditionalIconItem, ak as ConditionalBooleanValue, ah as ToolbarItemUtilities, aC as SyncUiEventDispatcher } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { S as Svg2D } from "./2D-x8v64Bdm.js";
import { S as Svg3D, a as SvgClipboard, b as SvgAirplane } from "./Clipboard-D7Qxcpyi.js";
import "./index-Cm_5MPU1.js";
import { T as ToolItemDef, a as ToolbarComposer } from "./ToolbarComposer-BjvTER5Z.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-CXFXT6hr.js";
import { w as withResizer } from "./Resizer-KKflzMRu.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
const SvgActivity = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 32 32", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M31 16H20.7l-2.2 5L14.2.8 9.5 16H1.4c-.6 0-1.1.4-1.3.9-.3 1.2.3 2.1 1.3 2.1h10.1l2.2-7.2 4 18.5L22.5 19h8.1c1 0 1.6-.9 1.3-2.1-.2-.5-.7-.9-1.3-.9" })
  );
};
const SvgAndroid = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M3.285 6.184v4.122a.976.976 0 11-1.952 0V6.184a.976.976 0 111.952 0zm2.581-4.715L5.178.209a.142.142 0 01.054-.191.138.138 0 01.189.055l.696 1.273a4.634 4.634 0 013.766 0L10.58.073a.137.137 0 01.189-.055.142.142 0 01.054.191l-.688 1.26a4.04 4.04 0 012.218 3.546H3.648a4.04 4.04 0 012.218-3.546zm3.78 1.562a.363.363 0 10.363-.368.366.366 0 00-.364.368zm-4.018 0a.363.363 0 10.363-.368.366.366 0 00-.363.368zm8.063 2.164a.984.984 0 00-.976.989v4.122a.976.976 0 101.952 0V6.184a.984.984 0 00-.976-.99zm-10.043.169v6.397A1.06 1.06 0 004.7 12.828h.699v2.183a.975.975 0 101.95 0v-2.183h1.302v2.183a.975.975 0 101.95 0v-2.183h.699a1.06 1.06 0 001.052-1.067V5.364z" })
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
function constructToolbarItemArray(itemDefs, allowCustom, startingItemPriority = 10, overrides) {
  let priority = startingItemPriority;
  const items2 = [];
  for (const itemDef of itemDefs) {
    const item = ToolbarHelper.createToolbarItemFromItemDef(priority, itemDef, overrides);
    priority = priority + 10;
    if (allowCustom || isToolbarActionItem(item) || isToolbarGroupItem(item))
      items2.push(item);
  }
  return items2;
}
class ToolbarHelper {
  /** Construct ToolbarCustomItem definitions given a CustomItemDef. */
  static createCustomDefinitionToolbarItem(itemPriority, itemDef, overrides) {
    return this.createToolbarItemFromItemDef(itemPriority, itemDef, overrides);
  }
  /** Construct ToolbarActionItem and ToolbarGroupItem definitions given an array of ItemDefs. */
  static constructChildToolbarItems(itemDefs) {
    return constructToolbarItemArray(itemDefs, false);
  }
  static getStringOrConditionalString(inString) {
    if (inString instanceof ConditionalStringValue || typeof inString === "string")
      return inString;
    return inString();
  }
  static getIconReactNode(item) {
    return IconHelper.getIconReactNode(item.icon, item.internalData);
  }
  /** Helper method to creates a generic toolbar item entry */
  static createToolbarItemFromItemDef(itemPriority, itemDef, overrides) {
    const { badgeType, description, icon, internalData, ...itemOverrides } = overrides ?? {};
    const itemBase = {
      id: itemDef.id,
      itemPriority,
      isActive: itemDef.isActive,
      isHidden: itemDef.isHidden,
      isDisabled: itemDef.isDisabled,
      icon: (internalData == null ? void 0 : internalData.get(IconHelper.reactIconKey)) ?? (internalData == null ? void 0 : internalData.get(IconHelper.conditionalIconItemKey)) ?? icon ?? itemDef.iconSpec,
      label: this.getStringOrConditionalString(itemDef.rawLabel),
      badge: badgeType ?? itemDef.badgeType,
      description: description ?? itemDef.description
    };
    if (itemDef instanceof CommandItemDef || itemDef instanceof ToolItemDef) {
      return {
        ...itemBase,
        execute: itemDef.execute,
        ...itemOverrides
      };
    } else if (itemDef instanceof CustomItemDef) {
      return {
        ...itemBase,
        panelContent: itemDef.popupPanelNode,
        ...itemOverrides
      };
    } else if (itemDef instanceof GroupItemDef) {
      return {
        ...itemBase,
        panelLabel: itemDef.panelLabel,
        items: this.constructChildToolbarItems(itemDef.items),
        isActive: false,
        ...itemOverrides
      };
    } else {
      throw new Error(`Invalid Item type encountered, item id=${itemDef.id}`);
    }
  }
  /**
   * Helper method to creates a generic toolbar item entry list.
   */
  static createToolbarItemsFromItemDefs(itemDefs, startingItemPriority = 10, overrides) {
    return constructToolbarItemArray(itemDefs, true, startingItemPriority, overrides);
  }
}
function StoryComponent(props) {
  const { newToolbars, ...other } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        newToolbars
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarComposer, { ...other })
    }
  );
}
try {
  StoryComponent.displayName = "StoryComponent";
  StoryComponent.__docgenInfo = { "description": "", "displayName": "StoryComponent", "props": { "newToolbars": { "defaultValue": null, "description": "Enables `newToolbars` preview feature.", "name": "newToolbars", "required": true, "type": { "name": "boolean" } }, "items": { "defaultValue": null, "description": "Toolbar items.", "name": "items", "required": true, "type": { "name": "ToolbarItem[]" } }, "usage": { "defaultValue": null, "description": "Toolbar usage based on which additional toolbar items are added from UI item providers.", "name": "usage", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "orientation": { "defaultValue": null, "description": "Toolbar orientation.", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Components/ToolbarComposer",
  component: StoryComponent,
  tags: ["autodocs"],
  decorators: [withResizer, AppUiDecorator, InitializerDecorator],
  args: {
    newToolbars: false,
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation
  },
  parameters: {
    layout: "centered"
  }
};
const items = createItems();
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
        const badges = [BadgeType.New, BadgeType.TechnicalPreview];
        const badgeIndex = index % badges.length;
        const badge = badges[badgeIndex];
        return {
          ...item,
          badge
        };
      })
    }, {
      ...items.custom2,
      description: "New badge",
      badge: BadgeType.New
    }, {
      ...items.action3,
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
    items: [{
      ...items.action1,
      execute: () => {
        bump();
        items.action1.execute();
      }
    }, {
      ...items.action2,
      icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), [eventId]),
      label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),
      isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),
      description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])
    }]
  }
};
const ItemDef = {
  args: {
    items: [ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}),
      label: "Item 3",
      execute: action("Item 3")
    })), ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}),
      label: "Item 4",
      execute: action("Item 4")
    }), {
      ...createAbstractReactIcon()
    }), ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAirplane, {}),
      label: "Item 5",
      execute: action("Item 5")
    }), {
      description: "Conditional icon overrides.",
      isDisabled: true,
      ...createAbstractConditionalIcon()
    }), ...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}),
      label: "Item 6",
      execute: action("Item 6")
    }), new CommandItemDef({
      iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}),
      label: "Item 7",
      execute: action("Item 7")
    })], 200)]
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
function createItems() {
  const action1 = ToolbarItemUtilities.createActionItem("item1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), "Item 1", action("Item 1"));
  const action2 = ToolbarItemUtilities.createActionItem("item2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), "Item 2", action("Item 2"));
  const action3 = ToolbarItemUtilities.createActionItem("item3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAndroid, {}), "Item 3", action("Item 3"));
  const group1 = ToolbarItemUtilities.createGroupItem("group1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), "Group 1", [action1, action2]);
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
  const custom1 = ToolbarItemUtilities.createCustomItem("custom1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), "Custom 1", /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    children: "Custom panel content 1"
  }));
  const custom2 = ToolbarItemUtilities.createCustomItem("custom2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), "Custom 2", /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    children: "Custom panel content 2"
  }));
  const custom3 = ToolbarItemUtilities.createCustomItem("custom3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), "Custom 3", /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    children: "Custom panel content 3"
  }));
  return {
    action1,
    action2,
    action3,
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
function createBumpEvent() {
  let i = 10;
  const eventId2 = "bump";
  const bump2 = () => {
    i++;
    SyncUiEventDispatcher.dispatchSyncUiEvent(eventId2);
  };
  return {
    getVal: () => i,
    bump: bump2,
    eventId: eventId2
  };
}
ActionItem.parameters = {
  ...ActionItem.parameters,
  docs: {
    ...(_a = ActionItem.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3]\n  }\n}",
      ...(_c = (_b = ActionItem.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
GroupItem.parameters = {
  ...GroupItem.parameters,
  docs: {
    ...(_d = GroupItem.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.group1, items.group2, items.group3]\n  }\n}",
      ...(_f = (_e = GroupItem.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
CustomItem.parameters = {
  ...CustomItem.parameters,
  docs: {
    ...(_g = CustomItem.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.custom1, items.custom2, items.custom3]\n  }\n}",
      ...(_i = (_h = CustomItem.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...(_j = Badge.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [{\n      ...items.action1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.group1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.custom1,\n      description: "TechnicalPreview badge",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.action2,\n      description: "New badge",\n      badge: BadgeType.New\n    }, {\n      ...items.group2,\n      description: "New badge",\n      badge: BadgeType.New,\n      items: items.group2.items.map((item, index) => {\n        const badges = [BadgeType.New, BadgeType.TechnicalPreview];\n        const badgeIndex = index % badges.length;\n        const badge = badges[badgeIndex];\n        return {\n          ...item,\n          badge\n        };\n      })\n    }, {\n      ...items.custom2,\n      description: "New badge",\n      badge: BadgeType.New\n    }, {\n      ...items.action3,\n      description: "No badge",\n      badge: BadgeType.None\n    }]\n  }\n}',
      ...(_l = (_k = Badge.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...(_m = Disabled.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [{\n      ...items.action1,\n      isDisabled: true\n    }, {\n      ...items.group1,\n      isDisabled: true\n    }, {\n      ...items.group2,\n      items: items.group2.items.map(item => ({\n        ...item,\n        isDisabled: true\n      }))\n    }, {\n      ...items.custom1,\n      isDisabled: true\n    }]\n  }\n}",
      ...(_o = (_n = Disabled.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Hidden.parameters = {
  ...Hidden.parameters,
  docs: {
    ...(_p = Hidden.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, {\n      ...items.action3,\n      isHidden: true\n    }, items.group1, items.group2, {\n      ...items.group3,\n      isHidden: true\n    }, items.custom1, items.custom2, {\n      ...items.custom3,\n      isHidden: true\n    }]\n  }\n}",
      ...(_r = (_q = Hidden.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
Conditional.parameters = {
  ...Conditional.parameters,
  docs: {
    ...(_s = Conditional.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [{\n      ...items.action1,\n      execute: () => {\n        bump();\n        items.action1.execute();\n      }\n    }, {\n      ...items.action2,\n      icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />, [eventId]),\n      label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),\n      isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),\n      description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])\n    }]\n  }\n}",
      ...(_u = (_t = Conditional.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
    }
  }
};
ItemDef.parameters = {
  ...ItemDef.parameters,
  docs: {
    ...(_v = ItemDef.parameters) == null ? void 0 : _v.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: "Item 3",\n      execute: action("Item 3")\n    })), ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: "Item 4",\n      execute: action("Item 4")\n    }), {\n      ...createAbstractReactIcon()\n    }), ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({\n      iconSpec: <SvgAirplane />,\n      label: "Item 5",\n      execute: action("Item 5")\n    }), {\n      description: "Conditional icon overrides.",\n      isDisabled: true,\n      ...createAbstractConditionalIcon()\n    }), ...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: "Item 6",\n      execute: action("Item 6")\n    }), new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: "Item 7",\n      execute: action("Item 7")\n    })], 200)]\n  }\n}',
      ...(_x = (_w = ItemDef.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
    }
  }
};
const __namedExportsOrder = ["ActionItem", "GroupItem", "CustomItem", "Badge", "Disabled", "Hidden", "Conditional", "ItemDef"];
export {
  ActionItem,
  Badge,
  Conditional,
  CustomItem,
  Disabled,
  GroupItem,
  Hidden,
  ItemDef,
  __namedExportsOrder,
  meta as default
};
