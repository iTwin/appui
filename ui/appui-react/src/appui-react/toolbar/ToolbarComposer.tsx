/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { ConditionalBooleanValue, CommonToolbarItem as UIA_CommonToolbarItem } from "@itwin/appui-abstract";
import { CustomToolbarItem, Direction, ToolbarOpacitySetting, ToolbarPanelAlignment, ToolbarWithOverflow } from "@itwin/components-react";
import { Logger } from "@itwin/core-bentley";
import { Orientation } from "@itwin/core-react";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";
import { UiFramework } from "../UiFramework";
import { ToolbarDragInteractionContext } from "./DragInteraction";
import { useDefaultToolbarItems } from "./useDefaultToolbarItems";
import { useUiItemsProviderToolbarItems } from "./useUiItemsProviderToolbarItems";
import { isToolbarActionItem, isToolbarCustomItem, isToolbarGroupItem, ToolbarActionItem, ToolbarGroupItem, ToolbarItem, ToolbarOrientation, ToolbarUsage } from "./ToolbarItem";
import { ToolbarItemsManager } from "./ToolbarItemsManager";

/** Private function to set up sync event monitoring of toolbar items */
function useToolbarItemSyncEffect(uiDataProvider: ToolbarItemsManager, syncIdsOfInterest: string[]) {
  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (0 === syncIdsOfInterest.length)
        return;

      // istanbul ignore else
      if (syncIdsOfInterest.some((value: string): boolean => args.eventIds.has(value.toLowerCase()))) {
        // process each item that has interest
        uiDataProvider.refreshAffectedItems(args.eventIds);
      }
    });
  }, [uiDataProvider, syncIdsOfInterest, uiDataProvider.items]);

  React.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener(({ toolId }) => {
      uiDataProvider.setActiveToolId(toolId);
    });
  }, [uiDataProvider, uiDataProvider.items]);
}

function nestedAddItemToSpecifiedParentGroup(items: ReadonlyArray<ToolbarActionItem | ToolbarGroupItem>, groupChildren: Array<ToolbarActionItem | ToolbarGroupItem>): Array<ToolbarActionItem | ToolbarGroupItem> {
  const outItems: Array<ToolbarActionItem | ToolbarGroupItem> = [];
  for (const toolbarItem of items) {
    if (!isToolbarGroupItem(toolbarItem)) {
      outItems.push(toolbarItem);
      continue;
    }

    const newChildren: Array<ToolbarActionItem | ToolbarGroupItem> = nestedAddItemToSpecifiedParentGroup(toolbarItem.items, groupChildren);
    const foundIndices: number[] = [];

    groupChildren.forEach((entry, index) => {
      if (entry.parentGroupItemId === toolbarItem.id) {
        foundIndices.push(index);
      }
    });

    // istanbul ignore else
    if (foundIndices.length) {
      // process in reverse order so groupChildren can be reduced as we find matches
      foundIndices.sort(
        // istanbul ignore next
        (a, b) => a - b,
      ).reverse().forEach((foundIndex) => {
        newChildren.push(groupChildren[foundIndex]);
        groupChildren.splice(foundIndex);
      });
    }

    outItems.push({ ...toolbarItem, items: newChildren });
  }
  return outItems;
}

function toUIAToolbarItem(item: ToolbarItem): UIA_CommonToolbarItem {
  if (isToolbarCustomItem(item)) {
    const customItem: CustomToolbarItem = {
      ...item,
      isCustom: true,
      icon: item.icon as string,
      panelContentNode: item.panelContent,
    };
    return customItem;
  }
  return item as UIA_CommonToolbarItem; // TODO: 4.0
}

function addItemToSpecifiedParentGroup(items: readonly ToolbarItem[], groupChildren: Array<ToolbarActionItem | ToolbarGroupItem>): ToolbarItem[] {
  const outItems: ToolbarItem[] = [];
  for (const toolbarItem of items) {
    if (!isToolbarGroupItem(toolbarItem)) {
      outItems.push(toolbarItem);
      continue;
    }

    const newChildren: Array<ToolbarActionItem | ToolbarGroupItem> = nestedAddItemToSpecifiedParentGroup(toolbarItem.items, groupChildren);
    const foundIndices: number[] = [];

    groupChildren.forEach((entry, index) => {
      if (entry.parentGroupItemId === toolbarItem.id) {
        foundIndices.push(index);
      }
    });

    // istanbul ignore else
    if (foundIndices.length) {
      // process in reverse order so groupChildren can be reduced as we find matches
      foundIndices.sort(
        // istanbul ignore next
        (a, b) => a - b,
      ).reverse().forEach((foundIndex) => {
        newChildren.push(groupChildren[foundIndex]);
        groupChildren.splice(foundIndex);
      });
    }

    outItems.push({ ...toolbarItem, items: newChildren });
  }
  return outItems;
}

function cloneGroup(inGroup: ToolbarGroupItem): ToolbarGroupItem {
  const childItems: Array<ToolbarActionItem | ToolbarGroupItem> = [];
  inGroup.items.forEach((item) => {
    if (isToolbarGroupItem(item))
      childItems.push(cloneGroup(item));
    else
      childItems.push(item);
  });

  const clonedGroup = { ...inGroup, items: childItems };
  return clonedGroup;
}

function getItemSortValue(item: ToolbarItem) {
  const groupValue = undefined === item.groupPriority ? 0 : /* istanbul ignore next */ item.groupPriority;
  return groupValue * 10000 + item.itemPriority;
}

function getSortedChildren(group: ToolbarGroupItem): ReadonlyArray<ToolbarActionItem | ToolbarGroupItem> {
  const sortedChildren = group.items
    .filter((item) => !(ConditionalBooleanValue.getValue(item.isHidden)))
    .sort((a, b) => getItemSortValue(a) - getItemSortValue(b))
    .map((i) => {
      if (isToolbarGroupItem(i)) {
        return { ...i, items: getSortedChildren(i) };
      }
      return i;
    });
  return sortedChildren;
}

/** local function to combine items from Stage and from Extensions */
function combineItems(defaultItems: ReadonlyArray<ToolbarItem>, addonItems: ReadonlyArray<ToolbarItem>): ToolbarItem[] {
  let items: ToolbarItem[] = [];
  const groupChildren: Array<ToolbarActionItem | ToolbarGroupItem> = [];

  // istanbul ignore else
  if (defaultItems.length) {
    defaultItems.forEach((srcItem: ToolbarItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        // if the default item is a group that an addon may insert into copy it so we don't mess with original
        const toolbarItem = isToolbarGroupItem(srcItem) ? cloneGroup(srcItem) : srcItem;
        if ((isToolbarGroupItem(toolbarItem) || isToolbarActionItem(toolbarItem)) && toolbarItem.parentGroupItemId)
          groupChildren.push(toolbarItem);
        else
          items.push(toolbarItem);
      }
    });
  }
  // istanbul ignore else
  if (addonItems.length) {
    addonItems.forEach((srcItem: ToolbarItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        // if the default item is a group that an addon may insert into copy it so we don't mess with original
        const toolbarItem = isToolbarGroupItem(srcItem) ? cloneGroup(srcItem) : srcItem;
        if ((isToolbarGroupItem(toolbarItem) || isToolbarActionItem(toolbarItem)) && toolbarItem.parentGroupItemId)
          groupChildren.push(toolbarItem);
        else
          items.push(toolbarItem);
      }
    });
  }

  // if an item from an addon has specified a parent group then try to find it and insert it.  If no parent is found, add item at root level.
  if (groupChildren.length) {
    items = addItemToSpecifiedParentGroup(items, groupChildren);

    if (groupChildren.length) {
      groupChildren.forEach((toolbarItem) => {
        Logger.logWarning("ToolbarComposer", `Requested Parent Group [${toolbarItem.parentGroupItemId!}] not found, so item [${toolbarItem.id}] is added directly to toolbar.`);
        items.push(toolbarItem);
      });
    }
  }

  const availableItems = items
    .filter((item) => !(ConditionalBooleanValue.getValue(item.isHidden)))
    .sort((a, b) => getItemSortValue(a) - getItemSortValue(b))
    .map((i) => {
      if (isToolbarGroupItem(i)) {
        return { ...i, items: getSortedChildren(i) };
      }
      return i;
    });

  return availableItems;
}

const useProximityOpacitySetting = () => {
  const [proximityOpacity, setProximityOpacity] = React.useState(UiFramework.visibility.useProximityOpacity);
  React.useEffect(() => {
    // istanbul ignore next
    const handleUiVisibilityChanged = () => {
      setProximityOpacity(UiFramework.visibility.useProximityOpacity);
    };
    UiFramework.onUiVisibilityChanged.addListener(handleUiVisibilityChanged);
    return () => {
      UiFramework.onUiVisibilityChanged.removeListener(handleUiVisibilityChanged);
    };
  }, []);
  return proximityOpacity;
};

/** Properties for the [[ToolbarComposer]] React components
 * @public
 */
export interface ExtensibleToolbarProps {
  items: ToolbarItem[];
  usage: ToolbarUsage;
  /** Toolbar orientation. */
  orientation: ToolbarOrientation;
}

/**
 * Toolbar that is populated and maintained by item managers.
 * @public
 */
export function ToolbarComposer(props: ExtensibleToolbarProps) {
  const { usage, orientation } = props;

  const [defaultItemsManager, setDefaultItemsManager] = React.useState(() => new ToolbarItemsManager(props.items));
  React.useEffect(() => {
    setDefaultItemsManager(new ToolbarItemsManager(props.items));
  }, [props.items]); // eslint-disable-line react-hooks/exhaustive-deps

  // process default items
  const defaultItems = useDefaultToolbarItems(defaultItemsManager);
  const syncIdsOfInterest = React.useMemo(() => ToolbarItemsManager.getSyncIdsOfInterest(defaultItems), [defaultItems]);
  useToolbarItemSyncEffect(defaultItemsManager, syncIdsOfInterest);

  // process items from addon UI providers
  const [addonItemsManager] = React.useState(() => new ToolbarItemsManager());
  const addonItems = useUiItemsProviderToolbarItems(addonItemsManager, usage, orientation);
  const addonSyncIdsOfInterest = React.useMemo(() => ToolbarItemsManager.getSyncIdsOfInterest(addonItems), [addonItems]);
  useToolbarItemSyncEffect(addonItemsManager, addonSyncIdsOfInterest);

  const toolbarItems = React.useMemo(() => {
    const items = combineItems(defaultItems, addonItems);
    return items.map((item) => toUIAToolbarItem(item));
  }, [defaultItems, addonItems]);

  const toolbarOrientation = orientation === ToolbarOrientation.Horizontal ? Orientation.Horizontal : Orientation.Vertical;
  const expandsTo = toolbarOrientation === Orientation.Horizontal ? Direction.Bottom : usage === ToolbarUsage.ViewNavigation ? Direction.Left : Direction.Right;
  const panelAlignment = (toolbarOrientation === Orientation.Horizontal && usage === ToolbarUsage.ViewNavigation) ? ToolbarPanelAlignment.End : ToolbarPanelAlignment.Start;
  const isDragEnabled = React.useContext(ToolbarDragInteractionContext);
  const useProximityOpacity = useProximityOpacitySetting();

  return <ToolbarWithOverflow
    expandsTo={expandsTo}
    panelAlignment={panelAlignment}
    items={toolbarItems}
    useDragInteraction={isDragEnabled}
    toolbarOpacitySetting={useProximityOpacity && !UiFramework.isMobile() ? ToolbarOpacitySetting.Proximity : /* istanbul ignore next */ ToolbarOpacitySetting.Defaults}
  />;
}
