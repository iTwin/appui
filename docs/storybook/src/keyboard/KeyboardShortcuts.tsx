/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  KeyboardShortcutProps,
  StagePanelState,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { Input } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider, createWidget } from "../Utils";

function createProvider(): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      return [
        createWidget(1, {
          content: (
            <>
              <div>
                Press <code>m</code> to open a keyboard shortcut menu.
              </div>
              <Input />
            </>
          ),
        }),
      ];
    },
  };
}

export interface KeyboardShortcutsStoryProps {
  /** If enabled adds additional key event processing to handle keyboard shortcuts. */
  processKeys: boolean;
  /** List of keyboard shortcuts. */
  shortcutList: KeyboardShortcutProps[];
}

/** [KeyboardShortcuts](https://www.itwinjs.org/reference/appui-react/keyboardshortcut/frameworkkeyboardshortcuts/) can be used to configure keyboard actions. */
export function KeyboardShortcutsStory({
  processKeys,
  shortcutList,
}: KeyboardShortcutsStoryProps) {
  const provider = createProvider();
  useDisableShortcuts();
  return (
    <>
      {processKeys && <KeyboardShortcutHandler />}
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
          UiFramework.keyboardShortcuts.loadShortcuts(shortcutList);
        }}
      />
    </>
  );
}

function KeyboardShortcutHandler() {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      UiFramework.keyboardShortcuts.processKey(
        e.key,
        e.altKey,
        e.ctrlKey,
        e.shiftKey
      );
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
