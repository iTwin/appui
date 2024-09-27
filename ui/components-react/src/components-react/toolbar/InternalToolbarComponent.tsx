/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Toolbar.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  ActionButton,
  CommonToolbarItem,
  CustomButtonDefinition,
  GroupButton,
  OnItemExecutedFunc,
} from "@itwin/appui-abstract";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
  ToolbarItemUtilities,
} from "@itwin/appui-abstract";
import type {
  BadgeKind,
  CommonProps,
  NoChildrenProps,
} from "@itwin/core-react";
import { Badge, Icon, IconHelper } from "@itwin/core-react";
import { ToolbarButtonItem } from "./Item";
import { ToolbarItems } from "./Items";
import { ItemWrapper, useResizeObserverSingleDimension } from "./ItemWrapper";
import { ToolbarOverflowButton } from "./Overflow";
import { ToolbarOverflowPanel } from "./OverflowPanel";
import { PopupItem } from "./PopupItem";
import { PopupItemsPanel } from "./PopupItemsPanel";
import { PopupItemWithDrag } from "./PopupItemWithDrag";
import {
  Direction,
  DirectionHelpers,
  OrthogonalDirection,
  OrthogonalDirectionHelpers,
} from "./utilities/Direction";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import type { BeEvent } from "@itwin/core-bentley";
import { useConditionalSynchedItems } from "./useConditionalSynchedItems";
import { useTranslation } from "../l10n/useTranslation";

/** Describes the data needed to insert a custom `React` button into an ToolbarWithOverflow.
 * @public
 * @deprecated in 4.0.0. Use [ToolbarCustomItem]($appui-react) instead.
 */
export interface CustomToolbarItem extends CustomButtonDefinition {
  /** defines the content to display in popup panel */
  panelContentNode?: React.ReactNode;
  /** If true the popup panel is mounted once and unmounted when button is unmounted. If false the
   * content node is unmounted each time the popup is closed. */
  keepContentsLoaded?: boolean;
}

/**
 * Context used by Toolbar items to know if popup panel should be hidden - via AutoHide.
 * @public
 */
export const ToolbarPopupAutoHideContext = React.createContext<boolean>(false);

/**
 * React hook used to retrieve the ToolbarPopupAutoHideContext.
 *  @public
 */
export function useToolbarPopupAutoHideContext() {
  return React.useContext(ToolbarPopupAutoHideContext);
}

/** Describes toolbar item.
 * @public
 * @deprecated in 4.0.0. Use [ToolbarItem]($appui-react) instead.
 */
export type ToolbarItem = ActionButton | GroupButton | CustomToolbarItem; // eslint-disable-line deprecation/deprecation

/** CustomToolbarItem type guard.
 * @internal
 */
export function isCustomToolbarItem(
  // eslint-disable-next-line deprecation/deprecation
  item: ToolbarItem
  // eslint-disable-next-line deprecation/deprecation
): item is CustomToolbarItem {
  return !!(item as CustomToolbarItem).isCustom && "panelContentNode" in item; // eslint-disable-line deprecation/deprecation
}

/** @internal */
export const getToolbarDirection = (
  expandsTo: Direction
): OrthogonalDirection => {
  const orthogonalDirection =
    DirectionHelpers.getOrthogonalDirection(expandsTo);
  return OrthogonalDirectionHelpers.inverse(orthogonalDirection);
};

/** Available alignment modes of [[Toolbar]] panels.
 * @public
 */
export enum ToolbarPanelAlignment {
  Start,
  End,
}

/** Enumeration of Toolbar Opacity setting.
 * @public
 */
export enum ToolbarOpacitySetting {
  /** Use the default background, box-shadow opacity and backdrop-filter blur */
  Defaults,
  /** Alter the opacity from transparent to the defaults based on mouse proximity */
  Proximity,
  /** Use a transparent background, box-shadow opacity and backdrop-filter blur */
  Transparent,
}

/** Helpers for [[ToolbarPanelAlignment]].
 * @internal
 */
export class ToolbarPanelAlignmentHelpers {
  /** Class name of [[ToolbarPanelAlignment.Start]] */
  public static readonly START_CLASS_NAME = "components-panel-alignment-start";
  /** Class name of [[ToolbarPanelAlignment.End]] */
  public static readonly END_CLASS_NAME = "components-panel-alignment-end";

  /** @returns Class name of specified [[ToolbarPanelAlignment]] */
  public static getCssClassName(panelAlignment: ToolbarPanelAlignment): string {
    switch (panelAlignment) {
      case ToolbarPanelAlignment.Start:
        return ToolbarPanelAlignmentHelpers.START_CLASS_NAME;
      case ToolbarPanelAlignment.End:
        return ToolbarPanelAlignmentHelpers.END_CLASS_NAME;
    }
  }
}

/** @internal */
export interface ToolbarOverflowContextProps {
  readonly expandsTo: Direction;
  readonly direction: OrthogonalDirection;
  readonly overflowExpandsTo: Direction;
  readonly overflowDirection: OrthogonalDirection;
  readonly panelAlignment: ToolbarPanelAlignment;
  readonly useDragInteraction: boolean;
  readonly toolbarOpacitySetting: ToolbarOpacitySetting;
  readonly openPopupCount: number;
  readonly onPopupPanelOpenClose: (isOpening: boolean) => void;
  readonly overflowDisplayActive: boolean;
  readonly onItemExecuted: OnItemExecutedFunc;
  readonly onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Context used by Toolbar component to provide Direction to child components.
 * @internal
 */
export const ToolbarWithOverflowDirectionContext =
  React.createContext<ToolbarOverflowContextProps>({
    expandsTo: Direction.Bottom,
    direction: OrthogonalDirection.Horizontal,
    overflowExpandsTo: Direction.Right,
    overflowDirection: OrthogonalDirection.Vertical,
    panelAlignment: ToolbarPanelAlignment.Start,
    useDragInteraction: false,
    toolbarOpacitySetting: ToolbarOpacitySetting.Proximity,
    openPopupCount: 0,
    onPopupPanelOpenClose: (_isOpening: boolean) => {},
    overflowDisplayActive: false,
    onItemExecuted: (_item: any) => void {},
    onKeyDown: (_e: React.KeyboardEvent) => void {},
  });

/** @internal */
function CustomItem({
  item,
  addGroupSeparator,
  badgeKind,
}: {
  // eslint-disable-next-line deprecation/deprecation
  item: CustomToolbarItem;
  addGroupSeparator: boolean;
  badgeKind?: BadgeKind;
}) {
  const { useDragInteraction } = useToolbarWithOverflowDirectionContext();
  const icon = React.useMemo(
    () =>
      (item.icon &&
        // eslint-disable-next-line deprecation/deprecation
        IconHelper.getIconReactNode(item.icon, item.internalData)) || (
        // eslint-disable-next-line deprecation/deprecation
        <Icon className="icon" iconSpec={<SvgPlaceholder />} />
      ),
    [item.icon, item.internalData]
  );
  const isDisabled = React.useMemo(
    () => ConditionalBooleanValue.getValue(item.isDisabled),
    [item.isDisabled]
  );
  const title = React.useMemo(
    () => ConditionalStringValue.getValue(item.label) ?? item.id,
    [item.id, item.label]
  );

  return (
    // eslint-disable-next-line deprecation/deprecation
    <PopupItem
      key={item.id}
      itemId={item.id}
      icon={icon}
      isDisabled={isDisabled}
      title={title}
      panel={item.panelContentNode}
      hideIndicator={useDragInteraction}
      badge={<Badge type={badgeKind || item.badgeType} />}
      addGroupSeparator={addGroupSeparator}
      keepContentsMounted={item.keepContentsLoaded}
    />
  );
}

/** @internal */
function GroupPopupItem({
  item,
  addGroupSeparator,
  badgeKind,
}: {
  item: GroupButton;
  addGroupSeparator: boolean;
  badgeKind?: BadgeKind;
}) {
  const { useDragInteraction } = useToolbarWithOverflowDirectionContext();
  const title = ConditionalStringValue.getValue(item.label)!;
  const panel = React.useMemo(
    () => <PopupItemsPanel groupItem={item} activateOnPointerUp={false} />,
    [item]
  );
  const providerId =
    "providerId" in item ? (item.providerId as string) : undefined;
  if (useDragInteraction) {
    return (
      // eslint-disable-next-line deprecation/deprecation
      <PopupItemWithDrag
        key={item.id}
        itemId={item.id}
        providerId={providerId}
        itemPriority={item.itemPriority}
        groupPriority={item.groupPriority}
        // eslint-disable-next-line deprecation/deprecation
        icon={IconHelper.getIconReactNode(item.icon, item.internalData)}
        isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
        title={title}
        groupItem={item}
        badge={<Badge type={badgeKind || item.badgeType} />}
        addGroupSeparator={addGroupSeparator}
      />
    );
  }
  return (
    // eslint-disable-next-line deprecation/deprecation
    <PopupItem
      key={item.id}
      itemId={item.id}
      providerId={providerId}
      itemPriority={item.itemPriority}
      groupPriority={item.groupPriority}
      // eslint-disable-next-line deprecation/deprecation
      icon={IconHelper.getIconReactNode(item.icon, item.internalData)}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      title={title}
      panel={panel}
      badge={<Badge type={badgeKind || item.badgeType} />}
      hideIndicator={useDragInteraction}
      addGroupSeparator={addGroupSeparator}
    />
  );
}

/** @internal */
function ActionItem({
  item,
  addGroupSeparator,
  badgeKind,
}: {
  item: ActionButton;
  addGroupSeparator: boolean;
  badgeKind?: BadgeKind;
}) {
  const title = ConditionalStringValue.getValue(item.label)!;
  const { onItemExecuted } = useToolbarWithOverflowDirectionContext();
  const onExecute = React.useCallback(() => {
    item.execute();
    onItemExecuted(item);
  }, [item, onItemExecuted]);

  const providerId =
    "providerId" in item ? (item.providerId as string) : undefined;
  return (
    <ToolbarButtonItem
      itemId={item.id}
      providerId={providerId}
      itemPriority={item.itemPriority}
      groupPriority={item.groupPriority}
      key={item.id}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      title={title}
      // eslint-disable-next-line deprecation/deprecation
      icon={IconHelper.getIconReactNode(item.icon, item.internalData)}
      isActive={item.isActive}
      onClick={onExecute}
      badge={<Badge type={badgeKind || item.badgeType} />}
      addGroupSeparator={addGroupSeparator}
    />
  );
}

/** @internal */
export function ToolbarItemComponent({
  item,
  addGroupSeparator,
  badgeKind,
}: {
  // eslint-disable-next-line deprecation/deprecation
  item: ToolbarItem;
  addGroupSeparator: boolean;
  badgeKind?: BadgeKind;
}) {
  if (ToolbarItemUtilities.isGroupButton(item)) {
    return (
      <GroupPopupItem
        item={item}
        addGroupSeparator={addGroupSeparator}
        badgeKind={badgeKind}
      />
    );
  } else if (isCustomToolbarItem(item)) {
    return (
      <CustomItem
        item={item}
        addGroupSeparator={addGroupSeparator}
        badgeKind={badgeKind}
      />
    );
  } else {
    if (ToolbarItemUtilities.isActionButton(item)) {
      return (
        <ActionItem
          item={item}
          addGroupSeparator={addGroupSeparator}
          badgeKind={badgeKind}
        />
      );
    }
  }
  return null;
}

/** @internal */
export function useToolbarWithOverflowDirectionContext() {
  return React.useContext(ToolbarWithOverflowDirectionContext);
}

function OverflowItemsContainer(p: { children: React.ReactNode }) {
  return <>{p.children}</>;
}

function getItemWrapperClass(child: React.ReactNode) {
  if (React.isValidElement(child)) {
    if (child.props && child.props.addGroupSeparator)
      return "components-toolbar-button-add-gap-before";
  }
  return undefined;
}

/**
 * Recursively looks through all items and groups and removes the hidden items
 * from the working object.
 * @param items List of object to analyze.
 * @returns Copy of the provided items, minus the hidden ones.
 */
function filterHiddenItems<T extends CommonToolbarItem>(
  items: ReadonlyArray<T>
): T[] {
  return items
    .filter((item) => !ConditionalBooleanValue.getValue(item.isHidden))
    .map((i) => {
      if ("items" in i) {
        return { ...i, items: filterHiddenItems(i.items) };
      }
      return i;
    });
}

/** Old toolbar item type with new badge type.
 * @internal
 */
export type CommonToolbarItemWithBadgeKind = CommonToolbarItem & {
  badgeKind?: BadgeKind;
};

/** Properties of [[ToolbarComponent]] component.
 * @internal
 */
export interface InternalToolbarComponentProps
  extends CommonProps, // eslint-disable-line deprecation/deprecation
    // eslint-disable-next-line deprecation/deprecation
    NoChildrenProps {
  /** Describes to which direction the popup panels are expanded. Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
  /** Describes if items that do not fit available space should move to an expandable panel. Defaults to: false */
  enableOverflow?:
    | boolean
    | {
        /** Describes to which direction the overflow popup panels are expanded if overflow is enabled. Defaults to: [[Direction.Right]] */
        overflowExpandsTo?: Direction;
      };
  /** Definitions for items of the toolbar. Items are expected to be already sorted by group and item. */
  items: CommonToolbarItemWithBadgeKind[];
  /** Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]] */
  panelAlignment?: ToolbarPanelAlignment;
  /** Use Drag Interaction to open popups with nest action buttons. */
  useDragInteraction?: boolean;
  /** Determines whether to use mouse proximity to alter the opacity of the toolbar. */
  toolbarOpacitySetting?: ToolbarOpacitySetting;
  /** Optional function to call on any item execution. */
  onItemExecuted?: OnItemExecutedFunc;
  /** Optional function to call on any KeyDown events processed by toolbar. */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** SyncEvents on which the conditional should listen to. */
  syncUiEvent?: BeEvent<(args: { eventIds: Set<string> }) => void>;
}

/** Component that displays toolbar items.
 * @internal
 */
export function InternalToolbarComponent(props: InternalToolbarComponentProps) {
  const expandsTo = props.expandsTo ? props.expandsTo : Direction.Bottom;
  const useDragInteraction = !!props.useDragInteraction;
  const panelAlignment = props.panelAlignment
    ? props.panelAlignment
    : ToolbarPanelAlignment.Start;
  const useHeight =
    expandsTo === Direction.Right || expandsTo === Direction.Left;
  const { translate } = useTranslation();
  const [isOverflowPanelOpen, setIsOverflowPanelOpen] = React.useState(false);
  const [popupPanelCount, setPopupPanelCount] = React.useState(0);
  const handlePopupPanelOpenClose = React.useCallback((isOpening: boolean) => {
    // use setTimeout to avoid warning about setting state in ToolbarWithOverflow from render method of PopupItem/PopupItemWithDrag
    setTimeout(() => {
      setPopupPanelCount((prev) => {
        const nextCount = isOpening ? prev + 1 : prev - 1;
        return nextCount < 0 ? 0 : nextCount;
      });
    });
  }, []);

  const width = React.useRef<number | undefined>(undefined);

  const eventSynchedItems = useConditionalSynchedItems(
    props.items,
    props.syncUiEvent
  );

  const availableNodes = React.useMemo<React.ReactNode>(() => {
    const filteredItems = filterHiddenItems(eventSynchedItems);
    return filteredItems.map((item, index) => {
      let addGroupSeparator = false;
      if (index > 0)
        addGroupSeparator =
          item.groupPriority !== filteredItems[index - 1].groupPriority;
      return (
        <ToolbarItemComponent
          key={item.id}
          item={item}
          addGroupSeparator={!!addGroupSeparator}
          badgeKind={item.badgeKind}
        />
      );
    });
  }, [eventSynchedItems]);
  /* overflowItemKeys - keys of items to show in overflow panel
   * handleContainerResize - handler called when container <div> is resized.
   * handleOverflowResize - handler called when determining size of overflow indicator/button.
   * handleEntryResize - handler called when determining size of each item/button.  */
  const [
    overflowItemKeys,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize,
  ] = useOverflow(availableNodes, panelAlignment === ToolbarPanelAlignment.End);
  // handler called by ResizeObserver
  const handleResize = React.useCallback(
    (w: number) => {
      width.current = w;
      width.current !== undefined && handleContainerResize(width.current);
    },
    [handleContainerResize]
  );
  const resizeObserverRef = useResizeObserverSingleDimension(
    handleResize,
    useHeight
  );
  const handleClick = React.useCallback(() => {
    setIsOverflowPanelOpen((prev) => !prev);
  }, []);
  const handleClose = React.useCallback(() => {
    setIsOverflowPanelOpen(false);
  }, []);

  // Not setting the ref will disable overflow management, but will keep proper refresh of items.
  const ref = props.enableOverflow ? resizeObserverRef : undefined;
  const availableItems = React.Children.toArray(availableNodes);
  const displayedItems = availableItems.reduce<
    Array<[string, React.ReactNode]>
  >((acc, child, index) => {
    const key = getChildKey(child, index);
    if (!overflowItemKeys || overflowItemKeys.indexOf(key) < 0) {
      acc.push([key, child]);
    }
    return acc;
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const overflowPanelItems = overflowItemKeys
    ? availableItems.reduce<Array<[string, React.ReactNode]>>(
        (acc, child, index) => {
          const key = getChildKey(child, index);
          if (overflowItemKeys.indexOf(key) >= 0) {
            acc.push([key, child]);
          }
          return acc;
        },
        []
      )
    : [];

  const direction = getToolbarDirection(expandsTo);
  const overflowExpandsTo =
    (typeof props.enableOverflow !== "boolean" &&
      props.enableOverflow?.overflowExpandsTo) ||
    Direction.Right;
  const addOverflowButton = React.useCallback(
    (atStart: boolean) => {
      const overflowItems = !!atStart
        ? overflowPanelItems.reverse()
        : overflowPanelItems;
      return (
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight,
            onResize: handleOverflowResize,
          }}
        >
          <ToolbarOverflowButton
            expandsTo={expandsTo}
            onClick={handleClick}
            onClose={handleClose}
            open={overflowItems.length > 0 && isOverflowPanelOpen}
            panelNode={
              <ToolbarOverflowPanel>
                <OverflowItemsContainer>
                  {overflowItems.map(([key, child]) => {
                    return (
                      <ToolbarItemContext.Provider
                        key={key}
                        value={{
                          hasOverflow: true,
                          useHeight,
                          onResize: () => {},
                        }}
                      >
                        {
                          <ItemWrapper className={getItemWrapperClass(child)}>
                            {child}
                          </ItemWrapper>
                        }
                      </ToolbarItemContext.Provider>
                    );
                  })}
                </OverflowItemsContainer>
              </ToolbarOverflowPanel>
            }
            title={translate("toolbar.overflow")}
          />
        </ToolbarItemContext.Provider>
      );
    },
    [
      overflowPanelItems,
      useHeight,
      handleOverflowResize,
      expandsTo,
      handleClick,
      handleClose,
      isOverflowPanelOpen,
      translate,
    ]
  );

  const className = classnames(
    "components-toolbar-overflow-sizer",
    OrthogonalDirectionHelpers.getCssClassName(direction),
    props.className
  );

  const showOverflowAtStart =
    direction === OrthogonalDirection.Horizontal &&
    panelAlignment === ToolbarPanelAlignment.End;
  /* The ItemWrapper is used to wrap the <Item> <ExpandableItem> with a <div> that specifies a ref that the sizing logic uses to determine the
     size of the item. */
  return (
    <ToolbarWithOverflowDirectionContext.Provider
      value={{
        expandsTo,
        direction,
        overflowExpandsTo,
        panelAlignment,
        useDragInteraction,
        toolbarOpacitySetting:
          props.toolbarOpacitySetting ?? ToolbarOpacitySetting.Proximity,
        overflowDirection:
          direction === OrthogonalDirection.Horizontal
            ? OrthogonalDirection.Vertical
            : OrthogonalDirection.Horizontal,
        openPopupCount: popupPanelCount,
        onPopupPanelOpenClose: handlePopupPanelOpenClose,
        overflowDisplayActive:
          overflowPanelItems.length > 0 && isOverflowPanelOpen,
        onItemExecuted: props.onItemExecuted ? props.onItemExecuted : () => {},
        onKeyDown: props.onKeyDown
          ? props.onKeyDown
          : (_e: React.KeyboardEvent) => {},
      }}
    >
      {availableItems.length > 0 && (
        <div
          className={className}
          ref={ref}
          style={props.style}
          onKeyDown={props.onKeyDown}
          role="presentation"
        >
          <ToolbarItems className="components-items" direction={direction}>
            {props.enableOverflow &&
              (!overflowItemKeys || overflowItemKeys.length > 0) &&
              showOverflowAtStart &&
              addOverflowButton(true)}
            {displayedItems.map(([key, child]) => {
              const onEntryResize = handleEntryResize(key);
              return (
                <ToolbarItemContext.Provider
                  key={key}
                  value={{
                    hasOverflow: false,
                    useHeight,
                    onResize: onEntryResize,
                  }}
                >
                  <ItemWrapper className={getItemWrapperClass(child)}>
                    {child}
                  </ItemWrapper>
                </ToolbarItemContext.Provider>
              );
            })}
            {props.enableOverflow &&
              (!overflowItemKeys || overflowItemKeys.length > 0) &&
              !showOverflowAtStart &&
              addOverflowButton(false)}
          </ToolbarItems>
        </div>
      )}
    </ToolbarWithOverflowDirectionContext.Provider>
  );
}

/** Returns key of a child. Must be used along with React.Children.toArray to preserve the semantics of availableItems.
 * @internal
 */
function getChildKey(child: React.ReactNode, index: number) {
  if (React.isValidElement(child) && child.key !== null) {
    return child.key.toString();
  }
  return index.toString();
}

/** Returns a subset of toolbar item entry keys that exceed given width and should be overflowItemKeys.
 * @internal
 */
function determineOverflowItems(
  size: number,
  entries: ReadonlyArray<readonly [string, number]>,
  overflowButtonSize: number,
  overflowButtonAtStart: boolean
): string[] {
  let toolbarSize = 0;
  const buttonPadding = 2;
  if (overflowButtonAtStart && entries.length > 0) {
    let i = entries.length - 1;
    for (; i >= 0; i--) {
      const w = entries[i][1] + buttonPadding;
      const newSettingsWidth = toolbarSize + w;
      if (newSettingsWidth > size) {
        toolbarSize += overflowButtonSize + buttonPadding;
        break;
      }
      toolbarSize = newSettingsWidth;
    }
    if (i >= 0) {
      let j = i + 1;
      for (; j < entries.length; j++) {
        if (toolbarSize <= size) break;
        const w = entries[j][1] + buttonPadding;
        toolbarSize -= w;
      }

      return entries.slice(0, j).map((e) => e[0]);
    } else {
      return [];
    }
  } else {
    let i = 0;
    for (; i < entries.length; i++) {
      const w = entries[i][1] + buttonPadding;
      const newSettingsWidth = toolbarSize + w;
      if (newSettingsWidth > size) {
        toolbarSize += overflowButtonSize + buttonPadding;
        break;
      }
      toolbarSize = newSettingsWidth;
    }
    let j = i;
    for (; j > 0; j--) {
      if (toolbarSize <= size) break;
      const w = entries[j][1] + buttonPadding;
      toolbarSize -= w;
    }

    return entries.slice(j).map((e) => e[0]);
  }
}

/** Hook that returns a list of overflowItemKeys availableItems.
 * @internal
 */
function useOverflow(
  availableItems: React.ReactNode,
  overflowButtonAtStart: boolean
): [
  ReadonlyArray<string> | undefined,
  (size: number) => void,
  (size: number) => void,
  (key: string) => (size: number) => void
] {
  const [overflowItemKeys, setOverflown] =
    React.useState<ReadonlyArray<string>>();
  const itemSizes = React.useRef(new Map<string, number | undefined>());
  const size = React.useRef<number | undefined>(undefined);
  const overflowButtonSize = React.useRef<number | undefined>(undefined);

  const calculateOverflow = React.useCallback(() => {
    const sizes = verifiedMapEntries(itemSizes.current);
    if (
      size.current === undefined ||
      sizes === undefined ||
      overflowButtonSize.current === undefined
    ) {
      setOverflown(undefined);
      return;
    }

    // Calculate overflow.
    const newOverflown = determineOverflowItems(
      size.current,
      [...sizes.entries()],
      overflowButtonSize.current,
      overflowButtonAtStart
    );
    setOverflown((prevOverflown) => {
      return eql(prevOverflown, newOverflown) ? prevOverflown : newOverflown;
    });
  }, [overflowButtonAtStart]);

  React.useLayoutEffect(() => {
    const newEntryWidths = new Map<string, number | undefined>();
    const array = React.Children.toArray(availableItems);
    for (let i = 0; i < array.length; i++) {
      const child = array[i];
      const key = getChildKey(child, i);
      const lastW = itemSizes.current.get(key);
      newEntryWidths.set(key, lastW);
    }
    itemSizes.current = newEntryWidths;
    calculateOverflow();
  }, [availableItems, calculateOverflow]);

  const handleContainerResize = React.useCallback(
    (w: number) => {
      const calculate = size.current !== w;
      size.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );

  const handleOverflowResize = React.useCallback(
    (w: number) => {
      const calculate = overflowButtonSize.current !== w;
      overflowButtonSize.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );

  const handleEntryResize = React.useCallback(
    (key: string) => (w: number) => {
      const oldW = itemSizes.current.get(key);
      if (oldW !== w) {
        itemSizes.current.set(key, w);
        calculateOverflow();
      }
    },
    [calculateOverflow]
  );

  return [
    overflowItemKeys,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize,
  ];
}

/** Interface toolbars use to define context for its items.
 * @internal
 */
export interface ToolbarItemContextArgs {
  readonly hasOverflow: boolean;
  readonly useHeight: boolean;
  readonly onResize: (w: number) => void;
}

/** Interface toolbars use to define context for its items.
 * @internal
 */
export const ToolbarItemContext = React.createContext<ToolbarItemContextArgs>({
  hasOverflow: false,
  useHeight: false,
  onResize: () => {
    // intentionally do nothing by default.
  },
});

/** @internal */
export function useToolItemEntryContext() {
  return React.useContext(ToolbarItemContext);
}

function verifiedMapEntries<T>(map: Map<string, T | undefined>) {
  for (const [, val] of map) {
    if (val === undefined) return undefined;
  }
  return map as Map<string, T>;
}

function eql(prev: readonly string[] | undefined, value: readonly string[]) {
  if (!prev) return false;
  if (prev.length !== value.length) return false;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i];
    const v = value[i];
    if (p !== v) return false;
  }
  return true;
}
