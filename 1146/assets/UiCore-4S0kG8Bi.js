import { L as Logger } from "./Dialog-DSHPEPpl.js";
const _UiCore = class _UiCore {
  /**
   * Registers the Localization service namespace for UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (_UiCore._initialized) {
      Logger.logInfo(
        _UiCore.loggerCategory("UiCore"),
        `UiCore.initialize already called`
      );
      return;
    }
    _UiCore._localization = localization;
    await _UiCore._localization.registerNamespace(_UiCore.localizationNamespace);
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
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiCore";
  }
  /** Calls localization.getLocalizedString with the "UiCore" namespace. Do NOT include the namespace in the key.
   * @deprecated in 4.12.0. Do not use this internally, this is replaced by `useTranslation`.
   * @internal
   */
  static translate(key) {
    if (!_UiCore._localization) {
      Logger.logError(
        _UiCore.loggerCategory("UiCore"),
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
  static loggerCategory(name) {
    return `${_UiCore.packageName}.${name}`;
  }
};
_UiCore._initialized = false;
let UiCore = _UiCore;
export {
  UiCore as U
};
