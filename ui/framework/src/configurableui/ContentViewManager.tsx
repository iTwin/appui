/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ContentView */

import { UiEvent } from "@bentley/ui-core";
import { FrontstageManager } from "./FrontstageManager";

/** MouseDownChanged Event Args class.
 */
export interface MouseDownChangedEventArgs {
  mouseDown: boolean;
}

/** MouseDownChanged Event class.
 */
export class MouseDownChangedEvent extends UiEvent<MouseDownChangedEventArgs> { }

/** ActiveContentChanged Event Args class.
 */
export interface ActiveContentChangedEventArgs {
  oldContent?: React.ReactNode;
  activeContent?: React.ReactNode;
}

/** ActiveContentChanged Event class.
 */
export class ActiveContentChangedEvent extends UiEvent<ActiveContentChangedEventArgs> { }

/** IModel View Manager class.
 */
export class ContentViewManager {
  private static _mouseDown: boolean = false;
  private static _mouseDownChangedEvent: MouseDownChangedEvent = new MouseDownChangedEvent();
  private static _activeContent?: React.ReactNode;
  private static _activeContentChangedEvent: ActiveContentChangedEvent = new ActiveContentChangedEvent();

  public static get onMouseDownChangedEvent(): MouseDownChangedEvent { return this._mouseDownChangedEvent; }

  public static get isMouseDown(): boolean {
    return this._mouseDown;
  }

  public static setMouseDown(mouseDown: boolean): void {
    this._mouseDown = mouseDown;
    this.onMouseDownChangedEvent.emit({ mouseDown });
  }

  public static get onActiveContentChangedEvent(): ActiveContentChangedEvent { return this._activeContentChangedEvent; }

  public static getActiveContent(): React.ReactNode | undefined {
    return this._activeContent;
  }

  public static setActiveContent(activeContent?: React.ReactNode): void {
    if (this._activeContent !== activeContent) {
      const oldContent = this._activeContent;
      this._activeContent = activeContent;
      this.onActiveContentChangedEvent.emit({ oldContent, activeContent });

      const activeFrontstageDef = FrontstageManager.activeFrontstageDef;
      if (activeFrontstageDef) {
        const activeContentGroup = activeFrontstageDef.contentGroup;
        if (activeContentGroup) {
          const oldContentControl = activeContentGroup.getControlFromElement(oldContent);
          const activeContentControl = activeContentGroup.getControlFromElement(this._activeContent);
          if (activeContentControl)
            activeFrontstageDef.setActiveView(activeContentControl, oldContentControl);
        }
      }
    }
  }

}
