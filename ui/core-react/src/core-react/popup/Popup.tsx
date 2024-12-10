/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import "./Popup.scss";
import classnames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Key } from "ts-key-enum";
import { RelativePosition } from "@itwin/appui-abstract";
import { FocusTrap } from "../focustrap/FocusTrap.js";
import type { CommonProps } from "../utils/Props.js";
import { Rectangle } from "../utils/Rectangle.js";
import { ThemeProvider } from "@itwin/itwinui-react";

/** @internal */
interface PopupPoint {
  x: number;
  y: number;
}

/** @internal */
export const PopupContext = React.createContext<HTMLElement | undefined>(
  undefined
);

/** Properties for the [[Popup]] component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link Popup} component.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface PopupProps extends CommonProps {
  /** Show or hide the box shadow (defaults to true) */
  showShadow: boolean;
  /** Show or hide the arrow (defaults to false) */
  showArrow: boolean;
  /** Indicates whether the popup is shown or not (defaults to false) */
  isOpen: boolean;
  /** Direction (relative to the target) to which the popup is expanded (defaults to Bottom) */
  position: RelativePosition;
  /** Top position (absolute positioning - defaults to 0) */
  top: number;
  /** Left position (absolute positioning - defaults to 0) */
  left: number;
  /** Function called when the popup is opened */
  onOpen?: () => void;
  /** Function called when user clicks outside the popup  */
  onOutsideClick?: (e: MouseEvent) => void;
  /** Function called when the popup is closed */
  onClose?: () => void;
  /** Function called when the popup is closed on Enter */
  onEnter?: () => void;
  /** Function called when the wheel is used */
  onWheel?: (e: WheelEvent) => void;
  /** Function called when the right mouse button is pressed */
  onContextMenu?: (e: MouseEvent) => void;
  /** Offset from the parent (defaults to 4) */
  offset: number;
  /** Target element to position popup */
  target?: HTMLElement | null;
  /** Role - if not specified "dialog" is used */
  role?: "dialog" | "alert" | "alertdialog";
  /** accessibility label */
  ariaLabel?: string;
  /** set focus to popup - default to not set focus */
  moveFocus?: boolean;
  /** Element to receive focus, specified by React.RefObject or CSS selector string. If undefined and moveFocus is true then focus is moved to first focusable element. */
  focusTarget?: React.RefObject<HTMLElement> | string;
  /** Indicates whether the popup is pinned. */
  isPinned?: boolean;
  /** Indicates whether to use animation for open/close (defaults to true) */
  animate?: boolean;
  /** Indicates whether to close the popup when Enter is pressed (defaults to true) */
  closeOnEnter?: boolean;
  /** Indicates whether to close the popup when the wheel is used (defaults to true) */
  closeOnWheel?: boolean;
  /** Indicates whether to close the popup when the right mouse button is pressed (defaults to true) */
  closeOnContextMenu?: boolean;
  /** If false outside click processing and closing are skipped if click occurs in another Popup component, default to false. */
  closeOnNestedPopupOutsideClick?: boolean;
  /** If true the children are mounted once and unmounted when this component is unmounted. If false the
   * children are unmounted each time the popup is closed. */
  keepContentsMounted?: boolean;

  /**
   * If true the popup will remain open and will be repositioned when window resize events occur, default to false.
   * @beta
   * */
  repositionOnResize?: boolean;

  /** Content */
  children?: React.ReactNode;

  /** Target that should be used when portaling popup.
   * @note This is needed in rare cases when {@link Popup} is nested inside the {@link https://itwinui.bentley.com/docs/popover iTwinUI Popover}.
   */
  portalTarget?: HTMLElement;
}

interface PopupState {
  isOpen: boolean;
  top: number;
  left: number;
  position: RelativePosition;
  parentDocument: Document;
  animationEnded: boolean;
  portalContainer?: HTMLElement;
}

/** Popup React component displays a popup relative to an optional target element.
 * @note Avoid nesting {@link Popup} and {@link https://itwinui.bentley.com/docs/popover iTwinUI Popover} components.
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/popover iTwinUI Popover} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class Popup extends React.Component<PopupProps, PopupState> {
  private _popup: HTMLElement | null = null;
  /** @internal */
  public static override contextType = PopupContext;
  /** @internal */
  public declare context: React.ContextType<typeof PopupContext>;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props: PopupProps) {
    super(props);
    const parentDocument = this.props.target?.ownerDocument ?? document;

    this.state = {
      animationEnded: false,
      isOpen: this.props.isOpen,
      top: 0,
      left: 0,
      position: this.props.position,
      parentDocument,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static defaultProps: Partial<PopupProps> = {
    position: RelativePosition.Bottom,
    showShadow: true,
    showArrow: false,
    isOpen: false,
    offset: 4,
    top: -1,
    left: -1,
  };

  public override componentDidMount() {
    if (this.props.isOpen) {
      this._onShow();
    }
  }

  private getParentWindow() {
    return this.state.parentDocument.defaultView ?? window;
  }

  /** @internal */
  public override componentDidUpdate(
    previousProps: PopupProps, // eslint-disable-line @typescript-eslint/no-deprecated
    prevState: PopupState
  ) {
    if (this.state.position !== prevState.position) {
      this.setState({ animationEnded: false });
    }

    if (this.props.target !== previousProps.target) {
      {
        const parentDocument = this.props.target?.ownerDocument ?? document;
        if (parentDocument !== this.state.parentDocument) {
          this._unBindWindowEvents();
          this.setState({ parentDocument });
        }
      }
    }

    if (this.props.isOpen === previousProps.isOpen) {
      if (this.props.isOpen) {
        const position = this._toggleRelativePosition();
        const point = this._fitPopup(this._getPosition(position));
        if (
          Math.abs(this.state.left - point.x) < 3 &&
          Math.abs(this.state.top - point.y) < 3 &&
          this.state.position === position
        )
          return;

        this.setState({
          left: point.x,
          top: point.y,
          position,
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

  public override componentWillUnmount() {
    this._unBindWindowEvents();
  }

  private _bindWindowEvents = () => {
    const activeWindow = this.getParentWindow();
    activeWindow.addEventListener("pointerdown", this._handleOutsideClick);
    activeWindow.addEventListener("resize", this._resize);
    activeWindow.addEventListener("contextmenu", this._handleContextMenu);
    activeWindow.addEventListener("scroll", this._hide);
    activeWindow.addEventListener("wheel", this._handleWheel);
    activeWindow.addEventListener("keydown", this._handleKeyboard);
  };

  private _unBindWindowEvents = () => {
    const activeWindow = this.getParentWindow();
    activeWindow.removeEventListener("pointerdown", this._handleOutsideClick);
    activeWindow.removeEventListener("resize", this._resize);
    activeWindow.removeEventListener("contextmenu", this._handleContextMenu);
    activeWindow.removeEventListener("scroll", this._hide);
    activeWindow.removeEventListener("wheel", this._handleWheel);
    activeWindow.removeEventListener("keydown", this._handleKeyboard);
  };

  private _handleWheel = (event: WheelEvent) => {
    if (this._popup && this._popup.contains(event.target as Node)) return;

    if (this.props.onWheel) return this.props.onWheel(event);

    const closeOnWheel =
      this.props.closeOnWheel !== undefined ? this.props.closeOnWheel : true;
    if (closeOnWheel) this._hide();
  };

  private isInCorePopup(element: HTMLElement): boolean {
    if (element.nodeName === "DIV") {
      if (element.classList && element.classList.contains("core-popup"))
        return true;
      if (element.parentElement && this.isInCorePopup(element.parentElement))
        return true;
    } else {
      if (element.parentElement && this.isInCorePopup(element.parentElement))
        return true;
    }
    return false;
  }

  private _handleOutsideClick = (event: MouseEvent): void => {
    if (this._popup && this._popup.contains(event.target as Node)) return;

    if (this.props.isPinned) return;

    if (
      !this.props.closeOnNestedPopupOutsideClick &&
      this.isInCorePopup(event.target as HTMLElement)
    )
      return;

    if (this.props.onOutsideClick) return this.props.onOutsideClick(event);

    if (this.props.target && this.props.target.contains(event.target as Node))
      return;

    this._onClose();
  };

  private _handleContextMenu = (event: MouseEvent) => {
    if (this._popup && this._popup.contains(event.target as Node)) return;

    if (this.props.onContextMenu) return this.props.onContextMenu(event);

    const closeOnContextMenu =
      this.props.closeOnContextMenu !== undefined
        ? this.props.closeOnContextMenu
        : true;
    if (closeOnContextMenu) this._hide();
  };

  private _handleKeyboard = (event: KeyboardEvent): void => {
    if (this.props.isPinned) return;

    if (
      event.key === Key.Escape.valueOf() ||
      event.key === Key.Enter.valueOf()
    ) {
      const closeOnEnter =
        this.props.closeOnEnter !== undefined ? this.props.closeOnEnter : true;
      if (event.key === Key.Enter.valueOf()) {
        if (closeOnEnter) this._onClose(true);
        else this.props.onEnter && this.props.onEnter();
      } else {
        this._onClose(false);
      }
    }
  };

  private _resize = () => {
    if (this.props.repositionOnResize) {
      const position = this._toggleRelativePosition();
      const point = this._fitPopup(this._getPosition(position));
      this.setState({ left: point.x, top: point.y, position });
    } else {
      this._hide(); // legacy behavior
    }
  };

  private _hide = () => {
    if (this.props.isPinned) return;

    this._onClose();
  };

  private _onShow() {
    this._bindWindowEvents();
    const position = this._toggleRelativePosition();
    const point = this._fitPopup(this._getPosition(position));

    this.setState(
      { left: point.x, top: point.y, isOpen: true, position },
      () => {
        if (this.props.onOpen) this.props.onOpen();
      }
    );
  }

  private _onClose(enterKey?: boolean) {
    if (!this.state.isOpen) return;

    this._unBindWindowEvents();

    this.setState({ isOpen: false }, () => {
      if (enterKey && this.props.onEnter) this.props.onEnter();
      if (this.props.onClose) this.props.onClose();
    });
  }

  private _isPositionAbsolute(): boolean {
    return this.props.top !== -1 && this.props.left !== -1;
  }

  private _getClassNameByPosition(position: RelativePosition): string {
    if (!this._isPositionAbsolute()) {
      switch (position) {
        case RelativePosition.TopLeft:
          return "core-popup-top-left";
        case RelativePosition.TopRight:
          return "core-popup-top-right";
        case RelativePosition.BottomLeft:
          return "core-popup-bottom-left";
        case RelativePosition.BottomRight:
          return "core-popup-bottom-right";
        case RelativePosition.Top:
          return "core-popup-top";
        case RelativePosition.Left:
          return "core-popup-left";
        case RelativePosition.Right:
          return "core-popup-right";
        case RelativePosition.Bottom:
          return "core-popup-bottom";
        case RelativePosition.LeftTop:
          return "core-popup-left-top";
        case RelativePosition.RightTop:
          return "core-popup-right-top";
      }
    }

    return "";
  }

  private _getPopupDimensions(): { popupWidth: number; popupHeight: number } {
    let popupWidth = 0;
    let popupHeight = 0;
    if (this._popup) {
      const activeWindow = this.getParentWindow();
      const style = activeWindow.getComputedStyle(this._popup);
      const borderLeftWidth = parsePxString(style.borderLeftWidth);
      const borderRightWidth = parsePxString(style.borderRightWidth);
      const borderTopWidth = parsePxString(style.borderTopWidth);
      const borderBottomWidth = parsePxString(style.borderBottomWidth);
      popupWidth = this._popup.clientWidth + borderLeftWidth + borderRightWidth;
      popupHeight =
        this._popup.clientHeight + borderTopWidth + borderBottomWidth;
    }

    return { popupWidth, popupHeight };
  }

  private _getPosition = (position: RelativePosition) => {
    const activeWindow = this.getParentWindow();
    const { target, offset, top, left } = this.props;
    const offsetArrow = this.props.showArrow ? 6 : 0;

    // absolute position
    if (this._isPositionAbsolute()) return { x: left, y: top };

    // sanity check
    const point = { x: 0, y: 0 };
    if (!this._popup || !target) return point;

    // relative position
    const scrollY = activeWindow.scrollY;
    const scrollX = activeWindow.scrollX;

    const container = this.getContainer();
    const containerBounds = container.getBoundingClientRect();
    const targetRect = Rectangle.create(target.getBoundingClientRect()).offset({
      x: -containerBounds.left,
      y: -containerBounds.top,
    });

    const { popupWidth, popupHeight } = this._getPopupDimensions();

    switch (position) {
      case RelativePosition.Top:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x =
          scrollX +
          targetRect.left +
          targetRect.getWidth() / 2 -
          popupWidth / 2;
        break;

      case RelativePosition.TopLeft:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.left;
        break;

      case RelativePosition.TopRight:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;

      case RelativePosition.Bottom:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x =
          scrollX +
          targetRect.left +
          targetRect.getWidth() / 2 -
          popupWidth / 2;
        break;

      case RelativePosition.BottomLeft:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.left;
        break;

      case RelativePosition.BottomRight:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;

      case RelativePosition.Left:
        point.y =
          scrollY +
          targetRect.top +
          targetRect.getHeight() / 2 -
          popupHeight / 2;
        point.x = scrollX + targetRect.left - popupWidth - offset - offsetArrow;
        break;

      case RelativePosition.LeftTop:
        point.y = scrollY + targetRect.top;
        point.x = scrollX + targetRect.left - popupWidth - offset - offsetArrow;
        break;

      case RelativePosition.Right:
        point.y =
          scrollY +
          targetRect.top +
          targetRect.getHeight() / 2 -
          popupHeight / 2;
        point.x = scrollX + targetRect.right + offset + offsetArrow;
        break;

      case RelativePosition.RightTop:
        point.y = scrollY + targetRect.top;
        point.x = scrollX + targetRect.right + offset + offsetArrow;
        break;
    }

    return point;
  };

  private _toggleRelativePosition(): RelativePosition {
    const { target, position, offset } = this.props;

    if (!this._popup || !target) return position;

    if (this._isPositionAbsolute()) return position;

    let newPosition = position;

    interface Rect {
      left: number;
      top: number;
      right: number;
      bottom: number;
    }

    const activeWindow = this.getParentWindow();

    // Note: Cannot use DOMRect yet since it's experimental and not available in all browsers (Nov. 2018)
    const viewportRect: Rect = {
      left: activeWindow.scrollX,
      top: activeWindow.scrollY,
      right: activeWindow.scrollX + activeWindow.innerWidth,
      bottom: activeWindow.scrollY + activeWindow.innerHeight,
    };
    const targetRect = target.getBoundingClientRect();
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const containerStyle = activeWindow.getComputedStyle(target);
    const offsetArrow = this.props.showArrow ? 10 : 2;

    const bottomMargin = parseMargin(containerStyle.marginBottom);
    if (
      targetRect.bottom + popupHeight + bottomMargin + offsetArrow + offset >
      viewportRect.bottom
    ) {
      if (newPosition === RelativePosition.Bottom)
        newPosition = RelativePosition.Top;
      else if (newPosition === RelativePosition.BottomLeft)
        newPosition = RelativePosition.TopLeft;
      else if (newPosition === RelativePosition.BottomRight)
        newPosition = RelativePosition.TopRight;
    }

    const topMargin = parseMargin(containerStyle.marginTop);
    if (
      targetRect.top - popupHeight - topMargin - offsetArrow - offset <
      viewportRect.top
    ) {
      if (newPosition === RelativePosition.Top)
        newPosition = RelativePosition.Bottom;
      else if (newPosition === RelativePosition.TopLeft)
        newPosition = RelativePosition.BottomLeft;
      else if (newPosition === RelativePosition.TopRight)
        newPosition = RelativePosition.BottomRight;
    }

    const leftMargin = parseMargin(containerStyle.marginLeft);
    if (
      targetRect.left - popupWidth - leftMargin - offsetArrow - offset <
      viewportRect.left
    ) {
      if (newPosition === RelativePosition.Left)
        newPosition = RelativePosition.Right;
      else if (newPosition === RelativePosition.LeftTop)
        newPosition = RelativePosition.RightTop;
    }

    const rightMargin = parseMargin(containerStyle.marginRight);
    if (
      targetRect.right + popupWidth + rightMargin + offsetArrow + offset >
      viewportRect.right
    ) {
      if (newPosition === RelativePosition.Right)
        newPosition = RelativePosition.Left;
      else if (newPosition === RelativePosition.RightTop)
        newPosition = RelativePosition.LeftTop;
    }

    return newPosition;
  }

  // fit the popup within the extents of the view port
  private _fitPopup = (point: PopupPoint) => {
    const fittedPoint = point;

    if (!this._popup) {
      return fittedPoint;
    }

    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const container = this.getContainer();
    const containerBounds = container.getBoundingClientRect();

    if (fittedPoint.y + popupHeight > containerBounds.height) {
      fittedPoint.y = containerBounds.height - popupHeight;
    }

    if (fittedPoint.x + popupWidth > containerBounds.width) {
      fittedPoint.x = containerBounds.width - popupWidth;
    }

    if (fittedPoint.y < 0) {
      fittedPoint.y = 0;
    }

    if (fittedPoint.x < 0) {
      fittedPoint.x = 0;
    }

    return fittedPoint;
  };

  private _handleAnimationEnd = (
    event: React.AnimationEvent<HTMLDivElement>
  ) => {
    if (event.target === this._popup) {
      this.setState({ animationEnded: true });
    }
  };

  private _handleThemeProviderRef = (el: HTMLDivElement | null) => {
    this.setState({ portalContainer: el ?? undefined });
  };

  public override render() {
    const animate =
      this.props.animate !== undefined ? this.props.animate : true;
    const className = classnames(
      "core-popup",
      this._getClassNameByPosition(this.state.position),
      this.props.showShadow && "core-popup-shadow",
      this.props.showArrow && "arrow",
      !animate && "core-popup-animation-none",
      this.props.className,
      this.state.animationEnded && "core-animation-ended",
      !this.props.isOpen &&
        this.props.keepContentsMounted &&
        "core-popup-hidden"
    );

    const style: React.CSSProperties = {
      top: this.state.top,
      left: this.state.left,
      ...this.props.style,
    };

    const role = this.props.role ? this.props.role : "dialog"; // accessibility property

    if (!this.props.isOpen && !this.props.keepContentsMounted) {
      return null;
    }

    return ReactDOM.createPortal(
      <div
        className={className}
        data-testid="core-popup"
        ref={(element) => {
          this._popup = element;
        }}
        style={style}
        role={role}
        aria-modal={true}
        tabIndex={-1}
        aria-label={this.props.ariaLabel}
        onAnimationEnd={this._handleAnimationEnd}
      >
        <ThemeProvider
          ref={this._handleThemeProviderRef}
          portalContainer={this.state.portalContainer}
        >
          <FocusTrap
            active={!!this.props.moveFocus}
            initialFocusElement={this.props.focusTarget}
            returnFocusOnDeactivate={true}
          >
            {this.props.children}
          </FocusTrap>
        </ThemeProvider>
      </div>,
      this.getContainer()
    );
  }

  private getContainer(): Element {
    return (
      this.props.portalTarget ??
      this.context ??
      this.state.parentDocument.body.querySelector(
        '[data-root-container="appui-root-id"]'
      ) ??
      this.state.parentDocument.body
    );
  }
}

function parsePxString(pxStr: string): number {
  const parsed = parseInt(pxStr, 10);
  return parsed || 0;
}

function parseMargin(value: string) {
  return value ? parseFloat(value) : 0;
}
