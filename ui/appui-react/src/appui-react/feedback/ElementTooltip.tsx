/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import { UiEvent } from "@itwin/appui-abstract";
import type { ToolTipOptions } from "@itwin/core-frontend";
import type { XAndY } from "@itwin/core-geometry";
import type { CommonProps, Point, SizeProps } from "@itwin/core-react";
import { MessageRenderer, Rectangle } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { offsetAndContainInContainer, Tooltip } from "../layout/popup/Tooltip";
import type { NotifyMessageType } from "../messages/ReactNotifyMessageDetails";
import { BeUiEvent } from "@itwin/core-bentley";

/** [[ElementTooltip]] State.
 * @internal
 */
interface ElementTooltipState {
  isVisible: boolean;
  message: NotifyMessageType;
  position: XAndY;
  options?: ToolTipOptions;
}

/** [[ElementTooltipChangedEvent]] arguments.
 * @public
 * @deprecated in 4.13.x. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ElementTooltipChangedEventArgs {
  isTooltipVisible: boolean;
  message: NotifyMessageType;
  el?: HTMLElement;
  pt?: XAndY;
  options?: ToolTipOptions;
}

/** ElementTooltip Changed Event class.
 * @public
 * @deprecated in 4.13.x. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ElementTooltipChangedEvent extends UiEvent<ElementTooltipChangedEventArgs> {}

/** ElementTooltip React component.
 * @public
 */
export class ElementTooltip extends React.Component<
  CommonProps,
  ElementTooltipState
> {
  private static _elementTooltipChangedEvent =
    new BeUiEvent<ElementTooltipChangedEventArgs>(); // eslint-disable-line deprecation/deprecation
  private static _isTooltipVisible: boolean;
  private static _isTooltipHalted: boolean;

  // eslint-disable-next-line deprecation/deprecation
  public static get onElementTooltipChangedEvent(): ElementTooltipChangedEvent {
    return ElementTooltip._elementTooltipChangedEvent;
  }
  public static get isTooltipVisible(): boolean {
    return ElementTooltip._isTooltipVisible;
  }

  public static showTooltip(
    el: HTMLElement,
    message: NotifyMessageType,
    pt?: XAndY,
    options?: ToolTipOptions
  ): void {
    // istanbul ignore if
    if (ElementTooltip._isTooltipHalted) return;
    ElementTooltip._isTooltipVisible = true;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: true,
      el,
      message,
      pt,
      options,
    });
    el.ownerDocument.addEventListener(
      "mousemove",
      ElementTooltip._handleMouseMove
    );
  }

  public static hideTooltip(): void {
    ElementTooltip._isTooltipVisible = false;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: false,
      message: "",
    });
  }

  public static get isTooltipHalted(): boolean {
    return ElementTooltip._isTooltipHalted;
  }
  public static set isTooltipHalted(halt: boolean) {
    ElementTooltip._isTooltipHalted = halt;
    if (halt && ElementTooltip._isTooltipVisible) ElementTooltip.hideTooltip();
  }

  private _size: SizeProps = {
    height: 0,
    width: 0,
  };
  private _element?: HTMLElement;
  private _position?: XAndY;

  /** @internal */
  public override readonly state: Readonly<ElementTooltipState> = {
    message: "",
    isVisible: false,
    position: {
      x: 0,
      y: 0,
    },
  };

  constructor(props: CommonProps) {
    super(props);
  }

  public override render() {
    if (!this.state.isVisible) return null;

    const className = classnames("uifw-element-tooltip", this.props.className);
    return (
      <div className="uifw-element-tooltip-container">
        <Tooltip
          className={className}
          style={this.props.style}
          position={this.state.position}
          onSizeChanged={this._handleSizeChanged}
        >
          <MessageRenderer message={this.state.message} />
        </Tooltip>
      </div>
    );
  }

  public override componentDidMount(): void {
    ElementTooltip.onElementTooltipChangedEvent.addListener(
      this._handleElementTooltipChangedEvent
    );
  }

  public override componentWillUnmount(): void {
    ElementTooltip.onElementTooltipChangedEvent.removeListener(
      this._handleElementTooltipChangedEvent
    );
  }

  private static _handleMouseMove(event: MouseEvent) {
    const el = event.currentTarget as Document;
    /* Only monitor mouse movement when an ElementTooltip is open. */
    if (
      (el && ElementTooltip._isTooltipHalted) ||
      !ElementTooltip._isTooltipVisible
    ) {
      el.removeEventListener("mousemove", ElementTooltip._handleMouseMove);
      return;
    }
    const hoveredElement = el
      ? el.elementFromPoint(event.clientX, event.clientY)
      : undefined;
    /* If the mouse has moved to an element that is not the view canvas, close the ElementTooltip. */
    if (hoveredElement && hoveredElement.localName !== "canvas") {
      ElementTooltip.onElementTooltipChangedEvent.emit({
        isTooltipVisible: false,
        message: "",
      });
      el.removeEventListener("mousemove", ElementTooltip._handleMouseMove);
      return;
    }
  }
  private _handleElementTooltipChangedEvent = (
    args: ElementTooltipChangedEventArgs // eslint-disable-line deprecation/deprecation
  ) => {
    this._element = args.el;
    this._position = args.pt;
    this.setState({
      isVisible: args.isTooltipVisible,
      message: args.message,
    });
    this.updatePosition();
  };

  private _handleSizeChanged = (size: SizeProps) => {
    this._size = size;
    this.updatePosition();
  };

  private updatePosition() {
    this.setState((prevState) => {
      if (!this._element) return null;
      if (!this._position) return null;

      const containerBounds = Rectangle.create(
        this._element.getBoundingClientRect()
      );
      const relativeBounds = Rectangle.createFromSize(this._size).offset(
        this._position
      );
      const adjustedPosition: Point = offsetAndContainInContainer(
        relativeBounds,
        containerBounds.getSize(),
        { x: 8, y: 8 }
      );
      const position = adjustedPosition.offset(containerBounds.topLeft());

      // istanbul ignore else
      if (position.equals(prevState.position)) return null;

      return {
        position,
      };
    });
  }
}
