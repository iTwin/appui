import { p as enablePatches, q as UiCore } from "./appui-react-CT2sxVtp.js";
import { L as Logger } from "./Dialog-BV9UAzoZ.js";
const _UiComponents = class _UiComponents {
  /**
   * Registers the localization service namespace for UiComponents. Also initializes UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (_UiComponents._initialized) {
      Logger.logInfo(
        _UiComponents.loggerCategory("UiComponents"),
        `UiComponents.initialize already called`
      );
      return;
    }
    enablePatches();
    _UiComponents._localization = localization;
    await _UiComponents._localization.registerNamespace(
      _UiComponents.localizationNamespace
    );
    await UiCore.initialize(_UiComponents._localization);
    _UiComponents._initialized = true;
  }
  /** Unregisters the UiComponents localization namespace */
  static terminate() {
    if (_UiComponents._localization)
      _UiComponents._localization.unregisterNamespace(
        _UiComponents.localizationNamespace
      );
    _UiComponents._localization = void 0;
    UiCore.terminate();
    _UiComponents._initialized = false;
  }
  /** Determines if UiComponents has been initialized */
  static get initialized() {
    return _UiComponents._initialized;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiComponents";
  }
  /** @internal */
  static get packageName() {
    return "components-react";
  }
  /** Calls localization.getLocalizedString with the "UiComponents" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key) {
    if (!_UiComponents._localization) {
      Logger.logError(
        _UiComponents.loggerCategory("UiComponents"),
        `translate: UiComponents.initialize has not been called. Returning blank string.`
      );
      return "";
    }
    return _UiComponents._localization.getLocalizedString(
      `${_UiComponents.localizationNamespace}:${String(key)}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${_UiComponents.packageName}.${name}`;
  }
};
_UiComponents._initialized = false;
let UiComponents = _UiComponents;
export {
  UiComponents as U
};
