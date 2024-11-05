/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { useRefs, useResizeObserver } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { useOverflow } from "../layout/tool-settings/Docked";
import { StatusBarLabelIndicator } from "../statusbar/LabelIndicator";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";
import { isProviderItem } from "../ui-items-provider/isProviderItem";
import { StatusBarOverflow } from "./Overflow";
import {
  StatusBarCenterSection,
  StatusBarLeftSection,
  StatusBarRightSection,
  StatusBarSpaceBetween,
} from "./StatusBar";
import type {
  StatusBarActionItem,
  StatusBarItem,
  StatusBarLabelItem,
} from "./StatusBarItem";
import {
  isStatusBarActionItem,
  isStatusBarCustomItem,
  isStatusBarLabelItem,
  StatusBarSection,
} from "./StatusBarItem";
import { StatusBarItemsManager } from "./StatusBarItemsManager";
import { useDefaultStatusBarItems } from "./useDefaultStatusBarItems";
import { useUiItemsProviderStatusBarItems } from "./useUiItemsProviderStatusBarItems";
import { StatusBarCornerComponentContext } from "./StatusBarCornerComponentContext";

/** Private  function to generate a value that will allow the proper order to be maintained when items are placed in overflow panel */
function getCombinedSectionItemPriority(item: StatusBarItem) {
  let sectionValue = 0;
  if (item.section === StatusBarSection.Center) sectionValue = 100000;
  else if (item.section === StatusBarSection.Context) sectionValue = 200000;
  else if (item.section === StatusBarSection.Right) sectionValue = 300000;
  return sectionValue + item.itemPriority;
}

/** Properties of [[DockedStatusBarItem]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface DockedStatusBarItemProps extends CommonProps {
  /** Tool setting content. */
  children?: React.ReactNode;
  itemPriority?: number;
  providerId?: string;
  section?: string;
  onResize?: (w: number) => void;
}

/** Used in [[StatusBarComposer]] component to display a statusbar item.
 * @internal
 */
export function DockedStatusBarItem(props: DockedStatusBarItemProps) {
  const ref = useResizeObserver<HTMLDivElement>(props.onResize);
  const className = classnames(
    "uifw-statusBar-item-container",
    props.className
  );
  return (
    <div
      data-item-id={props.itemId}
      data-item-type="status-bar-item"
      data-item-location={props.section}
      data-item-priority={props.itemPriority}
      data-item-provider-id={props.providerId}
      className={className}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

/** Private function to set up sync event monitoring of statusbar items */
function useStatusBarItemSyncEffect(
  itemsManager: StatusBarItemsManager,
  syncIdsOfInterest: string[]
) {
  React.useEffect(() => {
    // Note: that items with conditions have condition run when loaded into the items manager
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

function StatusBarLabelItemComponent(props: StatusBarLabelItem) {
  const label = ConditionalStringValue.getValue(props.label);
  // eslint-disable-next-line deprecation/deprecation
  return <StatusBarLabelIndicator iconSpec={props.icon} label={label} />;
}

function StatusBarActionItemComponent(props: StatusBarActionItem) {
  const title = ConditionalStringValue.getValue(props.tooltip);
  return (
    // eslint-disable-next-line deprecation/deprecation
    <StatusBarLabelIndicator
      title={title}
      onClick={props.execute}
      // eslint-disable-next-line deprecation/deprecation
      iconSpec={props.icon}
    />
  );
}

/** local function to combine items from Stage and from Extensions */
function combineItems(
  stageItems: ReadonlyArray<StatusBarItem>,
  addonItems: ReadonlyArray<StatusBarItem>
) {
  const items: StatusBarItem[] = [];
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
  return items;
}

/** local function to sort status bar items from left to right */
const sortItems = (items: StatusBarItem[]) => {
  const sortedItems: StatusBarItem[] = [];
  [
    StatusBarSection.Left,
    StatusBarSection.Center,
    StatusBarSection.Context,
    StatusBarSection.Right,
  ].forEach((section) => {
    items
      .filter((item) => item.section.valueOf() === section.valueOf())
      .sort((a, b) => a.itemPriority - b.itemPriority)
      .forEach((item) => sortedItems.push(item));
  });

  return sortedItems;
};

function isItemInOverflow(
  id: string,
  overflowItemIds: ReadonlyArray<string> | undefined
) {
  if (!overflowItemIds || 0 === overflowItemIds.length) return false;
  return !!overflowItemIds.find((value) => value === id);
}

/** Properties for the [[StatusBarComposer]] React components
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof StatusBarComposer>`
 */
// eslint-disable-next-line deprecation/deprecation
export interface StatusBarComposerProps extends CommonProps {
  /** Status Bar items */
  items: StatusBarItem[];

  /** CSS class name override for the overall Status Bar */
  mainClassName?: string;
  /** CSS class name override for the left section */
  leftClassName?: string;
  /** CSS class name override for the center section */
  centerClassName?: string;
  /** CSS class name override for the right section */
  rightClassName?: string;
}

/** Component to load components into the [[StatusBar]].
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export function StatusBarComposer(props: StatusBarComposerProps) {
  const {
    className,
    style,
    items,
    mainClassName,
    leftClassName,
    centerClassName,
    rightClassName,
  } = props;
  const [defaultItemsManager, setDefaultItemsManager] = React.useState(
    () => new StatusBarItemsManager(items)
  );

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setDefaultItemsManager(new StatusBarItemsManager(items));
    }
  }, [items]);
  // eslint-disable-next-line deprecation/deprecation
  const defaultItems = useDefaultStatusBarItems(defaultItemsManager);
  const syncIdsOfInterest = React.useMemo(
    () => StatusBarItemsManager.getSyncIdsOfInterest(defaultItems),
    [defaultItems]
  );
  useStatusBarItemSyncEffect(defaultItemsManager, syncIdsOfInterest);

  const [addonItemsManager] = React.useState(() => new StatusBarItemsManager());
  // eslint-disable-next-line deprecation/deprecation
  const addonItems = useUiItemsProviderStatusBarItems(addonItemsManager);
  const addonSyncIdsOfInterest = React.useMemo(
    () => StatusBarItemsManager.getSyncIdsOfInterest(addonItems),
    [addonItems]
  );
  useStatusBarItemSyncEffect(addonItemsManager, addonSyncIdsOfInterest);

  const statusBarItems = React.useMemo(() => {
    const combinedItems = combineItems(defaultItems, addonItems);
    return sortItems(combinedItems);
  }, [defaultItems, addonItems]);

  const statusBarItemKeys = statusBarItems.map((item) => item.id);
  const [
    overflown,
    handleContainerResize,
    handleOverflowResize,
    getOnEntryResize,
  ] = useOverflow(statusBarItemKeys);

  const notOverflown = React.useMemo(() => {
    return statusBarItems
      .filter((item) => !isItemInOverflow(item.id, overflown))
      .map((item) => item.id);
  }, [overflown, statusBarItems]);

  const getSectionName = (section: StatusBarSection) => {
    switch (section) {
      case StatusBarSection.Center:
      case StatusBarSection.Stage:
        return "status-bar-center";
      case StatusBarSection.Context:
        return "status-bar-right-start";
      case StatusBarSection.Right:
      case StatusBarSection.Selection:
        return "status-bar-right-end";
      case StatusBarSection.Left:
      case StatusBarSection.Message:
        return "status-bar-left";
    }
  };

  /** generate a wrapped status bar entry that will report its size. */
  const getComponent = React.useCallback(
    (
      item: StatusBarItem,
      key: string,
      itemPriority: number,
      section: StatusBarSection
    ): React.ReactNode => {
      const providerId = isProviderItem(item) ? item.providerId : undefined;
      const isOverflown = isItemInOverflow(key, overflown);
      return (
        <DockedStatusBarItem
          key={key}
          itemId={item.id}
          itemPriority={itemPriority}
          providerId={providerId}
          section={getSectionName(section)}
          onResize={isOverflown ? undefined : getOnEntryResize(key)}
        >
          <StatusBarCornerComponentContext.Provider
            value={
              key === notOverflown[0]
                ? "left-corner"
                : (key === notOverflown[notOverflown.length - 1] &&
                    overflown?.length === 0) ||
                  isItemInOverflow(key, overflown)
                ? "right-corner"
                : undefined
            }
          >
            {isStatusBarCustomItem(item) && item.content}
            {isStatusBarActionItem(item) && (
              <StatusBarActionItemComponent {...item} />
            )}
            {isStatusBarLabelItem(item) && (
              <StatusBarLabelItemComponent {...item} />
            )}
          </StatusBarCornerComponentContext.Provider>
        </DockedStatusBarItem>
      );
    },
    [getOnEntryResize, notOverflown, overflown]
  );

  const getSectionItems = React.useCallback(
    (section: StatusBarSection): React.ReactNode[] => {
      const sectionItems = statusBarItems
        .filter(
          (item) =>
            item.section.valueOf() === section.valueOf() &&
            !isItemInOverflow(item.id, overflown) &&
            !ConditionalBooleanValue.getValue(item.isHidden)
        )
        .sort((a, b) => a.itemPriority - b.itemPriority);

      return sectionItems.map((sectionItem) => (
        <React.Fragment key={sectionItem.id}>
          {getComponent(
            sectionItem,
            sectionItem.id,
            sectionItem.itemPriority,
            sectionItem.section
          )}
        </React.Fragment>
      ));
    },
    [statusBarItems, overflown, getComponent]
  );

  const getOverflowItems = React.useCallback((): React.ReactNode[] => {
    const itemsInOverflow = statusBarItems
      .filter(
        (item) =>
          isItemInOverflow(item.id, overflown) &&
          !ConditionalBooleanValue.getValue(item.isHidden)
      )
      .sort(
        (a, b) =>
          getCombinedSectionItemPriority(a) - getCombinedSectionItemPriority(b)
      )
      .reverse();

    return itemsInOverflow.map((item) => (
      <React.Fragment key={item.id}>
        {getComponent(item, item.id, item.itemPriority, item.section)}
      </React.Fragment>
    ));
  }, [statusBarItems, overflown, getComponent]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const resizeObserverRef = useResizeObserver(handleContainerResize);
  // allow  both the containerRef and the resize observer function that takes a ref to be processed when the ref is set.
  const refs = useRefs(containerRef, resizeObserverRef);

  const leftItems = React.useMemo(
    () => getSectionItems(StatusBarSection.Left),
    [getSectionItems]
  );
  const centerItems = React.useMemo(
    () => getSectionItems(StatusBarSection.Center),
    [getSectionItems]
  );
  const rightItems = React.useMemo(
    () => getSectionItems(StatusBarSection.Right),
    [getSectionItems]
  );
  const contextItems = React.useMemo(
    () => getSectionItems(StatusBarSection.Context),
    [getSectionItems]
  );
  const overflowItems = React.useMemo(
    () => getOverflowItems(),
    [getOverflowItems]
  );

  const containerClassName = classnames("uifw-statusBar-docked", className);

  return (
    <div
      className={containerClassName}
      ref={refs}
      style={style}
      role="presentation"
    >
      <StatusBarSpaceBetween className={mainClassName}>
        <StatusBarLeftSection className={leftClassName}>
          {leftItems}
        </StatusBarLeftSection>
        <StatusBarCenterSection className={centerClassName}>
          {centerItems}
          {contextItems}
        </StatusBarCenterSection>
        <StatusBarRightSection className={rightClassName}>
          {rightItems}
          {(!overflown || overflown.length > 0) && (
            <StatusBarOverflow
              onResize={handleOverflowResize}
              overflowItems={overflowItems}
            />
          )}
        </StatusBarRightSection>
      </StatusBarSpaceBetween>
    </div>
  );
}
