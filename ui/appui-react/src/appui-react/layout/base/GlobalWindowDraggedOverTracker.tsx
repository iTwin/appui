/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

// TODO: Maybe look into alternative methods to handle this. Also needs ability to register new windows.
class GlobalWindowDraggedOverTracker {
  constructor() {
    this.registerListeners();
  }

  private _isDraggedOver = false;

  public get isDraggedOver() {
    return this._isDraggedOver;
  }

  private registerListeners() {
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.markDraggedOver();
    });
    window.addEventListener("dragleave", (e) => {
      e.preventDefault();
      this.clearDraggedOver();
    });
  }

  private markDraggedOver() {
    if (!this._isDraggedOver) this._isDraggedOver = true;
  }

  private clearDraggedOver() {
    if (this._isDraggedOver) this._isDraggedOver = false;
  }
}

const globalWindowDraggedOverTracker = new GlobalWindowDraggedOverTracker();

/** @internal */
export function isWindowDraggedOver() {
  return globalWindowDraggedOverTracker.isDraggedOver;
}
