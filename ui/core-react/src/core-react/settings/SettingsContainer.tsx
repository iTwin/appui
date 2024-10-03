/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import "./SettingsContainer.scss";
import * as React from "react";
import type { SettingsManager, SettingsTabEntry } from "./SettingsManager.js";
import { VerticalTabs } from "../tabs/VerticalTabs.js";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";

/* eslint-disable @typescript-eslint/no-deprecated */

/*  ---------------------------------------------------------------------------------------------------
// A typical implementation of a saveFunction callback
const saveChanges = React.useCallback((afterSaveFunction: (args: any) => void, args?: any) => {
  if (dataIsDirty) {
    // prompt user to save changes passing in function and arguments to call after saving changes.
    UiFramework.dialogs.modal.openDialog(<CustomSavePromptModalDialog customProps={customProps}
      onDialogCloseArgs={args} onDialogClose={afterSaveFunction} />);
    return;
  }
  afterSaveFunction(args);
}, []);
---------------------------------------------------------------------------------------------------------- */

/** Hook to use within Settings Page component to allow saving the current page's data before the Setting Container is closed.
 * @public
 * @deprecated in 4.16.0. Use {@link SettingsManager} instead.
 */
export function useSaveBeforeClosingSettingsContainer(
  settingsManager: SettingsManager,
  saveFunction: (closeFunc: (args: any) => void, closeFuncArgs?: any) => void
) {
  React.useEffect(() => {
    return settingsManager.onProcessSettingsContainerClose.addListener(
      ({ closeFunc, closeFuncArgs }) => {
        saveFunction(closeFunc, closeFuncArgs);
      }
    );
  }, [saveFunction, settingsManager]);
}

/** Hook to use within Settings Page component to allow saving the current page's data before loading to the requested Setting Tab's page.
 * @public
 * @deprecated in 4.16.0. Use {@link SettingsManager} instead.
 */
export function useSaveBeforeActivatingNewSettingsTab(
  settingsManager: SettingsManager,
  saveFunction: (
    tabSelectionFunc: (args: any) => void,
    requestedSettingsTabId?: string
  ) => void
) {
  React.useEffect(() => {
    return settingsManager.onProcessSettingsTabActivation.addListener(
      ({ tabSelectionFunc, requestedSettingsTabId }) => {
        saveFunction(tabSelectionFunc, requestedSettingsTabId);
      }
    );
  }, [saveFunction, settingsManager]);
}

/**
 * Properties of {@link SettingsContainer} component.
 * @public
 * @deprecated in 4.16.0. Props of deprecated component {@link SettingsContainer}.
 */
export interface SettingsContainerProps {
  tabs: SettingsTabEntry[];
  // sets tab to set as active tab
  currentSettingsTab?: SettingsTabEntry;
  // If plugging into a SPA and you need to modify the route, you can pass in additional logic here
  onSettingsTabSelected?: (tab: SettingsTabEntry) => void;
  // The SettingsManager that can have event handlers registered against it so pages can save its settings before the page is closed.
  settingsManager: SettingsManager;
  // if true show tab label as header above page contents.
  showHeader?: boolean;
}

/** Component that displays setting tabs on the left and the setting page on the right.
 * Note: that SettingsContainer is not rendered if tabs array is empty.
 * @public
 * @deprecated in 4.16.0. Used internally by {@link @itwin/appui-react#SettingsModalFrontstage}.
 */
export const SettingsContainer = ({
  tabs,
  onSettingsTabSelected,
  currentSettingsTab,
  settingsManager,
  showHeader,
}: SettingsContainerProps) => {
  // sort the tabs based on itemPriority
  tabs = tabs.sort((a, b) => a.itemPriority - b.itemPriority);

  const [openTab, setOpenTab] = React.useState(() => {
    if (
      currentSettingsTab &&
      !ConditionalBooleanValue.getValue(currentSettingsTab.isDisabled)
    )
      return currentSettingsTab;
    else return tabs[0];
  });

  const processTabSelection = React.useCallback(
    (tab: SettingsTabEntry) => {
      if (ConditionalBooleanValue.getValue(tab.isDisabled)) return;
      onSettingsTabSelected && onSettingsTabSelected(tab);
      setOpenTab(tab);
    },
    [onSettingsTabSelected]
  );

  const processTabSelectionById = React.useCallback(
    (tabId: string) => {
      const tabToActivate = tabs.find((tab) => tab.tabId === tabId);
      tabToActivate && processTabSelection(tabToActivate);
    },
    [processTabSelection, tabs]
  );

  const onActivateTab = React.useCallback(
    (tabIndex: number) => {
      const selectedTab = tabs[tabIndex];
      if (openTab && openTab.pageWillHandleCloseRequest)
        settingsManager.onProcessSettingsTabActivation.emit({
          requestedSettingsTabId: selectedTab.tabId,
          tabSelectionFunc: processTabSelectionById,
        });
      else processTabSelection(selectedTab);
    },
    [
      openTab,
      processTabSelection,
      processTabSelectionById,
      settingsManager,
      tabs,
    ]
  );

  React.useEffect(() => {
    return settingsManager.onActivateSettingsTab.addListener(
      ({ settingsTabId }) => {
        const idToFind = settingsTabId.toLowerCase();
        let tabToActivate = tabs.find(
          (tab) => tab.tabId.toLowerCase() === idToFind
        );
        if (!tabToActivate)
          tabToActivate = tabs.find(
            (tab) => tab.label.toLowerCase() === idToFind
          );
        if (tabToActivate) {
          if (openTab && openTab.pageWillHandleCloseRequest)
            settingsManager.onProcessSettingsTabActivation.emit({
              requestedSettingsTabId: tabToActivate.tabId,
              tabSelectionFunc: processTabSelectionById,
            });
          else processTabSelection(tabToActivate);
        }
      }
    );
  }, [
    openTab,
    processTabSelection,
    processTabSelectionById,
    settingsManager,
    settingsManager.onActivateSettingsTab,
    tabs,
  ]);

  React.useEffect(() => {
    return settingsManager.onCloseSettingsContainer.addListener(
      ({ closeFunc, closeFuncArgs }) => {
        if (openTab && openTab.pageWillHandleCloseRequest)
          settingsManager.onProcessSettingsContainerClose.emit({
            closeFunc,
            closeFuncArgs,
          });
        else closeFunc(closeFuncArgs);
      }
    );
  }, [
    openTab,
    processTabSelection,
    settingsManager,
    settingsManager.onActivateSettingsTab,
    tabs,
  ]);

  const labels = tabs.map((tab) => {
    return {
      label: tab.label,
      subLabel: tab.subLabel,
      icon: tab.icon,
      tooltip: tab.tooltip,
      tabId: tab.tabId,
      disabled: ConditionalBooleanValue.getValue(tab.isDisabled),
    };
  });
  const activeIndex = tabs.findIndex((tab) => tab.tabId === openTab.tabId);
  return (
    <div className="core-settings-container">
      <div className="core-settings-container-left">
        <VerticalTabs
          labels={labels}
          activeIndex={activeIndex}
          onActivateTab={onActivateTab}
        />
      </div>
      <div className="core-settings-container-right">
        {showHeader && (
          <div className="core-settings-container-right-header">
            <span className="core-settings-container-main-header">
              {openTab.label}
            </span>
            {openTab.subLabel && (
              <span className="core-settings-container-main-sub-header">
                {openTab.subLabel}
              </span>
            )}
          </div>
        )}
        <div className="core-settings-container-right-contents">
          {openTab.page}
        </div>
      </div>
    </div>
  );
};
