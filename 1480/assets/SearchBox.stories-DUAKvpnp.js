import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
import { K as Key_enumExports } from "./Key.enum-YmMvjtrc.js";
import { I as Icon } from "./IconComponent-BSg4ZOM0.js";
import { bb as SvgSearch, bc as SvgClose, X as Input } from "./appui-react-glMK-yaN.js";
import { u as useTranslation } from "./useTranslation-CYVV2OaB.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
import "./UiCore-BNsF1kyP.js";
class SearchBox extends reactExports.Component {
  _inputElement = null;
  _timeoutId = 0;
  state = {
    value: this.props.initialValue || ""
  };
  constructor(props) {
    super(props);
  }
  render() {
    const searchClassName = classnames("core-searchbox", this.props.className);
    const emptyString = this.state.value === "";
    const iconClassName = classnames("core-searchbox-icon", "icon");
    const iconSpec = emptyString ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSearch, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClose, {});
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: searchClassName,
        style: this.props.style,
        "data-testid": "core-searchbox-instance",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SearchBoxInput,
            {
              defaultValue: this.props.initialValue,
              ref: (el) => {
                this._inputElement = el;
              },
              onChange: this._trackChange,
              onKeyDown: this._handleKeyDown,
              onPaste: this._trackChange,
              onCut: this._trackChange,
              placeholder: this.props.placeholder,
              role: "searchbox",
              "data-testid": "core-searchbox-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SearchBoxButton,
            {
              className: "core-searchbox-button",
              onClick: this._handleIconClick,
              role: "button",
              tabIndex: -1,
              emptyString,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: iconClassName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec }) })
            }
          )
        ]
      }
    );
  }
  /** Wrapper for onValueChanged to make sure we don't call search unless the new value is different from the previous value */
  _onValueChanged = (value, previousValue) => {
    if (value === previousValue) return;
    this.setState(
      (_prevState) => {
        return {
          value
        };
      },
      () => {
        this.props.onValueChanged(this.state.value);
      }
    );
  };
  _trackChange = (_event) => {
    let value = "";
    const previousValue = this.state.value;
    if (this._inputElement) value = this._inputElement.value;
    if (this.props.valueChangedDelay) {
      this._unsetTimeout();
      this._timeoutId = window.setTimeout(() => {
        this._onValueChanged(value, previousValue);
      }, this.props.valueChangedDelay);
    } else {
      this._onValueChanged(value, previousValue);
    }
  };
  _handleKeyDown = (e) => {
    switch (e.key) {
      case Key_enumExports.Key.Escape.valueOf():
        if (this.props.onEscPressed) this.props.onEscPressed();
        break;
      case Key_enumExports.Key.Enter.valueOf():
        if (this.props.onEnterPressed) this.props.onEnterPressed();
        break;
    }
  };
  _handleIconClick = (_event) => {
    if (this._inputElement) {
      const clear = this.state.value !== "";
      this._inputElement.value = "";
      if (clear && this.props.onClear) this.props.onClear();
      this._inputElement.focus();
    }
    this._trackChange();
  };
  _unsetTimeout = () => {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  };
  componentWillUnmount() {
    this._unsetTimeout();
  }
  focus() {
    if (this._inputElement) this._inputElement.focus();
  }
}
const SearchBoxInput = reactExports.forwardRef(function SearchBoxInput2({ placeholder, ...props }, ref) {
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref,
      placeholder: placeholder || translate("general.search"),
      ...props
    }
  );
});
function SearchBoxButton({
  emptyString,
  ...props
}) {
  const { translate } = useTranslation();
  const buttonTitle = translate(
    emptyString ? "general.search" : "general.clear"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: buttonTitle, ...props });
}
SearchBox.__docgenInfo = { "description": "Input box for entering text to search for.\nThe SearchBox has an icon right-justified and bounded by the box and shows a Search or Clear icon.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/searchbox iTwinUI SearchBox} instead.", "methods": [{ "name": "focus", "docblock": null, "modifiers": [], "params": [], "returns": null }], "displayName": "SearchBox", "props": { "initialValue": { "required": false, "tsType": { "name": "string" }, "description": "Value to set SearchBox to initially" }, "placeholder": { "required": false, "tsType": { "name": "string" }, "description": "Placeholder value to show in gray before anything is entered in" }, "onValueChanged": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "void" } } }, "description": "Triggered when the content of SearchBox is changed" }, "valueChangedDelay": { "required": false, "tsType": { "name": "number" }, "description": "Frequency to poll for changes in value, in milliseconds" }, "onEnterPressed": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Listens for <Enter> keypress" }, "onEscPressed": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Listens for <Esc> keypress" }, "onClear": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Listens for onClick event for Clear (x) icon" } }, "composes": ["CommonProps"] };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Deprecated/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    onValueChanged: action("onValueChanged"),
    onClear: action("onClear"),
    onEnterPressed: action("onEnterPressed"),
    onEscPressed: action("onEscPressed")
  }
};
const Basic = {};
const WithDelay = {
  args: {
    ...meta.args,
    valueChangedDelay: 1e3
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
WithDelay.parameters = {
  ...WithDelay.parameters,
  docs: {
    ...WithDelay.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    ...meta.args,\n    valueChangedDelay: 1000\n  }\n}",
      ...WithDelay.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "WithDelay"];
export {
  Basic,
  WithDelay,
  __namedExportsOrder,
  meta as default
};
