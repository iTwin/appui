var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-B2adf99T.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { a9 as Logger, aT as UiError, z as purify, D as DOMPurifyNS, K as Key_enum, aU as ReactAutosuggest, d as Input } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import "./index-Cm_5MPU1.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./iframe-BGUnDEVO.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
async function reuseOrCreatePromise(id, createPromise, cache2) {
  let getPromise = cache2.get(id);
  if (!getPromise) {
    getPromise = createPromise().catch((e) => {
      cache2.delete(id);
      throw e;
    });
    cache2.set(id, getPromise);
  }
  return getPromise;
}
const cache = /* @__PURE__ */ new Map();
function parseSvgFromDataUri(src, element) {
  const dataUriParts = src.split(",");
  if (dataUriParts.length !== 2 && "data:image/svg+xml;base64" === dataUriParts[0] || "data:image/svg+xml;base64" !== dataUriParts[0] && "data:image/svg+xml" !== dataUriParts[0]) {
    Logger.logError(UiCore.loggerCategory(element), "Unable to load icon.");
    return;
  }
  let rawSvg = "";
  if ("data:image/svg+xml;base64" === dataUriParts[0]) {
    rawSvg = window.atob(dataUriParts[1]);
  } else {
    rawSvg = decodeURIComponent(dataUriParts.slice(1).join(","));
  }
  const sanitizer = purify ?? DOMPurifyNS;
  const sanitizedSvg = sanitizer.sanitize(rawSvg);
  const parsedSvg = new window.DOMParser().parseFromString(
    sanitizedSvg,
    "text/xml"
  );
  const errorNode = parsedSvg.querySelector("parsererror");
  if (errorNode || "svg" !== parsedSvg.documentElement.nodeName.toLowerCase()) {
    throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
  }
  return parsedSvg.documentElement;
}
async function fetchSvg(src, element) {
  const response = await fetch(src).catch((_error) => {
    Logger.logError(UiCore.loggerCategory(element), "Unable to load icon.");
  });
  if (!response || !response.ok) {
    throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
  }
  const str = await response.text();
  if (str === void 0) {
    throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
  }
  const data = new window.DOMParser().parseFromString(str, "text/xml");
  return data.documentElement;
}
async function getSvg(src, element) {
  if (src.startsWith("data:")) {
    return parseSvgFromDataUri(src, element);
  }
  return fetchSvg(src, element);
}
class IconWebComponent extends HTMLElement {
  async connectedCallback() {
    await this.loadSvg();
    this.dispatchEvent(new CustomEvent("load"));
  }
  async loadSvg() {
    if (this.childNodes.length)
      return;
    const src = this.getAttribute("src") || "";
    if (!src)
      return;
    const svg = await reuseOrCreatePromise(
      src,
      async () => getSvg(src, this),
      cache
    );
    if (svg && !this.childNodes.length) {
      this.append(svg.cloneNode(true));
    }
  }
}
const getObjectClassName = (obj) => {
  var _a2;
  return (obj == null ? void 0 : obj.name) ? obj.name : ((_a2 = obj == null ? void 0 : obj.constructor) == null ? void 0 : _a2.name) ? obj.constructor.name : "";
};
const _UiCore = class _UiCore {
  /**
   * Registers the Localization service namespace for UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (_UiCore._initialized) {
      Logger.logInfo(
        _UiCore.loggerCategory(_UiCore),
        `UiCore.initialize already called`
      );
      return;
    }
    _UiCore._localization = localization;
    await _UiCore._localization.registerNamespace(_UiCore.localizationNamespace);
    if (window.customElements.get("svg-loader") === void 0)
      window.customElements.define("svg-loader", IconWebComponent);
    _UiCore._initialized = true;
  }
  /** Unregisters the UiCore localization namespace */
  static terminate() {
    if (_UiCore._localization)
      _UiCore._localization.unregisterNamespace(_UiCore.localizationNamespace);
    _UiCore._localization = void 0;
    _UiCore._initialized = false;
  }
  /** Determines if UiCore has been initialized */
  static get initialized() {
    return _UiCore._initialized;
  }
  /** The internationalization service created by the host application.
   * @internal
   */
  static get localization() {
    if (!_UiCore._localization)
      throw new UiError(
        _UiCore.loggerCategory(this),
        "localization: UiCore.initialize has not been called. Unable to return Localization object."
      );
    return _UiCore._localization;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiCore";
  }
  /** Calls localization.getLocalizedString with the "UiCore" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key) {
    if (!_UiCore._localization) {
      Logger.logError(
        _UiCore.loggerCategory(this),
        `translate: UiCore must be initialize with a localization provider. Returning blank string.`
      );
      return "";
    }
    return _UiCore._localization.getLocalizedString(
      `${_UiCore.localizationNamespace}:${key}`
    );
  }
  /** @internal */
  static get packageName() {
    return "core-react";
  }
  /** @internal */
  static loggerCategory(obj) {
    const className = getObjectClassName(obj);
    const category = _UiCore.packageName + (className ? `.${className}` : "");
    return category;
  }
};
_UiCore._initialized = false;
let UiCore = _UiCore;
class AutoSuggest extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this._onChange = (e) => {
      let newValue = "";
      if (e.target.tagName === "LI" && e.target.textContent)
        newValue = e.target.textContent;
      else if (e.target.value)
        newValue = e.target.value;
      this.setState({
        inputValue: newValue
      });
    };
    this._onFocus = (e) => {
      if (this.props.onInputFocus)
        this.props.onInputFocus(e);
    };
    this._onSuggestionsFetchRequested = async (request) => {
      const value = request.value;
      const suggestions = await this._getSuggestions(value);
      if (this._isMounted)
        this.setState({ suggestions });
    };
    this._onSuggestionsClearRequested = () => {
      this.setState({ suggestions: [] });
      this.props.onSuggestionsClearRequested && this.props.onSuggestionsClearRequested();
    };
    this._onSuggestionSelected = (_event, data) => {
      this.props.onSuggestionSelected(data.suggestion);
    };
    this._getSuggestions = async (value) => {
      if (typeof this.props.options === "function")
        return Promise.resolve(this.props.options(value));
      if (this.props.getSuggestions)
        return this.props.getSuggestions(value);
      if (this.props.options === void 0) {
        Logger.logError(
          UiCore.loggerCategory(this),
          `props.options or props.getSuggestions should be provided`
        );
        return Promise.resolve([]);
      }
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      return Promise.resolve(
        inputLength === 0 ? (
          /* istanbul ignore next */
          []
        ) : this.props.options.filter((data) => {
          return data.label.toLowerCase().includes(inputValue) || data.value.toLowerCase().includes(inputValue);
        })
      );
    };
    this._getSuggestionValue = (suggestion) => suggestion.label;
    this._renderSuggestion = (suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: suggestion.label });
    this._handleKeyDown = (e) => {
      switch (e.key) {
        case Key_enum.Key.Enter.valueOf():
          if (this.props.onPressEnter)
            this.props.onPressEnter(e);
          break;
        case Key_enum.Key.Escape.valueOf():
          if (this.props.onPressEscape)
            this.props.onPressEscape(e);
          break;
        case Key_enum.Key.Tab.valueOf():
          if (this.props.onPressTab)
            this.props.onPressTab(e);
          break;
      }
    };
    this._theme = {
      container: "uicore-autosuggest__container",
      containerOpen: "uicore-autosuggest__container--open",
      input: "uicore-autosuggest__input",
      inputOpen: "uicore-autosuggest__input--open",
      inputFocused: "uicore-autosuggest__input--focused",
      suggestionsContainer: "uicore-autosuggest__suggestions-container",
      suggestionsContainerOpen: "uicore-autosuggest__suggestions-container--open",
      suggestionsList: "uicore-autosuggest__suggestions-list",
      suggestion: "uicore-autosuggest__suggestion",
      suggestionFirst: "uicore-autosuggest__suggestion--first",
      suggestionHighlighted: "uicore-autosuggest__suggestion--highlighted",
      sectionContainer: "uicore-autosuggest__section-container",
      sectionContainerFirst: "uicore-autosuggest__section-container--first",
      sectionTitle: "uicore-autosuggest__section-title"
    };
    this.state = {
      inputValue: this.getLabel(props.value),
      suggestions: []
    };
  }
  /** @internal */
  componentDidMount() {
    this._isMounted = true;
  }
  /** @internal */
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value || this.props.options !== prevProps.options) {
      this.setState((_prevState, props) => ({
        inputValue: this.getLabel(props.value)
      }));
    }
  }
  getLabel(value) {
    let label = "";
    if (this.props.getLabel) {
      label = this.props.getLabel(value);
    } else if (this.props.options instanceof Array) {
      const entry = this.props.options.find(
        (data) => data.value === value
      );
      if (entry)
        label = entry.label;
    } else {
      Logger.logError(
        UiCore.loggerCategory(this),
        `props.getLabel should be provided when props.options is a function`
      );
    }
    return label;
  }
  render() {
    const { inputValue, suggestions } = this.state;
    const {
      value,
      onChange,
      placeholder,
      options,
      onSuggestionSelected,
      setFocus,
      alwaysRenderSuggestions,
      onPressEnter,
      onPressEscape,
      onPressTab,
      onInputFocus,
      getLabel,
      getSuggestions,
      renderInputComponent,
      renderSuggestionsContainer,
      onSuggestionsClearRequested,
      ...props
    } = this.props;
    const inputPlaceholder = !inputValue ? placeholder : void 0;
    const inputProps = {
      ...props,
      value: inputValue,
      onChange: this._onChange,
      onFocus: this._onFocus,
      placeholder: inputPlaceholder,
      autoFocus: setFocus
    };
    const defaultRenderInputComponent = (renderInputProps) => {
      const { size, ...other } = renderInputProps;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...other });
    };
    return (
      // The onKeyDown event handler is only being used to capture bubbled events
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: this.props.className,
          style: this.props.style,
          onKeyDown: this._handleKeyDown,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReactAutosuggest,
            {
              theme: this._theme,
              suggestions,
              onSuggestionsFetchRequested: this._onSuggestionsFetchRequested,
              onSuggestionsClearRequested: this._onSuggestionsClearRequested,
              getSuggestionValue: this._getSuggestionValue,
              renderSuggestion: this._renderSuggestion,
              inputProps,
              onSuggestionSelected: this._onSuggestionSelected,
              alwaysRenderSuggestions,
              renderInputComponent: renderInputComponent || defaultRenderInputComponent,
              renderSuggestionsContainer
            }
          )
        }
      )
    );
  }
}
try {
  AutoSuggest.displayName = "AutoSuggest";
  AutoSuggest.__docgenInfo = { "description": "Auto Suggest React component. Uses the react-autosuggest component internally.", "displayName": "AutoSuggest", "props": { "value": { "defaultValue": null, "description": "Optional input value override.", "name": "value", "required": false, "type": { "name": "string" } }, "options": { "defaultValue": null, "description": "Options for dropdown.", "name": "options", "required": false, "type": { "name": "AutoSuggestData[] | GetAutoSuggestDataFunc" } }, "getSuggestions": { "defaultValue": null, "description": "Asynchronously calculate suggestions for any given input value.", "name": "getSuggestions", "required": false, "type": { "name": "AsyncGetAutoSuggestDataFunc" } }, "getLabel": { "defaultValue": null, "description": "Gets a label associated with a given value", "name": "getLabel", "required": false, "type": { "name": "((value: string) => string)" } }, "onSuggestionSelected": { "defaultValue": null, "description": "Handler for when suggested selected.", "name": "onSuggestionSelected", "required": true, "type": { "name": "(selected: AutoSuggestData) => void" } }, "onPressEnter": { "defaultValue": null, "description": "Handler for Enter key.", "name": "onPressEnter", "required": false, "type": { "name": "((e: KeyboardEvent<HTMLInputElement>) => void)" } }, "onPressEscape": { "defaultValue": null, "description": "Handler for Escape key.", "name": "onPressEscape", "required": false, "type": { "name": "((e: KeyboardEvent<HTMLInputElement>) => void)" } }, "onPressTab": { "defaultValue": null, "description": "Handler for Tab key.", "name": "onPressTab", "required": false, "type": { "name": "((e: KeyboardEvent<HTMLInputElement>) => void)" } }, "onInputFocus": { "defaultValue": null, "description": "Handler for input receiving focus.", "name": "onInputFocus", "required": false, "type": { "name": "((e: FocusEvent<HTMLInputElement, Element>) => void)" } }, "onSuggestionsClearRequested": { "defaultValue": null, "description": "Called every time you need to clear suggestions.", "name": "onSuggestionsClearRequested", "required": false, "type": { "name": "(() => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether to set focus to the input element", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "renderInputComponent": { "defaultValue": null, "description": "Use it only if you need to customize the rendering of the input.\n@internal", "name": "renderInputComponent", "required": false, "type": { "name": "any" } }, "renderSuggestionsContainer": { "defaultValue": null, "description": "Use it if you want to customize things inside the suggestions container beyond rendering the suggestions themselves.\n@internal", "name": "renderSuggestionsContainer", "required": false, "type": { "name": "RenderSuggestionsContainer" } }, "alwaysRenderSuggestions": { "defaultValue": null, "description": "@internal", "name": "alwaysRenderSuggestions", "required": false, "type": { "name": "boolean" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Components/AutoSuggest",
  component: AutoSuggest,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    options: [{
      value: "1",
      label: "Label 1"
    }, {
      value: "1_1",
      label: "Label 1_1"
    }, {
      value: "1_2",
      label: "Label 1_2"
    }, {
      value: "2",
      label: "Label 2"
    }, {
      value: "3_1",
      label: "Label 3_1"
    }, {
      value: "3_2",
      label: "Label 3_2"
    }]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    options: [{\n      value: "1",\n      label: "Label 1"\n    }, {\n      value: "1_1",\n      label: "Label 1_1"\n    }, {\n      value: "1_2",\n      label: "Label 1_2"\n    }, {\n      value: "2",\n      label: "Label 2"\n    }, {\n      value: "3_1",\n      label: "Label 3_1"\n    }, {\n      value: "3_2",\n      label: "Label 3_2"\n    }]\n  }\n}',
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
