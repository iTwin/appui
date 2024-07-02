var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import { c as classnames } from "./Key.enum-BpJjJDFT.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { ae as Checkbox } from "./DefaultToolSettingsProvider-DIShliKp.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
class CheckListBoxItem extends reactExports.PureComponent {
  render() {
    const className = classnames(
      "core-chk-listboxitem-checkbox",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        checked: this.props.checked,
        disabled: this.props.disabled,
        label: this.props.label,
        onClick: this.props.onClick,
        onChange: this.props.onChange,
        "data-testid": "core-chk-listboxitem-checkbox",
        wrapperProps: {
          className,
          style: this.props.style
        }
      }
    ) });
  }
}
function CheckListBoxSeparator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-chk-listbox-separator" });
}
class CheckListBox extends reactExports.PureComponent {
  render() {
    const className = classnames("core-chk-listbox", this.props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className, style: this.props.style, children: this.props.children });
  }
}
try {
  CheckListBoxSeparator.displayName = "CheckListBoxSeparator";
  CheckListBoxSeparator.__docgenInfo = { "description": "Separator added to a [[CheckListBox]].", "displayName": "CheckListBoxSeparator", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  CheckListBoxItem.displayName = "CheckListBoxItem";
  CheckListBoxItem.__docgenInfo = { "description": "Item with a checkbox added to a [[CheckListBox]].", "displayName": "CheckListBoxItem", "props": { "label": { "defaultValue": null, "description": "Label", "name": "label", "required": true, "type": { "name": "string" } }, "checked": { "defaultValue": null, "description": "Indicates whether the item is checked or not", "name": "checked", "required": false, "type": { "name": "boolean" } }, "disabled": { "defaultValue": null, "description": "Indicates whether the item is disabled or not", "name": "disabled", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Function called when item is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => any)" } }, "onChange": { "defaultValue": null, "description": "Function called when item is changed.", "name": "onChange", "required": false, "type": { "name": "((e: ChangeEvent<HTMLInputElement>) => any)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  CheckListBox.displayName = "CheckListBox";
  CheckListBox.__docgenInfo = { "description": "React component showing a list of Checkbox items.", "displayName": "CheckListBox", "props": { "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } }, "children": { "defaultValue": null, "description": "Content", "name": "children", "required": false, "type": { "name": "ReactNode" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Deprecated/CheckListBox",
  component: CheckListBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 1"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 2"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 3"
      })]
    })
  }
};
const Checked = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 1"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 2",
        checked: true
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 3"
      })]
    })
  }
};
const Separator = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 1"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxSeparator, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 2"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, {
        label: "Item 3"
      })]
    })
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <>\n        <CheckListBoxItem label="Item 1" />\n        <CheckListBoxItem label="Item 2" />\n        <CheckListBoxItem label="Item 3" />\n      </>\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Checked.parameters = {
  ...Checked.parameters,
  docs: {
    ...(_d = Checked.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <>\n        <CheckListBoxItem label="Item 1" />\n        <CheckListBoxItem label="Item 2" checked />\n        <CheckListBoxItem label="Item 3" />\n      </>\n  }\n}',
      ...(_f = (_e = Checked.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Separator.parameters = {
  ...Separator.parameters,
  docs: {
    ...(_g = Separator.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <>\n        <CheckListBoxItem label="Item 1" />\n        <CheckListBoxSeparator />\n        <CheckListBoxItem label="Item 2" />\n        <CheckListBoxItem label="Item 3" />\n      </>\n  }\n}',
      ...(_i = (_h = Separator.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Checked", "Separator"];
export {
  Basic,
  Checked,
  Separator,
  __namedExportsOrder,
  meta as default
};
