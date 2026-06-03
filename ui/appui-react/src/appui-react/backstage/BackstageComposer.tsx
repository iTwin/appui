/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import * as React from "react";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { List } from "@itwin/itwinui-react";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher.js";
import {
  Backstage,
  BackstageActionItem,
  BackstageDivider,
  BackstageStageLauncher,
} from "./Backstage.js";
import { isBackstageStageLauncher } from "./BackstageItem.js";
import { BackstageItemsManager } from "./BackstageItemsManager.js";
import { useBackstageManager, useIsBackstageOpen } from "./BackstageManager.js";
import { useDefaultBackstageItems } from "./useDefaultBackstageItems.js";
import { useUiItemsProviderBackstageItems } from "./useUiItemsProviderBackstageItems.js";

import type { CommonProps } from "@itwin/core-react";
import type { BackstageItem } from "./BackstageItem.js";

/** Private function to set up sync event monitoring of backstage items */
function useBackstageItemSyncEffect(
  itemsManager: BackstageItemsManager,
  syncIdsOfInterest: string[]
) {
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // initialize the display state of any items with syncIds/condition defined
      itemsManager.refreshAffectedItems(new Set(syncIdsOfInterest));
    }

    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (0 === syncIdsOfInterest.length) return;

      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value.toLowerCase())
        )
      ) {
        // process each item that has interest
        itemsManager.refreshAffectedItems(args.eventIds);
      }
    });
  }, [itemsManager, itemsManager.items, syncIdsOfInterest]);
}

/** local function to combine items from Stage and from Extensions */
function combineItems(
  stageItems: ReadonlyArray<BackstageItem>,
  addonItems: ReadonlyArray<BackstageItem>,
  hideSoloStageEntry: boolean
): ReadonlyArray<BackstageItem> {
  let items: Array<BackstageItem> = [];
  if (stageItems.length) {
    // Walk through each and ensure no duplicate ids are added.
    stageItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }
  if (addonItems.length) {
    // Walk through each and ensure no duplicate ids are added.
    addonItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }

  if (hideSoloStageEntry) {
    // per user request don't show stage launcher if only one stage is available
    const numberOfFrontstageItems = items.reduce(
      (accumulator, item) =>
        accumulator + (isBackstageStageLauncher(item) ? 1 : 0),
      0
    );
    if (1 === numberOfFrontstageItems)
      items = items.filter((item) => !isBackstageStageLauncher(item));
  }

  return items;
}

type GroupedItems = ReadonlyArray<ReadonlyArray<BackstageItem>>;

/** @internal */
export const useGroupedItems = (
  items: ReadonlyArray<BackstageItem>
): GroupedItems => {
  return React.useMemo(() => {
    const grouped = items.reduce<GroupedItems>((acc, item) => {
      if (ConditionalBooleanValue.getValue(item.isHidden)) return acc;
      const groupIndex = acc.findIndex(
        (group) => group[0].groupPriority === item.groupPriority
      );
      if (groupIndex >= 0)
        return [
          ...acc.slice(0, groupIndex),
          [...acc[groupIndex], item],
          ...acc.slice(groupIndex + 1),
        ];
      return [...acc, [item]];
    }, []);
    const sortedGroups = grouped.reduce<GroupedItems>((acc, group) => {
      const sortedGroup = [...group].sort(
        (a, b) => a.itemPriority - b.itemPriority
      );
      return [...acc, sortedGroup];
    }, []);
    return [...sortedGroups].sort(
      (a, b) => a[0].groupPriority - b[0].groupPriority
    );
  }, [items]);
};

/** Props of [[BackstageComposer]] component.
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof BackstageComposer>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface BackstageComposerProps extends CommonProps {
  /** React node for an optional header item */
  readonly header?: React.ReactNode;
  /** Indicates whether to place an overlay over the frontstage when the backstage is displayed */
  readonly showOverlay?: boolean;
  /** List of static backstage items to show. Can be undefined in UiItemsProviders are used to populate backstage. */
  readonly items?: BackstageItem[];
  /** If true and only one stage launcher item is found, do not show entry in backstage */
  readonly hideSoloStageEntry?: boolean;
}

/** Backstage component composed from [[UiFramework.backstage]] items.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function BackstageComposer(props: BackstageComposerProps) {
  const {
    header,
    showOverlay = true,
    items,
    hideSoloStageEntry,
    itemId,
    ...rest
  } = props;

  const [defaultItemsManager, setDefaultItemsManager] = React.useState(
    new BackstageItemsManager(items)
  );
  const initialItems = React.useRef(items);

  React.useEffect(() => {
    if (initialItems.current !== items) {
      initialItems.current = items;
      setDefaultItemsManager(new BackstageItemsManager(items));
    }
  }, [items]);

  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  const handleClose = React.useCallback(() => {
    manager.close();
  }, [manager]);

  const defaultItems = useDefaultBackstageItems(defaultItemsManager);
  const syncIdsOfInterest = React.useMemo(
    () => BackstageItemsManager.getSyncIdsOfInterest(defaultItems),
    [defaultItems]
  );
  useBackstageItemSyncEffect(defaultItemsManager, syncIdsOfInterest);

  const [addonItemsManager] = React.useState(new BackstageItemsManager());
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const addonItems = useUiItemsProviderBackstageItems(addonItemsManager);
  const addonSyncIdsOfInterest = React.useMemo(
    () => BackstageItemsManager.getSyncIdsOfInterest(addonItems),
    [addonItems]
  );
  useBackstageItemSyncEffect(addonItemsManager, addonSyncIdsOfInterest);

  const combinedBackstageItems = React.useMemo(
    () => combineItems(defaultItems, addonItems, !!hideSoloStageEntry),
    [defaultItems, addonItems, hideSoloStageEntry]
  );
  const groups = useGroupedItems(combinedBackstageItems);
  return (
    <Backstage
      isOpen={isOpen}
      onClose={handleClose}
      showOverlay={showOverlay}
      {...rest}
    >
      {header}
      {groups.map((group, groupIndex) => {
        return (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 ? <BackstageDivider /> : null}
            <List>
              {group.map((item, itemIndex) => {
                const autoFocus = groupIndex === 0 && itemIndex === 0;
                if (isBackstageStageLauncher(item)) {
                  return (
                    <BackstageStageLauncher
                      key={item.id}
                      item={item}
                      // eslint-disable-next-line jsx-a11y/no-autofocus -- autoFocus first item in the dialog
                      autoFocus={autoFocus}
                    />
                  );
                }
                return (
                  <BackstageActionItem
                    key={item.id}
                    item={item}
                    // eslint-disable-next-line jsx-a11y/no-autofocus -- autoFocus first item in the dialog
                    autoFocus={autoFocus}
                  />
                );
              })}
            </List>
          </React.Fragment>
        );
      })}
    </Backstage>
  );
}
