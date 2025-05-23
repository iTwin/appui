/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import { enablePatches } from "immer";
import { Logger } from "@itwin/core-bentley";
import type { Localization } from "@itwin/core-common";
import { UiCore } from "@itwin/core-react";

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

    // eslint-disable-next-line @typescript-eslint/no-deprecated
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

    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
   * @internal
   */
  public static translate(key: string | string[]): string {
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
  public static loggerCategory(name: string): string {
    return `${UiComponents.packageName}.${name}`;
  }
}
