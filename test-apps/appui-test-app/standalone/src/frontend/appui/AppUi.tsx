/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ContentLayoutProps,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import { IModelApp } from "@itwin/core-frontend";
import { Key } from "ts-key-enum";
import {
  AccuDrawKeyboardShortcuts,
  FocusToolSettings,
  KeyboardShortcutProps,
  KeyboardShortcutUtilities,
  UiFramework,
} from "@itwin/appui-react";

// cSpell:ignore uitestapp

/** Example Ui Configuration for an iTwin.js App
 */
export class AppUi {
  public static initialize() {
    // initialize content groups and layouts before any frontstages.
    AppUi.defineKeyboardShortcuts();
  }

  public static findLayoutFromContentCount(
    contentCount: number
  ): ContentLayoutProps | undefined {
    if (contentCount < 0) return undefined;

    switch (contentCount) {
      case 1:
        return StandardContentLayouts.singleView;
      case 2:
        return StandardContentLayouts.twoHorizontalSplit;
      case 3:
        return StandardContentLayouts.threeViewsTwoOnRight;
      default:
        return StandardContentLayouts.fourQuadrants;
    }
  }

  /** Define Keyboard Shortcuts list.
   */
  private static defineKeyboardShortcuts() {
    const keyboardShortcutList: KeyboardShortcutProps[] = [
      {
        key: "m",
        labelKey: "SampleApp:buttons.accuDrawSubMenu",
        shortcuts: [
          {
            key: "n",
            labelKey: "SampleApp:buttons.bumpToolSettingToggle",
            execute: async () => IModelApp.toolAdmin.bumpToolSetting(2),
          },
          KeyboardShortcutUtilities.createForTool("f", FocusToolSettings),
        ],
      },
      {
        key: Key.F7,
        iconSpec: "icon-placeholder",
        labelKey: "SampleApp:buttons.showShortcutsMenu",
        execute: () => {
          UiFramework.keyboardShortcuts.displayMenu();
        },
      },
    ];

    UiFramework.keyboardShortcuts.loadShortcuts(keyboardShortcutList);
    UiFramework.keyboardShortcuts.loadShortcuts(
      AccuDrawKeyboardShortcuts.getDefaultShortcuts()
    );
  }
}
