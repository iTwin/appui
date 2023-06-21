/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./Dialog.scss";
import classnames from "classnames";
import * as React from "react";
import type { DialogButtonDef } from "@itwin/appui-abstract";
import { DialogButtonType, SpecialKey } from "@itwin/appui-abstract";
import { DivWithOutsideClick } from "../base/DivWithOutsideClick";
import { UiCore } from "../UiCore";
import type { CommonProps } from "../utils/Props";
import type { Omit } from "../utils/typeUtils";
import type { ButtonProps } from "@itwin/itwinui-react";
import { Dialog as BaseDialog } from "@itwin/itwinui-react";
import { Button } from "@itwin/itwinui-react";

// cspell:ignore focustrap

/** Enum for dialog alignment
 * @public
 */
export enum DialogAlignment {
  TopLeft = "top-left",
  Top = "top",
  TopRight = "top-right",
  Left = "left",
  Center = "center",
  Right = "right",
  BottomLeft = "bottom-left",
  Bottom = "bottom",
  BottomRight = "bottom-right",
}

/** Properties for the [[Dialog]] component
 * @public
 */
export interface DialogProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title">,
    CommonProps {
  /** Indicates whether to show dialog or not */
  opened: boolean;

  /** Indicates whether the user can resize dialog with cursor. Default: false */
  resizable?: boolean;
  /** Indicates whether the user can move dialog with cursor. Default: false */
  movable?: boolean;
  /** Indicates whether the content should be inset. Default: true */
  inset?: boolean;
  /** Indicates whether the focus should be trapped within the dialog. Default: false */
  trapFocus?: boolean;

  /** Whether the hide the header. Default: false */
  hideHeader?: boolean;
  /** Override for the header */
  header?: React.ReactNode;
  /** Title to show in title bar of dialog */
  title?: string | React.ReactElement;
  /** Footer to show at bottom of dialog. Note: will override buttonCluster */
  footer?: string | React.ReactElement;
  /** List of DialogButtonDef objects specifying buttons and associated onClick events */
  buttonCluster?: DialogButtonDef[];

  /** Default alignment of dialog. Default: DialogAlignment.Center */
  alignment?: DialogAlignment;
  /** Initial x/left position of dialog in px. */
  x?: number;
  /** Initial y/top position of dialog in px. */
  y?: number;

  /** onClick event for X button for dialog */
  onClose?: () => void;
  /** 'keyup' event for Esc key */
  onEscape?: () => void;
  /** Triggered when a click is triggered outside of this dialog. */
  onOutsideClick?: (event: MouseEvent) => any;

  /** Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%" */
  width?: string | number;
  /** Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  height?: string | number;
  /** Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px */
  minWidth?: string | number;
  /** Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100px */
  minHeight?: string | number;
  /** Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxWidth?: string | number;
  /** Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxHeight?: string | number;

  /** Whether to show background overlay. Default: true.
   * @note Modeless dialogs require an id and an implementation of onModelessPointerDown.
   */
  modal?: boolean;
  /** An id for a modeless dialog */
  modelessId?: string;
  /** Pointer Down event handler when modeless (modal = false) */
  onModelessPointerDown?: (event: React.PointerEvent, id: string) => void;

  /** Custom CSS Style for overlay */
  backgroundStyle?: React.CSSProperties;
  /** Custom CSS Style for title */
  titleStyle?: React.CSSProperties;
  /** Custom CSS Style for footer */
  footerStyle?: React.CSSProperties;
  /** Custom CSS class name for the content */
  contentClassName?: string;
  /** Custom CSS Style for the content */
  contentStyle?: React.CSSProperties;
}

/** @internal */
interface DialogState {
  rightResizing: boolean;
  downResizing: boolean;
  moving: boolean;
  grabOffsetX: number;
  grabOffsetY: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  positionSet: boolean;
  initialTransform?: string;
}

/**
 * Dialog React component with optional resizing and dragging functionality
 * @public
 */
export class Dialog extends React.Component<DialogProps, DialogState> {
  private _parentDocument = document;
  private _containerRef = React.createRef<HTMLDivElement>();
  public static defaultProps: Partial<DialogProps> = {
    alignment: DialogAlignment.Center,
    minWidth: 300,
    minHeight: 135,
    width: "50%",
    hideHeader: false,
    resizable: false,
    movable: false,
    modal: true,
    inset: true,
    trapFocus: false,
  };

  /** @internal */
  public override readonly state: Readonly<DialogState>;

  constructor(props: DialogProps) {
    super(props);
    this.state = {
      rightResizing: false,
      downResizing: false,
      moving: false,
      grabOffsetX: 0,
      grabOffsetY: 0,
      positionSet: props.x !== undefined || props.y !== undefined,
    };
  }

  private getParentWindow() {
    // istanbul ignore next
    return this._parentDocument.defaultView ?? window;
  }

  public override componentWillUnmount(): void {
    const parentWindow = this.getParentWindow();
    parentWindow.removeEventListener("pointerup", this._handlePointerUp, true);
    parentWindow.removeEventListener(
      "pointermove",
      this._handlePointerMove,
      true
    );
    this._parentDocument.removeEventListener("keyup", this._handleKeyUp, true);
    parentWindow.addEventListener("resize", this._handleAppWindowResize);
  }

  /** Keep title bar of movable Dialog at least partially visible */
  // istanbul ignore next
  private _handleAppWindowResize = (): void => {
    if (!this._containerRef.current || !this.props.movable) return;

    const parentWindow = this.getParentWindow();
    const { x, y } = this.state;
    let newX: number | undefined;
    let newY: number | undefined;

    if (undefined !== y && undefined !== x) {
      if (y > parentWindow.innerHeight - 32)
        newY = parentWindow.innerHeight - 32;
      if (x > parentWindow.innerWidth - 32) newX = parentWindow.innerWidth - 32;
    }

    if (newX !== undefined || newY !== undefined)
      this.setState({
        x: newX !== undefined ? newX : x,
        y: newY !== undefined ? newY : y,
        positionSet: true,
      });
  };

  public override componentDidMount(): void {
    const parentWindow = this.getParentWindow();
    parentWindow.addEventListener("pointerup", this._handlePointerUp, true);
    this._parentDocument.addEventListener("keyup", this._handleKeyUp, true);
    parentWindow.addEventListener("resize", this._handleAppWindowResize);

    if (!this._containerRef.current) return;
    const rect = this._containerRef.current.getBoundingClientRect();
    this.setState({
      initialTransform: `translate(${-rect.width / 2}px,${-rect.height / 3}px)`,
    });
  }

  public handleRefSet = (containerDiv: HTMLDivElement | null) => {
    if (containerDiv) this._parentDocument = containerDiv.ownerDocument;
  };

  public override render(): JSX.Element {
    const {
      opened,
      title,
      footer,
      buttonCluster,
      onClose,
      onEscape,
      onOutsideClick,
      minWidth,
      minHeight,
      x,
      y,
      width,
      height,
      maxHeight,
      maxWidth,
      backgroundStyle,
      titleStyle,
      footerStyle,
      style,
      contentStyle,
      contentClassName,
      modal,
      resizable,
      movable,
      className,
      alignment,
      inset,
      trapFocus,
      modelessId,
      onModelessPointerDown,
      hideHeader,
      header,
      ...props
    } = this.props;

    const containerStyle: React.CSSProperties = {
      margin: "",
      left: x,
      top: y,
      width,
      height,
    };

    // istanbul ignore else
    if (this.state.x !== undefined) {
      containerStyle.marginLeft = "0";
      containerStyle.marginRight = "0";
      containerStyle.left = this.state.x;
    }
    // istanbul ignore else
    if (this.state.y !== undefined) {
      containerStyle.marginTop = "0";
      containerStyle.marginBottom = "0";
      containerStyle.top = this.state.y;
    }

    // istanbul ignore else
    if (this.state.width !== undefined) containerStyle.width = this.state.width;
    // istanbul ignore else
    if (this.state.height !== undefined)
      containerStyle.height = this.state.height;

    const minMaxStyle: React.CSSProperties = {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    };
    const dialogBaseContainerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      transform: this.state.initialTransform,
      ...containerStyle,
      ...minMaxStyle,
    };

    const buttons = this.getFooterButtons(
      buttonCluster,
      "high-visibility",
      true
    );

    return (
      <BaseDialog
        isOpen={opened}
        onClose={onClose}
        closeOnExternalClick={false}
        closeOnEsc={false}
        style={style}
        className={className}
        // isResizable={resizable}
        isDraggable={movable}
        trapFocus={trapFocus && /* istanbul ignore next */ modal}
        preventDocumentScroll={true}
        data-testid="core-dialog-root"
        {...props}
      >
        {modal && <BaseDialog.Backdrop style={backgroundStyle} />}
        <DivWithOutsideClick onOutsideClick={onOutsideClick}>
          <BaseDialog.Main
            ref={this._containerRef}
            data-testid="core-dialog-container"
            style={dialogBaseContainerStyle}
            onPointerDown={this._handleContainerPointerDown}
          >
            {!hideHeader && (
              <BaseDialog.TitleBar titleText={title} style={titleStyle} />
            )}
            <BaseDialog.Content
              className={contentClassName}
              style={contentStyle}
            >
              {this.props.children}
            </BaseDialog.Content>
            <BaseDialog.ButtonBar style={footerStyle}>
              {buttons}
            </BaseDialog.ButtonBar>
            <div
              style={{
                right: -4,
                top: 8,
                bottom: 8,
                width: 8,
                position: "absolute",
                cursor: "e-resize",
              }}
              onPointerDown={this._handleStartResizeRight}
            />
            <div
              style={{
                right: -4,
                bottom: -4,
                width: 12,
                height: 12,
                position: "absolute",
                cursor: "se-resize",
              }}
              onPointerDown={this._handleStartResizeDownRight}
            />
            <div
              style={{
                right: 8,
                left: 8,
                bottom: -4,
                height: 8,
                position: "absolute",
                cursor: "s-resize",
              }}
              onPointerDown={this._handleStartResizeDown}
            />
          </BaseDialog.Main>
        </DivWithOutsideClick>
      </BaseDialog>
    );
  }

  private getCSSClassNameFromAlignment(alignment?: DialogAlignment): string {
    let className = "";

    // Drop the alignment CSS class if the Dialog has been sized or moved.
    if (this.state.positionSet) return "";

    // istanbul ignore next
    if (!alignment) alignment = DialogAlignment.Center;

    switch (alignment) {
      case DialogAlignment.TopLeft:
        className = "core-dialog-top-left";
        break;
      case DialogAlignment.Top:
        className = "core-dialog-top";
        break;
      case DialogAlignment.TopRight:
        className = "core-dialog-top-right";
        break;
      case DialogAlignment.Left:
        className = "core-dialog-left";
        break;
      case DialogAlignment.Center:
        className = "core-dialog-center";
        break;
      case DialogAlignment.Right:
        className = "core-dialog-right";
        break;
      case DialogAlignment.BottomLeft:
        className = "core-dialog-bottom-left";
        break;
      case DialogAlignment.Bottom:
        className = "core-dialog-bottom";
        break;
      case DialogAlignment.BottomRight:
        className = "core-dialog-bottom-right";
        break;
    }

    return className;
  }

  protected getFooterButtons(
    buttonCluster: DialogButtonDef[] | undefined,
    primaryStyleType: ButtonProps["styleType"] = "cta",
    noCoreButtonClasses: boolean = false
  ): React.ReactNode[] | undefined {
    if (buttonCluster === undefined) return undefined;

    const buttons: React.ReactNode[] = [];
    buttonCluster.forEach((button: DialogButtonDef, index: number) => {
      let buttonText = "";
      let buttonClass = classnames(
        !noCoreButtonClasses && "core-dialog-button",
        !noCoreButtonClasses && `dialog-button-${button.type}`,
        button.className
      );
      let usePrimaryStyleType = false;

      switch (button.type) {
        case DialogButtonType.OK:
          buttonText = UiCore.translate("dialog.ok");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          usePrimaryStyleType = true;
          break;
        case DialogButtonType.Retry:
          buttonText = UiCore.translate("dialog.retry");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          usePrimaryStyleType = true;
          break;
        case DialogButtonType.Yes:
          buttonText = UiCore.translate("dialog.yes");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          usePrimaryStyleType = true;
          break;
        case DialogButtonType.No:
          buttonText = UiCore.translate("dialog.no");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          break;
        case DialogButtonType.Cancel:
          buttonText = UiCore.translate("dialog.cancel");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          break;
        case DialogButtonType.Close:
          buttonText = UiCore.translate("dialog.close");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          break;
        case DialogButtonType.Next:
          buttonText = UiCore.translate("dialog.next");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          usePrimaryStyleType = true;
          break;
        case DialogButtonType.Previous:
          buttonText = UiCore.translate("dialog.previous");
          buttonClass = classnames(buttonClass, button.buttonStyle);
          usePrimaryStyleType = true;
          break;
      }

      if (button.label) buttonText = button.label;

      buttons.push(
        <Button
          className={buttonClass}
          disabled={button.disabled}
          styleType={usePrimaryStyleType ? primaryStyleType : undefined}
          key={index.toString()}
          onClick={button.onClick}
        >
          {buttonText}
        </Button>
      );
    });
    return buttons;
  }

  private _handleKeyUp = (event: KeyboardEvent) => {
    if (
      event.key === SpecialKey.Escape &&
      this.props.opened &&
      this.props.onEscape
    ) {
      this.props.onEscape();
    }
  };

  protected _handleContainerPointerDown = (event: React.PointerEvent): void => {
    if (!this.props.modal) {
      if (this.props.onModelessPointerDown && this.props.modelessId)
        this.props.onModelessPointerDown(event, this.props.modelessId);
    }
  };

  private _handleStartResizeRight = (event: React.PointerEvent): void => {
    event.preventDefault();
    this.setState({ rightResizing: true });
    const parentWindow = this.getParentWindow();
    parentWindow.addEventListener("pointermove", this._handlePointerMove, true);
  };

  private _handleStartResizeDown = (event: React.PointerEvent): void => {
    event.preventDefault();
    this.setState({ downResizing: true });
    const parentWindow = this.getParentWindow();
    parentWindow.addEventListener("pointermove", this._handlePointerMove, true);
  };

  private _handleStartResizeDownRight = (event: React.PointerEvent): void => {
    event.preventDefault();
    this.setState({ downResizing: true, rightResizing: true });
    const parentWindow = this.getParentWindow();
    parentWindow.addEventListener("pointermove", this._handlePointerMove, true);
  };

  private _handleStartMove = (event: React.PointerEvent): void => {
    if (!this.props.movable) return;

    event.preventDefault();
    // istanbul ignore else
    if (this._containerRef.current) {
      const rect = this._containerRef.current.getBoundingClientRect();
      const grabOffsetX = event.clientX - rect.left;
      const grabOffsetY = event.clientY - rect.top;
      this.setState({
        grabOffsetX,
        grabOffsetY,
        moving: true,
      });

      const parentWindow = this.getParentWindow();
      parentWindow.addEventListener(
        "pointermove",
        this._handlePointerMove,
        true
      );
    }
  };

  private _handlePointerMove = (event: PointerEvent): void => {
    if (
      (!this.props.resizable && !this.props.movable) ||
      !this._containerRef.current
    )
      return;

    const { minWidth, maxWidth, minHeight, maxHeight, movable } = this.props;
    let { x, y, width, height } = this.state;

    // istanbul ignore else
    if (x === undefined) {
      // if x is undefined, so is y, width, and height
      const rect = this._containerRef.current.getBoundingClientRect();
      (width = rect.width),
        (height = rect.height),
        (x = rect.left),
        (y = rect.top);
    }

    if (this.props.resizable) {
      if (this.state.rightResizing) {
        const pointerX = event.clientX;
        width = pointerX - x;
        // istanbul ignore else
        if (typeof minWidth === "number") width = Math.max(width, minWidth);
        if (maxWidth !== undefined && typeof maxWidth === "number")
          width = Math.min(width, maxWidth);
      }

      if (this.state.downResizing) {
        const pointerY = event.clientY;
        height = pointerY - y!;
        // istanbul ignore else
        if (typeof minHeight === "number") height = Math.max(height, minHeight);
        if (maxHeight !== undefined && typeof maxHeight === "number")
          height = Math.min(height, maxHeight);
      }

      this.setState({ width, height });
    }

    // istanbul ignore next
    if (movable && this.state.moving) {
      x = event.clientX - this.state.grabOffsetX;
      y = event.clientY - this.state.grabOffsetY;
      if (y < 0) y = 0;
      if (event.view) {
        if (y > event.view.innerHeight - 32) y = event.view.innerHeight - 32;
        if (x > event.view.innerWidth - 32) x = event.view.innerWidth - 32;
        if (width) {
          if (x < 0 - width + 32) x = 0 - width + 32;
        }
      }

      this.setState({ x, y, positionSet: true });
    }
  };

  private _handlePointerUp = (_event: PointerEvent): void => {
    if (!this.props.movable && !this.props.resizable) return;

    // istanbul ignore else
    if (this._containerRef.current) {
      this.setState({
        rightResizing: false,
        downResizing: false,
        moving: false,
        grabOffsetX: 0,
        grabOffsetY: 0,
      });
    }

    const parentWindow = this.getParentWindow();
    parentWindow.removeEventListener(
      "pointermove",
      this._handlePointerMove,
      true
    );
  };
}
