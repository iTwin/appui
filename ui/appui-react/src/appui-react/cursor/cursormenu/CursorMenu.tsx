/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Cursor
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { ListenerType } from "@itwin/core-react/internal";
import { GlobalContextMenu } from "@itwin/core-react"; // ContextSubMenu,
import { SessionStateActionId } from "../../redux/SessionState.js";
import type { CursorMenuItemProps } from "../../shared/MenuItem.js";
import { MenuItemHelpers } from "../../shared/MenuItem.js";
import { SyncUiEventDispatcher } from "../../syncui/SyncUiEventDispatcher.js";
import { UiFramework } from "../../UiFramework.js";
import { Logger } from "@itwin/core-bentley";

/** State for [[CursorPopupMenu]] component
 * @alpha
 */
interface CursorPopupMenuState {
  menuX: number;
  menuY: number;
  menuVisible: boolean;
  items?: CursorMenuItemProps[];
}

/** Popup Menu to show at cursor typically used by tools to provide a right-click context menu.
 * @alpha
 */
export class CursorPopupMenu extends React.PureComponent<
  CommonProps, // eslint-disable-line @typescript-eslint/no-deprecated
  CursorPopupMenuState
> {
  private _isMounted = false; // used to ensure _handleSyncUiEvent callback is not processed after componentWillUnmount is called
  private _hostChildWindowId?: string;

  public override readonly state: CursorPopupMenuState = {
    menuX: 0,
    menuY: 0,
    menuVisible: false,
    items: undefined,
  };

  private _handleSyncUiEvent: ListenerType<
    typeof SyncUiEventDispatcher.onSyncUiEvent
  > = (args) => {
    if (!this._isMounted) return;

    if (
      SyncUiEventDispatcher.hasEventOfInterest(args.eventIds, [
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.UpdateCursorMenu,
      ])
    ) {
      const menuData = UiFramework.getCursorMenuData();
      if (menuData && this._hostChildWindowId === menuData.childWindowId) {
        this.setState({
          menuVisible: menuData.items && menuData.items.length > 0,
          items: menuData.items as CursorMenuItemProps[],
          menuX: menuData.position.x,
          menuY: menuData.position.y,
        });
      } else {
        this.setState({ menuVisible: false, items: undefined });
      }
    }
  };

  public override componentDidMount() {
    this._isMounted = true;
    SyncUiEventDispatcher.onSyncUiEvent.addListener(this._handleSyncUiEvent);
  }

  public override componentWillUnmount() {
    this._isMounted = false;
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(this._handleSyncUiEvent);
  }

  private _handleRefSet = (popupDiv: HTMLElement | null) => {
    const parentWindow = popupDiv?.ownerDocument.defaultView ?? undefined;
    // if the window is not a pop out set to undefined
    this._hostChildWindowId = UiFramework.childWindows.findId(parentWindow);
    Logger.logInfo(
      UiFramework.loggerCategory("UiFramework"),
      `Cursor Menu for ${this._hostChildWindowId ?? "main"} window`
    );
  };

  public override render(): React.ReactNode {
    const { menuX, menuY, items, menuVisible } = this.state;
    const onClose = this._hideContextMenu;

    return (
      <div className="uifw-cursor-menu-container-div" ref={this._handleRefSet}>
        {items && items.length > 0 && menuVisible && (
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          <GlobalContextMenu
            className={this.props.className}
            style={this.props.style}
            identifier="cursor-popup-menu"
            x={menuX}
            y={menuY}
            opened={menuVisible}
            onEsc={onClose}
            onOutsideClick={onClose}
            edgeLimit={false}
            autoflip={true}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            {MenuItemHelpers.createMenuItemNodes(
              // eslint-disable-next-line @typescript-eslint/no-deprecated
              MenuItemHelpers.createMenuItems(items, this._itemPicked)
            )}
          </GlobalContextMenu>
        )}
      </div>
    );
  }

  private _hideContextMenu = () => {
    this.setState({ menuVisible: false });
  };

  private _itemPicked = (): void => {
    this._hideContextMenu();
  };
}
