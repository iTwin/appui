/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import { UiError } from "@itwin/appui-abstract";
import { ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl.js";
import { UiFramework } from "../UiFramework.js";
import type { ToolUiProvider } from "./ToolUiProvider.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Provides information about a tool with a given id, including the ToolUiProvider.
 * @public
 * @deprecated in 4.16.0. Uses a deprecated class {@link ToolUiProvider}.
 */
export class ToolInformation {
  private _toolUiProvider: ToolUiProvider | undefined;

  constructor(public toolId: string) {}

  /** Get the ToolUiProvider registered for this tool */
  public get toolUiProvider(): ToolUiProvider | undefined {
    if (!this._toolUiProvider) {
      let provider: ToolUiProvider | undefined;

      if (UiFramework.controls.isRegistered(this.toolId)) {
        provider = UiFramework.controls.create(
          this.toolId,
          this.toolId
        ) as ToolUiProvider;
      } else {
        if (
          UiFramework.toolSettings.useDefaultToolSettingsProvider &&
          this.toolId === UiFramework.toolSettings.toolIdForToolSettings
        )
          provider = UiFramework.controls.create(
            "DefaultToolSettings",
            this.toolId
          ) as ToolUiProvider;
      }
      if (provider) {
        if (provider.getType() !== ConfigurableUiControlType.ToolUiProvider) {
          throw new UiError(
            UiFramework.loggerCategory("ToolInformation"),
            `toolUiProvider: toolId '${this.toolId}' is registered to a control that is NOT a ToolUiProvider`
          );
        }

        this._toolUiProvider = provider;
      }
    }

    return this._toolUiProvider;
  }
}
