/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import { Logger } from "@itwin/core-bentley";
import type { Localization } from "@itwin/core-common";
import { UiCore } from "@itwin/core-react";
import { getObjectClassName } from "@itwin/core-react";

/**
 * Manages the localization service for the components-react package.
 * @public
 */
export class UiComponents {
  private static _initialized = false;
  private static _localization?: Localization;

  /**
   * Registers the localization service namespace for UiComponents. Also initializes UiCore.
   * @param localization The internationalization service created by the host application.
   */
  public static async initialize(localization: Localization): Promise<void> {
    if (UiComponents._initialized) {
      Logger.logInfo(
        UiComponents.loggerCategory(UiComponents),
        `UiComponents.initialize already called`
      );
      return;
    }

    UiComponents._localization = localization;
    await UiComponents._localization.registerNamespace(
      UiComponents.localizationNamespace
    );

    await UiCore.initialize(UiComponents._localization);
    UiComponents._initialized = true;
  }

  /** Unregisters the UiComponents localization namespace */
  public static terminate() {
    if (UiComponents._localization)
      UiComponents._localization.unregisterNamespace(
        UiComponents.localizationNamespace
      );
    UiComponents._localization = undefined;

    UiCore.terminate();
    UiComponents._initialized = false;
  }

  /** Determines if UiComponents has been initialized */
  public static get initialized(): boolean {
    return UiComponents._initialized;
  }

  /** The internationalization service namespace. */
  public static get localizationNamespace(): string {
    return "UiComponents";
  }

  /** @internal */
  public static get packageName(): string {
    return "components-react";
  }

  /** Calls localization.getLocalizedString with the "UiComponents" namespace. Do NOT include the namespace in the key.
   * @deprecated in 4.14.x. Do not use this internally, this is replaced by `useTranslation`.
   * @internal
   */
  public static translate(key: string | string[], fallback?: string): string {
    if (!UiComponents._localization) {
      if (fallback === undefined) {
        Logger.logError(
          UiComponents.loggerCategory(this),
          `translate: UiComponents.initialize has not been called. Returning blank string.`
        );
        return "";
      }
      return fallback;
    }
    return UiComponents._localization.getLocalizedString(
      `${UiComponents.localizationNamespace}:${key}`
    );
  }

  /** @internal */
  public static loggerCategory(obj: any): string {
    const className = getObjectClassName(obj);
    const category =
      UiComponents.packageName + (className ? `.${className}` : "");
    return category;
  }
}
