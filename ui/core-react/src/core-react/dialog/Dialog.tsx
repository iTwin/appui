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

  /** Default alignment of dialog. */
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
  /** Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 135px */
  minHeight?: string | number;
  /** Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100% */
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
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  positionSet: boolean;
}

/**
 * Dialog React component with optional resizing and dragging functionality
 * @public
 */
export class Dialog extends React.Component<DialogProps, DialogState> {
  private _parentDocument = document;
  private _containerRef = React.createRef<HTMLDivElement>();
  public static defaultProps: Partial<DialogProps> = {
    minWidth: 300,
    minHeight: 135,
    maxWidth: "100%",
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

    let initialOffset: React.CSSProperties = {};
    if (x || y) {
      initialOffset = {
        left: x,
        top: y,
        transform: "none",
      };
    }

    const containerStyle: React.CSSProperties = {
      ...initialOffset,
      margin: "",
      width,
      height,
    };

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
      padding: inset ? undefined : 0,
      ...containerStyle,
      ...minMaxStyle,
    };

    const buttons = this.getFooterButtons(buttonCluster);

    return (
      <BaseDialog
        isOpen={opened}
        onClose={onClose}
        closeOnExternalClick={false}
        closeOnEsc={false}
        style={style}
        className={className}
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
            className={classnames(
              "dialog-main",
              alignment && this.getCSSClassNameFromAlignment(alignment)
            )}
            data-testid="core-dialog-container"
            style={dialogBaseContainerStyle}
            onPointerDown={this._handleContainerPointerDown}
          >
            {!hideHeader &&
              (header || (
                <BaseDialog.TitleBar
                  titleText={title}
                  style={titleStyle}
                  data-testid="core-dialog-head"
                />
              ))}
            <BaseDialog.Content
              className={contentClassName}
              style={contentStyle}
            >
              {this.props.children}
            </BaseDialog.Content>
            {footer || (
              <BaseDialog.ButtonBar style={footerStyle}>
                {buttons}
              </BaseDialog.ButtonBar>
            )}
            {resizable && (
              <>
                <div
                  className={classnames("dialog-resize-bar", "drag-right")}
                  onPointerDown={this._handleStartResizeRight}
                  data-testid="core-dialog-drag-right"
                />
                <div
                  className={classnames(
                    "dialog-resize-bar",
                    "drag-bottom-right"
                  )}
                  onPointerDown={this._handleStartResizeDownRight}
                  data-testid="core-dialog-drag-bottom-right"
                />
                <div
                  className={classnames("dialog-resize-bar", "drag-bottom")}
                  onPointerDown={this._handleStartResizeDown}
                  data-testid="core-dialog-drag-bottom"
                />
              </>
            )}
          </BaseDialog.Main>
        </DivWithOutsideClick>
      </BaseDialog>
    );
  }

  private getCSSClassNameFromAlignment(
    alignment: DialogAlignment
  ): string | undefined {
    // Drop the alignment CSS class if the Dialog has been sized or moved.
    if (this.state.positionSet) return undefined;

    switch (alignment) {
      case DialogAlignment.TopLeft:
        return "align-top-left";
      case DialogAlignment.Top:
        return "align-top";
      case DialogAlignment.TopRight:
        return "align-top-right";
      case DialogAlignment.Left:
        return "align-left";
      case DialogAlignment.Center:
        return "align-center";
      case DialogAlignment.Right:
        return "align-right";
      case DialogAlignment.BottomLeft:
        return "align-bottom-left";
      case DialogAlignment.Bottom:
        return "align-bottom";
      case DialogAlignment.BottomRight:
        return "align-bottom-right";
    }
  }

  private getFooterButtons(
    buttonCluster: DialogButtonDef[] | undefined
  ): React.ReactNode[] | undefined {
    if (buttonCluster === undefined) return undefined;

    const buttons: React.ReactNode[] = [];
    buttonCluster.forEach((button: DialogButtonDef, index: number) => {
      let buttonText = "";
      let buttonClass = classnames(button.className);
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
          styleType={usePrimaryStyleType ? "high-visibility" : undefined}
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

  private _handlePointerMove = (event: PointerEvent): void => {
    if (!this.props.resizable || !this._containerRef.current) return;

    const { minWidth, maxWidth, minHeight, maxHeight } = this.props;
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
  };

  private _handlePointerUp = (_event: PointerEvent): void => {
    if (!this.props.resizable) return;

    // istanbul ignore else
    if (this._containerRef.current) {
      this.setState({
        rightResizing: false,
        downResizing: false,
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
