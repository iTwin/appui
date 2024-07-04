/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { Key } from "ts-key-enum";
import { ToolAdmin } from "@itwin/core-frontend";
import { UiFramework } from "../UiFramework";

/** Subclass of `ToolAdmin` in `@itwin/core-frontend` to be used to initialize `IModelApp`.
 *
 * Enable processing of shortcut keys registered to
 * [[UiFramework.keyboardShortcuts]] when focus is set to Home.
 *
 * ```ts
 * await IModelApp.startup({
 *   toolAdmin: new FrameworkToolAdmin()
 * });
 * ```
 * @beta
 */
export class FrameworkToolAdmin extends ToolAdmin {
  public override async processShortcutKey(
    e: KeyboardEvent,
    wentDown: boolean
  ): Promise<boolean> {
    if (!wentDown) return false;
    if (UiFramework.isContextMenuOpen) return false;
    if (!UiFramework.keyboardShortcuts.isFocusOnHome) return false;
    if (e.key === Key.Escape.valueOf()) return false;

    UiFramework.keyboardShortcuts.processKey(
      e.key,
      e.altKey,
      e.ctrlKey,
      e.shiftKey
    );
    return true;
  }
}
