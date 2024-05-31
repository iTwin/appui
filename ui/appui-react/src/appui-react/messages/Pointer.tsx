/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./Pointer.scss";
import classnames from "classnames";
import * as React from "react";
import {
  MessageSeverity,
  RelativePosition,
  UiEvent,
} from "@itwin/appui-abstract";
import { OutputMessagePriority } from "@itwin/core-frontend";
import type { XAndY } from "@itwin/core-geometry";
import type { CommonProps, SizeProps } from "@itwin/core-react";
import {
  Icon,
  MessageContainer,
  MessageRenderer,
  Point,
  Rectangle,
} from "@itwin/core-react";
import { offsetAndContainInContainer, Tooltip } from "../layout/popup/Tooltip";
import { MessageManager } from "./MessageManager";
import type {
  NotifyMessageDetailsType,
  NotifyMessageType,
} from "./ReactNotifyMessageDetails";
import { BeUiEvent } from "@itwin/core-bentley";

// cSpell:ignore noicon

/** Properties of [[PointerMessage]] component.
 * @public
 */
export interface PointerMessageProps extends CommonProps {
  /** Text to display */
  message?: string;
}

/** [[PointerMessage]] state.
 * @internal
 */
interface PointerMessageState {
  isVisible: boolean;
  message: NotifyMessageType;
  detailedMessage?: NotifyMessageType;
  position: XAndY;
  messageDetails?: NotifyMessageDetailsType;
}

/** [[PointerMessageChangedEvent]] arguments.
 * @public
 * @deprecated in 4.13.x. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface PointerMessageChangedEventArgs {
  isVisible: boolean;
  priority: OutputMessagePriority;
  message: NotifyMessageType;
  detailedMessage?: NotifyMessageType;
  relativePosition?: RelativePosition;
  viewport?: HTMLElement;
  pt?: XAndY;
  messageDetails?: NotifyMessageDetailsType;
}

/** Pointer Message Changed Event emitted by the [[PointerMessage]] component
 * @public
 * @deprecated in 4.13.x. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class PointerMessageChangedEvent extends UiEvent<PointerMessageChangedEventArgs> {}

/** [[PointerMessagePositionChangedEvent]] arguments.
 * @internal
 */
interface PointerMessagePositionChangedEventArgs {
  pt: XAndY;
  relativePosition: RelativePosition;
}

/** Pointer message pops up near pointer when attempting an invalid interaction.
 * @public
 */
export class PointerMessage extends React.Component<
  PointerMessageProps,
  PointerMessageState
> {
  private static _pointerMessageChangedEvent =
    new BeUiEvent<PointerMessageChangedEventArgs>(); // eslint-disable-line deprecation/deprecation
  private static readonly _onPointerMessagePositionChangedEvent =
    new BeUiEvent<PointerMessagePositionChangedEventArgs>();

  // eslint-disable-next-line deprecation/deprecation
  public static get onPointerMessageChangedEvent(): PointerMessageChangedEvent {
    return PointerMessage._pointerMessageChangedEvent;
  }

  public static showMessage(message: NotifyMessageDetailsType): void {
    PointerMessage.onPointerMessageChangedEvent.emit({
      isVisible: true,
      priority: message.priority,
      message: message.briefMessage,
      detailedMessage: message.detailedMessage,
      relativePosition: message.relativePosition,
      viewport: message.viewport,
      pt: message.displayPoint,
      messageDetails: message,
    });
  }

  public static updateMessage(
    displayPoint: XAndY,
    relativePosition: RelativePosition
  ): void {
    PointerMessage._onPointerMessagePositionChangedEvent.emit({
      pt: displayPoint,
      relativePosition,
    });
  }

  public static hideMessage(): void {
    PointerMessage.onPointerMessageChangedEvent.emit({
      isVisible: false,
      priority: OutputMessagePriority.None,
      message: "",
    });
  }

  public override readonly state: Readonly<PointerMessageState> = {
    message: "",
    isVisible: false,
    position: {
      x: 0,
      y: 0,
    },
  };

  private _relativePosition?: RelativePosition;
  private _viewport?: HTMLElement;
  private _position?: XAndY;
  private _size: SizeProps = {
    height: 0,
    width: 0,
  };

  public override render(): React.ReactNode {
    if (!this.state.isVisible) return null;

    const className = classnames("uifw-pointer-message", this.props.className);
    const severity = MessageManager.getSeverity(this.state.messageDetails!);

    return (
      <Tooltip
        className={className}
        onSizeChanged={this._handleSizeChanged}
        position={this.state.position}
        style={this.props.style}
      >
        <div className="uifw-pointer-message-content">
          {severity !== MessageSeverity.None && (
            <span className="uifw-pointer-message-icon">
              <Icon
                className={`icon ${MessageContainer.getIconClassName(
                  severity
                )}`}
                iconSpec={`${MessageContainer.getIcon(severity, false)}`}
              />
            </span>
          )}
          <span className="uifw-pointer-message-text">
            <MessageRenderer
              className="uifw-pointer-message-brief"
              message={this.state.message}
              useSpan
            />
            {this.state.detailedMessage && (
              <MessageRenderer
                className="uifw-pointer-message-detailed"
                message={this.state.detailedMessage}
              />
            )}
          </span>
        </div>
      </Tooltip>
    );
  }

  public override componentDidMount(): void {
    PointerMessage.onPointerMessageChangedEvent.addListener(
      this._handlePointerMessageChangedEvent
    );
    PointerMessage._onPointerMessagePositionChangedEvent.addListener(
      this._handlePointerMessagePositionChangedEvent
    );
  }

  public override componentWillUnmount(): void {
    PointerMessage.onPointerMessageChangedEvent.removeListener(
      this._handlePointerMessageChangedEvent
    );
    PointerMessage._onPointerMessagePositionChangedEvent.removeListener(
      this._handlePointerMessagePositionChangedEvent
    );
  }

  private _handleSizeChanged = (size: SizeProps) => {
    this._size = size;
    this.updatePosition();
  };

  private _handlePointerMessageChangedEvent = (
    args: PointerMessageChangedEventArgs // eslint-disable-line deprecation/deprecation
  ) => {
    this._relativePosition = args.relativePosition;
    this._viewport = args.viewport;
    this._position = args.pt;
    this.setState(() => ({
      isVisible: args.isVisible,
      message: args.message,
      detailedMessage: args.detailedMessage,
      messageDetails: args.messageDetails,
    }));
    this.updatePosition();
  };

  private _handlePointerMessagePositionChangedEvent = (
    args: PointerMessagePositionChangedEventArgs
  ) => {
    this._relativePosition = args.relativePosition;
    this._position = args.pt;
    this.updatePosition();
  };

  private updatePosition() {
    const adjustmentOffset = 20;
    let offset: XAndY | undefined;
    switch (this._relativePosition) {
      case RelativePosition.Top:
        offset = { x: 0, y: -adjustmentOffset };
        break;
      case RelativePosition.TopRight:
        offset = { x: adjustmentOffset, y: -adjustmentOffset };
        break;
      case RelativePosition.Right:
        offset = { x: adjustmentOffset, y: 0 };
        break;
      case RelativePosition.BottomRight:
        offset = { x: adjustmentOffset, y: adjustmentOffset };
        break;
      case RelativePosition.Bottom:
        offset = { x: 0, y: adjustmentOffset };
        break;
      case RelativePosition.BottomLeft:
        offset = { x: -adjustmentOffset, y: adjustmentOffset };
        break;
      case RelativePosition.Left:
        offset = { x: -adjustmentOffset, y: 0 };
        break;
      case RelativePosition.TopLeft:
        offset = { x: -adjustmentOffset, y: -adjustmentOffset };
        break;
    }

    this.setState((prevState) => {
      if (!this._viewport) return null;
      // istanbul ignore if
      if (!this._position) return null;

      const containerBounds = Rectangle.create(
        this._viewport.getBoundingClientRect()
      );
      const relativeBounds = Rectangle.createFromSize(this._size).offset(
        this._position
      );
      const viewportOffset = new Point().getOffsetTo(containerBounds.topLeft());

      const adjustedPosition = offsetAndContainInContainer(
        relativeBounds,
        containerBounds.getSize(),
        offset
      );
      const position = adjustedPosition.offset(viewportOffset);

      if (position.equals(prevState.position)) return null;

      return {
        position,
      };
    });
  }
}
