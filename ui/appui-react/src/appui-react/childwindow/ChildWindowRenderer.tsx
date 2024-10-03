/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./ChildWindowWidget.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { InternalChildWindowManager } from "./InternalChildWindowManager.js";
import { TabIdContext } from "../layout/widget/ContentRenderer.js";
import { ThemeManager } from "../theme/ThemeManager.js";
import { PopupRenderer } from "../popup/PopupManager.js";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager.js";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager.js";
import type { OpenChildWindowInfo } from "../../appui-react.js";
import { CursorPopupMenu } from "../../appui-react.js";

interface ChildWindowRendererProps {
  windowManager: InternalChildWindowManager;
}

/** @internal */
export function ChildWindowRenderer({
  windowManager,
}: ChildWindowRendererProps) {
  const [childWindows, setChildWindows] = React.useState(
    windowManager.openChildWindows
  );
  React.useEffect(() => {
    return windowManager.onChildWindowsChanged.addListener(() => {
      setChildWindows([...windowManager.openChildWindows]);
    });
  }, [windowManager]);
  return (
    <>
      {childWindows.map((childWindow) => {
        return (
          <ChildWindow
            key={childWindow.childWindowId}
            windowManager={windowManager}
            windowId={childWindow.childWindowId}
          />
        );
      })}
    </>
  );
}

interface ChildWindowProps {
  windowManager: InternalChildWindowManager;
  windowId: OpenChildWindowInfo["childWindowId"];
}

function ChildWindow({ windowManager, windowId }: ChildWindowProps) {
  const [info, setInfo] = React.useState(
    windowManager.openChildWindows.find((w) => w.childWindowId === windowId)
  );
  React.useEffect(() => {
    return windowManager.onChildWindowChanged.addListener((newInfo) => {
      if (newInfo.childWindowId !== windowId) return;
      setInfo({ ...newInfo });
    });
  }, [windowManager, windowId]);

  const container = React.useMemo(() => {
    return info?.window.document.getElementById("root");
  }, [info]);

  if (!info) return null;
  if (!info.render) return null;
  if (!container) return null;

  return ReactDOM.createPortal(
    <TabIdContext.Provider value={info.tabId}>
      <ThemeManager>
        <div className="uifw-child-window-container-host">
          <PopupRenderer />
          <ModalDialogRenderer />
          <ModelessDialogRenderer />
          <CursorPopupMenu />
          <div className="uifw-child-window-container nz-widget-widget">
            {info.content}
          </div>
        </div>
        <div className="uifw-childwindow-internalChildWindowManager_portalContainer" />
      </ThemeManager>
    </TabIdContext.Provider>,
    container
  );
}
