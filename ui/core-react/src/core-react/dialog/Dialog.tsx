/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { DialogButtonDef } from "@itwin/appui-abstract";
import { DialogButtonType } from "@itwin/appui-abstract";
import { Dialog as BaseDialog, Button } from "@itwin/itwinui-react";
import { DivWithOutsideClick } from "../base/DivWithOutsideClick";
import type { CommonProps } from "../utils/Props";
import type { Omit } from "../utils/typeUtils";
import "./Dialog.scss";
import { useTranslation } from "../l10n/useTranslation";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

/** Enum for dialog alignment
 * @public
 * @deprecated in 4.12.x. Enum used in a deprecated component {@link Dialog}.
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
 * @deprecated in 4.12.x. Props of deprecated component {@link Dialog}.
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
  // eslint-disable-next-line deprecation/deprecation
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

/** Dialog React component with optional resizing and dragging functionality
 * @public
 * @deprecated in 4.12.x. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI dialog} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class Dialog extends React.Component<DialogProps> {
  private _parentDocument = document;
  // eslint-disable-next-line deprecation/deprecation
  public static defaultProps: Partial<DialogProps> = {
    maxWidth: "100%",
    width: "50%",
    hideHeader: false,
    resizable: false,
    movable: false,
    modal: true,
    inset: true,
    trapFocus: false,
  };

  // eslint-disable-next-line deprecation/deprecation
  constructor(props: DialogProps) {
    super(props);
  }

  public override componentWillUnmount(): void {
    this._parentDocument.removeEventListener("keyup", this._handleKeyUp, true);
  }

  public override componentDidMount(): void {
    this._parentDocument.addEventListener("keyup", this._handleKeyUp, true);
  }

  public handleRefSet = (containerDiv: HTMLDivElement | null) => {
    if (containerDiv) this._parentDocument = containerDiv.ownerDocument;
  };

  public override render(): React.ReactElement {
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
      as,
      ...props
    } = this.props;

    let initialOffset: React.CSSProperties = {};
    if (x || y) {
      initialOffset = {
        left: x ?? 0,
        top: y ?? 0,
        transform: "none",
      };
    }

    const containerStyle: React.CSSProperties = {
      ...initialOffset,
      margin: "",
      width,
      height,
    };

    const minMaxStyle: React.CSSProperties = {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    };
    const dialogBaseContainerStyle: React.CSSProperties = {
      ...containerStyle,
      ...minMaxStyle,
    };

    // eslint-disable-next-line deprecation/deprecation
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
        className={classnames("core-dialog", className)}
        isDraggable={movable}
        isResizable={resizable}
        trapFocus={trapFocus && modal}
        preventDocumentScroll={true}
        data-testid="core-dialog-root"
        {...props}
      >
        {modal && <BaseDialog.Backdrop style={backgroundStyle} />}
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick onOutsideClick={onOutsideClick}>
          <BaseDialog.Main
            className={classnames(
              "core-dialog-main",
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
              style={{ padding: inset ? undefined : 0, ...contentStyle }}
            >
              {this.props.children}
            </BaseDialog.Content>
            {footer ||
              (buttons && (
                <BaseDialog.ButtonBar style={footerStyle}>
                  {buttons}
                </BaseDialog.ButtonBar>
              ))}
          </BaseDialog.Main>
        </DivWithOutsideClick>
      </BaseDialog>
    );
  }

  // eslint-disable-next-line deprecation/deprecation
  private getCSSClassNameFromAlignment(alignment: DialogAlignment): string {
    switch (alignment) {
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.TopLeft:
        return "core-align-top-left";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.Top:
        return "core-align-top";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.TopRight:
        return "core-align-top-right";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.Left:
        return "core-align-left";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.Center:
        return "core-align-center";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.Right:
        return "core-align-right";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.BottomLeft:
        return "core-align-bottom-left";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.Bottom:
        return "core-align-bottom";
      // eslint-disable-next-line deprecation/deprecation
      case DialogAlignment.BottomRight:
        return "core-align-bottom-right";
    }
  }

  /** @deprecated in 4.12.x. Use iTwinUI Button instead. */
  protected getFooterButtons(
    buttonCluster: DialogButtonDef[] | undefined,
    primaryStyleType: ButtonProps["styleType"] = "cta",
    noCoreButtonClasses: boolean = false
  ): React.ReactNode[] | undefined {
    if (buttonCluster === undefined) return undefined;

    const buttons: React.ReactNode[] = [];
    buttonCluster.forEach((button: DialogButtonDef, index: number) => {
      buttons.push(
        <DialogButton
          key={index.toString()}
          button={button}
          primaryStyleType={primaryStyleType}
          noCoreButtonClasses={noCoreButtonClasses}
        />
      );
    });
    return buttons;
  }

  private _handleKeyUp = (event: KeyboardEvent) => {
    if (
      event.key === Key.Escape.valueOf() &&
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
}

function DialogButton({
  button,
  primaryStyleType,
  noCoreButtonClasses,
}: {
  button: DialogButtonDef;
  primaryStyleType: ButtonProps["styleType"];
  noCoreButtonClasses: boolean;
}) {
  const { translate } = useTranslation();

  let buttonText = "";

  let buttonClass = classnames(
    !noCoreButtonClasses && "core-dialog-button",
    !noCoreButtonClasses && `dialog-button-${button.type}`,
    button.className
  );
  let usePrimaryStyleType = false;

  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
  }

  buttonText = button.label || buttonText;

  return (
    <Button
      className={buttonClass}
      disabled={button.disabled}
      styleType={usePrimaryStyleType ? primaryStyleType : undefined}
      onClick={button.onClick}
    >
      {buttonText}
    </Button>
  );
}
