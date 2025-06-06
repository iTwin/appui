var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { A as AppUiDecorator } from "./Decorators-B6cHw9Aj.js";
import { c as cx } from "./SvgCloseSmall-XFYEkVPL.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { aQ as Checkbox } from "./appui-react-BkfSqS8X.js";
import "./index-CdGyBOBZ.js";
import "./Dialog-DgXpX9Dj.js";
import "./iframe-C1WTrjKK.js";
import "./client-DmvY241V.js";
class CheckListBoxItem extends reactExports.PureComponent {
  render() {
    const className = cx(
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
    const className = cx("core-chk-listbox", this.props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className, style: this.props.style, children: this.props.children });
  }
}
CheckListBoxItem.__docgenInfo = { "description": "Item with a checkbox added to a [[CheckListBox]].\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.", "methods": [], "displayName": "CheckListBoxItem", "props": { "label": { "required": true, "tsType": { "name": "string" }, "description": "Label" }, "checked": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the item is checked or not" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the item is disabled or not" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => any", "signature": { "arguments": [], "return": { "name": "any" } } }, "description": "Function called when item is clicked." }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.ChangeEvent<HTMLInputElement>) => any", "signature": { "arguments": [{ "type": { "name": "ReactChangeEvent", "raw": "React.ChangeEvent<HTMLInputElement>", "elements": [{ "name": "HTMLInputElement" }] }, "name": "e" }], "return": { "name": "any" } } }, "description": "Function called when item is changed." } }, "composes": ["CommonProps"] };
CheckListBoxSeparator.__docgenInfo = { "description": "Separator added to a [[CheckListBox]].\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.", "methods": [], "displayName": "CheckListBoxSeparator" };
CheckListBox.__docgenInfo = { "description": "React component showing a list of Checkbox items.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.", "methods": [], "displayName": "CheckListBox", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } } };
const meta = {
  title: "Deprecated/CheckListBox",
  component: CheckListBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 3" })
    ] })
  }
};
const Checked = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 2", checked: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 3" })
    ] })
  }
};
const Separator = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckListBoxItem, { label: "Item 3" })
    ] })
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
