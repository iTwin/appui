/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./ChildWindowRenderer.scss";
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
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu.js";
import { copyStyles } from "./CopyStyles.js";
import { ConfigurableUiContext } from "../configurableui/ConfigurableUiContent.js";
import { CursorPopupRenderer } from "../../appui-react.js";

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
  const { childWindow } = React.useContext(ConfigurableUiContext);
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

  const ChildWindowWrapper = childWindow ?? DefaultChildWindowWrapper;
  return ReactDOM.createPortal(
    <ChildWindowContext.Provider value={window}>
      <TabIdContext.Provider value={tabId}>
        <ThemeManager>
          <ChildWindowWrapper>
            <div className="uifw-child-window-container-host">
              <PopupRenderer />
              <ModalDialogRenderer />
              <ModelessDialogRenderer />
              <CursorPopupMenu />
              <div className="uifw-child-window-container nz-widget-widget">
                {content}
              </div>
              <CursorPopupRenderer />
            </div>
            <div className="uifw-childwindow-internalChildWindowManager_portalContainer" />
          </ChildWindowWrapper>
        </ThemeManager>
      </TabIdContext.Provider>
    </ChildWindowContext.Provider>,
    container
  );
}

const stylesUtils = (() => {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const getCopyStylesPromise = (window: Window) => {
    const w = window as any;
    return w.__appui_copy_styles as Promise<void> | undefined;
  };
  return {
    copyStyles: async (window: Window) => {
      let copyStylesPromise = getCopyStylesPromise(window);
      if (copyStylesPromise === undefined) {
        copyStylesPromise = copyStyles(window.document);
        const w = window as any;
        w.__appui_copy_styles = copyStylesPromise;
      }
      return copyStylesPromise;
    },
  };
})();

function DefaultChildWindowWrapper(props: React.PropsWithChildren) {
  return <>{props.children}</>;
}

/** @internal */
export const ChildWindowContext = React.createContext<Window | undefined>(
  undefined
);
