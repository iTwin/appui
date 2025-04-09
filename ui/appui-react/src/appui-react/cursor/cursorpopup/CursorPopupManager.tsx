/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Cursor
 */

import * as React from "react";
import { BeUiEvent, Logger } from "@itwin/core-bentley";
import type { XAndY } from "@itwin/core-geometry";
import { RelativePosition } from "@itwin/appui-abstract";
import { Point } from "@itwin/core-react/internal";
import { UiFramework } from "../../UiFramework.js";
import { CursorPopupShow } from "./CursorPopup.js";
import { CursorPopup } from "./CursorPopup.js";
import type { SizeProps } from "../../utils/SizeProps.js";
import type { RectangleProps } from "../../utils/RectangleProps.js";
import { ChildWindowContext } from "../../childwindow/ChildWindowRenderer.js";

/** Options for the [[CursorPopupManager]] open method
 * @public
 */
export interface CursorPopupOptions {
  /** Title of the popup */
  title?: string;
  /** Called on popup close */
  onClose?: () => void;
  /** Callback to apply changes */
  onApply?: () => void;
  /** Draw shadow */
  shadow?: boolean;
}

/** Information maintained by CursorPopupManager about a CursorPopup.
 * @public
 */
interface CursorPopupInfo {
  id: string;
  content: React.ReactNode;
  relativePosition: RelativePosition;
  offset: Point;
  priority: number;
  options?: CursorPopupOptions;
  targetDocument?: Document;

  renderRelativePosition: RelativePosition;
  popupSize?: SizeProps;

  cancelFadeOut?: () => void;
}

/** CursorPopup component
 * @public
 */
export class CursorPopupManager {
  private static _popups: CursorPopupInfo[] = new Array<CursorPopupInfo>();

  /** @internal */
  public static readonly onCursorPopupUpdatePositionEvent = new BeUiEvent<{
    pt: XAndY;
  }>();
  /** @internal */
  public static readonly onCursorPopupFadeOutEvent = new BeUiEvent<{
    id: string;
    show?: CursorPopupShow;
  }>();
  /** @internal */
  public static readonly onCursorPopupsChangedEvent = new BeUiEvent<object>();
  /** @internal */
  public static clearPopups() {
    this._popups.length = 0;
    CursorPopupManager.onCursorPopupsChangedEvent.emit({});
  }

  public static get popups() {
    return this._popups;
  }

  public static get popupCount() {
    return this._popups.length;
  }

  private static pushPopup(popupInfo: CursorPopupInfo): void {
    CursorPopupManager._popups.push(popupInfo);
    CursorPopupManager.onCursorPopupsChangedEvent.emit({});
  }

  /** Called to open popup with a new set of properties
   */
  public static open(
    id: string,
    content: React.ReactNode,
    pt: XAndY,
    offset: XAndY,
    relativePosition: RelativePosition,
    priority: number = 0,
    options?: CursorPopupOptions,
    targetDocument?: Document
  ) {
    const popupInfo = CursorPopupManager._popups.find((info) => id === info.id);
    if (popupInfo) {
      CursorPopupManager.onCursorPopupFadeOutEvent.emit({
        id,
        show: CursorPopupShow.Open,
      });

      popupInfo.content = content;
      popupInfo.offset = Point.create(offset);
      popupInfo.relativePosition = relativePosition;
      popupInfo.renderRelativePosition = relativePosition;
      popupInfo.priority = priority;
      popupInfo.options = options;
      popupInfo.targetDocument = targetDocument;
      CursorPopupManager.updatePosition(pt);

      if (popupInfo.cancelFadeOut) {
        popupInfo.cancelFadeOut();
        popupInfo.cancelFadeOut = undefined;
      }
      return;
    }

    const newPopupInfo: CursorPopupInfo = {
      id,
      content,
      offset: Point.create(offset),
      relativePosition,
      options,
      renderRelativePosition: relativePosition,
      priority,
      targetDocument,
    };
    CursorPopupManager.pushPopup(newPopupInfo);
    CursorPopupManager.updatePosition(pt);
  }

  /** Called to update popup with a new set of properties
   */
  public static update(
    id: string,
    content: React.ReactNode,
    pt: XAndY,
    offset: XAndY,
    relativePosition: RelativePosition,
    priority: number = 0
  ) {
    const popupInfo = CursorPopupManager._popups.find(
      (info: CursorPopupInfo) => id === info.id
    );
    if (popupInfo) {
      popupInfo.content = content;
      popupInfo.offset = Point.create(offset);
      popupInfo.relativePosition = relativePosition;
      popupInfo.renderRelativePosition = relativePosition;
      popupInfo.priority = priority;
    } else {
      Logger.logError(
        UiFramework.loggerCategory("CursorPopupManager"),
        `update: Could not find popup with id of '${id}'`
      );
    }

    CursorPopupManager.updatePosition(pt);
  }

  /** Called to move the open popup to new location
   */
  public static updatePosition(pt: XAndY, targetDocument?: Document) {
    CursorPopupManager.resetPopupsRenderRelativePosition(
      Point.create(pt),
      targetDocument
    );
    CursorPopupManager.onCursorPopupUpdatePositionEvent.emit({ pt });
  }

  /** Called when tool wants to close the popup
   */
  public static close(id: string, apply: boolean, fadeOut?: boolean) {
    const popupInfo = CursorPopupManager._popups.find(
      (info: CursorPopupInfo) => id === info.id
    );
    if (!popupInfo) {
      Logger.logError(
        UiFramework.loggerCategory("CursorPopupManager"),
        `close: Could not find popup with id of '${id}'`
      );
      return;
    }

    if (apply) popupInfo.options?.onApply?.();
    popupInfo.options?.onClose?.();

    if (fadeOut) {
      // Already closing
      if (popupInfo.cancelFadeOut) return;

      let cancelled = false;
      popupInfo.cancelFadeOut = () => {
        cancelled = true;
      };
      CursorPopupManager.onCursorPopupFadeOutEvent.emit({ id });

      setTimeout(() => {
        if (cancelled) return;
        CursorPopupManager.removePopup(id);
      }, CursorPopup.fadeOutTime);
      return;
    }

    popupInfo.cancelFadeOut?.();
    popupInfo.cancelFadeOut = undefined;
    CursorPopupManager.removePopup(id);
  }

  private static removePopup(id: string): void {
    const index = CursorPopupManager._popups.findIndex(
      (popupInfo: CursorPopupInfo) => id === popupInfo.id
    );
    if (index >= 0) {
      CursorPopupManager._popups.splice(index, 1);
      CursorPopupManager.onCursorPopupsChangedEvent.emit({});
    }
  }

  private static resetPopupsRenderRelativePosition(
    pt: Point,
    targetDocument: Document | undefined
  ) {
    CursorPopupManager.popups.forEach((popupInfo) => {
      if (
        popupInfo.cancelFadeOut &&
        popupInfo.targetDocument !== targetDocument
      ) {
        // Popup if fading out - do not change target document.
        return;
      }

      popupInfo.renderRelativePosition = popupInfo.relativePosition;
      popupInfo.targetDocument = targetDocument;

      const flipped = CursorPopupManager.validateRenderRelativePosition(
        pt,
        popupInfo,
        targetDocument
      );

      // If flipped, call again to validate again.
      if (flipped) {
        CursorPopupManager.validateRenderRelativePosition(
          pt,
          popupInfo,
          targetDocument
        );
      }
    });
  }

  private static validateRenderRelativePosition(
    pt: Point,
    popupInfo: CursorPopupInfo,
    targetDocument: Document | undefined
  ): boolean {
    const popupRect = CursorPopup.getPopupRect(
      pt,
      Point.create(popupInfo.offset),
      popupInfo.popupSize,
      popupInfo.renderRelativePosition
    );
    const targetWindow = targetDocument?.defaultView ?? window;
    const { outPos, flipped } = CursorPopupManager.autoFlip(
      popupInfo.renderRelativePosition,
      popupRect,
      targetWindow.innerWidth,
      targetWindow.innerHeight
    );

    if (flipped) popupInfo.renderRelativePosition = outPos;

    return flipped;
  }

  private static autoFlip(
    inPos: RelativePosition,
    rect: RectangleProps,
    windowWidth: number,
    windowHeight: number
  ): { outPos: RelativePosition; flipped: boolean } {
    let flipped = false;
    let outPos = inPos;

    if (rect.right > windowWidth) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Top:
        case RelativePosition.TopRight:
          outPos = RelativePosition.TopLeft;
          break;
        case RelativePosition.Right:
          outPos = RelativePosition.Left;
          break;
        case RelativePosition.Bottom:
        case RelativePosition.BottomRight:
          outPos = RelativePosition.BottomLeft;
          break;
      }
    }

    if (rect.left < 0) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Top:
        case RelativePosition.TopLeft:
          outPos = RelativePosition.TopRight;
          break;
        case RelativePosition.Left:
          outPos = RelativePosition.Right;
          break;
        case RelativePosition.Bottom:
        case RelativePosition.BottomLeft:
          outPos = RelativePosition.BottomRight;
          break;
      }
    }

    if (rect.bottom > windowHeight) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Left:
        case RelativePosition.BottomLeft:
          outPos = RelativePosition.TopLeft;
          break;
        case RelativePosition.Bottom:
          outPos = RelativePosition.Top;
          break;
        case RelativePosition.Right:
        case RelativePosition.BottomRight:
          outPos = RelativePosition.TopRight;
          break;
      }
    }

    if (rect.top < 0) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Left:
        case RelativePosition.TopLeft:
          outPos = RelativePosition.BottomLeft;
          break;
        case RelativePosition.Top:
          outPos = RelativePosition.Bottom;
          break;
        case RelativePosition.Right:
        case RelativePosition.TopRight:
          outPos = RelativePosition.BottomRight;
          break;
      }
    }

    return { outPos, flipped };
  }
}

const relativePositions = Object.values(RelativePosition).filter(
  (value): value is RelativePosition => typeof value !== "string"
);

/** CursorPopupRenderer React component.
 * @public
 */
export function CursorPopupRenderer() {
  const popupWindow = React.useContext(ChildWindowContext) ?? window;
  const [popups, setPopups] = React.useState(CursorPopupManager.popups);
  const [point, setPoint] = React.useState(new Point());

  React.useEffect(() => {
    return CursorPopupManager.onCursorPopupsChangedEvent.addListener(() => {
      setPopups([...CursorPopupManager.popups]);
    });
  }, []);
  React.useEffect(() => {
    return CursorPopupManager.onCursorPopupUpdatePositionEvent.addListener(
      (args) => {
        setPoint(Point.create(args.pt));
      }
    );
  }, []);

  if (popups.length === 0) return undefined;
  return (
    <>
      {relativePositions.map((position) => {
        const filteredInfo = popups.filter(
          (popupInfo) => popupInfo.renderRelativePosition === position
        );
        if (filteredInfo.length === 0) return undefined;

        let totalDimension = 0;
        const positionPopups = filteredInfo
          .sort((a, b) => {
            const ascending =
              position === RelativePosition.Right ||
              position === RelativePosition.BottomRight ||
              position === RelativePosition.Bottom ||
              position === RelativePosition.BottomLeft;
            return ascending
              ? a.priority - b.priority
              : b.priority - a.priority;
          })
          .map((popupInfo, index) => {
            const targetDocument = popupInfo.targetDocument ?? window.document;
            if (popupWindow.document !== targetDocument) return undefined;

            const title =
              popupInfo.options !== undefined ? popupInfo.options.title : "";
            const shadow =
              popupInfo.options !== undefined
                ? popupInfo.options.shadow
                : false;
            let offset = popupInfo.offset;

            if (index > 0)
              offset = adjustOffset(
                offset,
                popupInfo.renderRelativePosition,
                totalDimension
              );

            if (popupInfo.popupSize)
              totalDimension += getDimension(popupInfo.popupSize, position);

            return (
              <CursorPopup
                key={popupInfo.id}
                id={popupInfo.id}
                content={popupInfo.content}
                pt={point}
                offset={offset}
                relativePosition={popupInfo.renderRelativePosition}
                title={title}
                shadow={shadow}
                onSizeKnown={(size) => {
                  popupInfo.popupSize = size;
                }}
              />
            );
          });

        return <React.Fragment key={position}>{positionPopups}</React.Fragment>;
      })}
    </>
  );
}

function adjustOffset(
  offset: Point,
  relativePosition: RelativePosition,
  dimension: number
) {
  switch (relativePosition) {
    case RelativePosition.Top:
    case RelativePosition.Bottom:
    case RelativePosition.TopLeft:
    case RelativePosition.TopRight:
    case RelativePosition.BottomLeft:
    case RelativePosition.BottomRight:
      return Point.create({ x: offset.x, y: offset.y + dimension });
    case RelativePosition.Left:
    case RelativePosition.Right:
      return Point.create({ x: offset.x + dimension, y: offset.y });
  }

  return Point.create(offset.toProps());
}

function getDimension(
  popupSize: SizeProps,
  relativePosition: RelativePosition
) {
  switch (relativePosition) {
    case RelativePosition.Top:
    case RelativePosition.Bottom:
    case RelativePosition.TopLeft:
    case RelativePosition.TopRight:
    case RelativePosition.BottomLeft:
    case RelativePosition.BottomRight:
      return popupSize.height;
    case RelativePosition.Left:
    case RelativePosition.Right:
      return popupSize.width;
  }

  return 0;
}
