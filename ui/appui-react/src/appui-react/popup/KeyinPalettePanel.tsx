/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import "./KeyinPalettePanel.scss";
import { FilteredText, Listbox, ListboxItem } from "@itwin/core-react";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
  ParseAndRunResult,
} from "@itwin/core-frontend";
import { UiFramework } from "../UiFramework.js";
import type { OnItemExecutedFunc } from "@itwin/appui-abstract";
import { ClearKeyinPaletteHistoryTool } from "../tools/KeyinPaletteTools.js";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage.js";
import type { KeyinEntry } from "../keyins/Keyins.js";
import { Input } from "@itwin/itwinui-react";
import { matchesWords } from "../utils/matchesWords.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { UiStateStorageStatus } from "../uistate/UiStateStorage.js";

const KEYIN_PALETTE_NAMESPACE = "KeyinPalettePanel";
const KEYIN_HISTORY_KEY = "historyArray";

/** @internal */
export function clearKeyinPaletteHistory() {
  const uiSettingsStorage = UiFramework.getUiStateStorage();
  if (uiSettingsStorage) {
    void uiSettingsStorage.deleteSetting(
      KEYIN_PALETTE_NAMESPACE,
      KEYIN_HISTORY_KEY
    );
  }
}

interface KeyinPalettePanelProps {
  keyins: KeyinEntry[];
  onKeyinExecuted?: OnItemExecutedFunc;
  historyLength?: number;
}

/**
 * @internal
 */
export function KeyinPalettePanel({
  keyins,
  onKeyinExecuted,
  historyLength: allowedHistoryLength = 6,
}: KeyinPalettePanelProps) {
  const { translate } = useTranslation();
  const [currentKeyin, setCurrentKeyin] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);
  const keyinSeparator = "--#--";
  const [historyKeyins, setHistoryKeyins] = React.useState<string[]>([]);
  const uiSettingsStorage = useUiStateStorageHandler();

  React.useEffect(() => {
    async function fetchState() {
      const settingsResult = await uiSettingsStorage.getSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY
      );
      if (UiStateStorageStatus.Success === settingsResult.status) {
        const filteredHistory = (settingsResult.setting as string[]).filter(
          (keyin) => {
            const result = IModelApp.tools.parseKeyin(keyin);
            return result.ok;
          }
        );
        setHistoryKeyins(filteredHistory);
      } else {
        setHistoryKeyins([]);
      }
    }

    void fetchState();
  }, [uiSettingsStorage]);

  const storeHistoryKeyins = React.useCallback(
    async (value: string[]) => {
      const result = await uiSettingsStorage.saveSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY,
        value
      );
      if (result.status !== UiStateStorageStatus.Success) {
        const errorDetails = new NotifyMessageDetails(
          OutputMessagePriority.Error,
          translate("keyinbrowser.couldNotSaveHistory")
        );
        IModelApp.notifications.outputMessage(errorDetails);
      }
    },
    [translate, uiSettingsStorage]
  );

  const allKeyins = React.useMemo(() => {
    const availableKeyins = [];
    historyKeyins.forEach((value: string) => {
      availableKeyins.push({ value, isHistory: true });
    });
    availableKeyins.push(
      ...keyins.sort((a, b) =>
        a.value.toLowerCase().localeCompare(b.value.toLowerCase())
      )
    );
    return availableKeyins;
  }, [historyKeyins, keyins]);

  const submitKeyin = React.useCallback(
    async (value: string) => {
      let detailedMessage: string | undefined;
      let message: string | undefined;
      try {
        switch (await IModelApp.tools.parseAndRun(value)) {
          case ParseAndRunResult.ToolNotFound:
            message = `translate("keyinbrowser.couldNotFindTool")} ${value}`;
            break;
          case ParseAndRunResult.BadArgumentCount:
            message = translate("keyinbrowser.incorrectArgs");
            break;
          case ParseAndRunResult.FailedToRun:
            message = translate("keyinbrowser.failedToRun");
            break;
        }
      } catch (ex) {
        {
          message = translate("keyinbrowser.exceptionOccurred");
          detailedMessage = `${translate(
            "keyinbrowser.exceptionOccurred"
          )}: ${String(ex)}`;
        }
      }

      if (undefined !== message) {
        const errorDetails = new NotifyMessageDetails(
          OutputMessagePriority.Error,
          message,
          detailedMessage,
          OutputMessageType.Sticky
        );
        IModelApp.notifications.outputMessage(errorDetails);
      } else {
        if (
          value.length < 400 &&
          value !== ClearKeyinPaletteHistoryTool.keyin &&
          value !== ClearKeyinPaletteHistoryTool.englishKeyin
        ) {
          const newHistoryEntries: string[] = [value];
          for (const entry of historyKeyins) {
            if (entry !== value) {
              newHistoryEntries.push(entry);
              if (newHistoryEntries.length >= allowedHistoryLength) break;
            }
          }
          await storeHistoryKeyins(newHistoryEntries);
        }

        // close the popup by processing the supplied onKeyinExecuted function
        if (onKeyinExecuted) onKeyinExecuted(value);
      }
    },
    [
      translate,
      onKeyinExecuted,
      storeHistoryKeyins,
      historyKeyins,
      allowedHistoryLength,
    ]
  );

  const selectKeyin = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [inputRef]);

  const updateKeyin = React.useCallback(
    (value: string) => {
      setCurrentKeyin(value);
      selectKeyin();
    },
    [selectKeyin]
  );

  const getKeyinFromListboxValue = (value: string | undefined) => {
    if (value) {
      const indexSeparator = value.search(keyinSeparator);
      if (indexSeparator) return value.substring(0, indexSeparator);
    }
    return undefined;
  };

  const handleKeypressOnKeyinsList = React.useCallback(
    async (event: React.KeyboardEvent<HTMLUListElement>) => {
      const key = event.key;
      // built into listbox a "Space" key will trigger the selection of a entry so if an Enter key is pressed
      // assume user wants to execute the entry.
      if (key === Key.Enter.valueOf()) {
        event.preventDefault();
        const keyinToSend = getKeyinFromListboxValue(
          event.currentTarget?.dataset?.focusvalue
        );
        if (keyinToSend) {
          if (event.ctrlKey) updateKeyin(keyinToSend);
          else await submitKeyin(keyinToSend);
        }
      }
    },
    [submitKeyin, updateKeyin]
  );

  const onListboxValueChange = React.useCallback(
    async (value: string, isControlOrCommandPressed?: boolean) => {
      const keyin = getKeyinFromListboxValue(value);
      if (keyin) {
        if (isControlOrCommandPressed) updateKeyin(keyin);
        else await submitKeyin(keyin);
      }
    },
    [submitKeyin, updateKeyin]
  );

  const onInputValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentKeyin(event.target.value);
    },
    []
  );

  const filteredKeyins = React.useMemo(() => {
    const filteredHistory: KeyinEntry[] = [];
    if (undefined === currentKeyin || 0 === currentKeyin.length) {
      return allKeyins;
    } else {
      const newKeyinSet: KeyinEntry[] = [];
      allKeyins.forEach((value) => {
        if (value.value.length >= currentKeyin.length) {
          // Force contiguous searches if key-in is over 60 characters long for performance.
          const matches = matchesWords(
            currentKeyin,
            value.value,
            currentKeyin.length > 60
          );
          if (matches && matches.length) {
            if (value.isHistory) {
              filteredHistory.push(value);
              newKeyinSet.push({ ...value, matches });
            } else {
              // only add entry if no match in filtered history
              if (
                -1 ===
                filteredHistory.findIndex(
                  (historyEntry: KeyinEntry) =>
                    historyEntry.value === value.value
                )
              )
                newKeyinSet.push({ ...value, matches });
            }
          }
        }
      });
      return newKeyinSet;
    }
  }, [allKeyins, currentKeyin]);

  const onInputValueKeyDown = React.useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (Key.Enter.valueOf() === event.key) {
        event.preventDefault();
        event.stopPropagation();
        if (1 === filteredKeyins.length) {
          if (event.ctrlKey) updateKeyin(filteredKeyins[0].value);
          else await submitKeyin(filteredKeyins[0].value);
        } else {
          if (currentKeyin) await submitKeyin(currentKeyin);
        }
      } else if (
        Key.Tab.valueOf() === event.key &&
        1 === filteredKeyins.length
      ) {
        event.preventDefault();
        event.stopPropagation();
        updateKeyin(filteredKeyins[0].value);
      } else {
        if (
          event.key === Key.ArrowDown.valueOf() &&
          filteredKeyins.length > 0
        ) {
          event.preventDefault();
          event.stopPropagation();
          if (inputRef.current) {
            const nextElement = inputRef.current
              .nextElementSibling as HTMLElement;
            nextElement && nextElement.focus();
          }
        }
      }
    },
    [filteredKeyins, submitKeyin, currentKeyin, updateKeyin]
  );

  const lastHistoryIndex =
    filteredKeyins.findIndex((entry) => true !== entry.isHistory) - 1;

  return (
    <div className="uifw-command-palette-panel">
      <Input
        ref={inputRef}
        type="text"
        onKeyDown={onInputValueKeyDown}
        className={"uifw-command-palette-input"}
        data-testid="command-palette-input"
        onChange={onInputValueChange}
        placeholder={translate("keyinbrowser.placeholder")}
        value={currentKeyin}
        size="small"
      />
      {filteredKeyins.length > 0 && (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <Listbox
          id="uifw-command-sources"
          className="map-manager-source-list"
          onKeyDown={handleKeypressOnKeyinsList}
          onListboxValueChange={onListboxValueChange}
        >
          {filteredKeyins.map((entry, index) => {
            const value = `${entry.value}${keyinSeparator}${
              entry.isHistory ? "history" : "registry"
            }`;
            const itemClass = `uifw-command-palette-value-entry${
              index === lastHistoryIndex ? " uifw-history-bottom-border" : ""
            }`;
            return (
              // eslint-disable-next-line @typescript-eslint/no-deprecated
              <ListboxItem
                key={`${entry.value}-${index}`}
                className={itemClass}
                value={value}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <FilteredText value={entry.value} matches={entry.matches} />
              </ListboxItem>
            );
          })}
        </Listbox>
      )}
    </div>
  );
}
