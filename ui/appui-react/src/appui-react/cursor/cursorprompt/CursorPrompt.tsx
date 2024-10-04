/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./CursorPrompt.scss";
import * as React from "react";
import type { ToolAssistanceInstruction } from "@itwin/core-frontend";
import type { XAndY } from "@itwin/core-geometry";
import { RelativePosition } from "@itwin/appui-abstract";
import type { ListenerType } from "@itwin/core-react/internal";
import { Icon, Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import { Text } from "@itwin/itwinui-react";
import { CursorInformation } from "../CursorInformation.js";
import { CursorPopupManager } from "../cursorpopup/CursorPopupManager.js";

/** @internal */
export class CursorPrompt {
  private _timeOut: number;
  private _fadeOut: boolean;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _timer: Timer;
  private _relativePosition = RelativePosition.BottomRight;
  private _offset: Point = new Point(20, 20);
  private _popupId = "cursor-prompt";

  constructor(timeOut: number, fadeOut: boolean) {
    this._timeOut = timeOut;
    this._fadeOut = fadeOut;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._timer = new Timer(timeOut);
  }

  public display(
    toolIconSpec: string,
    instruction: ToolAssistanceInstruction,
    offset: XAndY = { x: 20, y: 20 },
    relativePosition: RelativePosition = RelativePosition.BottomRight
  ) {
    if (!instruction.text) {
      if (this._timer.isRunning) this.close(false);
      return;
    }

    this._relativePosition = relativePosition;
    this._offset = Point.create(offset);

    const promptElement = (
      <div className="uifw-cursor-prompt">
        {toolIconSpec && (
          <span className="uifw-cursor-prompt-icon">
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={toolIconSpec} />
          </span>
        )}
        <Text variant="body" className="uifw-cursor-prompt-text">
          {instruction.text}
        </Text>
      </div>
    );

    this._startCursorPopup(promptElement);

    this._timer.setOnExecute(() => this._endCursorPopup(this._fadeOut));
    this._timer.delay = this._timeOut;
    this._timer.start();
  }

  /** @internal - unit testing */
  public close(fadeOut: boolean) {
    this._timer.stop();
    this._endCursorPopup(fadeOut);
  }

  private _startCursorPopup = (promptElement: React.ReactElement) => {
    CursorPopupManager.open(
      this._popupId,
      promptElement,
      CursorInformation.cursorPosition,
      this._offset,
      this._relativePosition,
      0,
      { shadow: true }
    );

    if (!CursorInformation.onCursorUpdatedEvent.has(this._handleCursorUpdated))
      CursorInformation.onCursorUpdatedEvent.addListener(
        this._handleCursorUpdated
      );
  };

  private _endCursorPopup = (fadeOut?: boolean) => {
    CursorPopupManager.close(this._popupId, false, fadeOut);
    CursorInformation.onCursorUpdatedEvent.removeListener(
      this._handleCursorUpdated
    );
  };

  private _handleCursorUpdated: ListenerType<
    typeof CursorInformation.onCursorUpdatedEvent
  > = (args) => {
    CursorPopupManager.updatePosition(args.newPt);
  };
}
