/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

/** @public */
export interface OpenChildWindowInfo {
  childWindowId: string;
  window: Window;
  parentWindow: Window;
}

/** @public */
export interface ChildWindowLocationProps {
  width: number;
  height: number;
  left: number;
  top: number;
}

/**
 * Basic recreation of the `createRoot` function type, intentionally not exported.
 */
type CreateRoot = (container: Element | DocumentFragment) => {
  render(children: React.ReactNode): void;
};

/**
 * [[UiFramework.childWindows]] interface.
 * @public
 */
export interface FrameworkChildWindows {
  /**
   * List of currently open child windows;
   */
  readonly openChildWindows: OpenChildWindowInfo[];

  /**
   * When using React18, the `createRoot` function must be provided in order to render Popout content with React18.
   * Do not call if using React 17 or before.
   *
   * Note: The type of the function is intentionally simplified here.
   *
   * @param createRootFn Function imported from `import { createRoot } from "react-dom/client";`
   * @beta Will be removed once the transition to react 18 is complete.
   */
  useCreateRoot(createRootFn: CreateRoot): void;

  /**
   * Returns the OpenChildWindowInfo for the related id.
   * @param childWindowId Id of the window to retrieve.
   * @returns undefined if not found.
   */
  find(childWindowId: string | undefined): OpenChildWindowInfo | undefined;

  /**
   * Return the childWindowId of the provided window.
   * @param contentWindow Window element to identify
   * @returns undefined if not found
   */
  findId(contentWindow: Window | undefined | null): string | undefined;

  /** Close all child/pop-out windows. This typically is called when the frontstage is changed. */
  closeAll(): void;

  /**
   * Close a specific child window.
   * @param childWindowId Id of the window to close
   * @param processWindowClose should the `close` method be called on the closing window. (defaults to true)
   * @returns false if the window could not be found.
   */
  close(childWindowId: string, processWindowClose?: boolean): boolean;

  /**
   * Open a new child window.
   * @param childWindowId Id to assign to the newly created window.
   * @param title Title to display on the window.
   * @param content ReactNode to be rendered in the window.
   * @param location Position and size information
   * @param useDefaultPopoutUrl use "/iTwinPopup.html" as the window Url, "" otherwise.
   * @returns true if the window is opened successfully.
   */
  open(
    childWindowId: string,
    title: string,
    content: React.ReactNode,
    location: ChildWindowLocationProps,
    tabId: string,
    useDefaultPopoutUrl?: boolean
  ): boolean;
}
