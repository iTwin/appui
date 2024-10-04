/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import type * as React from "react";
import { ViewUtilities } from "../utils/ViewUtilities.js";
import type { ContentControl } from "./ContentControl.js";
import { InternalContentLayoutManager } from "./InternalContentLayoutManager.js";
import { IModelApp } from "@itwin/core-frontend";
import type { ContentGroup } from "./ContentGroup.js";
import { BeUiEvent, Logger } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework.js";
import type {
  ActiveContentChangedEventArgs,
  MouseDownChangedEventArgs,
} from "../framework/FrameworkContent.js";
import { InternalContentDialogManager } from "../dialog/InternalContentDialogManager.js";

/** Content View Manager class.
 * @internal
 */
export class InternalContentViewManager {
  private static _mouseDown: boolean = false;
  private static _activeContent?: React.ReactNode;

  /** Gets the [[MouseDownChangedEvent]] */
  public static readonly onMouseDownChangedEvent =
    new BeUiEvent<MouseDownChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Determines if the mouse is down in a content view */
  public static get isMouseDown(): boolean {
    return this._mouseDown;
  }

  /** Sets the mouse down status for a content view */
  public static setMouseDown(mouseDown: boolean): void {
    this._mouseDown = mouseDown;
    this.onMouseDownChangedEvent.emit({ mouseDown });
  }

  /** Gets the [[ActiveContentChangedEvent]] */
  public static readonly onActiveContentChangedEvent =
    new BeUiEvent<ActiveContentChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Fires when floating contents are added or removed */

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static readonly onAvailableContentChangedEvent = new BeUiEvent<{
    contentId: string;
  }>();

  /** Gets the active content as a React.ReactNode. */
  public static getActive(): React.ReactNode | undefined {
    return this._activeContent;
  }

  private static getControlFromElement(
    content: React.ReactNode,
    activeContentGroup: ContentGroup | undefined,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    floatingControls: ContentControl[] | undefined,
    logIfNotFound = false
  ) {
    if (floatingControls?.length) {
      // if we find a React node that matches exactly, return its containing control
      let control = floatingControls.find(
        (contentControl) => contentControl.reactNode === content
      );
      if (control) return control;

      // if we don't find a React node that matches exactly, rely on the id specified by the creator
      let controlId: string;
      if (content && (content as React.ReactElement<any>).key) {
        const key = (content as React.ReactElement<any>).key as string;
        // key has format `${contentProps.id}::${this.groupId}` which is stored as unique id
        controlId = key.split("::", 1)[0];
      }
      floatingControls.forEach((contentControl) => {
        const node = contentControl.reactNode;
        const key = (node as React.ReactElement<any>)?.key as string;
        const nodeId = key && key.split("::", 1)[0];
        if (nodeId === controlId) control = contentControl;
      });
      if (control) return control;
    }

    // if it's not a floating control, look through the content area views
    if (activeContentGroup) {
      const activeContentControl =
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        activeContentGroup.getControlFromElement(content);
      if (activeContentControl) return activeContentControl;
    }

    if (logIfNotFound)
      Logger.logError(
        UiFramework.loggerCategory("InternalContentViewManager"),
        `getControlFromElement: no control found for element`
      );

    return undefined;
  }

  /** Return the active ContentControl. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static getActiveContentControl(): ContentControl | undefined {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let activeContentControl: ContentControl | undefined;
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;

    if (this._activeContent && activeFrontstageDef) {
      const activeContentGroup = activeFrontstageDef.contentGroup;
      activeContentControl = this.getControlFromElement(
        this._activeContent,
        activeContentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        activeFrontstageDef.floatingContentControls
      );
    }

    return activeContentControl;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static addFloatingContentControl(contentControl?: ContentControl) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef && contentControl) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      activeFrontstageDef.addFloatingContentControl(contentControl);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static dropFloatingContentControl(contentControl?: ContentControl) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef && contentControl)
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      activeFrontstageDef.dropFloatingContentControl(contentControl);
  }

  /** Sets the active [[ContentControl]]. */
  public static setActive(
    activeContent?: React.ReactNode,
    forceEventProcessing = false
  ): void {
    if (this._activeContent !== activeContent || forceEventProcessing) {
      const oldContent = this._activeContent;
      this._activeContent = activeContent;

      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) return;

      const contentGroup = frontstageDef.contentGroup;
      if (contentGroup) {
        const reactContent = contentGroup.contentPropsList.find(
          (contentProps) => contentProps.content === activeContent
        );
        if (reactContent) {
          this.onActiveContentChangedEvent.emit({
            id: reactContent.id,
            activeContent: reactContent.content,
          });
          return;
        }
      }

      const oldContentControl = this.getControlFromElement(
        oldContent,
        contentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frontstageDef.floatingContentControls
      );
      const activeContentControl = this.getControlFromElement(
        activeContent,
        contentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frontstageDef.floatingContentControls,
        true
      );

      // Only call setActiveView if going to or coming from a non-viewport ContentControl
      if (!activeContentControl) {
        this.onActiveContentChangedEvent.emit({
          activeContent,
          oldContent,
          id: undefined,
        });
        return;
      }
      const doSetActiveView =
        forceEventProcessing ||
        !activeContentControl.viewport ||
        (oldContentControl && !oldContentControl.viewport);

      if (doSetActiveView) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frontstageDef.setActiveView(activeContentControl, oldContentControl);
        this.onActiveContentChangedEvent.emit({
          id: activeContentControl.controlId,
          activeContent,
          oldContent,
        });
      } else {
        if (
          activeContentControl.viewport &&
          activeContentControl.viewport !== IModelApp.viewManager.selectedView
        ) {
          void IModelApp.viewManager.setSelectedView(
            activeContentControl.viewport
          );
        }
      }
    }
  }

  public static setActiveId(contentId?: string) {
    if (!contentId) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.setActive(contentId);
      return;
    }

    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const contentGroup = frontstageDef.contentGroup;
    if (!contentGroup) return;

    const contentIndex = contentGroup.contentPropsList.findIndex(
      (content) => content.id === contentId
    );
    if (contentIndex < 0) return;

    const contentProps = contentGroup.contentPropsList[contentIndex];
    if (contentProps.content) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.setActive(contentProps.content);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const control = contentGroup.getContentControl(contentProps, contentIndex);
    if (!control) return;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.setActive(control.reactNode);
  }

  public static getActiveId() {
    const activeContentControl = this.getActiveContentControl();
    if (activeContentControl) {
      return activeContentControl.controlId;
    }

    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const contentGroup = frontstageDef?.contentGroup;
    const activeContent = contentGroup?.contentPropsList.find(
      (contentProps) => {
        return contentProps.content === this.getActive();
      }
    );
    return activeContent?.id;
  }

  /** Refreshes the active [[ContentControl]]. */
  public static refreshActive(activeContent: React.ReactNode) {
    this.layouts.refreshActive();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.setActive(activeContent, true);
  }

  /**
   * Determines if content displays a Sheet view.
   * @param content ContentControl to check
   */
  public static isContentSheetView(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    content: ContentControl | undefined
  ): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isSheetView(content.viewport);
  }

  /**
   * Determines if content displays a Drawing view.
   * @param content ContentControl to check
   */
  public static isContentDrawingView(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    content: ContentControl | undefined
  ): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isDrawingView(content.viewport);
  }

  /**
   * Determines if content displays a Spatial view.
   * @param content ContentControl to check
   */
  public static isContentSpatialView(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    content: ContentControl | undefined
  ): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isSpatialView(content.viewport);
  }

  /**
   * Determines if content displays a Orthographic view.
   * @param content ContentControl to check
   */
  public static isContentOrthographicView(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    content: ContentControl | undefined
  ): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isOrthographicView(content.viewport);
  }

  /**
   * Determines if content displays a 3d view.
   * @param content ContentControl to check
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static isContent3dView(content: ContentControl | undefined): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.is3dView(content.viewport);
  }

  /**
   * Determines if viewport supports use of a camera.
   * @param content ContentControl to check
   */
  public static contentSupportsCamera(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    content: ContentControl | undefined
  ): boolean {
    if (!content || !content.viewport) return false;
    return ViewUtilities.viewSupportsCamera(content.viewport);
  }

  /** Manage content layouts. */
  public static get layouts() {
    return InternalContentLayoutManager;
  }

  /** Manage dialogs displaying managed content. */
  public static get dialogs() {
    return InternalContentDialogManager;
  }
}
