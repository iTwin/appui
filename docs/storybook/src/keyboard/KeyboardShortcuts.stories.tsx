/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { CommandItemDef, UiFramework } from "@itwin/appui-react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { KeyboardShortcutsStory } from "./KeyboardShortcuts";
import { BadgeType } from "@itwin/core-react";

const meta = {
  title: "KeyboardShortcuts",
  component: KeyboardShortcutsStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    processKeys: true,
  },
} satisfies Meta<typeof KeyboardShortcutsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    shortcutList: [
      {
        key: "x",
        label: "Log to console",
        iconSpec: "icon-placeholder",
        execute: action("x"),
      },
      {
        key: "m",
        label: "Show shortcuts",
        iconSpec: "icon-placeholder",
        execute: () => {
          UiFramework.keyboardShortcuts.displayMenu();
        },
      },
    ],
  },
};

export const Nested: Story = {
  args: {
    shortcutList: [
      {
        key: "l",
        label: "Logger",
        shortcuts: [
          {
            key: "x",
            label: "Log to console",
            iconSpec: "icon-placeholder",
            execute: action("x"),
          },
          {
            key: "y",
            label: "Log to console",
            iconSpec: "icon-placeholder",
            execute: action("y"),
          },
        ],
      },
      {
        key: "m",
        label: "Show shortcuts",
        iconSpec: "icon-placeholder",
        execute: () => {
          UiFramework.keyboardShortcuts.displayMenu();
        },
      },
    ],
  },
};

export const KeyModifiers: Story = {
  args: {
    shortcutList: [
      {
        key: "x",
        label: "Log to console",
        isCtrlKeyRequired: true,
        item: new CommandItemDef({
          commandId: "logToConsole",
          iconSpec: "icon-placeholder",
          execute: action("Ctrl + x"),
        }),
      },
      // TODO: modifier variants are not working
      // {
      //   key: "x",
      //   label: "Log to console",
      //   item: new CommandItemDef({
      //     commandId: "logToConsole",
      //     iconSpec: "icon-placeholder",
      //     execute: action("x"),
      //   }),
      // },
      {
        key: "m",
        label: "Show shortcuts",
        item: new CommandItemDef({
          commandId: "showShortcutsMenu",
          iconSpec: "icon-placeholder",
          execute: () => {
            UiFramework.keyboardShortcuts.displayMenu();
          },
        }),
      },
    ],
  },
};

export const Badge: Story = {
  args: {
    shortcutList: [
      {
        key: "x",
        label: "Log to console",
        iconSpec: "icon-placeholder",
        execute: action("x"),
        badgeType: BadgeType.TechnicalPreview,
      },
      {
        key: "m",
        label: "Show shortcuts",
        iconSpec: "icon-placeholder",
        execute: () => {
          UiFramework.keyboardShortcuts.displayMenu();
        },
        badgeKind: "deprecated",
      },
    ],
  },
};
