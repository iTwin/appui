/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  CommandItemDef,
  KeyboardShortcutProps,
  StagePanelState,
  UiFramework,
  UiItemsProvider,
  Widget,
} from "@itwin/appui-react";
import { Input } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider } from "../Utils";

function createProvider(): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget1: Widget = {
        id: "w1",
        label: "Widget 1",
        content: (
          <>
            <div>
              Press <code>m</code> to open a keyboard shortcut menu.
            </div>
            <Input />
          </>
        ),
      };
      return [widget1];
    },
  };
}

function createKeyboardShortcuts(): KeyboardShortcutProps[] {
  return [
    {
      key: "x",
      label: "Log to console",
      item: new CommandItemDef({
        commandId: "logToConsole",
        iconSpec: "icon-placeholder",
        execute: () => {
          console.log("x");
        },
      }),
    },
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
  ];
}

export interface KeyboardShortcutsStoryProps {
  /** If enabled adds additional key event processing to handle keyboard shortcuts. */
  processKeys: boolean;
}

/** [KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions. */
export function KeyboardShortcutsStory(props: KeyboardShortcutsStoryProps) {
  const provider = createProvider();
  useDisableShortcuts();
  return (
    <>
      {props.processKeys && <KeyboardShortcutHandler />}
      <AppUiStory
        itemProviders={[provider]}
        frontstageProviders={[
          createFrontstageProvider({
            leftPanelProps: {
              defaultState: StagePanelState.Open,
              pinned: true,
            },
          }),
        ]}
        onInitialize={async () => {
          UiFramework.keyboardShortcuts.loadShortcuts(
            createKeyboardShortcuts()
          );
        }}
      />
    </>
  );
}

function KeyboardShortcutHandler() {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      UiFramework.keyboardShortcuts.processKey(
        e.key,
        e.altKey,
        e.ctrlKey,
        e.shiftKey
      );
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  return null;
}

/** Disables storybook shortcuts. */
function useDisableShortcuts() {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
}
