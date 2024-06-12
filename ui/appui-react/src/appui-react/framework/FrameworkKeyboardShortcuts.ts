/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module KeyboardShortcut
 */
import type { BadgeType, IconSpec } from "@itwin/core-react";
import type { KeyboardShortcutProps } from "../keyboardshortcut/KeyboardShortcutProps";
import type { ActionButtonItemDef } from "../shared/ActionButtonItemDef";
import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "../shared/ConditionalValue";
import type { StringGetter } from "@itwin/appui-abstract";

/** Keyboard Shortcut used to execute an action
 * @public
 */
export interface FrameworkKeyboardShortcut {
  /** Returns the id for this shortcut */
  readonly id: string;

  /** Returns the shortcut container */
  readonly shortcutContainer: FrameworkKeyboardShortcutContainer;

  /** Finds a shortcut with a given key in the shortcut's container */
  getShortcut(mapKey: string): FrameworkKeyboardShortcut | undefined;

  /** Returns the shortcut's key map key used as the id */
  readonly keyMapKey: string;

  /** Returns the [[ActionButtonItemDef]] associated with this shortcut.
   * @deprecated in 4.15.0. Use properties of this object instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly item: ActionButtonItemDef | undefined;

  /** Called when the [[ActionButtonItemDef]] associated with this shortcut is invoked */
  itemPicked(): void;

  /** Gets the keyboard key */
  readonly key: string;
  /** Gets whether the Alt key required. */
  readonly isAltKeyRequired: boolean;
  /** Gets whether the Ctrl key required. */
  readonly isCtrlKeyRequired: boolean;
  /** Gets whether the Shift key required. */
  readonly isShiftKeyRequired: boolean;
  /** Gets whether this is a Function key. */
  readonly isFunctionKey: boolean;
  /** Gets whether this is a Special key. */
  readonly isSpecialKey: boolean;

  // Properties extended from deprecated `ItemDefBase`
  isPressed: boolean;
  isActive: boolean;
  applicationData?: any;
  isHidden?: boolean | ConditionalBooleanValue;
  isDisabled?: boolean | ConditionalBooleanValue;
  badgeType?: BadgeType;
  iconSpec?: IconSpec;
  iconElement?: React.ReactNode;
  trayId: undefined;
  readonly rawLabel: string | StringGetter | ConditionalStringValue;
  readonly label: string;
  setLabel(v: string | StringGetter | ConditionalStringValue): void;
  readonly tooltip: string;
  setTooltip(v: string | StringGetter | ConditionalStringValue): void;
  readonly description: string;
  setDescription(v: string | StringGetter | ConditionalStringValue): void;
}

/** Keyboard Shortcut Container
 * @public
 */
export interface FrameworkKeyboardShortcutContainer {
  /** Registers a Keyboard Shortcut associated with a given key in the managed list */
  registerKey(
    keyMapKey: string,
    inShortcut: FrameworkKeyboardShortcut
  ): FrameworkKeyboardShortcut | undefined;

  /** Finds a Keyboard Shortcut associated with a given key */
  findKey(keyMapKey: string): FrameworkKeyboardShortcut | undefined;

  /** Determines if any Keyboard Shortcuts are available in this container */
  areKeyboardShortcutsAvailable(): boolean;

  /** Empties any Keyboard Shortcuts from this container */
  emptyData(): void;

  getAvailableKeyboardShortcuts(): FrameworkKeyboardShortcut[];

  /** Displays a menu for the Keyboard Shortcuts in this container */
  showShortcutsMenu(): void;
}

/**
 * [[UiFramework.keyboardShortcuts]] interface
 * @public
 */
export interface FrameworkKeyboardShortcuts {
  /** Loads Keyboard Shortcuts into the managed list */
  loadShortcuts(shortcutList: KeyboardShortcutProps[]): void;

  /** Loads a Keyboard Shortcut into the managed list */
  loadShortcut(shortcutProps: KeyboardShortcutProps): void;

  /** Processes a keystroke and invokes a matching Keyboard Shortcut */
  processKey(
    keyboardKey: string,
    isAltKeyPressed?: boolean,
    isCtrlKeyPressed?: boolean,
    isShiftKeyPressed?: boolean
  ): boolean;

  /** Returns the managed list of Keyboard Shortcuts */
  readonly shortcutContainer: FrameworkKeyboardShortcutContainer;

  /** Returns a Keyboard Shortcut from the managed lists */
  getShortcut(keyMapKey: string): FrameworkKeyboardShortcut | undefined;

  /** Determines if focus is set to Home */
  readonly isFocusOnHome: boolean;

  /** Sets focus to Home */
  setFocusToHome(): void;

  /** Displays the Keyboard Shortcuts menu at the cursor */
  displayMenu(): void;

  /** Closes the Keyboard Shortcuts menu */
  closeMenu(): void;

  /** Returns the cursor X position, which is mouseEvent.pageX. */
  readonly cursorX: number;
  /** Returns the cursor Y position, which is mouseEvent.pageY. */
  readonly cursorY: number;
}
