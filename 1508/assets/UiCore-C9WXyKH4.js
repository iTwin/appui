import { L as Logger } from "./Key.enum-B3pThNWo.js";
class UiCore {
  static _initialized = false;
  static _localization;
  /**
   * Registers the Localization service namespace for UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (UiCore._initialized) {
      Logger.logInfo(
        UiCore.loggerCategory("UiCore"),
        `UiCore.initialize already called`
      );
      return;
    }
    UiCore._localization = localization;
    await UiCore._localization.registerNamespace(UiCore.localizationNamespace);
    UiCore._initialized = true;
  }
  /** Unregisters the UiCore localization namespace */
  static terminate() {
    if (UiCore._localization)
      UiCore._localization.unregisterNamespace(UiCore.localizationNamespace);
    UiCore._localization = void 0;
    UiCore._initialized = false;
  }
  /** Determines if UiCore has been initialized */
  static get initialized() {
    return UiCore._initialized;
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
    if (!UiCore._localization) {
      Logger.logError(
        UiCore.loggerCategory("UiCore"),
        `translate: UiCore must be initialize with a localization provider. Returning blank string.`
      );
      return "";
    }
    return UiCore._localization.getLocalizedString(
      `${UiCore.localizationNamespace}:${String(key)}`
    );
  }
  /** @internal */
  static get packageName() {
    return "core-react";
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiCore.packageName}.${name}`;
  }
}
export {
  UiCore as U
};
