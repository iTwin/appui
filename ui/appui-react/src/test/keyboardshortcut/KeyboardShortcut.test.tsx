/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Point } from "@itwin/core-react/internal";
import { Key } from "ts-key-enum";
import type { KeyboardShortcutProps } from "../../appui-react.js";
import {
  AccuDrawKeyboardShortcuts,
  CommandItemDef,
  KeyboardShortcut,
  KeyboardShortcutContainer,
  SyncUiEventDispatcher,
  UiFramework,
} from "../../appui-react.js";
import { CursorInformation } from "../../appui-react/cursor/CursorInformation.js";
import { KeyboardShortcutMenu } from "../../appui-react/keyboardshortcut/KeyboardShortcutMenu.js";
import TestUtils from "../TestUtils.js";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { InternalKeyboardShortcutManager } from "../../appui-react/keyboardshortcut/InternalKeyboardShortcut.js";

describe("KeyboardShortcut", () => {
  const testspy = vi.fn();
  let testCommand: CommandItemDef;
  let testCommand2: CommandItemDef;

  beforeEach(async () => {
    testCommand = new CommandItemDef({
      commandId: "testCommand",
      iconSpec: "icon-placeholder",
      label: "Test",
      execute: () => {
        testspy();
      },
    });

    testCommand2 = new CommandItemDef({
      commandId: "testCommand2",
      iconSpec: "icon-placeholder",
      label: "Test",
      execute: () => {
        testspy();
      },
    });
  });

  beforeEach(() => {
    testspy.mockReset();
    InternalKeyboardShortcutManager.shortcutContainer.emptyData();
  });

  describe("KeyboardShortcut", () => {
    it("Providing no item or shortcuts should throw Error", () => {
      expect(() =>
        InternalKeyboardShortcutManager.loadShortcut({ key: "a" })
      ).to.throw(Error);
    });

    it("should support function keys", () => {
      const keyboardShortcut = new KeyboardShortcut({
        key: Key.F7,
        item: testCommand,
      });
      expect(keyboardShortcut.isFunctionKey).toEqual(true);
      expect(keyboardShortcut.isSpecialKey).toEqual(false);
    });

    it("should support special keys", () => {
      const keyboardShortcut = new KeyboardShortcut({
        key: Key.ArrowDown,
        item: testCommand,
      });
      expect(keyboardShortcut.isSpecialKey).toEqual(true);
      expect(keyboardShortcut.isFunctionKey).toEqual(false);
    });

    it("Should provide and execute item", async () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "b",
        item: testCommand,
      });
      const shortcut = InternalKeyboardShortcutManager.getShortcut("b");
      expect(shortcut).toBeTruthy();
      if (shortcut) {
        expect(shortcut.id).toEqual("b");
        expect(shortcut.item).toEqual(testCommand);

        shortcut.itemPicked();

        await TestUtils.flushAsyncOperations();
        expect(testspy).toHaveBeenCalledOnce();
      }
    });

    it("Registering with duplicate key should replace", () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "b",
        item: testCommand,
      });
      InternalKeyboardShortcutManager.loadShortcut({
        key: "b",
        item: testCommand2,
      });
      const shortcut = InternalKeyboardShortcutManager.getShortcut("b");
      expect(shortcut).toBeTruthy();
      if (shortcut) {
        expect(shortcut.item).toEqual(testCommand2);
        const shortcuts =
          InternalKeyboardShortcutManager.shortcutContainer.getAvailableKeyboardShortcuts();
        expect(shortcuts.length).toEqual(1);
        expect(shortcuts[0].item).toEqual(testCommand2);
      }
    });

    it("KeyboardShortcut should support child shortcuts", () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "d",
        labelKey: "SampleApp:buttons.shortcutsSubMenu",
        shortcuts: [
          {
            key: "1",
            item: testCommand,
          },
        ],
      });
      const shortcut = InternalKeyboardShortcutManager.getShortcut("d");
      expect(shortcut).toBeTruthy();
      if (shortcut) {
        expect(shortcut.id).toEqual("d");
        expect(
          shortcut.shortcutContainer.areKeyboardShortcutsAvailable()
        ).toEqual(true);
        expect(shortcut.getShortcut("1")).toBeTruthy();

        const menuspy = vi.fn();
        const remove =
          KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.addListener(menuspy);
        shortcut.itemPicked();
        expect(menuspy).toHaveBeenCalledOnce();
        remove();
      }
    });

    it("Should support Alt, Ctrl and Shift keys", () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "A",
        item: testCommand,
        isAltKeyRequired: true,
        isCtrlKeyRequired: true,
        isShiftKeyRequired: true,
        iconSpec: "icon-placeholder",
        label: "Test",
        tooltip: "Tooltip",
      });
      const keyMapKey = KeyboardShortcutContainer.generateKeyMapKey(
        "A",
        true,
        true,
        true
      );
      expect(keyMapKey).toEqual("Ctrl+Shift+Alt+A");
      const shortcut = InternalKeyboardShortcutManager.getShortcut(keyMapKey);

      expect(shortcut).toBeTruthy();
      if (shortcut) {
        expect(shortcut.isAltKeyRequired).toEqual(true);
        expect(shortcut.isCtrlKeyRequired).toEqual(true);
        expect(shortcut.isShiftKeyRequired).toEqual(true);
      }
    });

    it("Should support disabled & hidden", () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "x",
        item: testCommand,
        isDisabled: true,
        isHidden: true,
        label: "Test",
      });
      const shortcut = InternalKeyboardShortcutManager.getShortcut("x");
      expect(shortcut).toBeTruthy();
      expect(shortcut!.isDisabled).toEqual(true);
      expect(shortcut!.isHidden).toEqual(true);

      const yCommand = new CommandItemDef({
        commandId: "yCommand",
        iconSpec: "icon-placeholder",
        isDisabled: true,
        isHidden: true,
        label: "Test",
        execute: () => {
          testspy();
        },
      });
      InternalKeyboardShortcutManager.loadShortcut({
        key: "y",
        item: yCommand,
        label: "Test",
      });
      const yShortcut = InternalKeyboardShortcutManager.getShortcut("y");
      expect(yShortcut).toBeTruthy();
      expect(yShortcut!.isDisabled).toEqual(true);
      expect(yShortcut!.isHidden).toEqual(true);
    });
  });

  describe("KeyboardShortcutManager", () => {
    it("UiFramework.keyboardShortcuts.loadKeyboardShortcuts should load shortcuts", () => {
      const keyboardShortcutList: KeyboardShortcutProps[] = [
        {
          key: "a",
          item: testCommand,
        },
        {
          key: "d",
          labelKey: "Test",
          shortcuts: [
            {
              key: "1",
              item: testCommand,
            },
          ],
        },
        {
          key: Key.F7,
          item: testCommand,
        },
        {
          key: Key.Home,
          item: testCommand,
        },
      ];

      const menuspy = vi.fn();
      InternalKeyboardShortcutManager.displayMenu(); // No shortcuts to display yet
      expect(menuspy).not.toBeCalled();

      UiFramework.keyboardShortcuts.loadShortcuts(keyboardShortcutList);

      expect(
        InternalKeyboardShortcutManager.shortcutContainer.areKeyboardShortcutsAvailable()
      ).toEqual(true);
      expect(
        InternalKeyboardShortcutManager.shortcutContainer.getAvailableKeyboardShortcuts()
          .length
      ).toEqual(4);
      expect(InternalKeyboardShortcutManager.getShortcut("a")).toBeTruthy();
      expect(InternalKeyboardShortcutManager.getShortcut("d")).toBeTruthy();
      expect(InternalKeyboardShortcutManager.getShortcut(Key.F7)).toBeTruthy();
      expect(
        InternalKeyboardShortcutManager.getShortcut(Key.Home)
      ).toBeTruthy();

      const remove =
        KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.addListener(menuspy);
      InternalKeyboardShortcutManager.displayMenu();
      expect(menuspy).toHaveBeenCalledOnce();
      remove();
    });

    it("processKey should invoke item", async () => {
      InternalKeyboardShortcutManager.loadShortcut({
        key: "f",
        item: testCommand,
      });

      const shortcut = InternalKeyboardShortcutManager.getShortcut("f");
      expect(shortcut).toBeTruthy();

      const processed = InternalKeyboardShortcutManager.processKey("f");
      expect(processed).toEqual(true);

      await TestUtils.flushAsyncOperations();
      expect(testspy).toHaveBeenCalledOnce();

      const processedG = InternalKeyboardShortcutManager.processKey("g");
      expect(processedG).toEqual(false);
    });

    it("processKey should invoke item", async () => {
      const testEventId = "test-sync-event";
      const testEventId3 = "test-sync-event3";
      const conditional1 = new ConditionalBooleanValue(
        () => true,
        [testEventId],
        false
      );
      const conditional2 = new ConditionalBooleanValue(
        () => true,
        [testEventId],
        false
      );
      const conditional3 = new ConditionalBooleanValue(
        () => true,
        [testEventId3],
        false
      );

      InternalKeyboardShortcutManager.initialize();
      InternalKeyboardShortcutManager.loadShortcut({
        key: "r",
        labelKey: "Test",
        isDisabled: conditional1,
        shortcuts: [
          {
            key: "t",
            item: testCommand,
            isDisabled: conditional2,
          },
          {
            key: "z",
            item: testCommand,
            isDisabled: conditional3,
            isHidden: conditional2,
          },
        ],
      });

      const shortcut = InternalKeyboardShortcutManager.getShortcut("r");
      expect(shortcut).toBeTruthy();
      expect(ConditionalBooleanValue.getValue(shortcut!.isDisabled)).toEqual(
        false
      );
      const childShortcut = shortcut!.getShortcut("t");
      expect(childShortcut).toBeTruthy();
      expect(
        ConditionalBooleanValue.getValue(childShortcut!.isDisabled)
      ).toEqual(false);
      const childShortcutZ = shortcut!.getShortcut("z");
      expect(childShortcutZ).toBeTruthy();
      expect(
        ConditionalBooleanValue.getValue(childShortcutZ!.isDisabled)
      ).toEqual(false);
      expect(
        ConditionalBooleanValue.getValue(childShortcutZ!.isHidden)
      ).toEqual(false);

      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testEventId);

      expect(ConditionalBooleanValue.getValue(shortcut!.isDisabled)).toEqual(
        true
      );
      expect(
        ConditionalBooleanValue.getValue(childShortcut!.isDisabled)
      ).toEqual(true);
      expect(
        ConditionalBooleanValue.getValue(childShortcutZ!.isDisabled)
      ).toEqual(false);
      expect(
        ConditionalBooleanValue.getValue(childShortcutZ!.isHidden)
      ).toEqual(true);
    });

    it("Should maintain cursor X & Y", () => {
      CursorInformation.cursorPosition = new Point(100, 200);

      expect(InternalKeyboardShortcutManager.cursorX).toEqual(100);
      expect(InternalKeyboardShortcutManager.cursorY).toEqual(200);
    });

    it("setFocusToHome should set focus to home", () => {
      const buttonElement = document.createElement("button");
      document.body.appendChild(buttonElement);
      buttonElement.focus();
      let activeElement = document.activeElement as HTMLElement;
      expect(activeElement === buttonElement).toEqual(true);
      expect(InternalKeyboardShortcutManager.isFocusOnHome).toEqual(false);

      InternalKeyboardShortcutManager.setFocusToHome();
      activeElement = document.activeElement as HTMLElement;
      expect(activeElement === document.body).toEqual(true);
      expect(InternalKeyboardShortcutManager.isFocusOnHome).toEqual(true);
      document.body.removeChild(buttonElement);
    });
  });

  it("should support loading the AccuDraw keyboard shortcuts", async () => {
    InternalKeyboardShortcutManager.loadShortcuts(
      AccuDrawKeyboardShortcuts.getDefaultShortcuts()
    );

    const shortcutA = InternalKeyboardShortcutManager.getShortcut("a");
    expect(shortcutA).toBeTruthy();
    const shortcutR = InternalKeyboardShortcutManager.getShortcut("r");
    expect(shortcutR).toBeTruthy();
  });
});
