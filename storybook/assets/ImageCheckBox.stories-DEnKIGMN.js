var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { A as AppUiDecorator } from "./Decorators-DUUkwgne.js";
import { c as cx } from "./SvgCloseSmall-_wwqPRsc.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { I as Icon } from "./IconComponent-_KdkYfNe.js";
import { S as Svg2D } from "./2D-DzQW5YkV.js";
import { S as Svg3D } from "./3D-B4v4RUSy.js";
import "./appui-react-BVsX5v19.js";
import "./Dialog-D0GO0lR_.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./iframe-Dwos7_dA.js";
import "../sb-preview/runtime.js";
import "./index-CHBBkG1-.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
class ImageCheckBox extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onChange = (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(e.target.checked);
      }
    };
    this._onInputClick = (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
    };
    this._onLabelClick = (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
    };
  }
  render() {
    const checkBoxClass = cx(
      "core-image-checkbox",
      this.props.className
    );
    const imageClass = cx(
      "image",
      this.props.border && "image-checkbox-border"
    );
    const iconSpec = this.props.checked ? this.props.imageOn : this.props.imageOff;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-element-interactions
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: checkBoxClass,
          style: this.props.style,
          onClick: this._onLabelClick,
          title: this.props.tooltip,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: this.props.inputClassName,
                style: this.props.inputStyle,
                checked: this.props.checked,
                disabled: this.props.disabled,
                onChange: this._onChange,
                onClick: this._onInputClick,
                ref: this.props.inputRef
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: imageClass, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec }) })
          ]
        }
      )
    );
  }
}
ImageCheckBox.__docgenInfo = { "description": "ImageCheckBox React component shows a checked or unchecked image\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/checkbox iTwinUI checkbox} instead (custom icons are not supported at the moment, but feel free to submit your use cases).", "methods": [], "displayName": "ImageCheckBox", "props": { "imageOn": { "required": true, "tsType": { "name": "union", "raw": "string | React.ReactNode", "elements": [{ "name": "string" }, { "name": "ReactReactNode", "raw": "React.ReactNode" }] }, "description": 'Image for the "checked" state' }, "imageOff": { "required": true, "tsType": { "name": "union", "raw": "string | React.ReactNode", "elements": [{ "name": "string" }, { "name": "ReactReactNode", "raw": "React.ReactNode" }] }, "description": 'Image for the "unchecked" (default) state' }, "checked": { "required": false, "tsType": { "name": "boolean" }, "description": "Determine if the item is checked or not" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Determine if the item is disabled or not" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(checked: boolean) => any", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "checked" }], "return": { "name": "any" } } }, "description": "Function called when item is clicked." }, "inputClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the checkbox input element" }, "inputStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the checkbox input element" }, "tooltip": { "required": false, "tsType": { "name": "string" }, "description": "Tooltip to be displayed when mouse is hovered over the checkbox" }, "border": { "required": false, "tsType": { "name": "boolean" }, "description": "If true, draw a border around the image checkbox" }, "inputRef": { "required": false, "tsType": { "name": "ReactRef", "raw": "React.Ref<HTMLInputElement>", "elements": [{ "name": "HTMLInputElement" }] }, "description": "Provides ability to return reference to HTMLInputElement" } }, "composes": ["CommonProps"] };
const meta = {
  title: "Deprecated/ImageCheckBox",
  component: ImageCheckBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    imageOn: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}),
    imageOff: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {})
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    imageOn: <Svg3D />,\n    imageOff: <Svg2D />\n  }\n}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
