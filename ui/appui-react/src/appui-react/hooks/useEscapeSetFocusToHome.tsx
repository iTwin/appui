/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import { UiFramework } from "../UiFramework";

/** Keyboard Event handler to set focus to Home on Escape key
 * @internal
 */
export function onEscapeSetFocusToHome(e: React.KeyboardEvent): void {
  // istanbul ignore else
  if (e.key === Key.Escape.valueOf()) {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }
}

/** useCallback Hook for Keyboard Event handler to set focus to Home on Escape key
 * @internal
 */
export function useEscapeSetFocusToHome() {
  return React.useCallback(onEscapeSetFocusToHome, []);
}
