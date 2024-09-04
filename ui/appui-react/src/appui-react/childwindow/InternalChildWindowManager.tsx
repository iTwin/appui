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
import { Provider } from "react-redux";
import { UiFramework } from "../UiFramework";
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager";
import type {
  ChildWindowLocationProps,
  FrameworkChildWindows,
  OpenChildWindowInfo,
} from "../framework/FrameworkChildWindows";
import { TabIdContext } from "../layout/widget/ContentRenderer";
import { PopupRenderer } from "../popup/PopupManager";
import { ThemeManager } from "../theme/ThemeManager";
import { UiStateStorageHandler } from "../uistate/useUiStateStorage";
import type { ChildWindow } from "./ChildWindowConfig";
import { copyStyles } from "./CopyStyles";
import { usePopoutsStore } from "../preview/reparent-popout-widgets/usePopoutsStore";
import type { WidgetDef } from "../widgets/WidgetDef";

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
  private _roots: { [childwindowId: string]: any } = {};

  public get openChildWindows() {
    return this._openChildWindows;
  }

  /**
   * When using React 18, the `createRoot` function must be provided in order to render Popout content with React 18.
   * Do not call if using React 17 or before.
   *
   * Note: The type of the function is intentionally simplified here.
   *
   * @param createRootFn Function imported from `import { createRoot } from "react-dom/client";`
   * @beta Will be removed once the transition to React 18 is complete.
   */
  public useCreateRoot(createRootFn: CreateRoot): void {
    this._createRoot = createRootFn;
  }

  /**
   * Abstracts ReactDOM.render to use either the _createRoot method or the default ReactDOM.render.
   * @param element Element to render.
   * @param container Container to render to.
   */
  private render(
    element: React.FunctionComponentElement<any>,
    container: Element | DocumentFragment
  ) {
    // If createRoot is passed in for React 18 we have to render differently
    // than without it. React 17 vs React 18. We need to save the root to
    // unmount it.
    if (this._createRoot) {
      const childWindowId = UiFramework.childWindows.findId(
        container.ownerDocument.defaultView
      );
      if (childWindowId) {
        this._roots[childWindowId] = this._createRoot(container);
        this._roots[childWindowId].render(element);
      }
    } else {
      // eslint-disable-next-line react/no-deprecated, deprecation/deprecation
      ReactDOM.render(element, container);
    }
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
        // eslint-disable-next-line deprecation/deprecation
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

        // UnmountComponentAtNode is deprecated in React 18, so if they are
        // using React 18 and passing in a createRoot function, unmount()
        // will be used
        if (this._roots[childWindowId]) {
          this._roots[childWindowId].unmount();
          // eslint-disable-next-line react/no-deprecated, deprecation/deprecation
        } else ReactDOM.unmountComponentAtNode(reactConnectionDiv);
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
