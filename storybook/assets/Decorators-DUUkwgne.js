import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { R as React } from "./index-R26Bfrts.js";
import { I as IModelApp, ak as UiComponents, aE as EmptyLocalization, aF as StateManager, aG as Provider_default, aH as ThemeManager, U as UiFramework } from "./appui-react-BVsX5v19.js";
import { L as Logger } from "./Dialog-D0GO0lR_.js";
const _UiIModelComponents = class _UiIModelComponents {
  /**
   * initialize UiIModelComponents.
   */
  static async initialize() {
    var _a;
    if (_UiIModelComponents._initialized) {
      Logger.logInfo(
        _UiIModelComponents.loggerCategory("UiIModelComponents"),
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
        _UiIModelComponents.loggerCategory("UiIModelComponents"),
        `translate: IModelApp.localization has not been setup. Returning blank string.`
      );
      return "";
    }
    return IModelApp.localization.getLocalizedString(
      `${_UiIModelComponents.localizationNamespace}:${key}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${_UiIModelComponents.packageName}.${name}`;
  }
};
_UiIModelComponents._initialized = false;
let UiIModelComponents = _UiIModelComponents;
const AppUiDecorator = (Story) => {
  new StateManager();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store: StateManager.store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeManager, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) }) });
};
const InitializerDecorator = (Story) => {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    let ignore = false;
    void (async () => {
      await IModelApp.startup({});
      await UiFramework.initialize(void 0);
      await UiIModelComponents.initialize();
      if (ignore) return;
      setInitialized(true);
    })();
    return () => {
      ignore = true;
    };
  }, []);
  if (!initialized) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Initializing..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
AppUiDecorator.__docgenInfo = { "description": "", "methods": [], "displayName": "AppUiDecorator" };
InitializerDecorator.__docgenInfo = { "description": "", "methods": [], "displayName": "InitializerDecorator" };
export {
  AppUiDecorator as A,
  InitializerDecorator as I,
  UiIModelComponents as U
};
