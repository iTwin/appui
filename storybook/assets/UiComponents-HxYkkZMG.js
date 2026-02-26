import { l as enablePatches, m as UiCore } from "./appui-react-CEufDDhs.js";
import { L as Logger } from "./Key.enum-CnwI7CFN.js";
class UiComponents {
  static _initialized = false;
  static _localization;
  /**
   * Registers the localization service namespace for UiComponents. Also initializes UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (UiComponents._initialized) {
      Logger.logInfo(
        UiComponents.loggerCategory("UiComponents"),
        `UiComponents.initialize already called`
      );
      return;
    }
    enablePatches();
    UiComponents._localization = localization;
    await UiComponents._localization.registerNamespace(
      UiComponents.localizationNamespace
    );
    await UiCore.initialize(UiComponents._localization);
    UiComponents._initialized = true;
  }
  /** Unregisters the UiComponents localization namespace */
  static terminate() {
    if (UiComponents._localization)
      UiComponents._localization.unregisterNamespace(
        UiComponents.localizationNamespace
      );
    UiComponents._localization = void 0;
    UiCore.terminate();
    UiComponents._initialized = false;
  }
  /** Determines if UiComponents has been initialized */
  static get initialized() {
    return UiComponents._initialized;
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
    if (!UiComponents._localization) {
      Logger.logError(
        UiComponents.loggerCategory("UiComponents"),
        `translate: UiComponents.initialize has not been called. Returning blank string.`
      );
      return "";
    }
    return UiComponents._localization.getLocalizedString(
      `${UiComponents.localizationNamespace}:${String(key)}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiComponents.packageName}.${name}`;
  }
}
export {
  UiComponents as U
};
