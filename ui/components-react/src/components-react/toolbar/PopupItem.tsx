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
import type { ActionButton, RelativePosition } from "@itwin/appui-abstract";
import { Popup } from "@itwin/core-react";
import { useRefState } from "@itwin/core-react/internal";
import type { ToolbarButtonItemProps } from "./Item.js";
import {
  useToolbarPopupAutoHideContext,
  useToolbarWithOverflowDirectionContext,
  useToolItemEntryContext,
} from "./InternalToolbarComponent.js";
import {
  PopupItemWithDrag,
  toToolbarPopupRelativePosition,
} from "./PopupItemWithDrag.js";

/* eslint-disable deprecation/deprecation */

/**
 * @public
 * @deprecated in 4.16.0. Props of deprecated {@link ToolbarPopupContext} context.
 */
export interface ToolbarPopupContextProps {
  readonly closePanel: () => void;
  readonly setSelectedItem?: (buttonItem: ActionButton) => void;
}

/** Context used by Toolbar items in popups to close the popup panel.
 * @public
 * @deprecated in 4.16.0. Used in deprecated {@link PopupItem} and {@link PopupItemWithDrag} components.
 */
export const ToolbarPopupContext =
  React.createContext<ToolbarPopupContextProps>({
    /** function used to close popup panel */
    closePanel: () => {},
    /** if popup panel is a GroupButton then this is call to set the selected action item within the panel */
    setSelectedItem: (_buttonItem: ActionButton) => {},
  });

/** React hook used to retrieve the ToolbarPopupContext.
 * @public
 * @deprecated in 4.16.0. Uses deprecated {@link ToolbarPopupContext} context.
 */
export function useToolbarPopupContext() {
  return React.useContext(ToolbarPopupContext);
}

/** Properties of [[PopupItem]] component.
 * @public
 * @deprecated in 4.16.0. Props of deprecated {@link PopupItem} component.
 */
export interface PopupItemProps extends ToolbarButtonItemProps {
  /** Describes if expandable item triangle indicator should be hidden. */
  hideIndicator?: boolean;
  /** Panel of the toolbar. */
  panel?: React.ReactNode;
  /** If true the popup panel is mounted once and unmounted when button is unmounted. If false the
   * content node is unmounted each time the popup is closed. */
  keepContentsMounted?: boolean;
}

/** Popup toolbar item that displays a panel.
 * @public
 * @deprecated in 4.16.0. Used internally to construct toolbars.
 */
export function PopupItem(props: PopupItemProps) {
  const [isPanelShown, setPanelShown] = React.useState(false);
  const {
    expandsTo,
    overflowExpandsTo,
    panelAlignment,
    onPopupPanelOpenClose,
  } = useToolbarWithOverflowDirectionContext();
  const processPanelOpenClose = React.useCallback(
    (isOpening: boolean) => {
      setPanelShown((prev) => {
        if (prev !== isOpening) onPopupPanelOpenClose(isOpening);
        return isOpening;
      });
    },
    [setPanelShown, onPopupPanelOpenClose]
  );

  // handle open and closing overflow panel
  const onButtonClick = React.useCallback(() => {
    processPanelOpenClose(!isPanelShown);
    if (props.onClick) props.onClick();
  }, [props, isPanelShown, processPanelOpenClose]);
  const className = classnames(
    "components-toolbar-button-item",
    "components-toolbar-expandable-button",
    props.isDisabled && "components-disabled",
    props.className
  );

  const [targetRef, target] = useRefState<HTMLButtonElement>();
  const handleClose = React.useCallback(() => {
    processPanelOpenClose(false);
  }, [processPanelOpenClose]);
  const { hasOverflow } = useToolItemEntryContext();
  const expandsToDirection = hasOverflow ? overflowExpandsTo : expandsTo;

  const { hideIndicator, panel } = props;
  return (
    <ToolbarPopupContext.Provider
      value={{
        closePanel: () => processPanelOpenClose(false),
      }}
    >
      <button
        data-item-id={props.itemId}
        data-item-type="tool-button-popup"
        data-item-group-priority={props.groupPriority}
        data-item-priority={props.itemPriority}
        data-item-provider-id={props.providerId}
        ref={targetRef}
        disabled={props.isDisabled} // this is needed to prevent focusing/keyboard access to disabled buttons
        onClick={onButtonClick}
        onKeyDown={props.onKeyDown}
        className={className}
        style={props.style}
        title={props.title}
      >
        <div className="components-icon">{props.icon}</div>
        {props.badge && <div className="components-badge">{props.badge}</div>}
        {hideIndicator ? undefined : <div className="components-triangle" />}
      </button>
      <PopupItemPopup
        isOpen={isPanelShown}
        onClose={handleClose}
        position={toToolbarPopupRelativePosition(
          expandsToDirection,
          panelAlignment
        )}
        target={target}
        keepContentsMounted={props.keepContentsMounted}
      >
        {panel}
      </PopupItemPopup>
    </ToolbarPopupContext.Provider>
  );
}

interface PopupItemPopupProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose(): void;
  position: RelativePosition;
  target?: HTMLElement;
  keepContentsMounted?: boolean;
}

/** @internal */
export function PopupItemPopup(props: PopupItemPopupProps) {
  const isHidden = useToolbarPopupAutoHideContext();
  const className = classnames(
    "components-toolbar-popupItem_popupItemPopup",
    isHidden && "nz-hidden"
  );

  return (
    <Popup className={className} offset={0} showShadow={false} {...props} />
  );
}
