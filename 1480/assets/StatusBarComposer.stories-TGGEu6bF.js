import { r as reactExports, c as classnames, j as jsxRuntimeExports, F as withResizer } from "./iframe-DNdoMX4Q.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { by as StatusBarCornerComponentContext, H as Icon, bz as StatusBarComposer, e as StatusBarItemUtilities, $ as StatusBarSection, bA as SnapModeField, bB as SnapMode, bo as SvgAdd } from "./appui-react-glMK-yaN.js";
import { S as Svg2D } from "./2D-D8GC_-q-.js";
import { S as Svg3D } from "./3D-BdJFSoba.js";
import { S as SvgActivity } from "./Activity-DwE5_5Lk.js";
import { S as SvgAndroid, a as SvgAirplane } from "./Android-RNhD0IYN.js";
import "./Key.enum-YmMvjtrc.js";
import { M as MessageCenterField } from "./MessageCenterField-DD-0LBh4.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
import "./Tabs-DzJew55v.js";
const SvgAttach = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4 16c-1 0-2-.5-2.7-1.2-1.8-1.7-1.7-4 .4-5.9l8.3-8c.4-.4 1-.7 1.6-.9.9-.2 1.8.1 2.5.8.7.6 1 1.5.9 2.3-.1.6-.4 1.2-.9 1.7l-8.3 8c-.4.4-.9.7-1.5.8-.5 0-1-.2-1.3-.6-.3-.3-1.1-1.3.3-2.6l8.3-8 .8.8-8.3 8c-.7.7-.4 1-.3 1.1.1.2.3.2.5.3.3-.1.6-.2.8-.4l8.3-8c.3-.3.5-.7.6-1.1.1-.5-.2-1.1-.6-1.4-.4-.4-.9-.6-1.5-.5-.4.1-.8.3-1.1.5l-8.3 8c-1.1 1-2.1 2.7-.4 4.3s3.4.7 4.5-.4l7.2-6.9.8.8-7.2 7c-.9.9-2.1 1.4-3.4 1.5" })
  );
};
const SvgBolt = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M13.42 6.5v-.01a.602.602 0 00-.53-.31H9.68L11.24.74a.571.571 0 00-.31-.679.603.603 0 00-.72.15L2.66 8.85a.591.591 0 00-.08.66.603.603 0 00.53.32h3.21l-1.57 5.43a.59.59 0 00.35.689.419.419 0 00.2.05h.03a.571.571 0 00.46-.21l7.55-8.639a.577.577 0 00.08-.65z" })
  );
};
const SvgCamera = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M1.5 3H3a.5.5 0 000-1H1.5a.5.5 0 000 1zM15 4h-3.45L11 2.62A1.29 1.29 0 009.85 2H6a1.28 1.28 0 00-1.19.62L4.27 4H1a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1zm-7 9a4 4 0 114-4 4 4 0 01-4 4zm4.5-7a.5.5 0 11.5-.5.5.5 0 01-.5.5zM8 6a3 3 0 103 3 3 3 0 00-3-3" })
  );
};
const SvgCursor = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4.17 11.83a.34.34 0 00.36 0l2.52-1 1.65 3.94a.37.37 0 00.36.23h.16l1.44-.59a.4.4 0 00.22-.51L9.23 9.93l2.52-1a.39.39 0 00.13-.64L4.67 1.11a.4.4 0 00-.67.28V11.5a.41.41 0 00.17.33z" })
  );
};
function SelectionCountField(props) {
  const cornerContext = reactExports.useContext(StatusBarCornerComponentContext);
  const className = classnames("uifw-statusFields-selectionCount", cornerContext === "left-corner" && "uifw-left-corner", cornerContext === "right-corner" && "uifw-right-corner", props.className);
  return reactExports.createElement(
    "div",
    { className, style: props.style },
    reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgCursor, null) }),
    props.count
  );
}
function StatusBarComposerStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "36px", display: "flex" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarComposer, { ...props }) });
}
StatusBarComposerStory.__docgenInfo = { "description": "", "methods": [], "displayName": "StatusBarComposerStory" };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const PageLayout = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "60vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    paddingInline: "5%",
    paddingBlock: "2em",
    boxSizing: "border-box",
    minWidth: "200px"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const meta = {
  title: "Components/StatusBarComposer",
  component: StatusBarComposerStory,
  tags: ["autodocs"],
  decorators: [AlignComponent, AppUiDecorator, PageLayout, withResizer]
};
const items = createItems();
const ActionItem = {
  args: {
    items: [items.action1, items.action2, items.action3]
  }
};
const LabelItem = {
  args: {
    items: [items.label1, items.label2, items.label3]
  }
};
const CustomItem = {
  args: {
    items: [items.custom1, items.custom2, items.custom4]
  }
};
const Full = {
  args: {
    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3]
  }
};
const itemsForOverflow = createItemsForOverflow();
const Overflow = {
  args: {
    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3, itemsForOverflow.label1, itemsForOverflow.label2, itemsForOverflow.label3]
  },
  parameters: {
    layout: "centered"
  }
};
function createItems() {
  const action1 = StatusBarItemUtilities.createActionItem("item1", StatusBarSection.Left, 100, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), "Item 1", action("Item 1"));
  const action2 = StatusBarItemUtilities.createActionItem("item2", StatusBarSection.Center, 120, /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), "Item 2", action("Item 2"));
  const action3 = StatusBarItemUtilities.createActionItem("item3", StatusBarSection.Right, 150, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAndroid, {}), "Item 3", action("Item 3"));
  const label1 = StatusBarItemUtilities.createLabelItem("item4", StatusBarSection.Left, 110, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAttach, {}), "Label 1");
  const label2 = StatusBarItemUtilities.createLabelItem("item5", StatusBarSection.Center, 130, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), "Label 2");
  const label3 = StatusBarItemUtilities.createLabelItem("item6", StatusBarSection.Right, 160, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAirplane, {}), "Label 3");
  const custom1 = StatusBarItemUtilities.createCustomItem("item7", StatusBarSection.Left, 10, /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCenterField, {}));
  const custom2 = StatusBarItemUtilities.createCustomItem("item8", StatusBarSection.Center, 30, /* @__PURE__ */ jsxRuntimeExports.jsx(SelectionCountField, { count: 5 }));
  const custom3 = StatusBarItemUtilities.createCustomItem("item9", StatusBarSection.Right, 10, /* @__PURE__ */ jsxRuntimeExports.jsx(SnapModeField, {}));
  const availableSnapModes = [SnapMode.NearestKeypoint, SnapMode.Center, SnapMode.Nearest];
  const custom4 = StatusBarItemUtilities.createCustomItem("item10", StatusBarSection.Right, 10, /* @__PURE__ */ jsxRuntimeExports.jsx(SnapModeField, { availableSnapModes }));
  return {
    action1,
    action2,
    action3,
    label1,
    label2,
    label3,
    custom1,
    custom2,
    custom3,
    custom4
  };
}
function createItemsForOverflow() {
  const label1 = StatusBarItemUtilities.createLabelItem("item101", StatusBarSection.Left, 200, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAdd, {}), "Long label 1");
  const label2 = StatusBarItemUtilities.createLabelItem("item102", StatusBarSection.Center, 200, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgBolt, {}), "Long label 2");
  const label3 = StatusBarItemUtilities.createLabelItem("item103", StatusBarSection.Right, 200, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCamera, {}), "Long label 3");
  return {
    label1,
    label2,
    label3
  };
}
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
LabelItem.parameters = {
  ...LabelItem.parameters,
  docs: {
    ...LabelItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.label1, items.label2, items.label3]\n  }\n}",
      ...LabelItem.parameters?.docs?.source
    }
  }
};
CustomItem.parameters = {
  ...CustomItem.parameters,
  docs: {
    ...CustomItem.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.custom1, items.custom2, items.custom4]\n  }\n}",
      ...CustomItem.parameters?.docs?.source
    }
  }
};
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...Full.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3]\n  }\n}",
      ...Full.parameters?.docs?.source
    }
  }
};
Overflow.parameters = {
  ...Overflow.parameters,
  docs: {
    ...Overflow.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3, itemsForOverflow.label1, itemsForOverflow.label2, itemsForOverflow.label3]\n  },\n  parameters: {\n    layout: "centered"\n  }\n}',
      ...Overflow.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["ActionItem", "LabelItem", "CustomItem", "Full", "Overflow"];
export {
  ActionItem,
  CustomItem,
  Full,
  LabelItem,
  Overflow,
  __namedExportsOrder,
  meta as default
};
