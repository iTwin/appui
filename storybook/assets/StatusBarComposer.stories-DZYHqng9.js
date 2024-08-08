var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import { bh as StatusBarCornerComponentContext, f as Icon, aQ as TitleBar, au as useTranslation, bi as useReduxFrameworkState, bj as SnapMode, aP as StatusBarPopover, U as UiFramework, bk as StatusBarComposer, v as StatusBarItemUtilities, w as StatusBarSection, aV as SvgAdd } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { c as classnames, B as Button } from "./Key.enum-BB2gw-WQ.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { S as Svg3D } from "./3D-DAP4mQ8M.js";
import { S as SvgActivity } from "./Activity-C9dEWSdZ.js";
import { S as SvgAirplane } from "./Airplane-nk1HFfHW.js";
import { S as SvgAndroid } from "./Android-Brx0zRv2.js";
import "./index-EDRsojbr.js";
import { M as MessageCenterField } from "./MessageCenterField-D0lAS2NT.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { w as withResizer } from "./Resizer-oL6qocnZ.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
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
const snapModeBisector = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M12.761,4.05371,9.35376.64648l-.707.707L11.2395,3.94629,8.23425,6.1994a1.48412,1.48412,0,0,0-.734-.19934,1.493,1.493,0,0,0-1.3941,2.04535L2.239,10.94629l3.40772,3.40723.707-.707L3.76147,11.05371l3.00477-2.253A1.48394,1.48394,0,0,0,7.50024,9,1.493,1.493,0,0,0,8.89429,6.95459ZM7.50024,8a.5.5,0,1,1,.5-.5A.50057.50057,0,0,1,7.50024,8Z'/%3e%3c/svg%3e";
const snapModeCenter = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M7.5,7a.5.5,0,1,1-.5.5A.50057.50057,0,0,1,7.5,7m0-1A1.5,1.5,0,1,0,9,7.5,1.5,1.5,0,0,0,7.5,6Zm0-5A6.5,6.5,0,1,1,1,7.5,6.50736,6.50736,0,0,1,7.5,1m0-1A7.5,7.5,0,1,0,15,7.5,7.5,7.5,0,0,0,7.5,0Z'/%3e%3c/svg%3e";
const snapModeIntersection = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M13.38379,13.67969,8.81842,8.20129A1.43136,1.43136,0,0,0,8.90662,6.995l4.40979-3.60828-.63282-.77344L8.27417,6.22119a1.48194,1.48194,0,0,0-1.3584-.10309L2.38379.67969l-.76758.64062L6.18158,6.79877a1.4317,1.4317,0,0,0-.08807,1.20678L1.68359,11.61328l.63282.77344L6.72626,8.77905a1.48165,1.48165,0,0,0,1.358.10291l4.532,5.43835ZM7,7.5a.5.5,0,1,1,.5.5A.50056.50056,0,0,1,7,7.5Z'/%3e%3c/svg%3e";
const snapModeMidpoint = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M14.35352,1.35352l-.707-.707L8.143,6.15A1.49124,1.49124,0,0,0,6.15,8.143L.64648,13.64648l.707.707L6.85693,8.8501A1.49129,1.49129,0,0,0,8.85,6.857ZM7.5,8.00012A.50006.50006,0,1,1,8,7.5.50063.50063,0,0,1,7.5,8.00012Z'/%3e%3c/svg%3e";
const snapModeNearest = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M13,1.5V7.293L11.293,9H8.9082a1.49339,1.49339,0,0,0-2.90191.43781l-1.22968.6148L1.64673,13.14636l.707.707L5.29663,10.911l1.01349-.5069A1.4891,1.4891,0,0,0,8.90814,10H11.707L14,7.707V1.5ZM7.5,10.00006A.50006.50006,0,1,1,8,9.49994.50063.50063,0,0,1,7.5,10.00006Z'/%3e%3c/svg%3e";
const snapModeOrigin = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M10.79681,5.00409l-.801-.801,2.20392-2.20379.801.8009Zm-5.7926-.801L2.80029,1.99927l-.801.8009L4.20319,5.00409Zm4.99158,6.59363,2.20392,2.204.801-.801-2.20392-2.204Zm-7.99646,1.403.801.801,2.20392-2.204-.801-.801ZM15,6.99988v1H11.50549L8,11.50537V15H7V11.50537L3.49451,7.99988H0v-1H3.49451L7,3.49451V0H8V3.49451l3.50549,3.50537Zm-4.40869.5L7.5,4.40869,4.40875,7.49988,7.5,10.59119Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
const snapModeKeypoint = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M14,3.5a1.5,1.5,0,1,0-2.2618,1.2854L10.3276,9.0174a1.49,1.49,0,0,0-1.31,1.31L4.7855,11.7382a1.5009,1.5009,0,1,0,.1971.9343l4.2319-1.4107a1.4958,1.4958,0,1,0,2.0473-2.0473l1.4107-4.2319A1.4949,1.4949,0,0,0,14,3.5ZM12.5,3a.5.5,0,1,1-.5.5A.5006.5006,0,0,1,12.5,3Zm-9,10a.5.5,0,1,1,.5-.5A.5.5,0,0,1,3.5,13Zm7-2a.5.5,0,0,1,0-1H10.5a.5.5,0,0,1,0,1Z'/%3e%3c/svg%3e";
class SnapModePanel extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-snapMode-panel", this.props.className);
    return reactExports.createElement(
      "div",
      { className, style: this.props.style },
      reactExports.createElement(TitleBar, { title: this.props.title }),
      reactExports.createElement("div", { className: "nz-snaps" }, this.props.children)
    );
  }
}
class Snap extends reactExports.PureComponent {
  render() {
    const dialogClassName = classnames("nz-footer-snapMode-snap", this.props.isActive && "nz-active", this.props.className);
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      reactExports.createElement(
        "div",
        { onClick: this.props.onClick, className: dialogClassName, style: this.props.style, role: "button", tabIndex: -1 },
        this.props.icon === void 0 ? void 0 : reactExports.createElement("div", null, this.props.icon),
        reactExports.createElement("div", null, this.props.children)
      )
    );
  }
}
function getIconFromIconName(iconName) {
  let iconSpec = snapModeKeypoint;
  switch (iconName) {
    case "snaps":
      iconSpec = snapModeKeypoint;
      break;
    case "snaps-intersection":
      iconSpec = snapModeIntersection;
      break;
    case "snaps-center":
      iconSpec = snapModeCenter;
      break;
    case "snaps-nearest":
      iconSpec = snapModeNearest;
      break;
    case "snaps-origin":
      iconSpec = snapModeOrigin;
      break;
    case "snaps-midpoint":
      iconSpec = snapModeMidpoint;
      break;
    case "snaps-bisector":
      iconSpec = snapModeBisector;
      break;
  }
  return iconSpec;
}
const getSnapModeIconNameFromMode = (modeEntries, snapMode) => {
  for (const modeEntry of modeEntries) {
    if (modeEntry.value === snapMode)
      return modeEntry.iconName;
  }
  if (snapMode > 0)
    return "snaps-multione";
  return "placeholder";
};
function SnapModeField(props) {
  const { translate } = useTranslation();
  const reduxSnapMode = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state == null ? void 0 : state.configurableUiState.snapMode
  );
  const snapMode = props.snapMode ?? reduxSnapMode ?? SnapMode.NearestKeypoint;
  const snapModes = [
    {
      label: translate("snapModeField.keypoint"),
      value: SnapMode.NearestKeypoint,
      iconName: "snaps"
    },
    {
      label: translate("snapModeField.intersection"),
      value: SnapMode.Intersection,
      iconName: "snaps-intersection"
    },
    {
      label: translate("snapModeField.center"),
      value: SnapMode.Center,
      iconName: "snaps-center"
    },
    {
      label: translate("snapModeField.nearest"),
      value: SnapMode.Nearest,
      iconName: "snaps-nearest"
    },
    {
      label: translate("snapModeField.origin"),
      value: SnapMode.Origin,
      iconName: "snaps-origin"
    },
    {
      label: translate("snapModeField.midpoint"),
      value: SnapMode.MidPoint,
      iconName: "snaps-midpoint"
    },
    {
      label: translate("snapModeField.bisector"),
      value: SnapMode.Bisector,
      iconName: "snaps-bisector"
    }
  ];
  const iconName = getSnapModeIconNameFromMode(snapModes, snapMode);
  const title = translate("snapModeField.snapMode");
  return reactExports.createElement(
    StatusBarPopover,
    { content: reactExports.createElement(SnapModePanel, { title }, snapModes.map((item, index) => reactExports.createElement(Snap, { key: `SM_${index}`, onClick: () => {
      if (props.onChange) {
        props.onChange(item.value);
        return;
      }
      UiFramework.setAccudrawSnapMode(item.value);
    }, isActive: (snapMode & item.value) === item.value, icon: (
      // eslint-disable-next-line deprecation/deprecation
      reactExports.createElement(Icon, { className: `icon`, iconSpec: getIconFromIconName(item.iconName) })
    ) }, item.label))) },
    reactExports.createElement(
      Button,
      {
        styleType: "borderless",
        title,
        // eslint-disable-next-line deprecation/deprecation
        endIcon: reactExports.createElement(Icon, { iconSpec: getIconFromIconName(iconName) })
      },
      title,
      reactExports.createElement(StatusBarPopover.ExpandIndicator, null)
    )
  );
}
function StatusBarComposerStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "36px", display: "flex" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarComposer, { ...props }) });
}
try {
  StatusBarComposerStory.displayName = "StatusBarComposerStory";
  StatusBarComposerStory.__docgenInfo = { "description": "", "displayName": "StatusBarComposerStory", "props": { "items": { "defaultValue": null, "description": "Status Bar items", "name": "items", "required": true, "type": { "name": "StatusBarItem[]" } }, "mainClassName": { "defaultValue": null, "description": "CSS class name override for the overall Status Bar", "name": "mainClassName", "required": false, "type": { "name": "string" } }, "leftClassName": { "defaultValue": null, "description": "CSS class name override for the left section", "name": "leftClassName", "required": false, "type": { "name": "string" } }, "centerClassName": { "defaultValue": null, "description": "CSS class name override for the center section", "name": "centerClassName", "required": false, "type": { "name": "string" } }, "rightClassName": { "defaultValue": null, "description": "CSS class name override for the right section", "name": "rightClassName", "required": false, "type": { "name": "string" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const PageLayout = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "60vh"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
};
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      paddingInline: "5%",
      paddingBlock: "2em",
      boxSizing: "border-box",
      minWidth: "200px"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
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
    items: [items.custom1, items.custom2, items.custom3]
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
  const custom2 = StatusBarItemUtilities.createCustomItem("item8", StatusBarSection.Center, 30, /* @__PURE__ */ jsxRuntimeExports.jsx(SelectionCountField, {
    count: 5
  }));
  const custom3 = StatusBarItemUtilities.createCustomItem("item9", StatusBarSection.Right, 10, /* @__PURE__ */ jsxRuntimeExports.jsx(SnapModeField, {}));
  return {
    action1,
    action2,
    action3,
    label1,
    label2,
    label3,
    custom1,
    custom2,
    custom3
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
    ...(_a = ActionItem.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3]\n  }\n}",
      ...(_c = (_b = ActionItem.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
LabelItem.parameters = {
  ...LabelItem.parameters,
  docs: {
    ...(_d = LabelItem.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.label1, items.label2, items.label3]\n  }\n}",
      ...(_f = (_e = LabelItem.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
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
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...(_j = Full.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3]\n  }\n}",
      ...(_l = (_k = Full.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Overflow.parameters = {
  ...Overflow.parameters,
  docs: {
    ...(_m = Overflow.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3, itemsForOverflow.label1, itemsForOverflow.label2, itemsForOverflow.label3]\n  },\n  parameters: {\n    layout: "centered"\n  }\n}',
      ...(_o = (_n = Overflow.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
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
