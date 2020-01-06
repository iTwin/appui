/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Common */

import { I18N, TranslationOptions } from "@bentley/imodeljs-i18n";
import { UiError, getClassName } from "@bentley/ui-abstract";

/**
 * Entry point for static initialization required by various
 * components used in the package.
 * @public
 */
export class UiComponents {

  private static _i18n?: I18N;

  /**
   * Called by IModelApp to initialize the UiComponents
   * @param i18n The internationalization service created by the IModelApp.
   */
  public static async initialize(i18n: I18N): Promise<void> {
    UiComponents._i18n = i18n;
    await UiComponents._i18n.registerNamespace(UiComponents.i18nNamespace).readFinished;
    return Promise.resolve();
  }

  /** Unregisters the UiComponents internationalization service namespace */
  public static terminate() {
    if (UiComponents._i18n)
      UiComponents._i18n.unregisterNamespace(UiComponents.i18nNamespace);
    UiComponents._i18n = undefined;
  }

  /** The internationalization service created by the IModelApp. */
  public static get i18n(): I18N {
    if (!UiComponents._i18n)
      throw new UiError(UiComponents.loggerCategory(this), "UiComponents not initialized");
    return UiComponents._i18n;
  }

  /** The internationalization service namespace. */
  public static get i18nNamespace(): string {
    return "UiComponents";
  }

  /** @internal */
  public static get packageName(): string {
    return "ui-components";
  }

  /** Calls i18n.translateWithNamespace with the "UiComponents" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  public static translate(key: string | string[], options?: TranslationOptions): string {
    return UiComponents.i18n.translateWithNamespace(UiComponents.i18nNamespace, key, options);
  }

  /** @internal */
  public static loggerCategory(obj: any): string {
    const className = getClassName(obj);
    const category = UiComponents.packageName + (className ? `.${className}` : "");
    return category;
  }

}
