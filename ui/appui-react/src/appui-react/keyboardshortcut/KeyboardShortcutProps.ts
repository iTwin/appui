/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module KeyboardShortcut
 */
import type { Key } from "ts-key-enum";
import type { ActionButtonItemDef } from "../shared/ActionButtonItemDef";
import type { ItemProps } from "../shared/ItemProps";

/** Properties for a Keyboard Shortcut
 * @public
 */
export interface KeyboardShortcutProps extends ItemProps {
  /** The key that invokes the shortcut.
   * This is either an alphanumeric key, a function key or a special key.
   */
  key: string | Key;

  /** The item to execute when this shortcut is invoked. Either 'item' or 'shortcuts' must be specified.
   * @deprecated in 4.15.0. Use properties of this object instead.
   */
  item?: ActionButtonItemDef;
  /** Function to run when the keyboard shortcut is executed. */
  execute?: () => void;

  /** Nested array of shortcut props.
   * @note `execute` is ignored if `shortcuts` is specified.
   */
  shortcuts?: KeyboardShortcutProps[];

  /** Indicates whether the Alt key required. Default - false */
  isAltKeyRequired?: boolean;
  /** Indicates whether the Ctrl key required. Default - false */
  isCtrlKeyRequired?: boolean;
  /** Indicates whether the Shift key required. Default - false */
  isShiftKeyRequired?: boolean;
}
