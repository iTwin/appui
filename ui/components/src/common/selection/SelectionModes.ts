/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Common */

export enum SelectionModeFlags {
  SelectionLimitOne = 1 << 0,
  DragEnabled = 1 << 1,
  ToggleEnabled = 1 << 2,
  KeysEnabled = 1 << 3,
}

export enum SelectionMode {
  /** Only one item selected at a time. */
  Single = SelectionModeFlags.SelectionLimitOne,
  /** Toggles items; drag only applies to desktop. */
  Multiple = SelectionModeFlags.DragEnabled | SelectionModeFlags.ToggleEnabled,
  /** Allows the use of Ctrl & Shift Keys in a desktop environment. */
  Extended = SelectionModeFlags.KeysEnabled | SelectionModeFlags.ToggleEnabled,
  /** Only one item selected at a time; also allows deselecting. */
  SingleAllowDeselect = SelectionModeFlags.SelectionLimitOne | SelectionModeFlags.ToggleEnabled,
}

export const hasFlag = (selectionMode: SelectionMode, flag: SelectionModeFlags): boolean => {
  return (selectionMode & flag) !== 0;
};
