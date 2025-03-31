/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Cursor
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { GlobalContextMenu } from "@itwin/core-react"; // ContextSubMenu,
import { SessionStateActionId } from "../../redux/SessionState.js";
import type { CursorMenuItemProps } from "../../shared/MenuItem.js";
import { MenuItemHelpers } from "../../shared/MenuItem.js";
import { SyncUiEventDispatcher } from "../../syncui/SyncUiEventDispatcher.js";
import { UiFramework } from "../../UiFramework.js";
import { Logger } from "@itwin/core-bentley";

/** Popup Menu to show at cursor typically used by tools to provide a right-click context menu.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function CursorPopupMenu(props: CommonProps) {
  const windowIdRef = React.useRef<string | undefined>();
  const [opened, setOpened] = React.useState(false);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [items, setItems] = React.useState<CursorMenuItemProps[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (
        !SyncUiEventDispatcher.hasEventOfInterest(args.eventIds, [
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          SessionStateActionId.UpdateCursorMenu,
        ])
      )
        return;

      const menuData = UiFramework.getCursorMenuData();
      const windowId = windowIdRef.current;
      if (!menuData || windowId !== menuData.childWindowId) {
        setOpened(false);
        setItems(undefined);
        return;
      }

      setOpened(menuData.items && menuData.items.length > 0);
      setItems(menuData.items);
      setX(menuData.position.x);
      setY(menuData.position.y);
    });
  }, []);

  const onClose = () => {
    setOpened(false);
  };

  return (
    <div
      className="uifw-cursor-menu-container-div"
      ref={(el) => {
        const parentWindow = el?.ownerDocument.defaultView ?? undefined;
        const windowId = UiFramework.childWindows.findId(parentWindow);
        windowIdRef.current = windowId;
        Logger.logInfo(
          UiFramework.loggerCategory("UiFramework"),
          `Cursor Menu for ${windowId ?? "main"} window`
        );
      }}
    >
      {items && items.length > 0 && opened && (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <GlobalContextMenu
          className={props.className}
          style={props.style}
          identifier="cursor-popup-menu"
          x={x}
          y={y}
          opened={opened}
          onEsc={onClose}
          onOutsideClick={onClose}
          edgeLimit={false}
          autoflip={true}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
          {MenuItemHelpers.createMenuItemNodes(
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            MenuItemHelpers.createMenuItems(items, onClose)
          )}
        </GlobalContextMenu>
      )}
    </div>
  );
}
