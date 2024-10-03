/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./InternalChildWindowManager.scss";
import type * as React from "react";
import { BeEvent } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework.js";
import type {
  ChildWindowLocationProps,
  FrameworkChildWindows,
  OpenChildWindowInfo,
} from "../framework/FrameworkChildWindows.js";
import { usePopoutsStore } from "../preview/reparent-popout-widgets/usePopoutsStore.js";
import type { TabState } from "../layout/state/TabState.js";

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

/** @internal */
export interface InternalOpenChildWindowInfo extends OpenChildWindowInfo {
  content?: React.ReactNode;
  tabId?: TabState["id"];
}

/** Supports opening a child browser window from the main application window. The child window is managed by the main application
 * and is running in the same security context. The application must deliver the html file iTwinPopup.html along side its index.html.
 * See also: [Child Window Manager]($docs/learning/ui/appui-react/ChildWindows.md)
 * @internal
 */
export class InternalChildWindowManager implements FrameworkChildWindows {
  private _openChildWindows: InternalOpenChildWindowInfo[] = [];

  public readonly onChildWindowsChanged = new BeEvent<() => void>();

  public get openChildWindows() {
    return this._openChildWindows;
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
    childWindow: Window,
    childWindowId: string,
    content: React.ReactNode,
    title: string,
    tabId?: TabState["id"]
  ) {
    childWindow.document.title = title;

    this._openChildWindows.push({
      childWindowId,
      window: childWindow,
      parentWindow: window,
      content,
      tabId,
    });
    this.onChildWindowsChanged.raiseEvent();
  }

  /** Close all child/pop-out windows. This typically is called when the frontstage is changed. */
  public closeAll() {
    this.openChildWindows.forEach((openChildWindow) =>
      openChildWindow.window.close()
    );
    this._openChildWindows = [];
    this.onChildWindowsChanged.raiseEvent();
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
    this._openChildWindows.splice(windowIndex, 1);
    this.onChildWindowsChanged.raiseEvent();
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
    useDefaultPopoutUrl?: boolean,
    tabId?: TabState["id"]
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
    const childWindow = window.open(
      url,
      "",
      `width=${location.width},height=${location.height},left=${location.left},top=${location.top},menubar=no,resizable=yes,scrollbars=no,status=no,location=no`
    );
    if (!childWindow) return false;

    childWindow.addEventListener("pagehide", () => {
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontStageDef) return;
      frontStageDef.saveChildWindowSizeAndPosition(childWindowId, childWindow);

      // Trigger first so popout can be converted back to main window widget
      this.close(childWindowId, false);
    });

    if (url.length === 0) {
      childWindow.document.write(childHtml);
      this.renderChildWindowContents(
        childWindow,
        childWindowId,
        content,
        title,
        tabId
      );
    } else {
      childWindow.addEventListener(
        "DOMContentLoaded",
        () => {
          this.renderChildWindowContents(
            childWindow,
            childWindowId,
            content,
            title,
            tabId
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
