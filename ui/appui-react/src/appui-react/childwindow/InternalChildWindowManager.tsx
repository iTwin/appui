/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./InternalChildWindowManager.scss";
import * as React from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { UiFramework } from "../UiFramework.js";
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu.js";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager.js";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager.js";
import type {
  ChildWindowLocationProps,
  FrameworkChildWindows,
  OpenChildWindowInfo,
} from "../framework/FrameworkChildWindows.js";
import { TabIdContext } from "../layout/widget/ContentRenderer.js";
import { PopupRenderer } from "../popup/PopupManager.js";
import { ThemeManager } from "../theme/ThemeManager.js";
import { UiStateStorageHandler } from "../uistate/useUiStateStorage.js";
import type { ChildWindow } from "./ChildWindowConfig.js";
import { copyStyles } from "./CopyStyles.js";
import { usePopoutsStore } from "../preview/reparent-popout-widgets/usePopoutsStore.js";
import type { WidgetDef } from "../widgets/WidgetDef.js";

const childHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html,
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      overflow: hidden;
    }
    #root {
      height: 100%;
    }
  </style>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>`;

/** Supports opening a child browser window from the main application window. The child window is managed by the main application
 * and is running in the same security context. The application must deliver the html file iTwinPopup.html along side its index.html.
 * See also: [Child Window Manager]($docs/learning/ui/appui-react/ChildWindows.md)
 * @internal
 * */
export class InternalChildWindowManager implements FrameworkChildWindows {
  private _openChildWindows: OpenChildWindowInfo[] = [];
  private _roots = new Map<string, Root>();

  public get openChildWindows() {
    return this._openChildWindows;
  }

  /** Creates a new element tree to render specified element.
   * @param element Element to render.
   * @param container Container to render to.
   */
  private render(
    element: React.FunctionComponentElement<any>,
    container: Element | DocumentFragment
  ) {
    const childWindowId = UiFramework.childWindows.findId(
      container.ownerDocument.defaultView
    );
    if (!childWindowId) return;

    const root = createRoot(container);
    this._roots.set(childWindowId, root);
    root.render(element);
  }

  /**
   * Returns the OpenChildWindowInfo for the related id.
   * @param childWindowId Id of the window to retrieve.
   * @returns undefined if not found.
   */
  public find(
    childWindowId: string | undefined
  ): OpenChildWindowInfo | undefined {
    if (undefined === childWindowId) return undefined;

    return this.openChildWindows.find(
      (openWindow) => openWindow.childWindowId === childWindowId
    );
  }

  /**
   * Return the childWindowId of the provided window.
   * @param contentWindow Window element to identify
   * @returns undefined if not found
   */
  public findId(contentWindow: Window | undefined | null): string | undefined {
    if (!contentWindow) return undefined;

    const childWindow = this.openChildWindows.find(
      (openWindow) => openWindow.window === contentWindow
    );
    return childWindow?.childWindowId;
  }

  private renderChildWindowContents(
    childWindow: ChildWindow,
    childWindowId: string,
    content: React.ReactNode,
    title: string
  ) {
    childWindow.document.title = title;

    const reactConnectionDiv = childWindow.document.getElementById("root");
    if (reactConnectionDiv && content && React.isValidElement(content)) {
      // set openChildWindows now so components can use it when they mount
      this._openChildWindows.push({
        childWindowId,
        window: childWindow,
        parentWindow: window,
      });
      const widgetDef = content.props.widgetDef as WidgetDef | undefined;
      const tabId = widgetDef?.id;
      const element = (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <Provider store={UiFramework.store}>
          <TabIdContext.Provider value={tabId}>
            <UiStateStorageHandler>
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
            </UiStateStorageHandler>
          </TabIdContext.Provider>
        </Provider>
      );

      setTimeout(async () => {
        await copyStyles(childWindow.document);
        setTimeout(() => {
          this.render(element, reactConnectionDiv);

          if (childWindow.expectedHeight && childWindow.expectedWidth) {
            childWindow.deltaWidth =
              childWindow.expectedWidth - childWindow.innerWidth;
            childWindow.deltaHeight =
              childWindow.expectedHeight - childWindow.innerHeight;
          }

          if (childWindow.expectedLeft && childWindow.expectedTop) {
            childWindow.deltaLeft =
              childWindow.expectedLeft - childWindow.screenLeft;
            childWindow.deltaTop =
              childWindow.expectedTop - childWindow.screenTop;
          }
        });
      });

      childWindow.addEventListener("pagehide", () => {
        const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
        if (!frontStageDef) return;
        frontStageDef.saveChildWindowSizeAndPosition(
          childWindowId,
          childWindow
        );

        // Trigger first so popout can be converted back to main window widget
        this.close(childWindowId, false);

        const root = this._roots.get(childWindowId);
        if (!root) return;
        this._roots.delete(childWindowId);
        root.unmount();
      });
    }
  }

  /** Close all child/pop-out windows. This typically is called when the frontstage is changed. */
  public closeAll() {
    this.openChildWindows.forEach((openChildWindow) =>
      openChildWindow.window.close()
    );
    this._openChildWindows = [];
  }

  /**
   * Close a specific child window.
   * @param childWindowId Id of the window to close.
   * @param processWindowClose should the `close` method be called on the closing window. (defaults to true).
   * @returns false if the window could not be found.
   */
  public close = (childWindowId: string, processWindowClose = true) => {
    const windowIndex = this.openChildWindows.findIndex(
      (openWindow) => openWindow.childWindowId === childWindowId
    );
    if (windowIndex === -1) return false;
    const { onClosePopoutWidget } = usePopoutsStore.getState();
    onClosePopoutWidget.raiseEvent({ windowId: childWindowId });

    const childWindow = this.openChildWindows[windowIndex];
    this.openChildWindows.splice(windowIndex, 1);
    if (processWindowClose) {
      childWindow.window.close();
    } else {
      // call the following to convert popout to docked widget
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      frontStageDef?.dockWidgetContainerByContainerId(childWindowId);
    }
    return true;
  };

  private adjustWindowLocation(location: ChildWindowLocationProps) {
    // If no location is provided, child window will open in the center of the current window.
    if (location.top === 0 && location.left === 0) {
      location.left =
        window.outerWidth / 2 + window.screenX - location.width / 2;
      location.top =
        window.outerHeight / 2 + window.screenY - location.height / 2;
    }
  }

  /**
   * Open a new child window.
   * @param childWindowId Id to assign to the newly created window.
   * @param title Title to display on the window.
   * @param content ReactNode to be rendered in the window.
   * @param location Position and size information
   * @param useDefaultPopoutUrl use "/iTwinPopup.html" as the window Url, "" otherwise.
   * @returns true if the window is opened successfully.
   */
  public open(
    childWindowId: string,
    title: string,
    content: React.ReactNode,
    location: ChildWindowLocationProps,
    useDefaultPopoutUrl?: boolean
  ) {
    if (
      this.openChildWindows.some(
        (openWindow) => openWindow.childWindowId === childWindowId
      )
    ) {
      return false;
    }

    this.adjustWindowLocation(location);
    const url = useDefaultPopoutUrl ? "/iTwinPopup.html" : "";
    const childWindow: ChildWindow | null = window.open(
      url,
      "",
      `width=${location.width},height=${location.height},left=${location.left},top=${location.top},menubar=no,resizable=yes,scrollbars=no,status=no,location=no`
    );
    if (!childWindow) return false;
    childWindow.expectedHeight = location.height;
    childWindow.expectedWidth = location.width;
    childWindow.expectedLeft = location.left;
    childWindow.expectedTop = location.top;

    if (url.length === 0) {
      childWindow.document.write(childHtml);
      this.renderChildWindowContents(
        childWindow,
        childWindowId,
        content,
        title
      );
    } else {
      childWindow.addEventListener(
        "DOMContentLoaded",
        () => {
          this.renderChildWindowContents(
            childWindow,
            childWindowId,
            content,
            title
          );
        },
        false
      );
    }

    window.addEventListener(
      "unload",
      () => {
        const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
        if (frontStageDef) {
          this.close(childWindowId, true);
        }
      },
      false
    );

    return true;
  }
}
