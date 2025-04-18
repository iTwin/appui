/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./PopupItem.scss";
import classnames from "classnames";
import * as React from "react";
import type { ActionButton, GroupButton } from "@itwin/appui-abstract";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
  RelativePosition,
  ToolbarItemUtilities,
} from "@itwin/appui-abstract";
import { IconHelper } from "@itwin/core-react";
import { Badge, useRefState } from "@itwin/core-react/internal";
import type { ToolbarButtonItemProps } from "./Item.js";
import { PopupItemPopup, ToolbarPopupContext } from "./PopupItem.js";
import type { ActionButtonWithBadgeKind } from "./PopupItemsPanel.js";
import { PopupItemsPanel } from "./PopupItemsPanel.js";
import {
  ToolbarPanelAlignment,
  useToolbarWithOverflowDirectionContext,
  useToolItemEntryContext,
} from "./InternalToolbarComponent.js";
import { useDragInteraction } from "./useDragInteraction.js";
import { Direction } from "./utilities/Direction.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties of [[PopupItemWithDrag]] component.
 * @public
 * @deprecated in 4.16.0. Props of deprecated {@link PopupItemWithDrag} component.
 */
export interface PopupItemWithDragProps extends ToolbarButtonItemProps {
  /** Panel of the toolbar. */
  groupItem: GroupButton;
}

function tryFindActiveAction(item: GroupButton): ActionButton | undefined {
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      if (childItem.isActive) return childItem;
    } else if (ToolbarItemUtilities.isGroupButton(childItem)) {
      const nestedChild = tryFindActiveAction(childItem);
      if (nestedChild) return nestedChild;
    }
  }
  return undefined;
}

function getFirstAvailableChildActionItem(
  item: GroupButton
): ActionButton | undefined {
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      return childItem;
    } else {
      if (ToolbarItemUtilities.isGroupButton(childItem)) {
        const nestedChild = getFirstAvailableChildActionItem(childItem);
        if (nestedChild) return nestedChild;
      }
    }
  }
  return undefined;
}

function getActiveAction(item: GroupButton): ActionButton | undefined {
  const activeItem = tryFindActiveAction(item);
  if (activeItem) return activeItem;

  // initially look only in root items
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      return childItem;
    }
  }

  // if not found look inside groups
  return getFirstAvailableChildActionItem(item);
}

/** Expandable group button item with drag.
 * @public
 * @deprecated in 4.16.0. Used internally to construct toolbars.
 */
export function PopupItemWithDrag(props: PopupItemWithDragProps) {
  const [isPanelShown, setPanelShown] = React.useState(false);
  const [activeAction, setActiveAction] = React.useState<
    ActionButtonWithBadgeKind | undefined
  >(getActiveAction(props.groupItem));
  const {
    expandsTo,
    overflowExpandsTo,
    panelAlignment,
    onPopupPanelOpenClose,
  } = useToolbarWithOverflowDirectionContext();

  React.useEffect(() => {
    const newActiveAction = getActiveAction(props.groupItem);
    if (newActiveAction) {
      if (newActiveAction.isActive) {
        setActiveAction(newActiveAction);
      } else {
        if (activeAction && activeAction.isActive) {
          setActiveAction({ ...activeAction, isActive: false });
        }
      }
    }
  }, [props.groupItem, activeAction]);

  const processPanelOpenClose = React.useCallback(
    (isOpening: boolean) => {
      setPanelShown((prev) => {
        if (prev !== isOpening) onPopupPanelOpenClose(isOpening);
        return isOpening;
      });
    },
    [setPanelShown, onPopupPanelOpenClose]
  );

  // handle open and closing popup panel
  const onOpenPanel = React.useCallback(() => {
    processPanelOpenClose(!isPanelShown);
  }, [isPanelShown, processPanelOpenClose]);

  // handle open and closing popup panel
  const onGroupButtonClick = React.useCallback(() => {
    // only execute action if not disabled
    activeAction &&
      !ConditionalBooleanValue.getValue(activeAction.isDisabled) &&
      activeAction.execute();
  }, [activeAction]);

  const icon = activeAction
    ? IconHelper.getIconReactNode(activeAction.icon, activeAction.internalData)
    : props.icon;
  const title = activeAction
    ? ConditionalStringValue.getValue(activeAction.label)
    : props.title;
  const isActive = activeAction ? activeAction.isActive : props.isActive;
  const isDisabled = ConditionalBooleanValue.getValue(
    activeAction ? activeAction.isDisabled : props.isDisabled
  );

  const { handlePointerDown, handleButtonClick } = useDragInteraction(
    onGroupButtonClick,
    onOpenPanel
  );

  const className = classnames(
    "components-toolbar-button-item",
    "components-toolbar-expandable-button",
    isActive && "components-active",
    isDisabled && "components-disabled-drag",
    props.className
  );

  const [targetRef, target] = useRefState<HTMLButtonElement>();
  const handleClose = React.useCallback(() => {
    processPanelOpenClose(false);
  }, [processPanelOpenClose]);
  const { hasOverflow } = useToolItemEntryContext();
  const expandsToDirection = hasOverflow ? overflowExpandsTo : expandsTo;

  return (
    <ToolbarPopupContext.Provider
      value={{
        closePanel: () => processPanelOpenClose(false),
        setSelectedItem: (buttonItem: ActionButton) =>
          setActiveAction(buttonItem),
      }}
    >
      <button
        data-item-id={props.itemId}
        data-item-type="action-tool-button"
        data-item-group-priority={props.groupPriority}
        data-item-priority={props.itemPriority}
        data-item-provider-id={props.providerId}
        ref={targetRef}
        onPointerDown={handlePointerDown}
        onClick={handleButtonClick}
        onKeyDown={props.onKeyDown}
        className={className}
        style={props.style}
        title={title}
      >
        <div className="components-icon">{icon}</div>
        {props.badge && (
          <div className="components-badge">
            {activeAction ? (
              <Badge type={activeAction.badgeKind || activeAction.badgeType} />
            ) : (
              props.badge
            )}
          </div>
        )}
        <div className="components-triangle" />
      </button>
      <PopupItemPopup
        isOpen={isPanelShown}
        onClose={handleClose}
        position={toToolbarPopupRelativePosition(
          expandsToDirection,
          panelAlignment
        )}
        target={target}
      >
        <PopupItemsPanel
          groupItem={props.groupItem}
          activateOnPointerUp={true}
        />
      </PopupItemPopup>
    </ToolbarPopupContext.Provider>
  );
}

/** @internal */
export function toToolbarPopupRelativePosition(
  expandsTo: Direction,
  alignment: ToolbarPanelAlignment
): RelativePosition {
  switch (expandsTo) {
    case Direction.Bottom: {
      if (alignment === ToolbarPanelAlignment.End)
        return RelativePosition.BottomRight;
      return RelativePosition.BottomLeft;
    }
    case Direction.Left:
      return RelativePosition.LeftTop;
    case Direction.Right:
      return RelativePosition.RightTop;
    case Direction.Top:
      return RelativePosition.Top;
  }
}
