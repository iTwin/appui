/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module KeyboardShortcut
 */

import { UiError } from "@itwin/appui-abstract";
import type { ActionButtonItemDef } from "../shared/ActionButtonItemDef";
import { ItemDefBase } from "../shared/ItemDefBase";
import { UiFramework } from "../UiFramework";
import { KeyboardShortcutMenu } from "./KeyboardShortcutMenu";
import type { KeyboardShortcutProps } from "./KeyboardShortcutProps";

enum FunctionKey {
  F1 = "F1",
  F2 = "F2",
  F3 = "F3",
  F4 = "F4",
  F5 = "F5",
  F6 = "F6",
  F7 = "F7",
  F8 = "F8",
  F9 = "F9",
  F10 = "F10",
  F11 = "F11",
  F12 = "F12",
}

enum SpecialKey {
  Home = "Home",
  End = "End",
  PageUp = "PageUp",
  PageDown = "PageDown",
  Escape = "Escape",
  Delete = "Delete",
  Insert = "Insert",
  Tab = "Tab",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Enter = "Enter",
  Return = "Enter", // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  Space = " ",
  Backspace = "Backspace",
  Clear = "Clear",
  Divide = "Divide",
  Multiply = "Multiply",
  Subtract = "Subtract",
  Add = "Add",
  Decimal = "Decimal",
}

/** Keyboard Shortcut used to execute an action
 * @public
 */
export class KeyboardShortcut extends ItemDefBase {
  private _key: string;
  private _item?: ActionButtonItemDef;
  private _shortcuts: KeyboardShortcutContainer;
  private _execute?: () => void;

  private _isAltKeyRequired: boolean = false;
  private _isCtrlKeyRequired: boolean = false;
  private _isShiftKeyRequired: boolean = false;
  private _isFunctionKey: boolean = false;
  private _isSpecialKey: boolean = false;

  constructor(props: KeyboardShortcutProps) {
    super(props);

    this._key = props.key;

    if (this._key in FunctionKey) this._isFunctionKey = true;
    if (this._key in SpecialKey) this._isSpecialKey = true;

    this._shortcuts = new KeyboardShortcutContainer();

    // eslint-disable-next-line deprecation/deprecation
    if (props.item) {
      // eslint-disable-next-line deprecation/deprecation
      this._item = props.item;

      // Copy over icon, label & tooltip from the item
      if (!this.iconSpec) this.iconSpec = this._item.iconSpec;
      if (!this.label) this.setLabel(this._item.label);
      if (!this.tooltip) this.setTooltip(this._item.tooltip);
      if (this.isDisabled === undefined)
        this.isDisabled = this._item.isDisabled;
      if (this.isHidden === undefined) this.isHidden = this._item.isHidden;
    } else if (props.execute) {
      this._execute = props.execute;
    } else if (props.shortcuts) {
      props.shortcuts.forEach((childProps: KeyboardShortcutProps) => {
        const shortcut = new KeyboardShortcut(childProps);
        this._shortcuts.registerKey(shortcut.keyMapKey, shortcut);
      });
    } else {
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        `Either 'item', 'execute' or 'shortcuts' must be specified for '${props.key}' key.`
      );
    }

    if (props.isAltKeyRequired !== undefined)
      this._isAltKeyRequired = props.isAltKeyRequired;
    if (props.isCtrlKeyRequired !== undefined)
      this._isCtrlKeyRequired = props.isCtrlKeyRequired;
    if (props.isShiftKeyRequired !== undefined)
      this._isShiftKeyRequired = props.isShiftKeyRequired;
  }

  /** Returns the id for this shortcut */
  public get id(): string {
    return this.keyMapKey;
  }

  /** Returns the shortcut container */
  public get shortcutContainer(): KeyboardShortcutContainer {
    return this._shortcuts;
  }

  /** Finds a shortcut with a given key in the shortcut's container */
  public getShortcut(mapKey: string): KeyboardShortcut | undefined {
    return this._shortcuts.findKey(mapKey);
  }

  /** Returns the shortcut's key map key used as the id */
  public get keyMapKey(): string {
    const keyMapKey = KeyboardShortcutContainer.generateKeyMapKey(
      this.key,
      this._isAltKeyRequired,
      this._isCtrlKeyRequired,
      this._isShiftKeyRequired
    );
    return keyMapKey;
  }

  /** Returns the [[ActionButtonItemDef]] associated with this shortcut */
  public get item(): ActionButtonItemDef | undefined {
    return this._item;
  }

  /** Called when the [[ActionButtonItemDef]] associated with this shortcut is invoked */
  public itemPicked(): void {
    if (this._shortcuts.areKeyboardShortcutsAvailable()) {
      this._shortcuts.showShortcutsMenu();
    } else {
      setTimeout(() => {
        if (this._item) this._item.execute();
        else if (this._execute) this._execute();
      });
    }
  }

  /** Gets the keyboard key */
  public get key(): string {
    return this._key;
  }
  /** Gets whether the Alt key required. */
  public get isAltKeyRequired(): boolean {
    return this._isAltKeyRequired;
  }
  /** Gets whether the Ctrl key required. */
  public get isCtrlKeyRequired(): boolean {
    return this._isCtrlKeyRequired;
  }
  /** Gets whether the Shift key required. */
  public get isShiftKeyRequired(): boolean {
    return this._isShiftKeyRequired;
  }
  /** Gets whether this is a Function key. */
  public get isFunctionKey(): boolean {
    return this._isFunctionKey;
  }
  /** Gets whether this is a Special key. */
  public get isSpecialKey(): boolean {
    return this._isSpecialKey;
  }
}

/** Keyboard Shortcut Container
 * @public
 */
export class KeyboardShortcutContainer {
  private _keyMap: Map<string, KeyboardShortcut> = new Map<
    string,
    KeyboardShortcut
  >();
  private _keyArray: KeyboardShortcut[] = new Array<KeyboardShortcut>();

  /** Registers a Keyboard Shortcut associated with a given key in the managed list */
  public registerKey(
    keyMapKey: string,
    inShortcut: KeyboardShortcut
  ): KeyboardShortcut | undefined {
    let shortcut: KeyboardShortcut | undefined;

    if ((shortcut = this.findKey(keyMapKey)) === undefined) {
      shortcut = inShortcut;
      this._keyArray.push(shortcut);
    } else {
      const index = this._keyArray.findIndex((value: KeyboardShortcut) => {
        return value.keyMapKey === keyMapKey;
      });
      if (index >= 0) {
        shortcut = inShortcut;
        this._keyArray[index] = shortcut;
      }
    }

    if (shortcut) this._keyMap.set(keyMapKey, shortcut);

    return shortcut;
  }

  /** Finds a Keyboard Shortcut associated with a given key */
  public findKey(keyMapKey: string): KeyboardShortcut | undefined {
    return this._keyMap.get(keyMapKey);
  }

  /** Determines if any Keyboard Shortcuts are available in this container */
  public areKeyboardShortcutsAvailable(): boolean {
    return this._keyMap.size !== 0;
  }

  /** Empties any Keyboard Shortcuts from this container */
  public emptyData(): void {
    this._keyMap.clear();
    this._keyArray.length = 0;
  }

  public getAvailableKeyboardShortcuts(): KeyboardShortcut[] {
    return this._keyArray.slice();
  }

  /** Generates a key used for storing and finding the Keyboard Shortcuts in this container */
  public static generateKeyMapKey(
    keyboardKey: string,
    isAltKeyRequired: boolean,
    isCtrlKeyRequired: boolean,
    isShiftKeyRequired: boolean
  ): string {
    let keyMapKey = keyboardKey;

    if (isAltKeyRequired) keyMapKey = `Alt+${keyMapKey}`;
    if (isShiftKeyRequired) keyMapKey = `Shift+${keyMapKey}`;
    if (isCtrlKeyRequired) keyMapKey = `Ctrl+${keyMapKey}`;

    return keyMapKey;
  }

  /** Displays a menu for the Keyboard Shortcuts in this container */
  public showShortcutsMenu() {
    const offset = 8;
    KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.emit({
      menuVisible: true,
      menuX: UiFramework.keyboardShortcuts.cursorX - offset,
      menuY: UiFramework.keyboardShortcuts.cursorY - offset,
      shortcuts: this.getAvailableKeyboardShortcuts(),
    });
  }
}
