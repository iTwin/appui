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
  /** Process shortcut key events */
  public override async processShortcutKey(
    e: KeyboardEvent,
    wentDown: boolean
  ): Promise<boolean> {
    let handled = false;

    if (wentDown && !UiFramework.isContextMenuOpen) {
      if (UiFramework.keyboardShortcuts.isFocusOnHome && e.key !== Key.Escape.valueOf()) {
        UiFramework.keyboardShortcuts.processKey(
          e.key,
          e.altKey,
          e.ctrlKey,
          e.shiftKey
        );
        handled = true;
      }
    }

    return handled;
  }
}
