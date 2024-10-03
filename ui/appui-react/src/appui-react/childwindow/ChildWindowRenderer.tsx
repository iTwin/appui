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
import type {
  InternalChildWindowManager,
  InternalOpenChildWindowInfo,
} from "./InternalChildWindowManager.js";
import { TabIdContext } from "../layout/widget/ContentRenderer.js";
import { ThemeManager } from "../theme/ThemeManager.js";
import { PopupRenderer } from "../popup/PopupManager.js";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager.js";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager.js";
import { CursorPopupMenu } from "../../appui-react.js";
import { copyStyles } from "./CopyStyles.js";

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
            content={childWindow.content}
            tabId={childWindow.tabId}
            window={childWindow.window}
          />
        );
      })}
    </>
  );
}

type ChildWindowProps = Pick<
  InternalOpenChildWindowInfo,
  "content" | "tabId" | "window"
>;

function ChildWindow({ content, tabId, window }: ChildWindowProps) {
  const container = React.useMemo(() => {
    return window.document.getElementById("root");
  }, [window]);
  const [styled, setStyled] = React.useState(false);
  React.useEffect(() => {
    void (async () => {
      await stylesUtils.copyStyles(window);
      setStyled(true);
    })();
  }, [window]);

  if (!container) return null;
  if (!styled) return null;

  return ReactDOM.createPortal(
    <TabIdContext.Provider value={tabId}>
      <ThemeManager>
        <div className="uifw-child-window-container-host">
          <PopupRenderer />
          <ModalDialogRenderer />
          <ModelessDialogRenderer />
          <CursorPopupMenu />
          <div className="uifw-child-window-container nz-widget-widget">
            {content}
          </div>
        </div>
        <div className="uifw-childwindow-internalChildWindowManager_portalContainer" />
      </ThemeManager>
    </TabIdContext.Provider>,
    container
  );
}

const stylesUtils = (() => {
  const hasStyles = (window: Window) => {
    const w = window as any;
    return w.__appui_has_styles ?? false;
  };
  const setHasStyles = (window: Window, val: boolean) => {
    const w = window as any;
    w.__appui_has_styles = val;
  };
  return {
    copyStyles: async (window: Window) => {
      if (hasStyles(window)) return;
      setHasStyles(window, true);
      return copyStyles(window.document);
    },
  };
})();
