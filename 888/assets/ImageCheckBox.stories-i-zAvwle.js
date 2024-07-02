var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import { c as classnames } from "./Key.enum-BpJjJDFT.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { I as Icon } from "./IconComponent-B0G3fWXo.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { S as Svg3D } from "./3D-DAP4mQ8M.js";
import "./DefaultToolSettingsProvider-DIShliKp.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
class ImageCheckBox extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onChange = (e) => {
      if (e && e.stopPropagation)
        e.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(e.target.checked);
      }
    };
    this._onInputClick = (e) => {
      if (e && e.stopPropagation)
        e.stopPropagation();
    };
    this._onLabelClick = (e) => {
      if (e && e.stopPropagation)
        e.stopPropagation();
    };
  }
  /** @internal */
  render() {
    const checkBoxClass = classnames(
      "core-image-checkbox",
      this.props.className
    );
    const imageClass = classnames(
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
try {
  ImageCheckBox.displayName = "ImageCheckBox";
  ImageCheckBox.__docgenInfo = { "description": "ImageCheckBox React component shows a checked or unchecked image", "displayName": "ImageCheckBox", "props": { "imageOn": { "defaultValue": null, "description": 'Image for the "checked" state', "name": "imageOn", "required": true, "type": { "name": "ReactNode" } }, "imageOff": { "defaultValue": null, "description": 'Image for the "unchecked" (default) state', "name": "imageOff", "required": true, "type": { "name": "ReactNode" } }, "checked": { "defaultValue": null, "description": "Determine if the item is checked or not", "name": "checked", "required": false, "type": { "name": "boolean" } }, "disabled": { "defaultValue": null, "description": "Determine if the item is disabled or not", "name": "disabled", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Function called when item is clicked.", "name": "onClick", "required": false, "type": { "name": "((checked: boolean) => any)" } }, "inputClassName": { "defaultValue": null, "description": "Custom CSS class name for the checkbox input element", "name": "inputClassName", "required": false, "type": { "name": "string" } }, "inputStyle": { "defaultValue": null, "description": "Custom CSS Style for the checkbox input element", "name": "inputStyle", "required": false, "type": { "name": "CSSProperties" } }, "tooltip": { "defaultValue": null, "description": "Tooltip to be displayed when mouse is hovered over the checkbox", "name": "tooltip", "required": false, "type": { "name": "string" } }, "border": { "defaultValue": null, "description": "If true, draw a border around the image checkbox", "name": "border", "required": false, "type": { "name": "boolean" } }, "inputRef": { "defaultValue": null, "description": "Provides ability to return reference to HTMLInputElement", "name": "inputRef", "required": false, "type": { "name": "Ref<HTMLInputElement>" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
