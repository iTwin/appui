/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { produce } from "immer";
import {
  Direction,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { Logger, ProcessDetector } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework.js";
import { ToolbarDragInteractionContext } from "./DragInteraction.js";
import type {
  CommonToolbarItem,
  ToolbarActionItem,
  ToolbarAdvancedUsage,
  ToolbarGroupItem,
  ToolbarItem,
} from "./ToolbarItem.js";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "./ToolbarItem.js";
import { Toolbar } from "./Toolbar.js";
import { useActiveStageProvidedToolbarItems } from "./useActiveStageProvidedToolbarItems.js";
import { useActiveToolId } from "../hooks/useActiveToolId.js";
import { ConditionalBooleanValue } from "../shared/ConditionalValue.js";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher.js";

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

    if (foundIndices.length) {
      // process in reverse order so groupChildren can be reduced as we find matches
      foundIndices
        .sort((a, b) => a - b)
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
  const groupValue = undefined === item.groupPriority ? 0 : item.groupPriority;
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
    UiFramework.visibility.useProximityOpacity // eslint-disable-line @typescript-eslint/no-deprecated
  );

  React.useEffect(() => {
    UiFramework.onUiVisibilityChanged.addListener(
      () => setProximityOpacity(UiFramework.visibility.useProximityOpacity) // eslint-disable-line @typescript-eslint/no-deprecated
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
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof ToolbarComposer>`
 */
export interface ExtensibleToolbarProps {
  /** Toolbar items to be displayed in addition to the provided toolbar items. */
  items: ToolbarItem[];
  /** Toolbar usage based on which additional toolbar items are added from UI item providers. */
  usage: ToolbarUsage;
  /** Toolbar orientation. */
  orientation: ToolbarOrientation;
  /** Advanced usage string to further specify the toolbar context for UI item providers. */
  advancedUsage?: ToolbarAdvancedUsage;
  /** Describes the ids of active toolbar items.
   * By default only the toolbar item with id that matches the active `Tool` id is active.
   * @note Property {@link CommonToolbarItem.isActiveCondition} takes precedence when determining the active state of a toolbar item.
   */
  activeItemIds?: string[];
}

/**
 * Toolbar that is populated and maintained by UI item providers.
 * @note Overrides {@link CommonToolbarItem.isActive} property based on the active tool id, unless {@link ExtensibleToolbarProps.activeItemIds} is specified.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function ToolbarComposer(props: ExtensibleToolbarProps) {
  const {
    usage,
    orientation,
    advancedUsage,
    activeItemIds: activeItemIdsProp,
  } = props;

  // process items from addon UI providers
  const addonItems = useActiveStageProvidedToolbarItems(
    usage,
    orientation,
    advancedUsage
  );

  const allItems = React.useMemo(() => {
    return combineItems(props.items, addonItems);
  }, [props.items, addonItems]);

  const activeToolId = useActiveToolId();
  const activeItemIds = React.useMemo(
    () => activeItemIdsProp ?? (activeToolId ? [activeToolId] : []),
    [activeItemIdsProp, activeToolId]
  );
  const activeConditionalItemIds = useActiveConditionalItemIds(allItems);
  const items = React.useMemo(() => {
    return updateActiveItems(allItems, [
      ...activeItemIds,
      ...activeConditionalItemIds,
    ]);
  }, [allItems, activeItemIds, activeConditionalItemIds]);

  const isDragEnabled = React.useContext(ToolbarDragInteractionContext);
  const useProximityOpacity = useProximityOpacitySetting();
  const snapWidgetOpacity = useSnapWidgetOpacitySetting();

  const expandsTo = toExpandsTo(orientation, usage, advancedUsage);
  const panelAlignment = toPanelAlignment(orientation, usage, advancedUsage);
  return (
    <Toolbar
      enableOverflow={true}
      expandsTo={expandsTo}
      panelAlignment={panelAlignment}
      items={items}
      useDragInteraction={isDragEnabled}
      toolbarOpacitySetting={
        (useProximityOpacity || snapWidgetOpacity) &&
        !ProcessDetector.isMobileBrowser
          ? ToolbarOpacitySetting.Proximity
          : ToolbarOpacitySetting.Defaults
      }
    />
  );
}

function toExpandsTo(
  orientation: ToolbarOrientation,
  usage: ToolbarUsage,
  advancedUsage?: ToolbarAdvancedUsage
) {
  if (advancedUsage === "view-settings") {
    if (orientation === ToolbarOrientation.Horizontal) {
      return Direction.Top;
    }
    return Direction.Left;
  }

  if (orientation === ToolbarOrientation.Vertical) {
    if (usage === ToolbarUsage.ViewNavigation) return Direction.Left;
    return Direction.Right;
  }

  return Direction.Bottom;
}

function toPanelAlignment(
  orientation: ToolbarOrientation,
  usage: ToolbarUsage,
  advancedUsage?: ToolbarAdvancedUsage
) {
  if (advancedUsage === "view-settings") {
    return ToolbarPanelAlignment.End;
  }

  if (
    orientation === ToolbarOrientation.Horizontal &&
    usage === ToolbarUsage.ViewNavigation
  )
    return ToolbarPanelAlignment.End;

  return ToolbarPanelAlignment.Start;
}

function useActiveConditionalItemIds(items: ToolbarItem[]) {
  const [activeItemIds, setActiveItemIds] = React.useState<string[]>([]);
  const conditionalItems = React.useMemo(() => {
    const conditionals: ToolbarItem[] = [];
    const stack = [...items];
    while (stack.length > 0) {
      const current = stack.pop()!;
      if (current.isActiveCondition) conditionals.push(current);

      if (isToolbarGroupItem(current)) {
        for (const child of current.items) {
          stack.push(child);
        }
      }
    }
    return conditionals;
  }, [items]);
  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      const newActiveIds: string[] = [];
      for (const item of conditionalItems) {
        ConditionalBooleanValue.refreshValue(
          item.isActiveCondition,
          args.eventIds
        );

        const isActive = ConditionalBooleanValue.getValue(
          item.isActiveCondition
        );
        if (isActive) newActiveIds.push(item.id);
      }
      setActiveItemIds(newActiveIds);
    });
  }, [conditionalItems]);
  React.useEffect(() => {
    const newActiveIds: string[] = [];
    for (const item of conditionalItems) {
      const isActive = ConditionalBooleanValue.getValue(item.isActiveCondition);
      if (isActive) newActiveIds.push(item.id);
    }
    setActiveItemIds(newActiveIds);
  }, [conditionalItems]);
  return activeItemIds;
}

/** @internal */
export function updateActiveItems(
  items: ToolbarItem[],
  activeItemIds: string[]
) {
  return produce(items, (draft) => {
    // Iterative DFS with ancestor backtracking.
    const stack = draft.map((item) => [item, [] as typeof draft] as const);

    while (stack.length > 0) {
      const [current, ancestors] = stack.pop()!;

      const isActive = activeItemIds.includes(current.id);
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      current.isActive = isActive;

      if (isToolbarGroupItem(current)) {
        for (const child of current.items) {
          stack.push([child, [...ancestors, current]]);
        }
      }

      if (!isActive) continue;

      // Mark ancestors of active item as active.
      for (const ancestor of ancestors) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ancestor.isActive = true;
      }
    }
  });
}
