/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp } from "@itwin/core-frontend";

/** AppUiTestProviders is a package that augments the user interface components for an iModelApp. When the package's
 * initialize method is called tools, frontstages and UiItemProviders are registered.
 */
export class AppUiTestProviders {
  public static readonly localizationNamespace = "AppuiTestProviders";

  public static syncUiEventId = {
    hideCustomDialogButton: "appui-test-providers:hide-custom-dialog-button",
    hideCustomViewOverlay:
      "appui-test-providers:hide-custom-view-overlay-button",
    toggle3dManipulations: "appui-test-providers:toggle-3d-manipulations",
  } as const;

  /** convenience method for getting localized strings from keys */
  public static translate(key: string) {
    return IModelApp.localization.getLocalizedString(
      `${AppUiTestProviders.localizationNamespace}:${key}`
    );
  }
}
