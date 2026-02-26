import { j as jsxRuntimeExports, R as React } from "./iframe-BENp4d1r.js";
import { j as IModelApp, aS as EmptyLocalization, ar as UiComponents, aT as StateManager, aU as Provider_default, aV as ThemeManager, U as UiFramework } from "./appui-react-CEufDDhs.js";
import { L as Logger } from "./Key.enum-CnwI7CFN.js";
class UiIModelComponents {
  static _initialized = false;
  /**
   * initialize UiIModelComponents.
   */
  static async initialize() {
    if (UiIModelComponents._initialized) {
      Logger.logInfo(
        UiIModelComponents.loggerCategory("UiIModelComponents"),
        `UiIModelComponents.initialize already called`
      );
      return;
    }
    await IModelApp.localization?.registerNamespace(
      UiIModelComponents.localizationNamespace
    );
    if (!IModelApp.localization) {
      const localization = new EmptyLocalization();
      await localization.initialize();
      await UiComponents.initialize(localization);
    } else {
      await UiComponents.initialize(IModelApp.localization);
    }
    UiIModelComponents._initialized = true;
  }
  /** Unregisters the UiIModelComponents localization namespace */
  static terminate() {
    IModelApp.localization?.unregisterNamespace(
      UiIModelComponents.localizationNamespace
    );
    UiComponents.terminate();
    UiIModelComponents._initialized = false;
  }
  /** Determines if UiIModelComponents has been initialized */
  static get initialized() {
    return UiIModelComponents._initialized;
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
    if (!UiIModelComponents.initialized || !IModelApp.localization) {
      Logger.logError(
        UiIModelComponents.loggerCategory("UiIModelComponents"),
        `translate: IModelApp.localization has not been setup. Returning blank string.`
      );
      return "";
    }
    return IModelApp.localization.getLocalizedString(
      `${UiIModelComponents.localizationNamespace}:${String(key)}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiIModelComponents.packageName}.${name}`;
  }
}
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
