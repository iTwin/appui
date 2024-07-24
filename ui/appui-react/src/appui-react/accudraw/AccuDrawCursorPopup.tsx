/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { AccuDrawFieldContainer } from "./AccuDrawFieldContainer";
import { CursorInformation } from "../cursor/CursorInformation";
import { CursorPopupManager } from "../cursor/cursorpopup/CursorPopupManager";
import { RelativePosition } from "@itwin/appui-abstract";
import { CurrentState, IModelApp } from "@itwin/core-frontend";

/**
 * Accudraw input fields that follows the cursor.
 * @beta
 * @example
 *  // Show the accudraw popup at cursor.
 *  AccuDrawCursorPopup.activate();
 *  // Dont forget to call deactivate to hide the cursor popup when you're done with the popup.
 *  AccuDrawCursorPopup.deactivate();
 */
export class AccuDrawCursorPopup {
  private static popupId = "accudrawCursorPopup";

  /**
   * Show the accudraw cursor popup.
   */
  public static activate() {
    if(IModelApp.accuDraw.currentState === CurrentState.NotEnabled || CursorPopupManager.popups.some(popup => popup.id === this.popupId)){
      // Dont show the popup when Accudraw is not enabled or if the popup is already displayed.
      return;
    }

    CursorPopupManager.open(
      this.popupId,
      <AccuDrawFieldContainer orientation={Orientation.Vertical}/>,
      CursorInformation.cursorPosition,
      {x: 20, y: 50},
      RelativePosition.BottomRight
    );
    document.addEventListener("mousemove", this.updatePosition);
  }

  /**
   * Hides the accudraw cursor popup.
   */
  public static deactivate() {
    if(!CursorPopupManager.popups.some(popup => popup.id === this.popupId)){
      // Not activated.
      return;
    }

    CursorPopupManager.close(this.popupId, false);
    document.removeEventListener("mousemove", this.updatePosition);
  }

  /**
   * Updates the position of the cursor popup, called on mouse movements.
   */
  private static updatePosition(e: MouseEvent) {
    CursorPopupManager.updatePosition({x: e.clientX, y: e.clientY});
  }
}
