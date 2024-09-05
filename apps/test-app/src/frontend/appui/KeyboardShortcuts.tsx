/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp } from "@itwin/core-frontend";
import { Key } from "ts-key-enum";
import {
  FocusToolSettings,
  KeyboardShortcutProps,
  KeyboardShortcutUtilities,
  UiFramework,
} from "@itwin/appui-react";

export function createKeyboardShortcuts(): KeyboardShortcutProps[] {
  return [
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
        {
          key: "c",
          label: "Log to console",
          execute: () => {
            // eslint-disable-next-line no-console
            console.log("You pressed the 'c' key");
          },
        },
      ],
    },
    {
      key: "z",
      execute: () => {
        // eslint-disable-next-line no-console
        console.log("You pressed the 'z' key");
      },
    },
    {
      key: "x",
      isCtrlKeyRequired: true,
      execute: () => {
        // eslint-disable-next-line no-console
        console.log("You pressed the 'x'+'ctrl' keys");
      },
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
}
