var _a, _b, _c, _d, _e, _f;
import { A as AppUiDecorator } from "./Decorators-CXFXT6hr.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { I as Input, K as Key_enum, c as classnames, aD as SvgSearch, aE as SvgClose } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { I as Icon } from "./IconComponent-CTiw7tHs.js";
import { U as UiCore$1 } from "./UiCore-BULXRlLO.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import "./index-Cm_5MPU1.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
const form = {
  submitButtonLabel: "Submit",
  errorPrefix: "Error:",
  errorSuffix: "Please review input and try again."
};
const general = {
  search: "Search",
  clear: "Clear"
};
const dialog = {
  ok: "OK",
  retry: "Retry",
  yes: "Yes",
  no: "No",
  cancel: "Cancel",
  close: "Close",
  next: "Next",
  previous: "Previous"
};
const reactselect = {
  noSelectOption: "Option not found"
};
const tree = {
  expand: "Expand",
  collapse: "Collapse"
};
const elementSeparator = {
  label: "Resizer"
};
const UiCore = {
  form,
  general,
  dialog,
  reactselect,
  tree,
  elementSeparator
};
const defaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UiCore,
  dialog,
  elementSeparator,
  form,
  general,
  reactselect,
  tree
}, Symbol.toStringTag, { value: "Module" }));
const LocalizationContext = reactExports.createContext(
  void 0
);
function LocalizationProvider(props) {
  const { children, localization } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LocalizationContext.Provider, { value: localization, children });
}
function useLocalization() {
  const localization = reactExports.useContext(LocalizationContext);
  return localization;
}
try {
  LocalizationProvider.displayName = "LocalizationProvider";
  LocalizationProvider.__docgenInfo = { "description": "Provides localization capability to the components.", "displayName": "LocalizationProvider", "props": { "localization": { "defaultValue": null, "description": "", "name": "localization", "required": true, "type": { "name": "Localization" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  useLocalization.displayName = "useLocalization";
  useLocalization.__docgenInfo = { "description": "Returns localization context.", "displayName": "useLocalization", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function usePackageTranslation({
  namespace,
  fallback,
  defaults: defaults2
}) {
  const localization = useLocalization();
  const [registered, setRegistered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!localization)
      return;
    let ignore = false;
    setRegistered(false);
    void (async () => {
      await localization.registerNamespace(namespace);
      if (ignore)
        return;
      setRegistered(true);
    })();
    return () => {
      ignore = true;
    };
  }, [localization, namespace]);
  const translate = reactExports.useCallback(
    (key) => {
      if (localization && registered) {
        return localization.getLocalizedString(`${namespace}:${key}`);
      }
      const fallbackTranslation = fallback(key);
      if (fallbackTranslation !== void 0) {
        return fallbackTranslation;
      }
      const defaultValue = getDefaultValue(defaults2, key);
      return defaultValue ?? key;
    },
    [localization, namespace, fallback, defaults2, registered]
  );
  return { translate };
}
function getDefaultValue(defaults2, propertyKey) {
  const keys = propertyKey.split(".");
  let prop = defaults2;
  for (const key of keys) {
    if (!(key in prop)) {
      prop = void 0;
      break;
    }
    prop = prop[key];
  }
  if (typeof prop !== "string") {
    return void 0;
  }
  return prop;
}
try {
  usePackageTranslation.displayName = "usePackageTranslation";
  usePackageTranslation.__docgenInfo = { "description": "Used by AppUI packages internally to define package specific `useTranslation` hook.\nUses a localization provider to translate the provided key with a specified namespace. Multiple fallback layers are used to resolve the translation:\n- Return value of a specified `fallback` function.\n- Default value looked up from a specified `defaults` object.\n- Lastly `key` argument of the translation function is returned.", "displayName": "usePackageTranslation", "props": { "namespace": { "defaultValue": null, "description": "", "name": "namespace", "required": true, "type": { "name": "string" } }, "fallback": { "defaultValue": null, "description": "", "name": "fallback", "required": true, "type": { "name": "(key: string) => string | undefined" } }, "defaults": { "defaultValue": null, "description": "", "name": "defaults", "required": true, "type": { "name": "object" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function useTranslation() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiCore$1.initialized) {
      return void 0;
    }
    return UiCore$1.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiCore$1.localizationNamespace,
    fallback,
    defaults
  });
}
try {
  useTranslation.displayName = "useTranslation";
  useTranslation.__docgenInfo = { "description": "Returns a translation function to localize package components.", "displayName": "useTranslation", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class SearchBox extends reactExports.Component {
  constructor(props) {
    super(props);
    this._inputElement = null;
    this._timeoutId = 0;
    this.state = {
      value: this.props.initialValue || ""
    };
    this._onValueChanged = (value, previousValue) => {
      if (value === previousValue)
        return;
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
    this._trackChange = (_event) => {
      let value = "";
      const previousValue = this.state.value;
      if (this._inputElement)
        value = this._inputElement.value;
      if (this.props.valueChangedDelay) {
        this._unsetTimeout();
        this._timeoutId = window.setTimeout(() => {
          this._onValueChanged(value, previousValue);
        }, this.props.valueChangedDelay);
      } else {
        this._onValueChanged(value, previousValue);
      }
    };
    this._handleKeyDown = (e) => {
      switch (e.key) {
        case Key_enum.Key.Escape.valueOf():
          if (this.props.onEscPressed)
            this.props.onEscPressed();
          break;
        case Key_enum.Key.Enter.valueOf():
          if (this.props.onEnterPressed)
            this.props.onEnterPressed();
          break;
      }
    };
    this._handleIconClick = (_event) => {
      if (this._inputElement) {
        const clear = this.state.value !== "";
        this._inputElement.value = "";
        if (clear && this.props.onClear)
          this.props.onClear();
        this._inputElement.focus();
      }
      this._trackChange();
    };
    this._unsetTimeout = () => {
      if (this._timeoutId) {
        window.clearTimeout(this._timeoutId);
        this._timeoutId = 0;
      }
    };
  }
  /** @internal */
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
  componentWillUnmount() {
    this._unsetTimeout();
  }
  focus() {
    if (this._inputElement)
      this._inputElement.focus();
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
try {
  SearchBox.displayName = "SearchBox";
  SearchBox.__docgenInfo = { "description": "Input box for entering text to search for.\nThe SearchBox has an icon right-justified and bounded by the box and shows a Search or Clear icon.", "displayName": "SearchBox", "props": { "initialValue": { "defaultValue": null, "description": "Value to set SearchBox to initially", "name": "initialValue", "required": false, "type": { "name": "string" } }, "placeholder": { "defaultValue": null, "description": "Placeholder value to show in gray before anything is entered in", "name": "placeholder", "required": false, "type": { "name": "string" } }, "onValueChanged": { "defaultValue": null, "description": "Triggered when the content of SearchBox is changed", "name": "onValueChanged", "required": true, "type": { "name": "(value: string) => void" } }, "valueChangedDelay": { "defaultValue": null, "description": "Frequency to poll for changes in value, in milliseconds", "name": "valueChangedDelay", "required": false, "type": { "name": "number" } }, "onEnterPressed": { "defaultValue": null, "description": "Listens for <Enter> keypress", "name": "onEnterPressed", "required": false, "type": { "name": "(() => void)" } }, "onEscPressed": { "defaultValue": null, "description": "Listens for <Esc> keypress", "name": "onEscPressed", "required": false, "type": { "name": "(() => void)" } }, "onClear": { "defaultValue": null, "description": "Listens for onClick event for Clear (x) icon", "name": "onClear", "required": false, "type": { "name": "(() => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Components/SearchBox",
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
WithDelay.parameters = {
  ...WithDelay.parameters,
  docs: {
    ...(_d = WithDelay.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    ...meta.args,\n    valueChangedDelay: 1000\n  }\n}",
      ...(_f = (_e = WithDelay.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
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
