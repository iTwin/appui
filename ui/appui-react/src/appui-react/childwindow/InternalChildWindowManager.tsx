/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./InternalChildWindowManager.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { copyStyles } from "./CopyStyles";
import { Provider } from "react-redux";
import { StateManager } from "../redux/StateManager";
import { UiStateStorageHandler } from "../uistate/useUiStateStorage";
import { PopupRenderer } from "../popup/PopupManager";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager";
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu";
import { ThemeManager } from "../theme/ThemeManager";
import { UiFramework } from "../UiFramework";
import { ChildWindowLocationProps, FrameworkChildWindows, OpenChildWindowInfo } from "../framework/FrameworkChildWindows";

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
<body class="iui-root">
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>`;

/**
 * Simplification of non exported CreateRoot parameter, only to be used
 * in InternalChildWindowManager and ChildWindowManager
 * @internal
 */
export type CreateRoot = Parameters<FrameworkChildWindows["useCreateRoot"]>[0];

/** Supports opening a child browser window from the main application window. The child window is managed by the main application
 * and is running in the same security context. The application must deliver the html file iTwinPopup.html along side its index.html.
 * See also: [Child Window Manager]($docs/learning/ui/appui-react/ChildWindows.md)
 * @internal
 * */
export class InternalChildWindowManager implements FrameworkChildWindows {
  private _openChildWindows: OpenChildWindowInfo[] = [];
  private _createRoot?: CreateRoot;

  public get openChildWindows() {
    return this._openChildWindows;
  }

  /**
   * When using React18, the `createRoot` function must be provided in order to render Popout content with React18.
   * Do not call if using React 17 or before.
   *
   * Note: The type of the function is intentionally simplified here.
   *
   * @param createRootFn Function imported from `import { createRoot } from "react-dom/client";`
   * @beta Will be removed once the transition to react 18 is complete.
   */
  // istanbul ignore next: Result of this assignment is only visible in `open`, which is not tested.
  public useCreateRoot(createRootFn: CreateRoot): void {
    this._createRoot = createRootFn;
  }

  /**
   * Abstracts ReactDOM.render to use either the _createRoot method or the default ReactDOM.render.
   * @param element Element to render.
   * @param container Container to render to.
   */
  // istanbul ignore next: Used in `open` which is not tested.
  private render(element: React.FunctionComponentElement<any>, container: Element | DocumentFragment) {
    if(this._createRoot) {
      this._createRoot(container).render(element);
    } else {
      ReactDOM.render(element, container);
    }
  }

  /**
   * Returns the OpenChildWindowInfo for the related id.
   * @param childWindowId Id of the window to retrieve.
   * @returns undefined if not found.
   */
  public find(childWindowId: string | undefined): OpenChildWindowInfo | undefined {
    if (undefined === childWindowId)
      return undefined;

    return this.openChildWindows.find((openWindow) => openWindow.childWindowId === childWindowId);
  }

  /**
   * Return the childWindowId of the provided window.
   * @param contentWindow Window element to identify
   * @returns undefined if not found
   */
  public findId(contentWindow: Window | undefined | null): string | undefined {
    if (!contentWindow)
      return undefined;

    const childWindow = this.openChildWindows.find((openWindow) => openWindow.window === contentWindow);
    return childWindow?.childWindowId;
  }

  // istanbul ignore next: Used in `open` which is not tested.
  private renderChildWindowContents(childWindow: Window, childWindowId: string, content: React.ReactNode) {
    const reactConnectionDiv = childWindow.document.getElementById("root");
    if (reactConnectionDiv) {
      // set openChildWindows now so components can use it when they mount
      this._openChildWindows.push({
        childWindowId,
        window: childWindow,
        parentWindow: window,
      });

      setTimeout(() => {
        copyStyles(childWindow.document);
        setTimeout(() => {
          this.render(
            <Provider store={StateManager.store} >
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
                </ThemeManager>
              </UiStateStorageHandler>
            </Provider>,
            reactConnectionDiv
          );
        });
      });

      childWindow.onbeforeunload = () => {
        const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
        if (!frontStageDef)
          return;
        frontStageDef.saveChildWindowSizeAndPosition(childWindowId, childWindow);
        this.close(childWindowId, false);
      };
    }
  }

  /** Close all child/pop-out windows. This typically is called when the frontstage is changed. */
  public closeAll() {
    // istanbul ignore next
    this.openChildWindows.forEach((openChildWindow) => openChildWindow.window.close());
    this._openChildWindows = [];
  }

  /**
   * Close a specific child window.
   * @param childWindowId Id of the window to close
   * @param processWindowClose should the `close` method be called on the closing window. (defaults to true)
   * @returns false if the window could not be found.
   */
  public close = (childWindowId: string, processWindowClose = true) => {
    const windowIndex = this.openChildWindows.findIndex((openWindow) => openWindow.childWindowId === childWindowId);
    if (-1 === windowIndex)
      return false;
    const childWindow = this.openChildWindows[windowIndex];
    this.openChildWindows.splice(windowIndex, 1);
    if (processWindowClose) {
      childWindow.window.close();
    } else {
      // call the following to convert popout to docked widget
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      frontStageDef && frontStageDef.dockPopoutWidgetContainer(childWindowId);
    }
    return true;
  };

  // istanbul ignore next: Used in `open` which is not tested.
  private adjustWidowLocation(location: ChildWindowLocationProps, center?: boolean): ChildWindowLocationProps {
    const outLocation = { ...location };
    if (0 === location.top && 0 === location.left) {
      center = center ?? true;
      const windowTop = window.top ?? window;

      // Prepare position of the new window to be centered against the 'parent' window.
      if (center) {
        outLocation.left =
          windowTop.outerWidth / 2 + windowTop.screenX - location.width / 2;
        outLocation.top =
          windowTop.outerHeight / 2 + windowTop.screenY - location.height / 2;
      } else {
        if (undefined !== window.screenLeft && undefined !== window.screenTop) {
          outLocation.top = window.screenTop + location.top;
          outLocation.left = window.screenLeft + location.left;
        }
      }
    }
    return outLocation;
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
  // istanbul ignore next: Would require mocking window.open to return a window object.
  public open(childWindowId: string, title: string, content: React.ReactNode, location: ChildWindowLocationProps, useDefaultPopoutUrl?: boolean) {
    // first check to see if content is already open in child window
    if (this.openChildWindows.findIndex((openWindow) => openWindow.childWindowId === childWindowId) >= 0) {
      return false;
    }

    location = this.adjustWidowLocation(location);
    const url = useDefaultPopoutUrl ? "/iTwinPopup.html" : "";
    const childWindow = window.open(url, "", `width=${location.width},height=${location.height},left=${location.left},top=${location.top},menubar=no,resizable=yes,scrollbars=no,status=no,location=no`);
    if (!childWindow)
      return false;
    if (0 === url.length) {
      childWindow.document.write(childHtml);
      this.renderChildWindowContents(childWindow, childWindowId, content);
    } else {
      childWindow.addEventListener("load", () => {
        childWindow.document.title = title;
        this.renderChildWindowContents(childWindow, childWindowId, content);
      }, false);
    }

    window.addEventListener("unload", () => {
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontStageDef) {
        this.close(childWindowId, true);
      }
    }, false);

    return true;
  }
}
