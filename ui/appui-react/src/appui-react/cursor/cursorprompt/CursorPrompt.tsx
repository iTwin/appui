/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./CursorPrompt.scss";
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import { Icon, Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import { Text } from "@itwin/itwinui-react";
import { CursorInformation } from "../CursorInformation.js";
import { CursorPopupManager } from "../cursorpopup/CursorPopupManager.js";

/** @internal */
export class CursorPrompt {
  private _popupId = "cursor-prompt";
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _timer: Timer | undefined;
  private _removeListeners: (() => void) | undefined;

  public open({
    timeout,
    fadeout,
    iconSpec,
    instruction,
  }: {
    timeout: number;
    fadeout: boolean;
    iconSpec: string;
    instruction: string;
  }) {
    if (!this._removeListeners) {
      this._removeListeners =
        CursorInformation.onCursorUpdatedEvent.addListener((args) => {
          CursorPopupManager.updatePosition(args.newPt);
        });
    }

    const promptElement = (
      <div className="uifw-cursor-prompt">
        {iconSpec && (
          <span className="uifw-cursor-prompt-icon">
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={iconSpec} />
          </span>
        )}
        <Text variant="body" className="uifw-cursor-prompt-text">
          {instruction}
        </Text>
      </div>
    );

    CursorPopupManager.open(
      this._popupId,
      promptElement,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      RelativePosition.BottomRight,
      0,
      { shadow: true }
    );

    if (timeout === Number.POSITIVE_INFINITY) return;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const timer = new Timer(timeout);
    timer.setOnExecute(() => this.close(fadeout));
    timer.start();
    this._timer = timer;
  }

  public close(fadeout: boolean) {
    this._timer?.stop();
    this._timer = undefined;
    this._removeListeners?.();
    this._removeListeners = undefined;

    CursorPopupManager.close(this._popupId, false, fadeout);
  }
}
