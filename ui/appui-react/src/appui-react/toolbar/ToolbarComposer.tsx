/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import {
  Direction,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { Logger } from "@itwin/core-bentley";
import { Orientation } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";
import { ToolbarDragInteractionContext } from "./DragInteraction";
import type {
  ToolbarActionItem,
  ToolbarGroupItem,
  ToolbarItem,
} from "./ToolbarItem";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "./ToolbarItem";
import { Toolbar } from "./Toolbar";
import { useActiveToolIdSynchedItems } from "./useActiveToolIdSynchedItems";
import { useActiveStageProvidedToolbarItems } from "./useActiveStageProvidedToolbarItems";

function addItemToSpecifiedParentGroup<T extends ToolbarItem>(
  items: readonly T[],
  groupChildren: Array<ToolbarActionItem | ToolbarGroupItem>
): T[] {
  const outItems: T[] = [];
  for (const toolbarItem of items) {
    if (!isToolbarGroupItem(toolbarItem)) {
      outItems.push(toolbarItem);
      continue;
    }

    const newChildren = addItemToSpecifiedParentGroup(
      toolbarItem.items,
      groupChildren
    );
    const foundIndices: number[] = [];

    groupChildren.forEach((entry, index) => {
      if (entry.parentGroupItemId === toolbarItem.id) {
        foundIndices.push(index);
      }
    });

    // istanbul ignore else
    if (foundIndices.length) {
      // process in reverse order so groupChildren can be reduced as we find matches
      foundIndices
        .sort(
          // istanbul ignore next
          (a, b) => a - b
        )
        .reverse()
        .forEach((foundIndex) => {
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
    if (isToolbarGroupItem(item)) childItems.push(cloneGroup(item));
    else childItems.push(item);
  });

  const clonedGroup = { ...inGroup, items: childItems };
  return clonedGroup;
}

function getItemSortValue(item: ToolbarItem) {
  const groupValue =
    undefined === item.groupPriority
      ? 0
      : /* istanbul ignore next */ item.groupPriority;
  return groupValue * 10000 + item.itemPriority;
}

function sortItems(items: ReadonlyArray<ToolbarItem>): ToolbarItem[] {
  return [...items]
    .sort((a, b) => getItemSortValue(a) - getItemSortValue(b))
    .map((i) => {
      if (isToolbarGroupItem(i)) {
        return { ...i, items: sortItems(i.items) };
      }
      return i;
    });
}

/**
 * Create a forEach handler that will add every element of an array of ToolbarItems
 * to a list of items that can then be replaced in its proper place, ensuring that
 * the same item, from different list, is not added multiple times.
 * @param items Output list of items
 * @param groupChildren Output list of group children to redistribute.
 * @returns Array<ToolbarItem>.forEach handler.
 */
function addIfNotDuplicate(
  items: ToolbarItem[],
  groupChildren: (ToolbarActionItem | ToolbarGroupItem)[]
): (value: ToolbarItem) => void {
  return (srcItem: ToolbarItem) => {
    if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
      // if the default item is a group that an addon may insert into copy it so we don't mess with original
      const toolbarItem = isToolbarGroupItem(srcItem)
        ? cloneGroup(srcItem)
        : srcItem;
      if (
        (isToolbarGroupItem(toolbarItem) || isToolbarActionItem(toolbarItem)) &&
        toolbarItem.parentGroupItemId
      )
        groupChildren.push(toolbarItem);
      else items.push(toolbarItem);
    }
  };
}

/** local function to combine items from Stage and from Extensions */
function combineItems(
  defaultItems: ReadonlyArray<ToolbarItem>,
  addonItems: ReadonlyArray<ToolbarItem>
): ToolbarItem[] {
  let items: ToolbarItem[] = [];
  const groupChildren: Array<ToolbarActionItem | ToolbarGroupItem> = [];

  defaultItems.forEach(addIfNotDuplicate(items, groupChildren));
  addonItems.forEach(addIfNotDuplicate(items, groupChildren));

  // if an item from an addon has specified a parent group then try to find it and insert it.  If no parent is found, add item at root level.
  if (groupChildren.length) {
    items = addItemToSpecifiedParentGroup(items, groupChildren);

    groupChildren.forEach((toolbarItem) => {
      Logger.logWarning(
        "ToolbarComposer",
        `Requested Parent Group [${toolbarItem.parentGroupItemId!}] not found, so item [${
          toolbarItem.id
        }] is added directly to toolbar.`
      );
      items.push(toolbarItem);
    });
  }

  return sortItems(items);
}

const useProximityOpacitySetting = () => {
  const [proximityOpacity, setProximityOpacity] = React.useState(
    UiFramework.visibility.useProximityOpacity // eslint-disable-line deprecation/deprecation
  );

  React.useEffect(() => {
    UiFramework.onUiVisibilityChanged.addListener(
      () => setProximityOpacity(UiFramework.visibility.useProximityOpacity) // eslint-disable-line deprecation/deprecation
    );
  }, []);

  return proximityOpacity;
};

const useSnapWidgetOpacitySetting = () => {
  const [snapWidgetOpacity, setSnapWidgetOpacity] = React.useState(
    UiFramework.visibility.snapWidgetOpacity
  );

  React.useEffect(() => {
    UiFramework.onUiVisibilityChanged.addListener(() =>
      setSnapWidgetOpacity(UiFramework.visibility.snapWidgetOpacity)
    );
  }, []);

  return snapWidgetOpacity;
};

/** Properties for the [[ToolbarComposer]] React components
 * @public
 */
export interface ExtensibleToolbarProps {
  /** Toolbar items. */
  items: ToolbarItem[];
  /** Toolbar usage based on which additional toolbar items are added from UI item providers. */
  usage: ToolbarUsage;
  /** Toolbar orientation. */
  orientation: ToolbarOrientation;
}

/**
 * Toolbar that is populated and maintained by UI item providers.
 * @note Overrides `isActive` property based on the active tool id.
 * @public
 */
export function ToolbarComposer(props: ExtensibleToolbarProps) {
  const { usage, orientation } = props;

  // process items from addon UI providers
  const addonItems = useActiveStageProvidedToolbarItems(usage, orientation);

  const allItems = React.useMemo(() => {
    return combineItems(props.items, addonItems);
  }, [props.items, addonItems]);

  const items = useActiveToolIdSynchedItems(allItems, UiFramework.frontstages);

  const toolbarOrientation =
    orientation === ToolbarOrientation.Horizontal
      ? Orientation.Horizontal
      : Orientation.Vertical;
  const expandsTo =
    toolbarOrientation === Orientation.Horizontal
      ? Direction.Bottom
      : usage === ToolbarUsage.ViewNavigation
      ? Direction.Left
      : Direction.Right;
  const panelAlignment =
    toolbarOrientation === Orientation.Horizontal &&
    usage === ToolbarUsage.ViewNavigation
      ? ToolbarPanelAlignment.End
      : ToolbarPanelAlignment.Start;
  const isDragEnabled = React.useContext(ToolbarDragInteractionContext);
  const useProximityOpacity = useProximityOpacitySetting();
  const snapWidgetOpacity = useSnapWidgetOpacitySetting();

  return (
    <Toolbar
      enableOverflow={true}
      expandsTo={expandsTo}
      panelAlignment={panelAlignment}
      items={items}
      useDragInteraction={isDragEnabled}
      toolbarOpacitySetting={
        // eslint-disable-next-line deprecation/deprecation
        (useProximityOpacity || snapWidgetOpacity) && !UiFramework.isMobile()
          ? ToolbarOpacitySetting.Proximity
          : /* istanbul ignore next */ ToolbarOpacitySetting.Defaults
      }
    />
  );
}
