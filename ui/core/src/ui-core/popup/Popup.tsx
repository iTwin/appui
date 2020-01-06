/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Popup */

// cSpell:ignore focustrap focusable
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classnames from "classnames";
import { CommonProps } from "../utils/Props";
import { FocusTrap } from "../focustrap/FocusTrap";
import "./Popup.scss";

/** @internal */
interface Point {
  x: number;
  y: number;
}

/** Position of the popup relative to its target
 * @beta
 */
export enum Position {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
  Top,
  Bottom,
  Left,
  Right,
}

/** Properties for the [[Popup]] component
 * @beta
 */
export interface PopupProps extends CommonProps {
  /**  show or hide the box shadow */
  showShadow: boolean;
  /** show or hide the arrow */
  showArrow: boolean;
  /** indicate if the popup is shown or not */
  isOpen: boolean;
  /** Direction (relative to the target) to which the popup is expanded */
  position: Position;
  /** Top position (absolute positioning) */
  top: number;
  /** Left position (absolute positioning) */
  left: number;
  /** Function called when the popup is opened */
  onOpen?: () => void;
  /** Function called when user clicks outside the popup  */
  onOutsideClick?: (e: MouseEvent) => void;
  /** Function called when the popup is closed */
  onClose?: () => void;
  /* offset from the parent */
  offset: number;
  /** target element to position popup */
  target?: HTMLElement | null;
  /** role - if not specified "dialog" is used */
  role?: "dialog" | "alert" | "alertdialog";  // cSpell:ignore alertdialog
  /** accessibility label */
  ariaLabel?: string;
  /** set focus to popup - default to not set focus */
  moveFocus?: boolean;
  /** Element to receive focus, specified by React.RefObject or CSS selector string. If undefined and moveFocus is true then focus is moved to first focusable element. */
  focusTarget?: React.RefObject<HTMLElement> | string;
  /** Indicates if the popup is pinned. */
  isPinned?: boolean;
}

/** @internal */
interface PopupState {
  isOpen: boolean;
  top: number;
  left: number;
  position: Position;
  focusTarget?: React.RefObject<HTMLElement> | string;
}

/** Popup React component
 * @beta
 */
export class Popup extends React.Component<PopupProps, PopupState> {
  private _popup: HTMLElement | null = null;
  private _isAnimating = true;

  constructor(props: PopupProps) {
    super(props);

    this.state = { isOpen: this.props.isOpen, top: 0, left: 0, position: this.props.position, focusTarget: this.props.focusTarget };
  }

  public static defaultProps: Partial<PopupProps> = {
    position: Position.Bottom,
    showShadow: true,
    showArrow: false,
    isOpen: false,
    offset: 4,
    top: -1,
    left: -1,
  };

  public componentDidMount() {
    if (this.props.isOpen) {
      this._onShow();
    }
  }

  public componentDidUpdate(previousProps: PopupProps) {
    if (this.props.isOpen === previousProps.isOpen) {
      if (this.props.isOpen) {
        const position = this._toggleRelativePosition();
        const point = this._fitPopup(this._getPosition(position));
        const focusTarget = this.props.focusTarget;

        if (this.state.left === point.x &&
          this.state.top === point.y &&
          this.state.position === position &&
          this.state.focusTarget === focusTarget)
          return;
        this.setState({
          left: point.x,
          top: point.y,
          position,
          focusTarget,
        });
      }
      return;
    }

    if (this.props.isOpen) {
      this._onShow();
    } else {
      this._onClose();
    }
  }

  public componentWillUnmount() {
    this._unBindWindowEvents();
  }

  private _bindWindowEvents = () => {
    window.addEventListener("pointerdown", this._handleOutsideClick);
    window.addEventListener("resize", this._hide);
    window.addEventListener("contextmenu", this._hide);
    window.addEventListener("scroll", this._hide);
    window.addEventListener("wheel", this._handleWheel);
    window.addEventListener("keydown", this._handleKeyboard);
  }

  private _unBindWindowEvents = () => {
    window.removeEventListener("pointerdown", this._handleOutsideClick);
    window.removeEventListener("resize", this._hide);
    window.removeEventListener("contextmenu", this._hide);
    window.removeEventListener("scroll", this._hide);
    window.removeEventListener("wheel", this._handleWheel);
    window.removeEventListener("keydown", this._handleKeyboard);
  }

  private _handleWheel = (event: WheelEvent) => {
    if (this._popup && this._popup.contains(event.target as Node))
      return;
    this._hide();
  }

  private _handleOutsideClick = (event: MouseEvent): void => {
    if (this._popup && this._popup.contains(event.target as Node))
      return;

    if (this.props.onOutsideClick)
      return this.props.onOutsideClick(event);

    // istanbul ignore if
    if (this.props.target && this.props.target.contains(event.target as Node))
      return;

    this._onClose();
  }

  private _handleKeyboard = (event: KeyboardEvent): void => {
    if (event.key === "Escape" || event.key === "Enter") {
      this._onClose();
    }
  }

  private _hide = () => {
    this._onClose();
  }

  private _onShow() {
    this._bindWindowEvents();
    const position = this._toggleRelativePosition();
    const point = this._fitPopup(this._getPosition(position));

    this.setState({ left: point.x, top: point.y, isOpen: true, position }, () => {
      if (this.props.onOpen)
        this.props.onOpen();
    });
  }

  private _onClose() {
    if (!this.state.isOpen || this.props.isPinned) {
      return;
    }

    this._unBindWindowEvents();

    this.setState({ isOpen: false }, () => {
      this._isAnimating = true;
      if (this.props.onClose)
        this.props.onClose();
    });
  }

  private _isPositionAbsolute(): boolean {
    return (this.props.top !== -1 && this.props.left !== -1);
  }

  private _getClassNameByPosition(position: Position): string {
    if (!this._isPositionAbsolute()) {
      switch (position) {
        case Position.TopLeft:
          return "core-popup-top-left";
        case Position.TopRight:
          return "core-popup-top-right";
        case Position.BottomLeft:
          return "core-popup-bottom-left";
        case Position.BottomRight:
          return "core-popup-bottom-right";
        case Position.Top:
          return "core-popup-top";
        case Position.Left:
          return "core-popup-left";
        case Position.Right:
          return "core-popup-right";
        case Position.Bottom:
          return "core-popup-bottom";
      }
    }

    return "";
  }

  private _getPopupDimensions(): { popupWidth: number, popupHeight: number } {

    let popupWidth = 0;
    let popupHeight = 0;
    // istanbul ignore else
    if (this._popup) {
      const popupRect = this._popup.getBoundingClientRect();
      switch (this.props.position) {
        case Position.Top:
        case Position.Bottom:
          popupWidth = popupRect.width;
          popupHeight = this._isAnimating ? popupRect.height * 2 : popupRect.height;
          break;
        case Position.TopLeft:
        case Position.BottomLeft:
          popupWidth = this._isAnimating ? popupRect.width * 2 : popupRect.width;
          popupHeight = this._isAnimating ? popupRect.height * 2 : popupRect.height;
          break;
        case Position.TopRight:
        case Position.BottomRight:
          popupWidth = this._isAnimating ? popupRect.width * 2 : popupRect.width;
          popupHeight = this._isAnimating ? popupRect.height * 2 : popupRect.height;
          break;
        case Position.Left:
        case Position.Right:
          popupWidth = this._isAnimating ? popupRect.width * 2 : popupRect.width;
          popupHeight = this._isAnimating ? popupRect.height : popupRect.height;
          break;
      }
    }

    return { popupWidth, popupHeight };
  }

  private _getPosition = (position: Position) => {
    const { target, offset, top, left } = this.props;

    const offsetArrow = (this.props.showArrow) ? 6 : 0;

    // absolute position
    if (this._isPositionAbsolute())
      return { x: left, y: top };

    // sanity check
    const point = { x: 0, y: 0 };
    if (!this._popup || !target)
      return point;

    // relative position
    const scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset;
    const scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset;

    // const popupRect = this._popup.getBoundingClientRect();
    const targetRect = target!.getBoundingClientRect();

    const { popupWidth, popupHeight } = this._getPopupDimensions();

    switch (position) {
      case Position.Top:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.left + (targetRect.width / 2) - (popupWidth / 2);
        break;

      case Position.TopLeft:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.left;
        break;

      case Position.TopRight:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;

      case Position.Bottom:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.left + (targetRect.width / 2) - (popupWidth / 2);
        break;

      case Position.BottomLeft:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.left;
        break;

      case Position.BottomRight:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;

      case Position.Left:
        point.y = scrollY + targetRect.top + (targetRect.height / 2) - (popupHeight / 2);
        point.x = scrollX + targetRect.left - popupWidth - offset - offsetArrow;
        break;

      case Position.Right:
        point.y = scrollY + targetRect.top + (targetRect.height / 2) - (popupHeight / 2);
        point.x = scrollX + targetRect.right + offset + offsetArrow;
        break;

      default:
        break;
    }

    return point;
  }

  private _toggleRelativePosition(): Position {
    const { target, position, offset } = this.props;

    if (!this._popup || !target)
      return position;

    // istanbul ignore if
    if (this._isPositionAbsolute())
      return position;

    let newPosition = position;

    interface Rect {
      left: number;
      top: number;
      right: number;
      bottom: number;
    }

    // Note: Cannot use DOMRect yet since it's experimental and not available in all browsers (Nov. 2018)
    const viewportRect: Rect = { left: window.scrollX, top: window.scrollY, right: window.scrollX + window.innerWidth, bottom: window.scrollY + window.innerHeight };
    const targetRect = target.getBoundingClientRect();
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const containerStyle = window.getComputedStyle(target);
    const offsetArrow = (this.props.showArrow) ? 10 : 2;

    const bottomMargin = containerStyle.marginBottom ? parseFloat(containerStyle.marginBottom) : 0;
    // istanbul ignore else
    if ((targetRect.bottom + popupHeight + bottomMargin + offsetArrow + offset) > viewportRect.bottom) {
      if (newPosition === Position.Bottom)
        newPosition = Position.Top;
      else if (newPosition === Position.BottomLeft)
        newPosition = Position.TopLeft;
      else if (newPosition === Position.BottomRight)
        newPosition = Position.TopRight;
    }

    const topMargin = containerStyle.marginTop ? parseFloat(containerStyle.marginTop) : 0;
    // istanbul ignore else
    if ((targetRect.top - popupHeight - topMargin - offsetArrow - offset) < viewportRect.top) {
      if (newPosition === Position.Top)
        newPosition = Position.Bottom;
      else if (newPosition === Position.TopLeft)
        newPosition = Position.BottomLeft;
      else if (newPosition === Position.TopRight)
        newPosition = Position.BottomRight;
    }

    const leftMargin = containerStyle.marginLeft ? parseFloat(containerStyle.marginLeft) : 0;
    // istanbul ignore else
    if ((targetRect.left - popupWidth - leftMargin - offsetArrow - offset) < viewportRect.left) {
      if (newPosition === Position.Left)
        newPosition = Position.Right;
    }

    const rightMargin = containerStyle.marginRight ? parseFloat(containerStyle.marginRight) : 0;
    // istanbul ignore else
    if ((targetRect.right + popupWidth + rightMargin + offsetArrow + offset) > viewportRect.right) {
      if (newPosition === Position.Right)
        newPosition = Position.Left;
    }

    return newPosition;
  }

  // fit the popup within the extents of the view port
  private _fitPopup = (point: Point) => {
    const fittedPoint = point;

    if (!this._popup) {
      return fittedPoint;
    }

    // const popupRect = this._popup.getBoundingClientRect();
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const { innerWidth, innerHeight } = window;

    if (fittedPoint.y + popupHeight > innerHeight) {
      fittedPoint.y = innerHeight - popupHeight;
    }

    if (fittedPoint.x + popupWidth > innerWidth) {
      fittedPoint.x = innerWidth - popupWidth;
    }

    if (fittedPoint.y < 0) {
      fittedPoint.y = 0;
    }

    if (fittedPoint.x < 0) {
      fittedPoint.x = 0;
    }

    return fittedPoint;
  }

  private _handleAnimationEnd = () => {
    this._isAnimating = false;
  }

  public render() {
    const className = classnames(
      "core-popup",
      this._getClassNameByPosition(this.state.position),
      this.props.showShadow && "core-popup-shadow",
      this.props.showArrow && "arrow",
      this.props.className,
    );

    const style: React.CSSProperties = {
      top: this.state.top,
      left: this.state.left,
      ...this.props.style,
    };

    const role = this.props.role ? this.props.role : "dialog";  // accessibility property

    if (!this.props.isOpen) {
      return null;
    }

    return ReactDOM.createPortal(
      (
        <div
          className={className} data-testid="core-popup"
          onAnimationEnd={this._handleAnimationEnd}
          ref={(element) => { this._popup = element; }}
          style={style}
          role={role}
          aria-modal={true}
          tabIndex={-1}
          aria-label={this.props.ariaLabel}
        >
          <FocusTrap active={!!this.props.moveFocus && this.state.isOpen} initialFocusElement={this.state.focusTarget} returnFocusOnDeactivate={true}>
            {this.props.children}
          </FocusTrap>
        </div>
      ), document.body);
  }
}
