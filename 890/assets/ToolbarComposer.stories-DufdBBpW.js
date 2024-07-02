var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import "./Key.enum-B7uESc6p.js";
import { P as PreviewFeaturesProvider, a4 as ToolbarComposer, a5 as ToolbarOrientation, a6 as ToolbarUsage, B as BadgeType, a7 as ConditionalIconItem, a8 as ConditionalStringValue, a9 as ConditionalBooleanValue, aa as ToolbarHelper, C as CommandItemDef, ab as IconHelper, ac as ToolbarItemUtilities, ad as SyncUiEventDispatcher } from "./DefaultToolSettingsProvider-CLwhashG.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { S as Svg3D } from "./3D-DAP4mQ8M.js";
import { S as SvgActivity } from "./Activity-C9dEWSdZ.js";
import { S as SvgAirplane } from "./Airplane-nk1HFfHW.js";
import { S as SvgAndroid } from "./Android-Brx0zRv2.js";
import { S as SvgClipboard } from "./Clipboard-DybwOk7j.js";
import "./index-EDRsojbr.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-DcOwcMQU.js";
import { w as withResizer } from "./Resizer-oL6qocnZ.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./iframe-C9wXFbML.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
const SvgExport = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M12 12H2V5h2.2l2.5-2H0v11h14V8.4L12 10z" }),
    reactExports.createElement("path", { d: "M4 10c1.7-1.7 3.7-3.1 7-3v2l5-4-5-4v2c-3.5 0-7 3.1-7 7" })
  );
};
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
