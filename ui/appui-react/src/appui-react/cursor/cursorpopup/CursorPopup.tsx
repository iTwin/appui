/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Cursor
 */

import { RelativePosition } from "@itwin/appui-abstract";
import type { XAndY } from "@itwin/core-geometry";
import type { CommonDivProps, CommonProps } from "@itwin/core-react";
import type { ListenerType } from "@itwin/core-react/internal";
import { Div } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { StatusBarDialog } from "../../statusbar/dialog/Dialog.js";
import "./CursorPopup.scss";
import { CursorPopupManager } from "./CursorPopupManager.js";
import { type Placement } from "../../utils/Placement.js";
import type { RequireAtLeastOne } from "@itwin/core-bentley";
import type { SizeProps } from "../../utils/SizeProps.js";
import type { RectangleProps } from "../../utils/RectangleProps.js";

/** Properties for the [[CursorPopup]] React component
 * @public
 */
export type CursorPopupProps = {
  id: string;
  content: React.ReactNode;
  pt: XAndY;
  offset: XAndY;
  title?: string;
  shadow?: boolean;
  /** Function called when size is known. */
  onSizeKnown?: (size: SizeProps) => void;
} & CommonProps & // eslint-disable-line deprecation/deprecation
  RequireAtLeastOne<{
    /** @deprecated in 4.16.0. Use `placement` property instead. */
    relativePosition: RelativePosition;
    placement: Placement;
  }>;

/** Enum for showing CursorPopup
 * @internal - unit testing
 */
export enum CursorPopupShow {
  Open,
  FadeOut,
}

/** State for the [[CursorPopup]] React component
 * @internal
 */
interface CursorPopupState {
  showPopup: CursorPopupShow;
  size: SizeProps;
}

/** CursorPopup React component
 * @public
 */
export class CursorPopup extends React.Component<
  CursorPopupProps,
  CursorPopupState
> {
  private _isMounted: boolean = false;

  /** @internal */
  public static fadeOutTime = 500;

  constructor(props: CursorPopupProps) {
    super(props);

    this.state = {
      showPopup: CursorPopupShow.Open,
      size: { width: -1, height: -1 },
    };
  }

  public override componentDidMount() {
    this._isMounted = true;
    CursorPopupManager.onCursorPopupFadeOutEvent.addListener(
      this._handleCursorPopupFadeOutEvent
    );
  }

  public override componentWillUnmount() {
    this._isMounted = false;
    CursorPopupManager.onCursorPopupFadeOutEvent.removeListener(
      this._handleCursorPopupFadeOutEvent
    );
  }

  private _handleCursorPopupFadeOutEvent: ListenerType<
    typeof CursorPopupManager.onCursorPopupFadeOutEvent
  > = (args) => {
    if (this.props.id === args.id) {
      if (this._isMounted)
        this.setState({ showPopup: CursorPopupShow.FadeOut });
    }
  };

  /** @internal */
  public static getPopupRect(
    pt: XAndY,
    offset: XAndY,
    popupSize: SizeProps | undefined,
    relativePosition: RelativePosition | Placement
  ): RectangleProps {
    const popupRect = { top: 0, left: 0, right: 0, bottom: 0 };
    if (popupSize === undefined) return popupRect;

    if (typeof relativePosition === "string") {
      const placement = relativePosition.split("-");
      const [mainPlacement, subPlacement] = placement;

      switch (mainPlacement) {
        case "top":
          popupRect.left = pt.x - popupSize.width / 2 - offset.x;
          popupRect.top = pt.y - offset.y + popupSize.height;
          break;
        case "left":
          popupRect.left = pt.x - popupSize.width - offset.x;
          popupRect.top = pt.y + popupSize.height / 2 - offset.y;
          break;
        case "right":
          popupRect.left = pt.x + offset.x;
          popupRect.top = pt.y + popupSize.height / 2 - offset.y;
          break;
        case "bottom":
          popupRect.left = pt.x - popupSize.width / 2 - offset.x;
          popupRect.top = pt.y + offset.y;
          break;
      }

      if (subPlacement === "start") {
        switch (mainPlacement) {
          case "top":
          case "bottom":
            popupRect.left = pt.x - offset.x;

            break;
          case "left":
          case "right":
            popupRect.top = pt.y - offset.y;
            break;
        }
      } else if (subPlacement === "end") {
        switch (mainPlacement) {
          case "top":
          case "bottom":
            popupRect.left = pt.x - popupSize.width - offset.x;
            break;
          case "left":
          case "right":
            popupRect.top = popupSize.height + pt.y - offset.y;
            break;
        }
      }

      popupRect.right = popupRect.left + popupSize.width;
      popupRect.bottom = popupRect.top + popupSize.height;
    } else {
      switch (relativePosition) {
        case RelativePosition.Top:
          popupRect.bottom = pt.y - offset.y;
          popupRect.left = pt.x - popupSize.width / 2;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.Left:
          popupRect.right = pt.x - offset.x;
          popupRect.top = pt.y - popupSize.height / 2;
          popupRect.left = popupRect.right - popupSize.width;
          popupRect.bottom = popupRect.top + popupSize.height;
          break;
        case RelativePosition.Right:
          popupRect.left = pt.x + offset.x;
          popupRect.top = pt.y - popupSize.height / 2;
          popupRect.right = popupRect.left + popupSize.width;
          popupRect.bottom = popupRect.top + popupSize.height;
          break;
        case RelativePosition.Bottom:
          popupRect.top = pt.y + offset.y;
          popupRect.left = pt.x - popupSize.width / 2;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.TopLeft:
          popupRect.bottom = pt.y - offset.y;
          popupRect.right = pt.x - offset.x;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.left = popupRect.right - popupSize.width;
          break;
        case RelativePosition.TopRight:
          popupRect.bottom = pt.y - offset.y;
          popupRect.left = pt.x + offset.x;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.BottomLeft:
          popupRect.top = pt.y + offset.y;
          popupRect.right = pt.x - offset.x;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.left = popupRect.right - popupSize.width;
          break;
        case RelativePosition.BottomRight:
          popupRect.top = pt.y + offset.y;
          popupRect.left = pt.x + offset.x;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
      }
    }

    return popupRect;
  }

  private setDivRef(div: HTMLDivElement | null) {
    if (div) {
      const rect = div.getBoundingClientRect();
      const newSize = { width: rect.width, height: rect.height };
      if (
        newSize.height === this.state.size.height &&
        newSize.width === this.state.size.width
      )
        return;

      this.props.onSizeKnown?.(newSize);
      if (this._isMounted) this.setState({ size: newSize });
    }
  }

  public override render() {
    const popupRect = CursorPopup.getPopupRect(
      this.props.pt,
      this.props.offset,
      this.state.size,
      // eslint-disable-next-line deprecation/deprecation
      this.props.placement || this.props.relativePosition
    );

    const positioningStyle: React.CSSProperties = {
      left: popupRect.left,
      top: popupRect.top,
    };

    const classNames = classnames(
      "uifw-cursorpopup",
      this.props.shadow && "core-popup-shadow",
      this.state.showPopup === CursorPopupShow.FadeOut &&
        "uifw-cursorpopup-fadeOut"
    );

    return (
      <div
        className={classNames}
        ref={(e) => this.setDivRef(e)}
        style={positioningStyle}
      >
        {this.props.title && (
          <StatusBarDialog.TitleBar
            title={this.props.title}
            className="uifw-cursorpopup-title"
          />
        )}
        {this.props.content}
      </div>
    );
  }
}

/** CursorPopup content with padding
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export function CursorPopupContent(props: CommonDivProps) {
  // eslint-disable-next-line deprecation/deprecation
  return <Div {...props} mainClassName="uifw-cursorpopup-content" />;
}
