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
import type { ListenerType } from "@itwin/core-react/internal";
import { Point } from "@itwin/core-react/internal";
import { UiFramework } from "../../UiFramework.js";
import { CursorPopupShow } from "./CursorPopup.js";
import { CursorPopup } from "./CursorPopup.js";
import type { SizeProps } from "../../utils/SizeProps.js";
import type { RectangleProps } from "../../utils/RectangleProps.js";

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

/** Information maintained by CursorPopupManager about a CursorPopup. */
interface CursorPopupInfo {
  id: string;
  content: React.ReactNode;
  relativePosition: RelativePosition;
  offset: Point;
  priority: number;
  options?: CursorPopupOptions;

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
    CursorPopupManager._emitPopupsChangedEvent();
  }

  public static get popups() {
    return this._popups;
  }

  public static get popupCount() {
    return this._popups.length;
  }

  private static _emitPopupsChangedEvent(): void {
    CursorPopupManager.onCursorPopupsChangedEvent.emit({});
  }

  private static pushPopup(popupInfo: CursorPopupInfo): void {
    CursorPopupManager._popups.push(popupInfo);
    CursorPopupManager._emitPopupsChangedEvent();
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
    options?: CursorPopupOptions
  ) {
    const popupInfo = CursorPopupManager._popups.find(
      (info: CursorPopupInfo) => id === info.id
    );
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
  public static updatePosition(pt: XAndY) {
    CursorPopupManager.resetPopupsRenderRelativePosition(Point.create(pt));
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
      CursorPopupManager._emitPopupsChangedEvent();
    }
  }

  private static resetPopupsRenderRelativePosition(pt: Point) {
    CursorPopupManager.popups.forEach((popupInfo: CursorPopupInfo) => {
      popupInfo.renderRelativePosition = popupInfo.relativePosition;

      const flipped = CursorPopupManager.validateRenderRelativePosition(
        pt,
        popupInfo
      );

      // If flipped, call again to validate again.
      if (flipped) {
        CursorPopupManager.validateRenderRelativePosition(pt, popupInfo);
      }
    });
  }

  private static validateRenderRelativePosition(
    pt: Point,
    popupInfo: CursorPopupInfo
  ): boolean {
    const popupRect = CursorPopup.getPopupRect(
      pt,
      Point.create(popupInfo.offset),
      popupInfo.popupSize,
      popupInfo.renderRelativePosition
    );
    const { outPos, flipped } = CursorPopupManager.autoFlip(
      popupInfo.renderRelativePosition,
      popupRect,
      window.innerWidth,
      window.innerHeight
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

/** State for the [[CursorPopupRenderer]] React component */
interface CursorPopupRendererState {
  pt: Point;
}

/** CursorPopupRenderer React component.
 * @public
 */
export class CursorPopupRenderer extends React.Component<
  any,
  CursorPopupRendererState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      pt: new Point(),
    };
  }

  public override render(): React.ReactNode {
    if (CursorPopupManager.popupCount <= 0) return null;

    return <>{this.renderPositions()}</>;
  }

  private _handleSizeKnown(popupInfo: CursorPopupInfo, size: SizeProps) {
    popupInfo.popupSize = size;
  }

  private renderPositions(): React.ReactNode[] {
    const positions = new Array<React.ReactNode>();
    let renderedPosition: React.ReactNode;
    const begin = RelativePosition.Left;
    const end = RelativePosition.BottomRight;

    for (let position = begin; position <= end; position++) {
      renderedPosition = this.renderRelativePosition(position);
      if (renderedPosition) positions.push(renderedPosition);
    }

    return positions;
  }

  private renderRelativePosition(
    relativePosition: RelativePosition
  ): React.ReactNode {
    const filteredInfo = CursorPopupManager.popups.filter(
      (popupInfo: CursorPopupInfo) =>
        popupInfo.renderRelativePosition === relativePosition
    );

    if (filteredInfo.length > 0) {
      let totalDimension = 0;
      const ascending =
        relativePosition === RelativePosition.Right ||
        relativePosition === RelativePosition.BottomRight ||
        relativePosition === RelativePosition.Bottom ||
        relativePosition === RelativePosition.BottomLeft;

      const positionPopups = filteredInfo
        .sort((a: CursorPopupInfo, b: CursorPopupInfo): number =>
          ascending ? a.priority - b.priority : b.priority - a.priority
        )
        .map((popupInfo: CursorPopupInfo, index: number) => {
          const title =
            popupInfo.options !== undefined ? popupInfo.options.title : "";
          const shadow =
            popupInfo.options !== undefined ? popupInfo.options.shadow : false;
          let offset = popupInfo.offset;

          if (index > 0)
            offset = this.adjustOffset(
              offset,
              popupInfo.renderRelativePosition,
              totalDimension
            );

          if (popupInfo.popupSize)
            totalDimension += this.getDimension(
              popupInfo.popupSize,
              relativePosition
            );

          return (
            <CursorPopup
              key={popupInfo.id}
              id={popupInfo.id}
              content={popupInfo.content}
              pt={this.state.pt}
              offset={offset}
              relativePosition={popupInfo.renderRelativePosition}
              title={title}
              shadow={shadow}
              onSizeKnown={(size: SizeProps) =>
                this._handleSizeKnown(popupInfo, size)
              }
            />
          );
        });

      return (
        <React.Fragment key={relativePosition.toString()}>
          {positionPopups}
        </React.Fragment>
      );
    }

    return null;
  }

  private getDimension(
    popupSize: SizeProps,
    relativePosition: RelativePosition
  ): number {
    let dimension = 0;

    switch (relativePosition) {
      case RelativePosition.Top:
      case RelativePosition.Bottom:
      case RelativePosition.TopLeft:
      case RelativePosition.TopRight:
      case RelativePosition.BottomLeft:
      case RelativePosition.BottomRight:
        dimension = popupSize.height;
        break;
      case RelativePosition.Left:
      case RelativePosition.Right:
        dimension = popupSize.width;
        break;
    }

    return dimension;
  }

  private adjustOffset(
    offset: Point,
    relativePosition: RelativePosition,
    dimension: number
  ): Point {
    let outOffset = Point.create(offset.toProps());

    switch (relativePosition) {
      case RelativePosition.Top:
      case RelativePosition.Bottom:
      case RelativePosition.TopLeft:
      case RelativePosition.TopRight:
      case RelativePosition.BottomLeft:
      case RelativePosition.BottomRight:
        outOffset = Point.create({ x: offset.x, y: offset.y + dimension });
        break;
      case RelativePosition.Left:
      case RelativePosition.Right:
        outOffset = Point.create({ x: offset.x + dimension, y: offset.y });
        break;
    }

    return outOffset;
  }

  public override componentDidMount(): void {
    CursorPopupManager.onCursorPopupsChangedEvent.addListener(
      this._handlePopupChangedEvent
    );
    CursorPopupManager.onCursorPopupUpdatePositionEvent.addListener(
      this._handleCursorPopupUpdatePositionEvent
    );
  }

  public override componentWillUnmount(): void {
    CursorPopupManager.onCursorPopupsChangedEvent.removeListener(
      this._handlePopupChangedEvent
    );
    CursorPopupManager.onCursorPopupUpdatePositionEvent.removeListener(
      this._handleCursorPopupUpdatePositionEvent
    );
  }

  private _handlePopupChangedEvent: ListenerType<
    typeof CursorPopupManager.onCursorPopupsChangedEvent
  > = () => {
    this.forceUpdate();
  };

  private _handleCursorPopupUpdatePositionEvent: ListenerType<
    typeof CursorPopupManager.onCursorPopupUpdatePositionEvent
  > = (args) => {
    this.setState({ pt: Point.create(args.pt) });
  };
}
