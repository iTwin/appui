import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { R as React } from "./index-DM9bPmif.js";
import { d as IModelApp, w as UiComponents, af as getObjectClassName, ag as EmptyLocalization, ah as StateManager, ai as Provider, aj as ThemeManager, U as UiFramework } from "./DefaultToolSettingsProvider-DIShliKp.js";
import { L as Logger } from "./Key.enum-BpJjJDFT.js";
import "./index-EDRsojbr.js";
const _UiIModelComponents = class _UiIModelComponents {
  /**
   * initialize UiIModelComponents.
   */
  static async initialize() {
    var _a;
    if (_UiIModelComponents._initialized) {
      Logger.logInfo(
        _UiIModelComponents.loggerCategory(_UiIModelComponents),
        `UiIModelComponents.initialize already called`
      );
      return;
    }
    await ((_a = IModelApp.localization) == null ? void 0 : _a.registerNamespace(
      _UiIModelComponents.localizationNamespace
    ));
    if (!IModelApp.localization) {
      const localization = new EmptyLocalization();
      await localization.initialize();
      await UiComponents.initialize(localization);
    } else {
      await UiComponents.initialize(IModelApp.localization);
    }
    _UiIModelComponents._initialized = true;
  }
  /** Unregisters the UiIModelComponents localization namespace */
  static terminate() {
    var _a;
    (_a = IModelApp.localization) == null ? void 0 : _a.unregisterNamespace(
      _UiIModelComponents.localizationNamespace
    );
    UiComponents.terminate();
    _UiIModelComponents._initialized = false;
  }
  /** Determines if UiIModelComponents has been initialized */
  static get initialized() {
    return _UiIModelComponents._initialized;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiIModelComponents";
  }
  /** @internal */
  static get packageName() {
    return "imodel-components-react";
  }
  /** Calls localization.getLocalizedString with the "UiIModelComponents" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key) {
    if (!_UiIModelComponents.initialized || !IModelApp.localization) {
      Logger.logError(
        _UiIModelComponents.loggerCategory(this),
        `translate: IModelApp.localization has not been setup. Returning blank string.`
      );
      return "";
    }
    return IModelApp.localization.getLocalizedString(
      `${_UiIModelComponents.localizationNamespace}:${key}`
    );
  }
  /** @internal */
  static loggerCategory(obj) {
    const className = getObjectClassName(obj);
    const category = _UiIModelComponents.packageName + (className ? `.${className}` : "");
    return category;
  }
};
_UiIModelComponents._initialized = false;
let UiIModelComponents = _UiIModelComponents;
const AppUiDecorator = (Story) => {
  new StateManager();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store: StateManager.store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeManager, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) }) });
};
const InitializerDecorator = (Story) => {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    let ignore = false;
    void (async () => {
      await IModelApp.startup({});
      await UiFramework.initialize(void 0);
      await UiIModelComponents.initialize();
      if (ignore)
        return;
      setInitialized(true);
    })();
    return () => {
      ignore = true;
    };
  }, []);
  if (!initialized)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Initializing..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
export {
  AppUiDecorator as A,
  InitializerDecorator as I,
  UiIModelComponents as U
};
